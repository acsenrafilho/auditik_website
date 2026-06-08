---
title: "Kommo Salesbot in Digital Pipeline Documentation"
source: "https://developers.kommo.com/docs/salesbot-dp"
date: "2026-05-04"
---

To get started, you need to connect the integration with chats in the left column of the Digital Pipeline. You will find instructions for each messenger in the settings window. After connecting the chat integration, you can activate the Salesbot to handle incoming new chats, as well as configure bots for specific stages.
You can connect the Salesbot in two ways:
- Go to the Leads section ➡️ Automate ➡️ select a stage ➡️ Add Trigger ➡️ choose Salesbot.
Next, select Create a new bot. When the modal window opens, you can choose a standard template or create a new bot.
- Go to the Settings section ➡️ Communication tools tab ➡️ Salesbots ➡️ Create a new bot or import.
When opening the modal window with Salesbot steps, you can click View Source to view the bot's code.
Leads that entered the stage before the action appeared in the Digital Pipeline will be ignored unless you tick Apply the trigger to all leads already in this stage.
Salesbot uses a structured JSON object with specific keys. The example below will ask the question, "Please provide your phone number and email,"
and set the "salesbot"
tag. After the user responds, it will validate the data and reply with one of the specified messages. For more details about presets, please refer to the next section.
[
{
"question": [
{
"handler": "show",
"params": {
"type": "text",
"value": "Please provide your phone number and email"
}
},
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "salesbot"
}
}
}
],
"answer": [
{
"handler": "preset",
"params": {
"name": "contacts.validate_base_info",
"params": {
"empty_email": "Please provide your e-mail",
"empty_phone": "Please provide your phone number",
"invalid_phone": "It appears that the phone number may be incorrect",
"success": "Thank you",
"empty_all": "Please provide your phone number and email"
}
}
}
]
}
]
The object must contain the keys "question"
, "answer"
, or "finish"
.
- The data in the
"question"
object handle the actions that will occur when a message is sent to the user. - The data in the
"answer"
object manage the actions that will take place when the user responds. - The data in the
"finish"
object define the actions that will occur when the bot is completed.
There can be multiple keys. However, there is a limitation on the size of the JSON, which cannot exceed 64KB.
In the "question"
, "answer"
, and "finish"
objects, there should be handlers.
Before adding the JSON object to the bot, make sure to validate it.
If a message from the bot cannot be delivered to the client, for example, when the client has blocked messages from that chat, the bot can handle the error and execute specific handlers.
Example:
{
"0":{
"question":[
...
],
"answer":[
...
]
},
"error":[
{
"handler":"action",
"params":{
"name":"change_status",
"params":{
"value":142
}
}
}
]
}
This handler accepts incoming leads if it is configured in Salesbot.
The "show"
handler sends a message or buttons to the client's chat. Any text sent currently supports the following placeholders:
For contact placeholders, either the primary contact of the lead or the contact from the chat in which communication with the client is taking place is used.
Parameters of the handler for sending text.
{
"handler": "show",
"params": {
"type": "text",
"value": "Please provide your phone number and e-mail",
"quick_replies": [
"user_phone_number",
"user_email"
]
}
}
Parameters of the handler for sending buttons.
{
"handler": "show",
"params": {
"type": "buttons",
"value": "Please choose the type of participation:",
"buttons": [
"Personal presence",
"Online"
]
}
}
Parameters of the handler for sending buttons with links to external resources.
{
"handler": "show",
"params": {
"type": "buttons_url",
"value": "Links to external resources",
"buttons": [
{
"text": "Bing",
"url": "https://www.bing.com"
},
{
"text": "Google",
"url": "https://google.com"
}
]
}
}
If you want to send links to social media and enable auto-linking, the links should be in the following format:
The buttons handler is designed to be inserted into the response logic block and allows for processing responses from the sent buttons or exact match responses.
{
"handler": "buttons",
"params": [
{
"value": "Personal presence",
"params": [
{
"handler": "...",
"params": {...}
}
]
},
{
"value": "Online",
"params": [
{
"handler": "...",
"params": {...}
}
]
}
]
}
The "buttons"
handler expects an array of objects to enter into parameters, in which any of the handlers specified on this page can be called.
The goto handler allows you to jump to a specific step in the scenario, for example, if you need to repeatedly perform certain actions.
The step count starts from 0.
{
"handler": "goto",
"params": {
"type": "question",
"step": 3
}
}
It is used to wait for a response from the user to a given question. It allows you to ask the user a question and wait for their answer before proceeding with further actions.
{
"handler": "wait_answer",
"params": {
"type": "question",
"step": 2
}
}
The "find"
handler allows you to locate an entity and use its data. If an element is found, you can use the following placeholders:
{{founded_id}}
– ID of the first found catalog item.{{contact_double.*}}
– if a contact duplicate is found, allowing you to access its fields similarly to the{{contact.*}}
placeholders.
{
"handler": "find",
"params": {
"type": "contact_double",
"params":{
"type": "name",
"actions": [
{
"handler": "show",
"params": {
"type": "buttons",
"value": "Is it your number {{contact_double.cf.3574}}?",
"buttons": [
"Yes",
"No"
]
}
}
]
}
}
}
{
"handler": "find",
"params": {
"type": "catalog_elements",
"params": {
"value": "Salesbot",
"catalog_id": "15123",
"actions": [
{
"handler": "show",
"params": {
"type": "buttons",
"value": "An element was found with ID - {{founded_id}}",
"buttons": [
"Yes",
"No"
]
}
}
]
}
}
}
The "filter"
handler allows you to find an entity and use its data. If an element is found, you can use the placeholders for the custom fields of external_lead
and external_contact
.
{
"handler": "filter",
"params": {
"type": 2,
"value": "{{lead.cf.111}}",
"custom_fields_id": 222,
"actions": [
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 1,
"value": "{{external_contact.cf.333}}",
"custom_fields_id": 444,
"enum": "WORK"
}
}
}
]
}
}
The "action"
handler allows you to perform one of the possible actions:
The "unsorted"
action allows you to accept or reject an Incoming Lead.
{
"handler": "action",
"params": {
"name": "unsorted",
"params": {
"value": "accept"
}
}
},
{
"handler": "action",
"params": {
"name": "unsorted",
"params": {
"value": "decline"
}
}
}
The action "change_status"
allows you to change the stage of the lead.
{
"handler": "action",
"params": {
"name": "change_status",
"params": {
"value": 142
}
}
}
The "set_tag"
action will assign a tag to the lead or contact and supports the {{origin}}
placeholder, which will specify the source of the lead.
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "Salesbot"
}
}
},
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "{{origin}}"
}
}
}
The "unset_tag"
action removes the tag from a trade or contact
{
"handler": "action",
"params": {
"name": "unset_tag",
"params": {
"type": 2,
"value": "Salesbot"
}
}
}
The "set_custom_fields"
action will set custom field values for a lead or contact. You can find the field IDs in the Setup section of a lead/contact or by using the method to get the list of entity fields. You can use placeholders described in the "show"
section as values for the fields.
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "Value of the field",
"custom_fields_id": 123,
"option": "add"
}
}
},
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "{{message_text}}",
"custom_fields_id": 987
}
}
},
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": "lead",
"value": "{{last_validation_result}}",
"custom_field": "{{cf.talk.nps}}"
}
}
}
The "subscribe"
action will subscribe a user/group of users to chat.
{
"handler": "action",
"params": {
"name": "subscribe",
"params": {
"type": "group",
"value": 111
}
}
},
{
"handler": "action",
"params": {
"name": "subscribe",
"params": {
"type": "user",
"value": "{{lead.responsible_user_id}}"
}
}
}
The "unsubscribe"
action will unsubscribe a user/group of users to chat.
{
"handler": "action",
"params": {
"name": "unsubscribe",
"params": {
"type": "user",
"value": "{{lead.responsible_user_id}}"
}
}
}
The "add_lead_contact"
action will create a lead and a contact and link them together. All fields for the lead and contact can be configured. The custom field values support the same placeholders as in the "show"
handler . A "preset"
is also supported, allowing the contact and lead to be created only if a message or phone number is received from the client.
{
"handler": "action",
"params": {
"name": "add_lead_contact",
"params": {
"preset": "contacts.require_email_or_phone",
"lead": {
"name": "Lead name",
"status_id": 142,
"responsible_user_id": 123,
"price": 2000,
"tags": "",
"custom_fields": [
{
"id": 77744111,
"values": [
{
"value": "{{contact.name}}"
}
]
},
{
"id": 77744222,
"values": [
{
"value": "{{lead.cf.77744222}}"
}
]
}
]
},
"contact": {
"name": "Contact name",
"responsible_user_id": 123,
"tags": "",
"custom_fields": [
{
"id": 77744444,
"values": [
{
"value": "{{message_text.email}}",
"enum": "WORK"
}
]
},
{
"id": 77744555,
"values": [
{
"value": "{{message_text.phone}}",
"enum": "WORK"
}
]
}
]
}
}
}
}
The "set_budget"
action will set the sale for the lead.
{
"handler": "action",
"params": {
"name": "set_budget",
"params": {
"value": "{{lead.cf.555123}}*{{lead.cf.555321}}"
}
}
}
"add_linked_company"
action adds a company linked to a lead and a contact.
{
"handler": "action",
"params": {
"name": "add_linked_company",
"params": {
"name": "{{message_text}}"
}
}
}
add_note
action adds a note.
{
"handler": "action",
"params": {
"name": "add_note",
"params": {
"element_type": 1,
"note_type": 4,
"text": "Note text"
}
}
}
The "link"
action links elements.
{
"handler": "action",
"params": {
"name": "link",
"params": {
"from": 2,
"to": 11,
"to_id": "{{founded_id}}",
"to_catalog_id": 123
}
}
}
The action change_responsible_user
changes the responsible user for a lead or the associated contact.
{
"handler": "action",
"params": {
"name": "change_responsible_user",
"params": {
"value": 123,
"type": 2
}
}
}
The "link_to_unsorted"
action links a chat from incoming leads to the specified contact in a lead. If the specified contact does not exist in the lead, the linking will not occur. If contact_id
is not provided, a contact will be created in the specified lead.
{
"handler": "action",
"params": {
"name": "link_to_unsorted",
"params": {
"entity_type": 2,
"entity_id": "12345"
}
}
}
The "meta"
handler is designed to handle additional data that is sent when the chat is initiated.
For more information about sending meta-data, see the messenger documentation:
{
"handler": "meta",
"params": {
"delimiter": "-",
"values": [
"lead.tags",
"lead.custom_fields.123",
"lead.custom_fields.124",
"lead.tags"
]
}
}
The "condition"
handler is designed to create logical conditions.
{
"handler": "condition",
"params": {
"term1": "chat.origin",
"term2": "telegram",
"operation": "=",
"result": [
{
"handler": "action",
"params": {
"name": "change_status",
"params": {
"value": 123
}
}
}
]
}
}
The "validations"
handler is designed to create logical conditions.
{
"handler": "validations",
"params": {
"logic": "and",
"conditions": [
{
"client_value": "{{message_text}}",
"type": "regex",
"condition_value": "/[0-9]+/",
"operation": "contains"
},
{
"client_value": "{{message_text}}",
"type": "simple",
"condition_value": "654",
"operation": "equal"
},
{
"client_value": "{{message_text}}",
"type": "range_numbers",
"condition_value": {
"from": 123,
"to": 321
},
"operation": "contains"
},
{
"client_value": "{{message_text}}",
"type": "email",
"condition_value": "",
"operation": "contains"
}
],
"result": [
{
"handler": "goto",
"params": {
"type": "question",
"step": 3
}
}
]
}
}
A "simple"
condition checks for equality/inequality or compares length
{
"client_value": "{{message_text}}",
"type": "simple",
"condition_value": "654",
"operation": "equal"
}
The "email"
and "phone"
conditions check if a string contains a phone number or an email.
{
"client_value": "{{message_text}}",
"type": "email",
"condition_value": "",
"operation": "contains"
}
A "regex"
condition checks if a string contains a regular expression.
{
"client_value": "{{message_text}}",
"type": "regex",
"condition_value": "/[0-9]+/",
"operation": "contains"
}
A "range_numbers"
condition checks if a string contains a number within a specified range.
{
"client_value": "{{message_text}}",
"type": "range_numbers",
"condition_value": {
"from": 123,
"to": 321
},
"operation": "contains"
}
The "preset"
handler is designed to process incoming messages using predefined templates.
Preset "contacts.validate_base_info"
allows you to obtain and verify information from the user, and then request any missing information.
{
"handler": "preset",
"params": {
"name": "contacts.validate_base_info",
"params": {
"empty_email": "Please provide your email.",
"empty_phone": "Please provide your phone number.",
"invalid_phone": "It seems that there is a mistake in the phone number.",
"success": "Thank you",
"empty_all": "Please provide your email and phone number",
"check_doubles": true,
"phone_doubles": "This phone number is already in use. Please enter a different number.",
"email_doubles": "This email is already in use. Please enter a different email.",
"all_doubles": "This phone number and email are already in use. Please enter different contact information.",
"use_quick_replies": true
}
}
}
Preset "contacts.get_base_info"
allows you to obtain information without asking additional questions.
{
"handler": "preset",
"params": {
"name": "contacts.get_base_info"
}
}
The "send_internal"
handler allows you to send an internal message in the lead chat.
If both
group_id
anduser_id
are specified simultaneously, the message will be sent to the group of users.
{
"handler": "send_internal",
"params": {
"entity_id": "{{lead.id}}",
"entity_type": 2,
"message": "Hi there!"
}
}
The send_external_message
handler sends a message/buttons to the client chat. The main difference from the show
handler is the ability to specify recipients and chat channels of the sent message.
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Provide your phone number and email"
},
"recipient": {
"type": "main_contact",
"way_of_communication": "over_all"
},
"channels": [
{
"id": 23499795
}
],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": {
"handler": "goto",
"params": {
"step": 1,
"type": "question"
}
}
}
}
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Choose the option:",
"buttons": [
{
"type": "inline",
"text": "Option 1"
},
{
"type": "inline",
"text": "Option 2"
}
]
},
"recipient": {
"type": "main_contact",
"way_of_communication": "over_all"
},
"channels": [
{
"id": 23499795
}
],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": {
"handler": "goto",
"params": {
"step": 1,
"type": "question"
}
}
}
}
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Buttons with links",
"buttons": [
{
"type": "url",
"text": "Google",
"url": "https://google.com"
},
{
"type": "url",
"text": "YouTube",
"url": "https://youtube.com"
}
]
},
"recipient": {
"type": "main_contact",
"way_of_communication": "over_all"
},
"channels": [],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": null
}
}
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Provide your phone number and email"
},
"recipient": {
"type": "filtered_contacts",
"filter": {
"logic": "and",
"result": 1,
"conditions": [
{
"term1": "{{contact.cf.1880614.is_checked}}",
"term2": "{{contact.cf.1880614.1300836}}",
"operation": "=",
"value_type": "value"
}
]
},
"way_of_communication": "over_all"
},
"channels": [],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": {
"handler": "goto",
"params": {
"step": 1,
"type": "question"
}
}
}
}
Text message
Message with buttons
Buttons with link message
If you want to send links to social networks and for automatic gluing to occur, the links must be in the following format:
- Facebook Messenger – https://m.me/123/?ref=VisitorUid_{{visitor_uid}} , where 123 is the group ID
- Telegram – tg://resolve?domain=bot&start=VisitorUid_{{visitor_uid}} , where bot is the bot name
- Viber – viber://pa?chatURI=bot&context=VisitorUid_{{visitor_uid}} , where bot is the public account name
- WhatsApp – https://wa.me/7895?text=ID:%20{{session_id}} , where 7895 is the WhatsApp phone number that is connected to the account
Text message with filtering by the value of the contact field
The widget_request
handler is designed to send webhooks to external URLs from Salesbot.
You can use this handler only from the Widget step of Salesbot. Find additional information on widget in Salesbot here.
{
"handler": "widget_request",
"params": {
"url": "https://example.com/endpoint",
"data": {
"contact": "{{contact.name}}",
"from": "widget"
}
}
}
onSalesbotDesignerSave: function (handler_code, params) {
var request_data = {
message: params.message,
};
if (APP.getBaseEntity() === 'lead') {
request_data.lead = '{{lead.id}}';
};
return JSON.stringify([
{
question: [
{
handler: 'widget_request',
params: {
url: 'https://example.com/webhook',
data: request_data,
},
},
{
handler: 'goto',
params: {
type: 'question',
step: 1,
},
},
],
},
{
question: [
{
handler: 'conditions',
params: {
logic: 'and',
conditions: [
{
term1: '{{json.status}}',
term2: 'success',
operation: '=',
},
],
result: [
{
handler: 'exits',
params: {
value: 'success',
},
},
],
},
},
{
handler: 'exits',
params: {
value: 'fail',
},
},
],
},
]);
},
The endpoint will receive a POST request. To acknowledge that the webhook has been received, you need to respond within 2 seconds with an HTTP status code 200.
{
"token": "JWT_TOKEN",
"data": {
"contact": "Contact name",
"from": "widget"
},
"return_url": "https://subdomain.kommo.com/api/v4/salesbot/321/continue/123"
}
The JWT is needed to validate the data sent in the request. It is signed with the client (integration) secret key. Here are the JWT fields description:
To resume the bot's operation, you need to make a request with the data. The current bot will not continue its operation until it receives the request. Additionally, you will not be able to continue the bot's execution if another bot for the same entity is already running.
The "stop"
handler is intended to perform actions when the bot is finished.
{
"finish": [
{
"handler": "stop",
"params": {
"action": "talk-close"
}
},
{
"handler": "stop",
"params": {
"action": "salesbot-start",
"bot": 1234
}
}
]
}
Subscribing a group of users to chat.
[
{
"question": [
{
"handler": "action",
"params": {
"name": "subscribe",
"params": {
"type": "group",
"value": 111
}
}
}
]
}
]
Moving the lead to another stage.
[
{
"question": [
{
"handler": "action",
"params": {
"name": "change_status",
"params": {
"value": 142
}
}
}
]
}
]
Sending any text to the client:
[
{
"question": [
{
"handler": "show",
"params": {
"type": "text",
"value": "Hello"
}
}
]
}
]
Sending a message with the selection buttons:
[
{
"question": [
{
"handler": "show",
"params": {
"type": "buttons",
"value": "Please choose the type of participation:",
"buttons": [
"Offline",
"Online"
]
}
}
],
"answer": [
{
"handler": "buttons",
"params": [{
"regex": "/offline/iu",
"params": [{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "Offline",
"custom_fields_id": 4242
}
}
}]
},
{
"regex": "/online/iu",
"params": [{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "Online",
"custom_fields_id": 4242
}
}
}]
}]
}]
}
]
Setting a tag for a lead:
[
{
"question": [
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "salesbot"
}
}
}
]
}
]
Setting a value to a custom field:
[
{
"question": [
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"custom_fields_id": 123,
"value": "Field Value"
}
}
}
]
}
]
Saving metadata to the lead card.
[
{
"question": [
{
"handler": "meta",
"params": {
"delimiter": "-",
"values": [
"lead.tags",
"lead.custom_fields.123",
"lead.custom_fields.124",
"lead.tags"
]
}
}
]
}
]
Requesting email and phone number, recording in the lead card only from the first response.
[
{
"question": [
{
"handler": "show",
"params": {
"type": "text",
"value": "Please provide your phone number and email."
}
}
],
"answer": [
{
"handler": "preset",
"params": {
"name": "contacts.get_base_info"
}
}
]
}
]
