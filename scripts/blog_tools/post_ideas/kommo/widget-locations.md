---
title: "Widget locations"
source: "https://developers.kommo.com/docs/widget-locations"
date: "2025-11-25"
---

The process of connecting widgets involves enabling the widget's JavaScript scripts on specific pages (interfaces) of Kommo. By default, widgets are not connected on all interfaces but only on the requested areas.
To enable a widget's functionality, our system needs to be informed about the areas where the widget will operate, and where they will use the widget's panel on the right-hand side of the screen.
To achieve this, you need to list the required areas in the locations
block of the manifest.json file and indicate the use of the widget panel by setting 1 or 0 as a parameter. Setting the indicator to 1 will display the widget on the right-side panel of a card. On the other hand, setting it to 0 will initialize the widget in the card but will not display it on the right-side panel.
The
everywhere
area does not accept 1/0 parameter, and it is always set to 0 for this area.
For example, this widget will be initialized on the settings page, in the digital pipeline settings, in the lead sources, in the advanced settings page, and in cards and lists of contacts and leads, but the right-side panel will be used only in the specified cards:
"locations":[
"lcard-1",
"llist-0",
"ccard-1",
"clist-0",
"comcard-0",
"card_sdk",
"settings",
"digital_pipeline",
"lead_sources",
"catalogs",
"advanced_settings",
"ai_agent"
]
When you connect a widget to any interface, the JS script will be loaded, and the render()
callback function will be triggered, followed by init()
and bind_actions()
.
You can control the ability to call the init()
and bind_actions()
functions each time the user moves from one area to another by specifying true or false in the init_once
block of the manifest.json file. For example, VoIP widgets must constantly maintain a WebSocket connection and should not be interrupted, so init_once
should be set to true. If there is no common context for all pages, it's better to set it to false.
When you are dealing with the list areas, note that the widget will not be automatically added to the interface. First, the list will appear, and once you select at least one row from the list using the checkboxes, the context menu will appear. Then, choose the widget action from the More button. The widgets panel on the extreme right of the list interface with your widget will be added to the page by the selected event, which will trigger the corresponding callback function in script.js
To make sure that the widget works in the digital pipeline, you need to specify the digital_pipeline
in the locations. The Python part of the widget with the digital_pipeline
endpoint is also needed, and the logo_dp.png logo with a resolution of 174×109 is required in the widget.
If your widget has a lead_sources
scope, then you can check which pipeline of the account it is bound to using the HTTP request.
GET https://subdomain.kommo.com/api/v4/widgets/{widget_code}
The response of such a request shows the pipeline_id
, or in the script.js of your widget.
To work with the lists SDK, you need to specify a special scope "catalogs"
, the ID of the list with which the widget will work, and also implement a special callback loadCatalogElement
.
Kommo widgets can create their page in the Settings section, and to do this, you need to specify the advanced_settings scope in the "location"
list and also add the “advanced” block to the manifest.json, and implement a special callback advancedSettings
.
The widget will have complete control over this page, and it should form the DOM pages and their structure. The "advanced"
block in manifest.json should contain the title of the settings page.
Introduction
If your widget is designed to work with Kommo AI agent, you can now display it in the AI agent settings block. This will require making small changes to manifest.json
, as well as adding the appropriate description to the localizations.
Update manifest.json
In order to connect the widget to the AI agent interface, you need to specify a new location ai_agent
in manifest.json
:
"locations": [ "ai_agent" ]
Specifying the ai_agent
location allows you to display the widget inside the AI agent settings block. There you can have a look at the integration functionality and activate it if necessary.
You can specify
ai_agent
simultaneously with other values in location if the widget supports multiple connection zones.
Updating language files
To correctly display the widget description, you need to add the widget.ai_agent_description
key to each localization file located in the i18n
folder. Example for English (i18n/en.json
) for the rest by analogy:
"widget": {
"name": "My AI Integration",
"description": "Full description for general widget info",
"ai_agent_description": "Short tile description for AI Agent settings"
}
The description of the widget.ai_agent_description
key will be displayed directly on the widget tab in the AI agent section and should be short and concise. The content that does not fit in the tile will be truncated with an ellipsis. The recommended length of widget.ai_agent_description
is 100 characters.
Important: If you use
ai_agent
location, you must add thewidget.ai_agent_description
key to alli18n
files. The key value cannot be empty.
Example
{ ...
"locations": [
"ai_agent",
"settings"
], ...
}
{
"widget": {
"name": "My AI widget",
"ai_agent_description": "Integration with an external AI service"
}
}
Now you can easily adapt your integrations to the AI agent interface in Kommo. This will allow users to quickly find and connect the necessary solutions directly in the context of automation and AI logic.
Next, we will discuss what can be done in the JS part of the widget.
