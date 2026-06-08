---
title: "script.js"
source: "https://developers.kommo.com/docs/script-js"
date: "2025-11-24"
---

The widget is represented as an object, containing properties and methods that are useful to work with. When the system loads widgets, it adds the functionality described in script.js to the existing system Widget object. This means that the CustomWidget object inherits properties and methods that will be helpful for further work.
The JavaScript (JS) portion of the widget contains required components and additional functions. It also includes callback functions that are triggered under specific conditions. Let's examine the initial framework of this file.
define(['jquery'], function($){
var CustomWidget = function () {
var self = this, // to access an object from methods
system = self.system(), // this method returns an object with system variables.
langs = self.langs; // localization object with data from the localization file (i18n folder)
this.callbacks = {
settings: function(){
},
init: function(){
return true;
},
bind_actions: function(){
return true;
},
render: function(){
return true;
},
dpSettings: function(){
},
advancedSettings: function() {
},
destroy: function(){
},
contacts: { selected: function() {
}
},
onSalesbotDesignerSave: function (handler_code, params) {},
leads: { selected: function() {
}
},
todo: { selected: function () {}
},
onSave: function () {},
onAddAsSource: function (pipeline_id) {},
onInstall: function () {}
};
return this;
};
return CustomWidget;
});
All three callbacks must be present in the
this.callbacks
object. The widget won't function in the specified locations (visibility areas) without them.
render: function(){
return true;
}
When installing the widget, the callbacks.render
method is called first. This method usually outlines the steps required to display the widget. By default, the widget will only appear in the settings menu. To show the widget in other areas, such as the widget panel on the right, you need to use specific methods within this function, such as the object methods render()
and/or render_template()
, which are further parsed.
It is crucial that the callbacks.render
function returns true. This is because without this, the callbacks.init
and callbacks.bind_actions
methods will not start.
init: function(){
return true;
}
The init
method runs immediately after callbacks.render
and along with callbacks.bind_actions
. Typically, the init
method is used to gather necessary information and perform other actions, such as communicating with a third-party server and API authorization if the widget is used to send or request information. In the simplest case, it can determine the user's current location.
Use init
or bind_actions
if your widget reacts to events or has to re-initialize.
The callbacks.init
method must return true for further work.
bind_actions: function(){
return true;
}
Callbacks.bind_actions
is used to attach events to the user's actions, such as when they click on a button. Thecallbacks.bind_actions\
method must return true.
settings: function(){
}
The callbacks.settings
method is triggered when the user clicks on the widget's icon in the settings area. It allows you to add a modal window to your page.
dpSettings: function(){
}
Similarly, the callbacks.dpSettings
method does the same but within the scope of the digital_pipeline
.
advancedSettings: function() {
}
To enable callbacks.advancedSettings
method, you need to specify the widget connection area advanced_settings
. This method is called when the user navigates to the widget's advanced settings page.
onSave: function () {}
The callbacks.onSave
method is called when the user clicks on the Set/Save button in the widget's settings. This method must return either true
or a Promise object if you need to make a request to your server while saving.
It is useful for submitting form data and changing widget status. Please note that this method also fires when the widget is disabled. The onSave
method is triggered first, followed by the destroy method.
leads: { selected: function() {
}
}
This function is triggered when you select items from the leads list by using the checkbox and then clicking on the widget name in the additional menu that appears while choosing items from a list. It is used when you need to take any action with the selected objects.
contacts: { selected: function() {
}
}
This function is triggered when you select items from the contacts list by using the checkbox and then clicking on the widget name in the additional menu that appears while choosing items from a list. It is used when you need to take any action with the selected objects.
todo: { selected: function () {}
}
This function is triggered when you select items from the tasks list by using the checkbox and then clicking on the widget name in the additional menu that appears while choosing items from a list. It is used when you need to take any action with the selected objects.
destroy: function(){
}
This function is also triggered when you disable the widget through its settings menu. For instance, if the widget is disabled, you need to remove all its elements from the DOM or take any other necessary action. Additionally, this function is also called when you switch between widget display areas.
The function defines the logic of the source and is triggered when a source such as an SMS is used.
onSalesbotDesignerSave: function (handler_code, params) {}
The function defines the logic of the widget action and is called when the widget is added to the Salesbot constructor during saving.
onAddAsSource: function (pipeline_id) {}
}
The function is called when adding a widget as a source in the digital pipeline settings.
onInstall: function() {
}
An optional callback that is called once when the widget is installed. It is used to perform initialization logic, such as creating initial data or checking the environment. An error in onInstall
does not interrupt the installation process.
Do not forget that when working through
this
inside callbacks, you won't be able to access the methods of theWidget
object. Therefore, we create a variableself
, but you can use any other convenient method for you.
In this example, we will show how you can utilize the callback object with additional functions, along with some widget object functions. All these functions are explained in detail in the examples below. We suggest that you go through the code and consult the widget object function descriptions for more information.
The widget we have here will enable you to select marked contacts from your contact list and send their phone numbers and email addresses to a third-party server.
The functions employed in this example are described in detail below. To start with, you should focus on the callbacks object.
define(['jquery'], function ($) {
var CustomWidget = function () {
var self = this,
system = self.system;
this.get_ccard_info = function () // Collecting information from a contact card
{
if (self.system().area == 'ccard') { // In the contact card area
var phones = $('.card-cf-table-main-entity .phone_wrapper input[type=text]:visible'), // Identify the phone numbers
emails = $('.card-cf-table-main-entity .email_wrapper input[type=text]:visible'), // Identify the email addresses
name = $('.card-top-name input').val(),
data = [],
c_phones = [], c_emails = [];
data.name = name;
for (var i = 0; i < phones.length; i++) { if ($(phones[i]).val().length > 0) {
c_phones[i] = $(phones[i]).val();
}
}
data['phones'] = c_phones;
for (var i = 0; i < emails.length; i++) { if ($(emails[i]).val().length > 0) {
c_emails[i] = $(emails[i]).val();
}
}
data['emails'] = c_emails;
console.log(data)
return data;
}
else {
return false;
}
};
this.sendInfo = function (person_name, settings) // Sending the collected information
{
self.crm_post(
'http://example.com/index.php',
{
// Sending POST data
name: person_name['name'],
phones: person_name['phones'],
emails: person_name['emails']
},
function (msg) {
},
'json'
);
};
this.callbacks = {
settings: function () {
},
dpSettings: function () {
},
init: function () {
if (self.system().area == 'ccard') {
self.contacts = self.get_ccard_info();
}
return true;
},
bind_actions: function () {
if (self.system().area == 'ccard' || 'clist') {
$('.km-form-button').on('click', function () {
self.sendInfo(self.contacts);
});
}
return true;
},
render: function () {
var lang = self.i18n('userLang');
w_code = self.get_settings().widget_code;
if (typeof(APP.data.current_card) != 'undefined') {
if (APP.data.current_card.id == 0) {
return false;
} // do not render contacts/add || leads/add
}
self.render_template({
caption: {
class_name: 'js-km-caption',
html: ''
},
body: '',
render: '\<div class="km-form">\
<div id="js-km-sub-lists-container">\ </div>\
<div id="js-km-sub-subs-container">\ </div>\
<div class="km-form-button km_sub">SEND</div>\
</div>\
<div class="km-already-subs"></div>\
<link type="text/css" rel="stylesheet" href="/widgets/' + w_code + '/style.css" >'
});
return true;
},
contacts: {
selected: function () { // Here is the behavior for multi-select contacts and click on the name of the widget
var c_data = self.list_selected().selected;
$('#js-sub-lists-container').children().remove(); // The container is cleaned then the elements are collected in the container, selected in list.container - div block of widget, displayed in the right column.
var names = [], // Array of names
length = c_data.length; // Number of selected id (counting starts from 0)
for (var i = 0; i < length; i++) {
names[i] = {
emails: c_data[i].emails,
phones: c_data[i].phones
};
}
console.log(names);
for (var i = 0; i < length; i++) {
$('#js-km-sub-lists-container').append('<p>Email:' + names[i].emails + ' Phone:' + names[i].phones + '</p>');
}
$(self.contacts).remove(); // clear the variable
self.contacts = names;
}
},
leads: {
selected: function () {
//This describes the behavior when multi-selecting contacts and clicking on the widget name
var c_data = self.list_selected().selected;
$('#js-sub-lists-container').children().remove(); //The container is cleaned, then the items selected in the list are collected into the container. The container is the widget's div block, displayed in the right column.
var names = [], // Array of names
length = c_data.length; //Number of selected IDs (counting starts from 0)
for (var i = 0; i < length; i++) {
names[i] = {
emails: c_data[i].emails,
phones: c_data[i].phones
};
}
console.log(names);
for (var i = 0; i < length; i++) {
$('#js-km-sub-lists-container').append('<p>Email:' + names[i].emails + ' Phone:' + names[i].phones + '</p>');
}
$(self.contacts).remove();
self.contacts = names;
}
},
onSave: function () {
return true;
}
};
return this;
};
return CustomWidget;
});
The widget object provides several useful methods and functions that can be utilized to complete various tasks.
This specific method is designed to work with the twig.js template engine, which you can learn more about.
The render()
method serves as a wrapper for twig.js and accepts two parameters: the template information (data
) and the data required to render the template (params
). When these parameters are passed into the method, it returns the rendered template result by executing the code result = twig(data).render(params)
.
To illustrate how this works, let's examine a simple example of a template.
var params = [
{name:'name1',
id: 'id1'},
{name:'name2',
id: 'id2'},
{name:'name3',
id: 'id3'}
]; // array of data sent for the template
var template = '<div><ul>' +
'{% for person in names %}' +
'<li>Name : {{ person.name }}, id: {{ person.id }}</li>' +
'{% endfor %}' + '</ul></div>';
console.log(self.render({data: template},{names: params}));
As a result, we get the markup:
Name: name1, id: id1
Name: name2, id: id2
Name: name3, id: id3
You can pass one of the templates of our system to the function, for this you need to specify a link to the template in the passed data object: ref: ‘/tmpl/controls/#TEMPLATE_NAME#.twig
’, where #TEMPLATE_NAME#
is one of the system templates.
For example, to create a drop-down list, we use the template select.twig
:
m_data = [
{option:'option1',
id: 'id1'},
{option:'option2',
id: 'id2'},
{option:'option3',
id: 'id3'}
]; // array of data sent for the template
var data = self.render(
{ref: '/tmpl/controls/select.twig'},// the data object in this case contains only a reference to the template
{
items: m_data, // Data
class_name:'subs_w', // class specification
id: w_code +'_list' // id specification
});
In order to view the data markup, it's necessary to add data to the DOM. The drop-down list's markup is designed in the style of our system.
When using the render()
method, you can provide references to not only existing system templates but also your own templates. To do this, you'll need to create a templates folder within our widget folder and place the template.twig template in it.
Here's an example of how to render a template:
var params = {}; // empty data
var callback = function (template){ // callback function, called if the template is loaded, it is passed an object template.
var markup = template.render(params); //
/*
* then the code to add markup to the DOM
*/
};
var s = self.render({
href:'templates/template.twig', // way to template
base_path: self.params.cdn_path; // The base way to the directory with the widget
load: callback // callback function will only occur if the template exists and is loaded
}, params); // parameters for the template
In order to call a callback function when a template exists at a specific link address, you can pass the function as a parameter alongside the template name to a getTemplate
function. The template object containing the render method, which has the necessary parameters for rendering, will then be passed to the callback function. If the template exists in the folder, the callback function will be called.
To simplify the process, we will create a function, called getTemplate
, pass parameters to it: parameter template
is the name of the template that exists in the template folder in the widget folder, parameter params
is the parameters object for the template, and parameter callbacks is the callback function that will be called after loading the template, in this case we will add the template to the modal window.
this.getTemplate = function (template, params, callback) {
params = (typeof params == 'object') ? params : {};
template = template || '';
return this.render({
href: '/templates/' + template + '.twig',
base_path: this.params.cdn_path, // the widget will return to the object /widgets/#WIDGET_NAME#
load: callback // call a callback function
}, params); // parameters for the template
}
settings: function () {
self.getTemplate( // call the function
'login_block', // specify the name of the template that we have in the folder with the widget in the folder templates
{}, /* empty data for the template, because we will first request the template, if it exists, then the function callback function will already call a function to add data to the template, see below */
function (template) {
template.render({ // parameters for the template.
title: self.i18n('settings').title,
widget_code: self.get_settings().widget_code
})
}
);
}
This function takes an HTML markup or a template with data for rendering and wraps it in a standard widget wrapper before placing it on the right-side panel of widgets. It works just like the render()
method and supplements the passed markup with the markup stored in the template_element
variable of the widget object.
/*
* html_data stores the markup that needs to be placed on the right-side panel of widgets.
*/
var html_data ='<div id="w_logo" class="nw_form">' + '<div id="js-sub-subs-container">' + '</div>' + '<div class="nw-form-button">BUTTON</div></div>' + '<div class="already-subs"></div>';
self.render_template(
{
caption:{
class_name:'new_widget', // class name for the markup wrapper
},
body: html_data,// markup
render : '' // template is not sent
}
)
In the previous example, we demonstrated how to render a basic HTML page without using templates. However, the render_template()
method provides a more efficient way to generate HTML content by allowing us to pass a template and data as parameters. Alternatively, we can also pass a reference to the template, similar to the render()
method.
/*
* Here, the template and data for the template are passed as parameters.
*/
var render_data ='<div class="nw_form">' +
'<div id="w_logo">' +
'<img src="/widgets/{{w_code}}/images/logo.png" id="firstwidget_image"></img>' +
'</div>' +
'<div id="js-sub-lists-container">' + '</div>' +
'<div id="js-sub-subs-container">' + '</div>' +
'<div class="nw-form-button">{{b_name}}</div>
'</div>' +
'<div class="already-subs"></div>';
self.render_template(
{
caption:{
class_name:'new_widget'
},
body:'',
render : render_data
},
{
name:"widget_name",
w_code:self.get_settings().widget_code,
b_name:"BUTTON" // in this case it's better to pass a reference to lang via self.i18n ()
}
);
We see a widget created by a template in the widgets panel on the right-side panel.
This method is designed to send a request to your remote server via the Kommo proxy server.
Its use is essential because when working with Kommo, the user operates using a secure SSL protocol, and the browser can prevent cross-domain requests.
The best approach is to have a signed SSL certificate on the internal system side and work over HTTPS. The function is similar to jQuery.post() , with the added capability of catching an error.
self.crm_post (
'http://www.test.com/file.php',
{
name: 'myname',
login:'mylogin',
password: 'mypassword'
} // We pass the POST data using the Javascript object model
,
function(msg)
{
alert('It\'s all OK');
},
'text',
function(){
alert ('Error');
}
)
If you want to obtain system data (like user_id
, area
etc), you will also need to use this method, which will return the data in a JavaScript object.
This function allows you to add properties to the widget.
self.set_settings({parameter:"text"}); //Setting is created with the name parameter and value text
self.get_settings();// In response you will get an array with an already created property
This method is necessary to retrieve user input from the widget and return it as a JavaScript object.
Example of the response
{
login: "NEWTEST",
password: "test",
maybe: "Y"
}
There is another method that allows you to extract a specific object from language files. This object will contain messages in the language locales that the user is using. To use this method, you need to pass the name of the object you want to extract as a parameter.
Call the method self.i18n('userLang')
and get a response:
{
firstWidgetText: "Click the button to send the data to a third-party server:",
textIntoTheButton: "Send data",
responseMessage: "Server Response :",
responseError: "Error"
}
This function allows you to change the default settings for files from the i18n folder. The current lang object is stored in the langs variable of the widget object.
langs = self.langs; // Calling the current object
langs.settings.apiurl = 'apiurl_new'; // change the name of the field
self.set_lang(langs); // Change the current object to an object with a changed field
console.log(self.langs); // Output to the console to verify that the name has changed
This function retrieves a list of checked contacts or leads from the respective table and returns it as an array of objects. The objects contain two properties: count_selected and selected. One of the selected objects contains an array of checkboxed objects with emails, IDs, phones, and type properties.
console.log(self.list_selected().selected); // Returns two objects, choose the object selected
// Result:
/*0: Object
emails: Array[1]
id: #id#
phones: Array[1]
type: "contact" */
Another function that comes with this widget is used to toggle the overlay that appears when the widget is called from the contacts or leads list.
To do this, you need to pass a value of true or false as an argument to the function. When set to true, the overlay will be enabled, while setting it to false will disable it.
self.widgetsOverlay(true);
When the user is working on the contacts and companies list, they can call a function by clicking on a contact's phone number or email address.
This function has two parameters: type
and action
. type
can be either "email"
or "phone"
, and action
is the function that is called when the user clicks on the phone number or email address.
self.add_action("phone",function(){
/*
* code of interaction with the VoIP widget
*/
});
You can add a new source to the bottom of the lead card, contact, or company feed. This function has two parameters: source_type
and handler
. The source_type
is always "sms"
, and the handler
is the function that is called when the end button is clicked. Currently, only one source type ("sms"
) can be specified, and the handler
function must always return a Promise object.
self.add_source("sms", function(params) {
/*
params - this is the object in which there will be the necessary parameters for sending SMS
{
"phone": 75555555555, // recipient's phone number
"message": "sms text", // message to send
"contact_id": 12345 // contact ID to which the phone number is attached
}
*/
return new Promise(function (resolve, reject) {
// Here will describe the logic for sending SMS
$.ajax({
url: '/widgets/' + self.system().subdomain + '/loader/' + self.get_settings().widget_code +'/send_sms',
method: 'POST',
data: params,
success: function () {
// if successful, a note like 'sms' will be created
resolve();
},
error: function () {
reject();
}
});
});
});
This function allows you to find out which pipeline the widget is connected to as a source. Available if there is a lead_sources
area in manifest.json.
self.get_pipeline_id()
.then(function (pipeline_id) {
// From here you can initiate a request using the pipeline ID
})
.catch(function () {
// handling of the case when the widget is not attached to the pipeline
});
A widget can have one of three statuses which are displayed in the settings area and on the widget icon.
The available statuses are install when the widget is not active, installed when the widget is active, and error when the widget is in an error state.
If a widget relies on user-entered data for an API of a third-party service, and this data is entered incorrectly, you can use the error status to display the issue.
self.set_status('error');
This method will return the widget version number; it can be used to reset the static cache after an update. The data is returned as a string (e.g., 0.0.1
).
This method will return the installation status of the widget. The data is returned as a string.
The available statuses are install when the widget is not active, installed when the widget is active, and not_configured (the widget tour has been completed, but the settings are not filled in).
Returns account data without a request to the API (the result does not completely match the API response, if the necessary data is not available, then you still have to make a request).
This method doesn't require network requests and provides useful contact data in the card area.
Lead and company cards provide data about related contacts, and the contact card itself provides data for this contact.
Data returned by the method:
[
{
id: number,
name: string,
first_name: string,
last_name: string,
phones: [],
emails: []
}
];
The method itself returns a Promise.
