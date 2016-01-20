package com.seyren.api.jaxrs;

import com.seyren.core.domain.Template;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by Tsibin.
 */
@Path("/")
public interface TemplatesResources {

    @GET
    @Path("/templates")
    @Produces(MediaType.APPLICATION_JSON)
    Response getTemplates();

    @GET
    @Path("/templates/{templateId}")
    @Produces(MediaType.APPLICATION_JSON)
    Response getTemplate(@PathParam("templateId") String templateId);

    @POST
    @Path("/templates")
    @Consumes(MediaType.APPLICATION_JSON)
    Response createTemplate(Template template);

    @DELETE
    @Path("/templates/{templateId}")
    Response deleteTemplate(@PathParam("templateId") String templateId);
}
