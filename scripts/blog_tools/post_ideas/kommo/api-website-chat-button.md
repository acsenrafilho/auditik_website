---
title: "API Website Chat Button"
source: "https://developers.kommo.com/docs/api-crm-plugin"
date: "2025-10-22"
---

Everything described in the article works only with the code for placing the Website chat button copied from the Kommo interface.
You should go to a Pipeline ➡️ +Automate ➡️ Add source button in the left menu ➡️
➡️ Go to the Installation tab ➡️ Copy the code.
You need to place the window to configure a Website Chat Button window.crmPluginConfig
settings object anywhere on the page before including the code for the button itself.
window.crmPluginConfig = {
hidden: false, // hide button on page load
color: '#000', // change button color, will ignore the color configured in Kommo
onlinechat: {
mode: 'widget', // it can also be 'frame', more on that below
user_id: '', // online chat user id (optional parameter)
locale: {
extends: "com",
compose_placeholder: "write your question...",
},
theme: {
header: false,
},
},
};
Let’s take a closer look at the online chat settings.
window.crmPluginConfig = {
onlinechat: {
mode: 'frame',
container: '#custom_chat_holder',
},
};
In this case, when clicking on the online chat icon in the button, the chat will open not in a pop-up block next to the button but in a particular page element specified in the container property.
In this mode, incoming pop-up messages stop appearing by the button. When a new message arrives in the online chat, it only displays the count of unread messages.
Full list of strings available for localization:
window.crmPluginConfig = {
onlinechat: {
locale: {
extends: 'en',
date_format: 'dd.MM.YYYY',
time_format: 'HH:mm',
compose_placeholder: 'Write a message...',
delivery_status_sending: 'Sending',
delivery_status_sent: 'Sent',
delivery_status_read: 'Read',
delivery_status_error: 'Error',
powered_by: 'Powered by',
new_messages: 'New messages'
},
},
};
You can send only the necessary strings for translation specifying the initial locale
via extends
. Currently the online chat supports three built-in localizations: en, es, pt.
For date_format
and time_format
you can specify any valid values from the date-fns library.
window.crmPluginConfig = {
onlinechat: {
theme: {
background: 'yellow', // background
system_color: 'pink', // color of system texts (delivery status, date)
header: { // you can specify header: false, then it will not be rendered at all
background: 'skyblue', // the top of the chat background color
color: 'black', // top text color
},
message: {
outgoing_background: 'red', // user message background
outgoing_color: 'white', // user message color
incoming_background: 'blue', //response background
incoming_color: 'white', // response color
},
compose: {
height: 100, // minimum height in pixels (maximum 170px, cannot be changed)
button_background: 'black', // submit button background
}
},
},
};
All colors must be specified in a format that can be processed by CSS in the browser (e.g., hex code, rgb, rgba).
Apply the user_id
property to create your online chat user ID. It can be useful in cases when you want to continue the conversation in an already existing chat if the user is logged in from another device.
Usage example:
- The client of the online store is authorized in his account and initiates the dialogue in the online chat (where the
user_id
was previously transferred). - The same client decides to log in from another device (for example, via mobile phone).
- After the client is authorized in his account, we pass the same
user_id
. - When the client opens the online chat window, an existing dialog with the entire correspondence history will appear.
It is strongly recommended to hash user_id
using any encryption algorithm convenient for you (SHA-256, MD-5, etc.) to protect against gaining access to the conversation by iterating over the user ID.
window.crmPluginConfig = {
onlinechat: {
user_id: 'abc123'
},
};
For working with chats, a special JavaScript function crmPlugin
is also provided. It can be used anywhere after installing the button code.
Supported methods:
crmPlugin(‘runChatShow’)
– show chat.crmPlugin(‘runChatHide’)
– hide chat.
Sometimes, we need to destroy the current button instance and initialize a new one, for example, to start a chat with a different user_id
.
For destroying an instance, the following method is provided:
crmPlugin(‘runDestroy’)
– remove the current button instance.
Callbacks are also provided to respond to events occurring in the button and online chat.
crmPlugin('onChatShow|onChatHide', function () {
});
crmPlugin('onChatReady', function () {
// the chat is initialized,
// you can work with it via the JavaScript API
crmPlugin('runChatShow');
});
crmPlugin('onButtonClick', function (service, link) {
// when clicking on the button
// input parameters:
// service code
// url of the link that was clicked
});
crmPlugin('onConversationsChange', function (conversations) {
// when changing conversations
//
// when multi-conversations are disabled, the event will work 1 time,
// where conversations will be false
//
// incoming parameters:
// conversations - array of visible conversations
// the format of the conversation
//
// {
// name: 'A123',
// is_closed: true | false,
// last_message: {
// media: {
// url: 'https://path_to_resource.mp4',
// thumbnail: 'https://path_to_preview.jpg',
// } | undefined,
// created_at: 1655283158457,
// is_out: true | false,
// text: 'Hello',
// type: 'text' | 'video' | 'photo',
// author: {
// name: author.name,
// } | undefined,
// },
// },
});
You can pass your own parameters to the online chatbot using the crm_plugin.setMeta
method and build different bot behavior chains based on these parameters.
For example, a user is authorized on your site, and you would like to greet them by their name. In this case, you need to call the following code on your site:
var USER_NAME = "";
crm_plugin.setMeta({
bot_params: {
username: USER_NAME
}
});
Add the welcome message hello,{{bot_params.username}}
in the online chatbot.
Additionaly the online chatbot supports the condition with the bot_params
check in the first step, so you can easily implement, for example, multilingualism in the welcome message.
On your site, you need to forward the parameter with the current locale of the user:
var LOCALE = "com"; // Get the locale via geoip, or the browser API
crm_plugin.setMeta({
bot_params: {
locale: LOCALE
}
});
Put the condition on the first place in the bot while in the text area of the condition add the following code:
// as you can see, here is an array
// therefore there can be several conditions "and"
[
{
"term1": "{{bot_params.locale}}",
"term2": "com",
"operation": "="
}
]
Now, if the user has entered the site and we have determined his language is English, we will proceed with him along the English language bot branch.
You can also add scripts in other languages through the block interface, and there is always a common “else” block, which will contain an alternative script branch if the user does not fall under any of our conditions.
API for transferring data about a page visitor with Website Chat Button.
If a user visits your website where the button is installed and initiates a chat via WhatsApp, Instagram, Live Chat etc. you can collect data from the website (e.g., UTM tags) and transfer it to the lead or contact card by specifying custom fields or adding a note.
The method should be called from the frontend part of your website where the Website Chat Button is embedded. Once the button is installed, a global object crm_plugin
will become available.
crm_plugin.setMeta(params);
crm_plugin.setMeta({
note: {
text: 'Note content',
element_type: 1,
note_type: "common",
},
contact: {
name: 'John',
custom_fields: [{
id: 123456,
values: [{
enum: 12345,
value: '+1 400 000 0000',
}]
}]
},
lead: {
name: 'Lead name',
sale: 1000,
}
})
In order to send your own hook to trigger a key action, you need to execute the following code anywhere after connecting the button code or by some browser event (for example, by clicking on the button):
crmPlugin('sendKeyActionHook', 'Hook name');
You can set it in Advanced settings tab in Website Chat Button Settings.
