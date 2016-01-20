package com.seyren.core.domain;

/**
 * Created by Tsibin.
 */
public class Template {

    private String id;
    private String name;
    private String content;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Template withId(String id) {
        setId(id);
        return this;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Template withName(String name) {
        setName(name);
        return this;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Template withContent(String content) {
        setContent(content);
        return this;
    }
}
