package com.seyren.core.domain;

/**
 * Created by Tsibin.
 */
public enum MessageType {
    DEFAULT("com/seyren/core/service/notification/email-template.vm");

    private final String pathToTemplate;

    MessageType(String pathToTemplate) {
        this.pathToTemplate = pathToTemplate;
    }

    public String getPathToTemplate() {
        return pathToTemplate;
    }
}
