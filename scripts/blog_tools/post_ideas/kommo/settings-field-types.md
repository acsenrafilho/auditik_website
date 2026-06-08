---
title: "Settings field types"
source: "https://developers.kommo.com/docs/field-types"
date: "2026-01-27"
---

Let's take a closer look at the possible field types that can be specified in the "settings"
section of the manifest.json file.
For each type you will find examples of using it in manifest.json, and if necessary, an example of the localization file from the i18n.
{
"widget": {
"name": "widget.name",
"description": "widget.description",
"short_description": "widget.short_description",
"version": "1.0.1",
"interface_version": 2,
"init_once": true,
"locale": [
"en",
"es"
],
"installation": true,
"support": {
"link": "https://www.kommo.com",
"email": "[email protected]"
}
},
"locations": [
"ccard-1",
"lcard-1"
],
"tour": {
"is_tour": true,
"tour_images": {
"en": [
"/images/tour_1_en.png",
"/images/tour_2_en.png",
"/images/tour_3_en.png"
],
"es": [
"/images/tour_1_es.png",
"/images/tour_2_es.png",
"/images/tour_3_es.png"
]
},
"tour_description": "widget.tour_description"
},
"settings": {
"login": {
"name": "settings.login", // indicates the localization file in the i18n folder
"type": "text", // type: text field
"required": false
},
"password": {
"name": "settings.password", // indicates the localization file in the i18n
"type": "pass", //type: password
"required": false
}
}
}
{
"widget":{
"name":"Test widget",
"short_description":"Short one",
"description":"ENGLISH: #SUBDOMAIN# #HOST# #LOGIN# #API_HASH# #USER_ID# #ACCOUNT_ID# This widget is an example on working with Kommo"
},
"settings":{
"login":"User login",
"password":"User password"
}
}
This type of field is used to display a list of system users alongside text fields. It is useful when you need to input specific information for each employee, such as an internal phone number or extension for VoIP service.
{
"widget":{
},
"locations":[
],
"settings":{
"login":{
},
"password":{
},
"phones":{
"name": "settings.user_phones",
"type": "users",
"required": true
}
}
}
{
"widget":{
},
"settings":{
"login":"User login",
"password":"User password",
"user_phones":"Phones list"
}
}
An extended version of the users field, this type of field contains two fields for each user. It is used when each employee needs to provide pairs of values, such as login and password.
{
"widget":{
},
"locations":[
],
"settings":{
"auth_data":{
"name":"settings.auth_data",
"type":"users_lp",
"required": false
}
}
}
{
"widget":{
},
"settings":{
"auth_data":"Auth list"
}
}
Kommo widgets allow for custom program logic to be added to the widget's settings page by incorporating a field with arbitrary structure and appearance.
The field with arbitrary structure comprises a hidden input, a div element for displaying DOM elements for user interaction, and some JavaScript code for providing necessary logic.
To use fields with an arbitrary structure, you need to take two simple steps:
- Add a field to manifest.json and allow the widget to be executed on the settings page.
- Implement reading and writing data.
Do not forget to add the area
settings
to thelocations
array!
{
"widget":{
},
"locations":[
"ccard-1",
"clist-1",
"settings"
],
"settings":{
"myfield": {
"name": "settings.myfield",
"type": "custom",
"required": true
}
}
}
A field with the type custom can contain a JSON string or a number. The string data type will not be stored on the server.
To get started, you will need to build the widget and then upload it to your account. Once you have done that, a div with the ID <widget code>_custom_content
and a hidden input with the ID <widget code>_custom
will become available to you.
If you want to make changes to the fields in the form and its buttons, you will first need to create a change event on the hidden system input. Here is an example of how you can do that:
$('input[name="name of your field"]').trigger('change');
