package com.seyren.api.bean;

import com.seyren.api.jaxrs.TemplatesResources;
import com.seyren.core.domain.SeyrenResponse;
import com.seyren.core.domain.Template;
import com.seyren.core.store.TemplatesStore;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by Tsibin.
 */
@Named
public class TemplatesBean implements TemplatesResources {

    private TemplatesStore templatesStore;

    @Inject
    public TemplatesBean(TemplatesStore templatesStore) {
        this.templatesStore = templatesStore;
    }

    @Override
    public Response getTemplates() {
        SeyrenResponse<Template> templates;
        templates = templatesStore.getTemplates();
        return Response.ok(templates).build();
    }

    @Override
    public Response getTemplate(String templateId) {
        Template template = templatesStore.getTemplate(templateId);
        if (template == null)
            return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(template).build();
    }

    @Override
    public Response createTemplate(Template template) {
        Template stored = templatesStore.createTemplate(template);
        return Response.created(uri(stored.getId())).build();
    }

    @Override
    public Response deleteTemplate(String templateId) {
        templatesStore.deleteTemplate(templateId);
        return Response.noContent().build();
    }

    private URI uri(String templateId) {
        try {
            return new URI("templates/" + templateId);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
}
