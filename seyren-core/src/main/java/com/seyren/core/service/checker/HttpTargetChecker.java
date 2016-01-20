package com.seyren.core.service.checker;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.base.Optional;
import com.seyren.core.domain.Check;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Named;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Tsibin.
 */

public class HttpTargetChecker implements TargetChecker {

    private static final Logger LOGGER = LoggerFactory.getLogger(HttpTargetChecker.class);

    private final JsonNodeResponseHandler jsonNodeHandler = new JsonNodeResponseHandler();
    private final HttpContext context = new BasicHttpContext();
    private final HttpClient httpClient;

    public HttpTargetChecker() {
        this.httpClient = createHttpClient();
    }

    @Override
    public Map<String, Optional<BigDecimal>> check(Check check) throws Exception {
        Map<String, Optional<BigDecimal>> targetValues = new HashMap<>();

        try {
            HttpPost post = buildPostRequest(check.getRequestPath(), check.getRequestParams());

            JsonNode node = httpClient.execute(post, jsonNodeHandler, context);
            for (JsonNode metric : node) {
                String target = metric.path("target").asText();
                try {
                    BigDecimal value = getLatestValue(metric);
                    targetValues.put(target, Optional.of(value));
                } catch (Exception e) {
                    // Silence these - we don't know what's causing Graphite to return null values
                    LOGGER.warn("{} failed to get from request", check.getName(), e);
                    targetValues.put(target, Optional.<BigDecimal>absent());
                }
            }
        } catch (Exception e) {
            LOGGER.warn(check.getName() + " failed to get from request", e);
        }

        return targetValues;
    }

    private HttpClient createHttpClient() {
        return HttpClients.createDefault();
    }

    private HttpPost buildPostRequest(String path, String rawParams) throws UnsupportedEncodingException {
        HttpPost post = new HttpPost();
        post.setURI(URI.create(path));
        String[] params = rawParams.split(System.lineSeparator());
        List<NameValuePair> requestParameters = new ArrayList<>();
        for (String param : params) {
            String[] nameValueParam = param.split(":");
            requestParameters.add(new BasicNameValuePair(nameValueParam[0], nameValueParam[1]));
        }
        post.setEntity(new UrlEncodedFormEntity(requestParameters));
        return post;
    }

    //TODO rewrite for httprequest
    private BigDecimal getLatestValue(JsonNode node) throws Exception {
        JsonNode datapoints = node.get("datapoints");

        for (int i = datapoints.size() - 1; i >= 0; i--) {
            String value = datapoints.get(i).get(0).asText();
            if (!value.equals("null")) {
                return new BigDecimal(value);
            }
        }

        LOGGER.warn("{}", node);
        throw new Exception("Could not find a valid datapoint for target: " + node.get("target"));
    }
}
