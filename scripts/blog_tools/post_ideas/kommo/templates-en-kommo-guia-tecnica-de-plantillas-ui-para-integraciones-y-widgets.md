---
title: "Templates en Kommo – guía técnica de plantillas UI para integraciones y widgets"
source: "https://es-developers.kommo.com/docs/templates"
date: "2026-02-17"
---

Las plantillas del sistema son archivos twigs que puedes utilizar en tu widget.
Puedes descargarlos o copiarlos/pegarlos desde esta página.
{% if not type %}{% set type = "button" %}{% endif %}
{% if context_menu %}
<div class="button-input-wrapper {{class_name}}">
{% endif %}
<button type="{{type}}" {{ additional_data }} class="button-input {% if context_menu %}button-input-with-menu{% endif %} {% if disabled %}button-input-disabled{% endif %} {% if not context_menu %}{{class_name}}{% else %}{{button_input_class_name}}{% endif %}" tabindex="{{tab_index}}" id="{{id}}" {% if title %}title="{{title|capitalize}}"{% endif %}>
{% block button_content %}
{% if not plain %}<span class="button-input-inner {{inner_class_name}}">{% endif %}
{% if icon_class_name %}<span class="icon icon-inline {{icon_class_name}}"></span>{% endif %}
{% if svg_class_name %}<svg class="svg-icon svg-{{svg_class_name}}-dims"><use xlink:href="#{{svg_class_name}}"></use></svg>{% endif %}
{% if text %}<span class="button-input-inner__text">{{text}} {{text_bold}}</span>{% endif %}
{% if icon_right_name %}<span class="{{ icon_right_name }} icon-right"></span>{% endif %}
{% if not plain %}</span>{% endif %}
{% endblock %}
</button>
{% if context_menu %}
{% if context_menu != 1 %}
{% include 'interface/controls/button/context_menu.twig' with {context_menu_class_name: context_menu_class_name, context_menu: context_menu} %}
{% endif %}
</div>
{% endif %}
{% if text is not defined %}
{% set text = lang.button_cancel %}
{% endif %}
<button type="button" class="button-input button-cancel {{class_name}}" tabindex="{{tab_index}}" id="{{id}}" style="{% if hidden %} display: none;{% endif %}"><span>{{text}}</span></button>
<span id="{{ id }}" class="button-delete {{ class_name }}">
<span class="icon icon-delete-trash"></span>
{{text}}
</span>
Parámetros que puedes pasar
<label class="control-checkbox {{class_name}} {% if small %}control-checkbox_small{% endif %} {% if checked %}is-checked{% endif %}">
{% if name_is_array == 'yes'%}
{% set arr = '[]' %}
{% else %}
{% set arr = '' %}
{% endif %}
<div class="control-checkbox__body">
<input type="checkbox" class="{{input_class_name}}" name="{{name ~ arr}}" id="{{id}}"{% if checked %} checked="checked"{% endif %}{% if disabled %} disabled{% endif %} value="{{value}}" {% if fieldId %} data-field-id="{{fieldId}}" {% endif %} data-value="{{dataValue or value}}" {{additional_data}}/>
<span class="control-checkbox__helper {% if checked_minus %}control-checkbox__helper_minus{% endif %}"></span>
</div>
{% if text|length %}
<div class="control-checkbox__text element__text {{text_class_name}}" title="{{text}}">
{% if note_text %}
<span class="control-checkbox__main-text">{{text}}</span> <span class="control-checkbox__note-text">{{note_text}}</span>
{% else %}
{{text}}
{% endif %}
</div>
{% elseif note_text %}
<div class="control-checkbox__text element__text {{text_class_name}}" title="{{note_text}}">
<span class="control-checkbox__note-text">{{note_text}}</span>
</div>
{% endif %}
</label>
{% include 'interface/controls/checkboxes_dropdown/index.twig' %}
{% set checked_values_length = 0 %}
<div class="checkboxes_dropdown {{class_name}} {% if control_class_name %}{{ control_class_name }}{% else %}js-control-checkboxes_dropdown{% endif %}">
<div class="checkboxes_dropdown__list custom-scroll">
<div class="checkboxes_dropdown__list__wrapper__inner">
<div class="checkboxes_dropdown__item" >
{% include "interface/controls/checkbox.twig" with {
name: '',
name_is_array: false,
id: 'cbx_drop_master_' ~ random(1000),
class_name: 'checkboxes_dropdown__label js-master-checkbox-wrapper',
input_class_name: 'js-form-changes-skip js-master-checkbox',
text_class_name: 'js-select-all-text checkboxes_dropdown__label_title checkboxes_dropdown__label_title-not_active',
value: '',
disabled: false,
text: 'Seleccionar todos'|i18n
} %}
</div>
{% set cb_name = name %}
{% for item in items %}
{% if need_escape %}
{% set text = item.option|escape %}
{% else %}
{% set text = item.option %}
{% endif %}
{% if item.name %}
{% set cb_name = item.name %}
{% endif %}
<div class="checkboxes_dropdown__item {% if item.active == 'N' %} checkboxes_dropdown__label_title-not_active{% endif %} {% if item.divider_before %} checkboxes_dropdown__label_title_divider_before{% endif %} {% if item.divider_after %}checkboxes_dropdown__label_title_divider_after{% endif %}" {% if item.divider_before %}data-title-before="{{ item.divider_before.title }}"{% endif %} {% if item.divider_after %} data-title-after="{{ item.divider_after.title }}"{% endif %} style="{% if item.bg_color %}background-color: {{ item.bg_color }}{% endif %}">
{% if not item.prefix %}
{% set item = item|merge({'prefix' : item.id}) %}
{% endif %}
{% set text_class_name = 'checkboxes_dropdown__label_title' %}
{% if item.active == 'N' %}
{% set text_class_name = text_class_name ~ ' checkboxes_dropdown__label_title-not_active' %}
{% endif %}
{% include "interface/controls/checkbox.twig" with {
name: cb_name,
id: 'cbx_drop_' ~ item.prefix,
class_name: 'checkboxes_dropdown__label',
input_class_name: 'js-item-checkbox',
text_class_name: text_class_name,
checked: item.is_checked,
value: item.id,
name_is_array: name_is_array,
text: text,
disabled: false
} %}
</div>
{% if item.is_checked %}
{% set checked_values_length = checked_values_length + 1 %}
{% endif %}
{% endfor %}
</div>
</div>
<div class="checkboxes_dropdown__title_wrapper">
{% include 'interface/controls/checkbox.twig' with {
class_name: 'checkboxes_dropdown__checkbox_master icon-checkbox js-master-checkbox-wrapper',
input_class_name: 'js-form-changes-skip js-master-checkbox',
checked: checked_values_length > 0,
checked_minus: checked_values_length > 0 and checked_values_length != items|length,
name: '',
name_is_array: false,
value: '',
text: '',
disabled: false
} %}
<span class="checkboxes_dropdown__title-selected">
<span class="checkboxes_dropdown__title" data-numeral="{{title_numeral}}" data-title-empty="{{title_empty}}">
{% block title %}
{% if checked_values_length %}
{% set is_first = true %}
{% for item in items if item.is_checked %}
<div class="checkboxes_dropdown__title-item" {% if is_first and title_before %}data-title-before="{{ title_before }}"{% endif %}>
{{ need_escape ? item.option|escape : item.option }}
</div>
{% set is_first = false %}
{% endfor %}
{% else %}
<div class="checkboxes_dropdown__title-item" {% if title_before %}data-title-before="{{ title_before }}"{% endif %}>
{{ title_empty ? title_empty : 'all'|i18n ~ ' ' ~ title_numeral|numeral('all') }}
</div>
{% endif %}
{% endblock %}
</span>
</span>
<span class="checkboxes_dropdown_icon icon-v-ico-2"></span>
</div>
</div>
<span class="date_field_wrapper {% if control_class_name %}{{ control_class_name }}{% else %}js-control-date{% endif %} {{class_name}}">
{% if type == 'range' %}
<input type="hidden" class="date_field__range_0" name="{{name.from}}" />
<input type="hidden" class="date_field__range_1" name="{{name.to}}" />
{% endif %}
<input class="date_field {{input_class}} {% if not value %}empty{% endif %} {% if type == 'range' %}range{% endif %}" id="{{id}}" type="text" {% if type != 'range' %}maxlength="10"{% endif %} {% if type == 'single' %}name="{{name}}"{% endif %} {% if title_format %}data-title-format="{{title_format}}"{% endif %}{% if data_format %}data-format="{{data_format}}"{% endif %} value="{{value}}" placeholder="{{placeholder}}" {% if disabled %}disabled="disabled"{% endif %} />
{% if show_icon %}<span class="date_field-js tasks-date__caption__icon"></span>{% endif %}
<div class="date_field_wrapper--calendar">
<svg class="svg-card-calendar-dims"><use xlink:href="#card-calendar"></use></svg>
</div>
</span>
<input type="file" name="{{ name }}" class="{{ class }}" id="{{ id }}" size="{{ size }}" style="{{ style }}"> {{ text }}
<input name="{{name}}" {% if data_id is defined and data_id %}data-id='{{ data_id }}'{% endif %} {% if sort is defined and sort %}data-sort='{{ sort }}'{% endif %} class="{{class_name}} {% if not styled_input %}text-input{% endif %}" id="{{id}}" type="{% if type %}{{type}}{% else %}text{% endif %}" placeholder="{{placeholder}}" value="{{ value is null ? '' : value }}" {% if style is defined and style %}style="{% for prop, value in style %}{{prop}}:{{value}};{% endfor %}"{% endif %} maxlength="{{max_length}}" {% if disabled %}disabled="disabled"{% endif %} {% if readonly %}readonly="readonly"{% endif %} {{additional_data}} autocomplete="off" {% if autosize_width %}size="{{max(value|length, min_size)}}"{% endif %} />
<select name="{{name}}" multiple>
{% for v in values %}
<option value="{{v.id}}" {% if selected and (v.id == selected) %}selected{% endif %}>{{v.value}}</option>
{% endfor %}
</select>
{% if prefix is not defined %}
{% set prefix = id %}
{% endif %}
<label for="{{prefix}}" class="control-radio__label {{class_name}} {% if disabled %}control-radio__label_disabled{% endif %}" {% if not noTitle %} title="{{label}}" {% endif %} {{additional_data}} {% if color %} style="overflow: visible;" {% endif %}>
<div class="control-radio">
<input type="radio" name="{{name}}" id="{{prefix}}" value="{{value}}" {{ selected ? 'checked' : '' }} {% if disabled %} disabled{% endif %} {% if fieldId %} data-field-id="{{fieldId}}" {% endif %} data-value="{{dataValue or value}}" {% if color %} data-color="{{color}}" {% endif %}>
<div class="control-radio__helper {% if disabled %} control-radio__helper-disabled {% endif %}"></div>
</div><!--
--><span class="control-radio-label-text element__text {{text_class_name}}" {% if color %} style="background: {{color}}; padding: 2px 6px; border-radius: 3px;" {% endif %}>{{label}}</span>
</label>
{# En caso de que el valor seleccionado no esté en la lista #}
{% if selected %}
{% set selected_temp = selected %}
{% set selected = false %}
{% set selected_isset = false %}
{% for v in items %}
{% set value = v.id %}
{% if v.id is not defined %}
{% set value = v.option %}
{% endif %}
{% if value == selected_temp %}
{% set selected = selected_temp %}
{% set selected_isset = true %}
{% endif %}
{% endfor %}
{% endif %}
{# there is no such a value #}
<div class="control--select {{class_name}}" {{additional_data}}>
<ul class="custom-scroll control--select--list">
{% set selected_value = selected %}
{% set selected_option = '' %}
{% set selected_bg_color = '' %}
{% for v in items %}
{% if need_escape %}
{% set option = v.option|escape %}
{% else %}
{% set option = v.option %}
{% endif %}
{% set is_selected = false %}
{% set value = v.id %}
{% if v.id is not defined %}
{% set value = option %}
{% endif %}
{% if selected_value and (value == selected) %}
{% set selected_value = value %}
{% set selected_option = option %}
{% set is_selected = true %}
{% if v.bg_color %}
{% set selected_bg_color = v.bg_color %}
{% endif %}
{% elseif not selected_value and loop.first %}
{% set selected_value = value %}
{% set selected_option = option %}
{% set is_selected = true %}
{% if v.bg_color %}
{% set selected_bg_color = v.bg_color %}
{% endif %}
{% endif %}
<li data-value="{{ value }}" {% if v.disabled %}data-disabled="disabled"{% endif %} data-color="" class="control--select--list--item {% if is_selected %}control--select--list--item-selected{% endif %} {% if default is defined and v.id == default %}control--select--list--item-default{% endif %} {% if v.bg_color %}control--select--list--item-colored{% endif %} {{v.class_name}}" {% if v.bg_color %}data-bg-color="{{v.bg_color}}" style="background-color:{{v.bg_color}}"{% endif %} {{v.additional_data}}>
<span class="control--select--list--item-inner" {% if not no_titles %}title="{{option|striptags}}"{% endif %}>{{option}}</span>
</li>
{% endfor %}
</ul>
<button class="control--select--button {{button_class_name}} {% if selected_bg_color %}control--select--button-colored{% endif %}" tabindex="{{tab_index}}" type="button" data-value="{{selected_value}}" {% if disabled %}disabled="Y"{% endif %} {% if selected_before %}data-before="{{selected_before}}"{% endif %} {% if selected_after %}data-after="{{selected_after}}"{% endif %} {% if selected_bg_color %}style="background: {{selected_bg_color}}"{% endif %}>
<span class="control--select--button-inner">{{ selected_option }}</span>
</button>
<input type="hidden" class="control--select--input {{ input_special_class }}" id="{{id}}" name="{{name}}" value="{{selected_value}}" data-prev-value="{{selected_value}}">
</div>
<div class="control-wrapper control--suggest {{class_name}}{% if list_separated %} control-suggest_separated{% endif %}"{% if wrapper_id %} id="{{wrapper_id}}"{% endif %} {{ additional_data }}>
{% if suggest_icon %}
<span class="list-top-search__icon icon icon-{{suggest_icon}}"></span>
{% endif %}
<ul class="control--suggest--list js-control--suggest--list custom-scroll">
{% for v in items %}
<li data-value-id="{% if v.id %}{{v.id}}{% else %}{{v.value}}{% endif %}" class="control--suggest--list--item {% if (selected and (v.id == selected)) or (selected and (v.value == selected)) %}{% set value_id = v.id %}control--suggest--list--item-selected{% elseif not selected and (loop.index0 == 0) %}{% set value_id = v.id %}control--suggest--list--item-selected{% endif %} {{v.custom_class}}">
<span class="control--suggest--list--item-inner" title="{{v.value}}">{{v.value}}</span>
</li>
{% endfor %}
</ul>
{% if not selected and value|length %}
{% set selected = value %}
{% endif %}
<input autocomplete="off" name="{{name}}" class="{% if not styled_input %}text-input{% endif %} control--suggest--input {% if ajax is defined %}js-control--suggest--input-ajax{% else %}js-control--suggest--input control--suggest--input-inline{% endif %} {{input_class_name}}" id="{{id}}" type="{{ input_type ? input_type : 'text' }}" placeholder="{{placeholder}}" value="{{selected}}" data-value-id="{{ value_id }}" data-type="{{type}}" {% if ajax is defined %}data-url="{{ajax.url}}" data-params="{{ajax.params}}"{% endif %} {% if disabled %}disabled="disabled"{% endif %} {{additional_data}} />
{% if ajax is not defined and items|length %}
<b class="control--suggest--down-btn"></b>
{% endif %}
{% if closable %}
<span id="search_clear_button" class="date_field--clear"><span class="icon icon-inline icon-search-cancel"></span><span class="icon icon-inline js-search-hide icon-close"></span></span>
{% endif %}
</div>
<textarea id="{{id}}" class="text-input text-input-textarea {{class_name}}" tabindex="{{tab_index}}" name="{{name}}" placeholder="{{placeholder}}" {% if style %}style="{% for prop, value in style %}{{prop}}:{{value}};{% endfor %}"{% endif %} {% if disabled %}disabled="disabled"{% endif %} {% if readonly %}readonly="readonly"{% endif %} {{additional_data}}>{% if value|length %}{{ value }}{% endif %}</textarea>
<ul class="button-input__context-menu {{ context_menu_class_name }}">
{% for item in context_menu %}
<li class="button-input__context-menu__item element__{{ item.icon }} {{ item.class_name }}" id="{{ item.id }}" {{ item.additional_data }}>
{% if item.href %}
<a href="{{ item.href }}" class="{% if not item._blank %}js-navigate-link{% endif %} button-input__context-menu__item__link button-input__context-menu__item__inner" {% if item._blank %}target="_blank"{% endif %}>
{% include 'interface/controls/button/context_menu_inner.twig' with {item: item} %}
</a>
{% else %}
<div class="button-input__context-menu__item__inner">
{% include 'interface/controls/button/context_menu_inner.twig' with {item: item} %}
</div>
{% endif %}
</li>
{% endfor %}
</ul>
{% if item.icon %}
<span class="button-input__context-menu__item__icon icon icon-inline icon-{{ item.icon }} {{ item.icon_class }}"></span>
{% endif %}
{% set svg_icon = item.svg_icon_absolute %}
{% if item.svg_icon %}
{% set svg_icon = 'common--' ~ item.svg_icon %}
{% endif %}
{% if svg_icon %}
<svg class="button-input__context-menu__item__icon svg-icon svg-{{ svg_icon }}-dims {{ item.icon_class }}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#{{ svg_icon }}"></use></svg>
{% endif %}
<span class="button-input__context-menu__item__text {{ item.span_class }}">
{% if item.localization %}
{{ lang[item.localization] }}
{% elseif item.control %}
<span class="button-input__context-menu__item__text_inner">{{ item.text }}</span>
{% include "interface/controls/" ~ item.control.type ~".twig" with item.control %}
{% else %}
{{ item.text }}
{% endif %}
</span>
{% set svg_left_icon = item.svg_icon_left_absolute %}
{% if item.svg_icon_left %}
{% set svg_left_icon = 'common--' ~ item.svg_icon_left %}
{% endif %}
{% if svg_left_icon %}
<svg class="button-input__context-menu__item__icon svg-icon svg-{{ svg_left_icon }}-dims {{ item.icon_left_class }}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#{{ svg_left_icon }}"></use></svg>
{% endif %}
<div class = "privacy_policy">
<label for = "privacy_policy_check" class = "privacy_policy_title">Confirm your consent to transfer your account data to a third-party server</label>
<input type= "checkbox" name= "privacy_policy_check" />
<div class = "privacy_policy_error hidden" >Consent required</div>
</div>
