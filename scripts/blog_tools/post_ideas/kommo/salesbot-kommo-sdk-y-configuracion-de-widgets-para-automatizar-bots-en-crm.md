---
title: "Salesbot Kommo SDK y configuración de widgets para automatizar bots en CRM"
source: "https://es-developers.kommo.com/docs/salesbot"
date: "2026-02-10"
---

Hay una opción para automatizar procesos rutinarios al crear bots y, por supuesto, ofrecemos la posibilidad de extender la funcionalidad de los bots utilizando widgets.
Para hacer que un widget funcione en el constructor de bots, necesitas seguir estos pasos:
{
...
"locations": [
"salesbot_designer"
],
...
}
Este objeto describe los campos para mostrar en la interfaz de configuración del widget en el constructor del Salesbot:
"salesbot_designer": {
"logo": "/widgets/my_widget/images/image.jpg",
"handler_name": {
"name": "settings.handler_name",
"settings": {
"text": {
"name": "settings.text",
"default_value": "¡Hola, soy un Salesbot!",
"type": "text",
"manual": true, // true - el usuario debe ingresar un valor
// false - el usuario selecciona un valor del campo
},
"link_to": {
"name": "settings.link",
"default_value": "www.kommo.com",
"type": "url",
}
}
}
}
{
...
"salesbot_designer": {
"logo": "/widgets/my_widget/images/image.jpg",
"handler_sms": {
"name": "settings.handler_sms",
"settings": {
"phone": {
"name": "settings.phone",
"default_value": "+1234456789",
"type": "text"
},
}
},
"handler_email": {
"name": "settings.handler_email",
"settings": {
"email": {
"name": "settings.email",
"default_value": "[email protected]",
"type": "text"
},
}
}
},
...
}
Los campos en la propiedad de configuración pueden tener las siguientes opciones de tipo:
- texto
- numérico
- url (enlace)
Si estos ajustes están especificados correctamente, el widget aparecerá en la ventana modal de los widgets del constructor de Salesbot.
Los ajustes para cada handler se especifican en el archivo manifest.json y luego se utiliza en el código para el salesbot.
Los siguientes callbacks pueden añadirse en script.js:
Luego de que el usuario haya configurado su secuencia en el constructor del Salesbot y haya hecho clic en el botón Guardar, el callback onSalesbotDesignerSave
se ejecutará en el widget.
El método debería devolver un string en el formato de código JSON para el Salesbot, teniendo en cuenta los códigos de salida del bot.
Acepta los siguientes campos:
handler_code
(el código del controlador del objeto en el objetosalesbot_designer
).params
(los ajustes del widget en el formato especificado).
onSalesbotDesignerSave: function (handler_code, params) {
var salesbot_source = {
question: [],
require: [],
},
values = [];
salesbot_source.question.push({ type: 'text' });
$.each(params, (param) => {
values.push(param);
});
salesbot_source.question.push({
values: values,
});
salesbot_source.question.push({ accept_unsorted: 'false' });
return JSON.stringify([salesbot_source]);
};
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
En el Ejemplo 2, el widget de envío de SMS envía una solicitud a su servicio para enviar un mensaje. Al recibir una respuesta, se dirige a un bloque condicional. Si el estado de la respuesta es exitoso, procede a la salida success
. Si el envío falla y se recibe un error, se dirige a la salida fail
. Si el usuario ha configurado una secuencia en el bot para errores (por ejemplo, si el SMS no se pudo enviar, entonces enviar un correo electrónico al cliente), el bot seguirá esa secuencia.
Cuando el usuario hace clic en el botón Agregar debajo del widget, se disparará el callback salesbotDesignerSettings
. Al utilizar este callback, puedes cambiar la apariencia del bloque de tu widget en el constructor.
El método puede devolver un objeto con la clave exits
, que contendrá las posibles salidas del bloque del widget en el bot. Un widget puede tener una o múltiples salidas posibles (por ejemplo, la ejecución puede finalizar con un error y el bot necesita ser dirigido a un escenario alternativo).
El arreglo exits
deberá contener objetos con las claves code
(código de salida) y title
(nombre de la salida).
El callback acepta los siguientes parámetros:
body
– objeto jQuery del bloque del widget.renderRow
– una función que toma el nombre del campo como parámetro y devuelve el marcado del campo en el estilo del constructor.params
– ajustes del handler ya creado
function(caption) {
return twig({
ref: '/tmpl/salesbot_designer/controls/widget_param.twig',
}).render({
caption: caption,
is_widget: true,
});
}
Ejemplos de la implementación de este callback:
salesbotDesignerSettings: function ($body, renderRow, params) {
var use_catalog =
$body
.find('[data-field-name="invoice_catalog"][name = "value_manual"]')
.val() == 'true',
$catalog_switcher = $(renderRow())
.append(self.langs.invoice_catalog)
.append(
self.render(
{
ref: '/tmpl/controls/switcher.twig',
},
{
checked: use_catalog,
custom_class_name: 'switcher_blue',
id: 'stripe_invoice_catalog',
},
),
);
return {
exits: [
{ code: 'success', title: self.i18n('salesbot').success_callback_title },
{ code: 'fail', title: self.i18n('salesbot').fail_callback_title },
],
};
}
this.callbacks = {
...
salesbotDesignerSettings: function ($body, renderRow) {
$body.find('[data-field-name="sms"]')
.replaceWith(
$(renderRow('SMS'))
.append('Custom layout')
);
return {
exits: [
{ code: 'success', title: 'Upon successful execution' },
{ code: 'fail', title: 'In case of an error' }
]
};
},
...
}
