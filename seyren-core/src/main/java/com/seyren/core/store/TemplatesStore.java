package com.seyren.core.store;

import com.seyren.core.domain.SeyrenResponse;
import com.seyren.core.domain.Template;

/**
 * Created by Tsibin.
 */
public interface TemplatesStore {

    Template createTemplate(Template template);

    void deleteTemplate(String id);

    SeyrenResponse<Template> getTemplates();

    Template getTemplate(String templateId);

    Template updateTemplate(Template template);
}
