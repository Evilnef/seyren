package com.seyren.core.domain;

/**
 * Created by Tsibin.
 */
public enum MessageType {
    DEFAULT("com/seyren/core/service/notification/email-template.vm"),
    LICENCE_SERVER_UNAVAILABLE("com/seyren/core/service/notification/licenceServerUnavailableTemplate.vm"),
    LICENCE_SERVER_AVAILABLE("com/seyren/core/service/notification/licenceServerAvailableTemplate.vm"),
    LICENCE_SERVER_PERFORMANCE_DEGRADATION("com/seyren/core/service/notification/licenceServerPerformanceDegradation.vm");

    private final String pathToTemplate;

    MessageType(String pathToTemplate) {
        this.pathToTemplate = pathToTemplate;
    }

    public String getPathToTemplate() {
        return pathToTemplate;
    }
}
