---
title: "Custom Settings"
source: "https://www.kommo.com/developers/content/integrations/custom_settings"
date: "2026-01-01"
---

Custom Settings
Custom widget settings
Kommo widgets support adding custom program logic to the widget’s settings page – a field of arbitrary structure and appearance.
The field of an arbitrary structure consists of a hidden input (a field through which to read and save), a div element, into which you can display DOM elements for interaction with the user and some javascript code that provides the necessary logic.
To use fields of an arbitrary structure, you need to take two simple steps:
-
Add a field to manifest.json and allow the widget to be executed on the settings page
-
Implement read and write data
Description of the arbitrary structure field in manifest.json
This is the most common field with a special type of custom, perhaps no more than one such field in one widget. Do not forget to add the “settings” location to the locations array in mainfest.json!
"settings":{
"apikey":{...},
… ,
"myfield":{
"name": "settings.apikey",
"type": "custom",
"required": false
}
}
}
Collect the widget and upload it to your account. You will be available a div with ID _custom_content and hidden input with ID _custom.
To make changes to your field reflected in the form and its buttons, you need to create a change event on the hidden system input. Here is an example of how you can do this:
$('input[name="name of your field"]').trigger('change');
Widget page in the “Settings” section
Kommo widgets can create their own page in the “Settings” section
To do this, you need to specify the area advanced_settings in the list of connection areas of the widget. On this page the widget will have callback advancedSettings.
This page is completely controlled by the widget. DOM-pages and its structure widgets should form themselves.
Also, the widget needs to be set in a new block advanced in manifest.json, which will store the key title – the name of this page.
Example of manifest.json file
{
"widget":{
"name": "widget.name",
"description": "widget.description",
"short_description": "widget.short_description",
"code": "example_widget",
"secret_key": "e2888047a01bc97aa250118c2fa518dba57a4034ccf16dca784dca292d89324f",
"version": "1.9",
"interface_version": 2,
"init_once": false,
"locale":[
"ru"
],
"installation": true
},
"locations":[
"everywhere",
"settings",
"advanced_settings"
],
"settings":{
"login":{
"name": "settings.login",
"type": "text",
"required": false
}
},
"advanced":{
"title": "advanced.title"
}
}
