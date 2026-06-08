---
title: "Notifications subscription"
source: "https://developers.kommo.com/docs/notifications-subscription"
date: "2025-06-08"
---

There is a subscription feature for receiving notifications in Kommo.
It is available only for widgets that have the parameter init_once: true
specified in their manifest.json.
Method name
APP.addNotificationCallback(widget_code, callback(data))
Example:
APP.addNotificationCallback('test', function (data) {
console.log(data);
});
Example of a parameter passed to the callback
{
"id": "6ea1aaa1-2633-5832-8550-4665242fc155",
"entity": null,
"linked_entity": null,
"created_at": 1566922308,
"updated_at": 1566922308,
"is_read": false,
"silent": false,
"body": {
"title": "Call",
"icon": {
"call": true,
"value": "/frontend/images/interface/inbox/notifications_call.svg"
},
"rows": [
{
"style": "default",
"text": "+1234567890",
"class_height": "h3"
}
],
"actions": {
"click": {
"url": "/contacts/add/?phone=+1234567890"
},
"buttons": [
{
"url": "/contacts/add/?phone=+1234567890",
"title": "+1234567890",
"web_link": "/contacts/add/?phone=+1234567890",
"absolute_link": false
}
],
"read_on_show": true
}
},
"uuid": "ca6e2205-a591-40d0-bfc6-b48f31bd12fd",
"notification_id": "6ea1aaa1-2633-5832-8550-4665242fc155",
"click": {
"type": "url",
"value": "/contacts/add/?phone=+1234567890"
},
"web_link": "/contacts/add/?phone=+1234567890",
"absolute_link": false,
"buttons": [
{
"url": "/contacts/add/?phone=+1234567890",
"title": "+1234567890",
"web_link": "/contacts/add/?phone=+1234567890",
"absolute_link": false
}
],
"notification": true
}
