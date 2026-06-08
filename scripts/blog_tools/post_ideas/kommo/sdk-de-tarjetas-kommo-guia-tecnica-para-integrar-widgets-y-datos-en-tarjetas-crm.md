---
title: "SDK de tarjetas Kommo – guía técnica para integrar widgets y datos en tarjetas CRM"
source: "https://es-developers.kommo.com/docs/tarjetas-sdk"
date: "2026-02-17"
---

El sistema permite incrustar el widget en tres lugares diferentes dentro de las tarjetas: lead, contacto y compañía. Esto se puede hacer de las siguientes maneras:
- Añadiendo una nueva pestaña en las tarjetas de lead, contacto y compañía.
- La capacidad de agregar tu manejador para la acción Llamar en el menú contextual del número de teléfono del contacto en la tarjeta del trato. La capacidad de agregar el ítem Escribir primero al menú contextual del número de teléfono del contacto en la tarjeta del trato.
- Añadir una nueva fuente en el control de envío en la parte inferior de la sección de la tarjeta.
- Mostrar la plantilla del widget en la parte derecha del panel.
Necesitas especificar todas las ubicaciones de las tarjetas donde el widget debe funcionar:
lcard
(lead)ccard
(contacto)comcard
(compañía)
Utilizando este método, el desarrollador puede añadir una nueva pestaña a la tarjeta de la entidad. Esta pestaña añadida mostrará diversos productos que pueden ser buscados, vinculados y desvinculados de la entidad, y cuya cantidad puede ser modificada.
Si no utilizas el mecanismo estándar para trabajar con productos, puedes utilizar los callbacks en esta sección para mostrar datos arbitrarios en una pestaña dentro de la tarjeta.
Para añadir una nueva pestaña, sigue los siguientes pasos:
- En el archivo manifest.json, especifica las áreas necesarias en el objeto locations (
lcard-0
,ccard-0
,comcard-0
,settings
,card_sdk
). - Implementa los métodos del objeto de callback descritos a continuación para mostrar los productos en la tarjeta de la entidad.
Se deben crear 4 métodos en el objeto de callbacks en el archivo script.js del widget,
loadPreloadedData
loadElements
linkCard
searchDataInCard
El método loadPreloadedData()
se activa cuando se inicializa la pestaña del widget.
Es responsable de mostrar los datos que se añadirán a la tarjeta cuando se abra el campo de búsqueda.
El método devuelve un objeto Promise que, una vez completada la solicitud, retorna un arreglo de objetos.
Un ejemplo de un objeto en el arreglo sería:
{
"id": 934244, // ID
"sku": "SNI/01/136/0500", // código de Unidad de Mantenimiento de Stock (SKU)
"name": "Nombre", // nombre del artículo
"price": "999" // precio del artículo
}
Por ejemplo :
loadPreloadedData: function () {
return new Promise(_.bind(function (resolve, reject) {
self.crm_post(
'http://my.sdk.api.com/sdk_back/',
{},
function (msg) {
resolve(msg);
},
'json'
);
}), this);
}
Si tu widget no trabaja con productos, pero necesitas renderizar algunos datos en la pestaña, puedes usar este método con el siguiente contenido:
loadPreloadedData: function () {
var $widget_tab = $('#' + self.get_settings().widget_code);
$widget_code.html('cuerpo del widget aquí');
return Promise.resolve({});
}
Este método es llamado durante la inicialización de la pestaña asociada al widget.
Es responsable de mostrar los elementos vinculados a la tarjeta.
El método devuelve un objeto Promise que, al completarse la solicitud, retorna un arreglo de objetos.
Un ejemplo de un objeto en el arreglo sería:
{
"id": 934244, // ID
"sku": "SNI/01/136/0500", // código de Unidad de Mantenimiento de Stock (SKU)
"name": "Nombre", // nombre del artículo
"price": "999", // precio del artículo
"quantity": 2 // cantidad de artículos
}
Por ejemplo:
loadElements: function (type, id) {
return new Promise(_.bind(function (resolve, reject) {
self.crm_post(
'http://my.sdk.api.com/sdk_back/?products=true&type='+type.type+'&entity_id='+id,
{},
function (msg) {
resolve(msg);
},
'json'
);
}), this);
}
Parámetros
El método se invoca cuando se guardan los elementos vinculados a las tarjetas, se modifica la cantidad o se desvinculan.
Es responsable de vincular y desvincular elementos a una tarjeta.
Qué debe pasarse al método:
Un ejemplo de cómo se utiliza el método:
linkCard: function (links) {
return new Promise(_.bind(function (resolve, reject) {
self.crm_post(
'http://my.sdk.api.com/sdk_back/link.php',
links,
function () {},
'json'
);
resolve();
}), this);
}
El método es llamado cuando se buscan elementos.
Es responsable de mostrar los elementos encontrados.
El método retorna un objeto Promise que, al completarse la solicitud, devuelve un array de objetos.
Ejemplo de un objeto en el arreglo:
{
"id": 934244, // ID
"sku": "SNI/01/136/0500", // código de Unidad de Mantenimiento de Stock (SKU)
"name": "Name", // nombre del artículo
"price": "999" // precio del artículo
}
Un ejemplo de cómo se utiliza el método:
searchDataInCard: function (query, type, id) {
return new Promise(_.bind(function (resolve, reject) {
self.crm_post(
'http://my.sdk.api.com/sdk_back/search.php',
{
query: query,
type: type,
id: id
},
function (msg) {
resolve(msg);
},
'json'
);
}), this);
}
Parámetros del método:
Kommo permite a los gerentes realizar llamadas desde cualquier tarjeta de contacto, compañía o oportunidad simplemente haciendo clic en el número de teléfono en la tarjeta.
Esta funcionalidad se implementa utilizando la función add_action(type, action)
:
Por ejemplo, puedes utilizar la función add_action(type, action)
colocándola en la función callback init
que es parte de la estructura del script.js.
init: function(){
/*
* add call_to action
* type: phone
* Valor del campo teléfono
*/
self.add_action('phone', function(data){
self.crm_post (
/* Enviar la solicitud a tu servicio de VoIP
* para marcar el número
* El método crm_post (url, data, callback, type, error)
*/
'http://yourservice.com/dealmethod.php',
{
call_to: data.value
},
function(msg){
alert('Se realiza la llamada');
},
'texto',
function(){
alert ('Error');
}
);
});
}
Necesitas declarar las ubicaciones del widget en el manifest.json para poder ejecutar la función
add_action(type, action)
. Debes establecer aquellas ubicaciones donde se muestran los números de teléfono.
El siguiente ejemplo especifica todas las ubicaciones del widget donde se pueden encontrar números de teléfono.
{
...
"locations": [
"ccard-1",
"clist-1",
"lcard-1",
"llist-1",
"comcard-1"
],
...
}
Si deseas cambiar el texto del botón que aparece al hacer clic en un número de teléfono o dirección de correo electrónico, necesitarás realizar los cambios necesarios en el archivo de localización .json ubicado en el directorio i18n de la estructura de tu widget.
en.json
{
"widget": {
"call_action": "Call"
}
}
es.json
{
"widget": {
"call_action": "Llamar"
}
}
Si el parámetro call_action
no está especificado, la etiqueta del botón será por defecto el nombre de tu widget, que es un parámetro requerido en manifest.json. El valor de call_action"
se insertará automáticamente en el botón cuando el widget sea inicializado.
Te permite especificar una nueva fuente que se mostrará en la parte inferior de la sección de la tarjeta del lead, contacto o compañía.
Para hacerlo, debes llamar al método this.add_source(source_type, callback [,source_text])
del objeto Widget
.
En general, es mejor seleccionar un source_type
específico y solo utilizar custom
si ninguna de las otras opciones es adecuada. En este caso, las fuentes externas funcionarán de la misma manera que las fuentes del sistema.
Si el source_type
es sms
, entonces se utiliza el control del sistema, y el callback es una función que se activa al hacer clic en el botón Enviar.
En esta situación, el callback debe siempre devolver un objeto Promise.
Por ejemplo:
self.add_source('sms', function (params) {
/*
params - un objeto con los parámetros necesarios para enviar el SMS, pasado al callback
{
'phone': 75555555555, // número de teléfono del destinatario
'message': 'sms text', // mensaje a enviar
'contact_id': 12345 // ID del contacto con el que está asociado el número de teléfono
}
*/
return new Promise(function (resolve, reject) {
// El lugar donde se implementa la lógica para enviar el SMS
$.ajax({
url: '/widgets/' + self.system().subdomain + '/loader/' + self.get_settings().widget_code + '/send_sms',
method: 'POST',
data: params,
success: function () {
// Si tiene éxito, se creará automáticamente una nota de tipo 'sms'
resolve();
},
error: function () {
reject();
}
});
});
});
Si el tipo de fuente es diferente, se pasa un elemento de control JQuery al callback para crear cualquier lógica.
self.add_source('email', function ($el) {
console.log($el);
}, 'Gmail');
Si tu widget está ubicado en el panel derecho, para que el sistema cuente de manera precisa la cantidad de widgets en ese panel antes de mostrar la tarjeta, debes especificar el sufijo 1
en la ubicación. Por ejemplo, si el widget se utiliza en la tarjeta de un lead y aparece en el panel derecho, las ubicaciones en el archivo manifest.json
deberían definirse de la siguiente manera:
{
...,
"locations": [
"lcard-1"
],
...
}
Para asegurarte de que tu bloque se muestre correctamente en el panel derecho, utiliza el método render_template()
en el callback render
del widget. Aquí tienes un ejemplo de cómo llamarlo con los parámetros necesarios:
self.render_template({
body: '',
caption: {
class_name: 'widget-caption-unique-class-name'
},
render: '<div class="widget-body-unique-class-name">' +
‘Número de leads: {{cantidad}}’ +
'</div>'
}, { cantidad: 10 });
El sistema creará automáticamente el encabezado con el logo. Puedes proporcionar tu título y ajustar los estilos utilizando las imágenes ubicadas en la carpeta images
de tu widget.
