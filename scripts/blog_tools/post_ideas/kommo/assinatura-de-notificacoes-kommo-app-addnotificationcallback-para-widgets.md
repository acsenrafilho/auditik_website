---
title: "Assinatura de Notificações Kommo: APP.addNotificationCallback para Widgets"
source: "https://pt-developers.kommo.com/docs/assinatura-de-notifica%C3%A7%C3%B5es"
date: "2026-02-19"
---

Existe um recurso de assinatura para receber notificações na Kommo.
Ele está disponível apenas para widgets que possuem o parâmetro init_once: true
especificado em seu manifest.json.
Nome do método
APP.addNotificationCallback(widget_code, callback(data))
Exemplo:
APP.addNotificationCallback('teste', function (data) {
console.log(data);
});
Exemplo de um parâmetro passado para o callback:
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
