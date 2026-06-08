---
title: "Script JS de Kommo – guía técnica del SDK JavaScript y métodos para integraciones"
source: "https://es-developers.kommo.com/docs/script-js"
date: "2026-02-17"
---

El widget se representa como un objeto que contiene propiedades y métodos útiles con los cuales trabajar. Cuando el sistema carga widgets, agrega la funcionalidad descrita en script.js al objeto widget preexistente en el sistema. Esto significa que el objeto CustomWidget hereda propiedades y métodos que serán útiles para trabajar con ellos en el futuro.
La parte de JavaScript (JS) del widget contiene componentes necesarios y funciones adicionales. También incluye funciones callback que se disparan bajo condiciones específicas. Examinemos el framework de este archivo.
define(['jquery'], function($){
var CustomWidget = function () {
var self = this, // para acceder a un objeto desde los métodos
system = self.system(), // este método retorna un objeto con las variables del sistema
langs = self.langs; // objeto de localización con los datos del archivo de localización (carpeta i18n)
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
Los tres callbacks deben estar presentes en el objeto
this.callbacks
. El widget no funcionará en las ubicaciones especificadas (áreas de visibilidad) sin ellos.
render: function(){
return true;
}
Cuando se instala el widget, se llama primero al método callbacks.render
. Este método generalmente describe los pasos necesarios para mostrar el widget. Por defecto, el widget solo aparecerá en el menú de ajustes. Para mostrar el widget en otras áreas, como el panel de widgets a la derecha, necesitas utilizar métodos específicos dentro de esta función, como los métodos del objeto render()
y/o render_template()
, que serán procesados posteriormente.
Es crucial que la función callbacks.render
devuelva true. Esto se debe a que, sin esto, los métodos callbacks.init
y callbacks.bind_actions
no se ejecutarán.
init: function(){
return true;
}
El método init
se ejecuta inmediatamente después de callbacks.render
y junto con callbacks.bind_actions
. Generalmente, el método init
se utiliza para recolectar la información necesaria y realizar otras acciones, como comunicarse con un servidor de terceros y la autorización de la API si el widget se utiliza para enviar o solicitar información. En el caso más simple, puede determinar la ubicación actual del usuario.
Utiliza init
o bind_actions
si tu widget reacciona a eventos o debe ser reinicializado
El método callbacks.init
debe devolver true para continuar con el trabajo.
bind_actions: function(){
return true;
}
Callbacks.bind_actions
se utiliza para asociar eventos a las acciones del usuario, como cuando hace clic en un botón. El métodocallbacks.bind_actions\
debe devolver verdadero.
settings: function(){
}
El método callbacks.settings
se dispara cuando el usuario hace clic en el ícono del widget en el área de ajustes. Éste permite añadir una ventana modal a tu página.
dpSettings: function(){
}
De manera similar, el método callbacks.dpSettings
hace lo mismo, pero dentro del alcance de digital_pipeline
.
advancedSettings: function() {
}
Para habilitar el método callbacks.advancedSettings
, necesitas especificar el área de conexión del widget advanced_settings
. Este método se llama cuando el usuario navega a la página de ajustes avanzados del widget
onSave: function () {}
El método callbacks.onSave
es llamado cuando el usuario hace clic en el botón Configurar/Guardar en los ajustes del widget. Este método debe devolver true
o un objeto Promise si necesitas realizar una solicitud a tu servidor mientras lo guardas.
Es útil para enviar datos de formulario y cambiar el estado del widget. Por favor, ten en cuenta que este método también se dispara cuando el widget se encuentra deshabilitado. El método onSave
se dispara primero, seguido del método de destrucción.
leads: { selected: function() {
}
}
Esta función se dispara cuando seleccionas elementos de la lista de leads utilizando la casilla de verificación y luego haces clic en el nombre del widget en el menú adicional que aparece al elegir los elementos de la lista.
contacts: { selected: function() {
}
}
Esta función se dispara cuando seleccionas elementos de la lista de contactos utilizando la casilla de verificación y luego haces clic en el nombre del widget en el menú adicional que aparece al elegir elementos de la lista. Se utiliza cuando se necesita realizar alguna acción con los objetos seleccionados.
todo: { selected: function () {}
}
Esta función se dispara cuando seleccionas elementos de la lista de tareas utilizando la casilla de verificación y luego haces clic en el nombre del widget en el menú adicional que aparece al elegir elementos de la lista. Se utiliza cuando se necesita realizar alguna acción con los objetos seleccionados.
destroy: function(){
}
Esta función también se dispara cuando se deshabilita el widget a través del menú de ajustes. Por ejemplo, si el widget está deshabilitado, debes eliminar todos sus elementos del DOM o tomar cualquier otra acción necesaria. Además, esta función también se llama cuando cambias entre las áreas de visualización del widget.
La función define la lógica de la fuente y se dispara cuando se utiliza una fuente, como un SMS.
onSalesbotDesignerSave: function (handler_code, params) {}
La función define la lógica de la acción del widget y se llama cuando se añade el widget al constructor del Salesbot durante su guardado.
onAddAsSource: function (pipeline_id) {}
}
La función se llama cuando se añade un widget como fuente en los ajustes del pipeline digital.
onInstall: function () {
}
Una función de callback opcional que se ejecuta una sola vez al instalar el widget. Se utiliza para realizar la lógica de inicialización, como la creación de datos iniciales o la comprobación del entorno. Un error en onInstall
no interrumpe el proceso de instalación.
No olvides que, cuando trabajes con
this
dentro de los callbacks, no podrás acceder a los métodos del objetoWidget
. Por eso creamos una variableself
, pero puedes utilizar cualquier otro método que te resulte más conveniente.
En este ejemplo, mostraremos cómo puedes utilizar el objeto de callback con funciones adicionales, junto con algunas funciones del objeto widget. Todas estas funciones están explicadas detalladamente en los ejemplos a continuación. Te sugerimos revisar el código y consultar las descripciones de las funciones del objeto widget para obtener más información.
El widget que tenemos aquí te permitirá seleccionar los contactos marcados de tu lista y enviar sus números de teléfono y direcciones de correo electrónico a un servidor de terceros.
Las funciones empleadas en este ejemplo se describen en detalle a continuación. Para empezar, debes centrarte en el objeto callbacks.
define(['jquery'], function ($) {
var CustomWidget = function () {
var self = this,
system = self.system;
this.get_ccard_info = function () // Recopilando información de la tarjeta de contacto
{
if (self.system().area == 'ccard') { // En el área de la tarjeta de contacto
var phones = $('.card-cf-table-main-entity .phone_wrapper input[type=text]:visible'), // Identificar los números de teléfono
emails = $('.card-cf-table-main-entity .email_wrapper input[type=text]:visible'), // Identificar las direcciones de correo electrónico
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
this.sendInfo = function (person_name, settings) // Enviando la información recopilada
{
self.crm_post(
'http://example.com/index.php',
{
// Enviando datos POST
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
} // No se debe renderizar contacts/add || leads/add
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
selected: function () { // Este es el comportamiento para seleccionar múltiples contactos y hacer clic en el nombre del widget
var c_data = self.list_selected().selected;
$('#js-sub-lists-container').children().remove(); // El contenedor se limpia y luego los elementos seleccionados se recogen en el contenedor, seleccionado en list.container - bloque div del widget, mostrado en la columna derecha
var names = [], // Arreglo de nombres
length = c_data.length; // Números de IDs seleccionados (el conteo empieza desde 0)
for (var i = 0; i < length; i++) {
names[i] = {
emails: c_data[i].emails,
phones: c_data[i].phones
};
}
console.log(names);
for (var i = 0; i < length; i++) {
$('#js-km-sub-lists-container').append('<p>Correo electrónico:' + names[i].emails + ' Teléfono:' + names[i].phones + '</p>');
}
$(self.contacts).remove(); // limpiar la variable
self.contacts = names;
}
},
leads: {
selected: function () {
//Esto detalla el comportamiento al seleccionar múltiples contactos y hacer clic en el nombre del widget
var c_data = self.list_selected().selected;
$('#js-sub-lists-container').children().remove(); //El contenedor se limpia, luego los elementos seleccionados en la lista se recogen en el contenedor. El contenedor es el bloque div del widget, mostrado en la columna derecha
var names = [], // Arreglo de nombres
length = c_data.length; //Números de IDs seleccionados (el conteo empieza desde 0)
for (var i = 0; i < length; i++) {
names[i] = {
emails: c_data[i].emails,
phones: c_data[i].phones
};
}
console.log(names);
for (var i = 0; i < length; i++) {
$('#js-km-sub-lists-container').append('<p>Correo electrónico:' + names[i].emails + ' Teléfono:' + names[i].phones + '</p>');
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
El objeto widget proporciona varios métodos útiles y funciones que pueden utilizarse para completar diversas tareas.
Este método específico está diseñado para trabajar con el motor de plantillas twig.js, sobre el cual puedes obtener más información.
El método render()
funciona como una capa para twig.js y admite dos parámetros: la información de la plantilla (data
) los datos necesarios para renderizar la plantilla (params
). Cuando estos parámetros son pasados al método, devuelve el resultado de la plantilla renderizada al ejecutar el código result = twig(data).render(params)
.
Para mostrar cómo funciona, examinemos un ejemplo simple de una plantilla.
var params = [
{name:'nombre1',
id: 'id1'},
{name:'nombre2',
id: 'id2'},
{name:'nombre3',
id: 'id3'}
]; // arreglo de datos enviados para la plantilla
var template = '<div><ul>' +
'{% for person in names %}' +
'<li>Name : {{ person.name }}, id: {{ person.id }}</li>' +
'{% endfor %}' + '</ul></div>';
console.log(self.render({data: template},{names: params}));
Como resultado, obtenemos el código::
Name: nombre1, id: id1
Name: nombre2, id: id2
Name: nombre3, id: id3
Puedes pasar una de las plantillas de nuestro sistema a la función. Para ello, necesitas especificar un enlace a la plantilla en el objeto data pasado: ref: ‘/tmpl/controls/#TEMPLATE_NAME#.twig
’, donde #TEMPLATE_NAME#
es una de las plantillas del sistema.
Por ejemplo, para crear una lista desplegable, utilizamos la plantilla select.twig
:
m_data = [
{option:'opción1',
id: 'id1'},
{option:'opción2',
id: 'id2'},
{option:'opción3',
id: 'id3'}
]; // arreglo de datos enviados para la plantilla
var data = self.render(
{ref: '/tmpl/controls/select.twig'},// el objeto data en este caso contiene solo una referencia a la plantilla
{
items: m_data, // Data
class_name:'subs_w', // especificación de la clase
id: w_code +'_list' // especificación del id
});
Para ver el marcado de datos, es necesario añadir datos al DOM. El marcado de la lista desplegable está diseñado con el estilo de nuestro sistema.
Lee más sobre los controles de formulario nativos.
Cuando se utiliza el método render render()
, puedes proporcionar referencias no solo a las plantillas existentes en el sistema, sino también a tus propias plantillas. Para hacerlo, necesitarás crear una carpeta de plantillas dentro de la carpeta de widgets y ubicar la plantilla template.twig en ella.
Aquí hay un ejemplo de cómo renderizar una plantilla:
var params = {}; // datos vacios
var callback = function (template){ // función callback, llamada si la plantilla se carga, se le pasa un objeto de plantilla
var markup = template.render(params); //
/*
* luego, el código para agregar el marcado al DOM
*/
};
var s = self.render({
href:'templates/template.twig', // ruta hacia la plantilla
base_path: self.params.path; // la ruta base al directorio con el widget
load: callback // la función de callback solo se ejecutará si la plantilla existe y está cargada
}, params); // parámetros para la plantilla
Para llamar a una función callback cuando una plantilla existe en una dirección de enlace específica, puedes pasar la función como un parámetro junto con el nombre de la plantilla a la funcióngetTemplate
. El objeto template que contiene el método render, el cual tiene los parámetros necesarios para el renderizado, luego será pasado a la función callback. Si la plantilla existe en la carpeta, la función callback será llamada.
Para simplificar el proceso, crearemos una función llamada getTemplate
, y le pasaremos parámetros: el parámetro template
es el nombre de la plantilla que existe en la carpeta de plantillas dentro de la carpeta de widgets, el parámetro params
es el objeto de parámetros para la plantilla, y el parámetro callbacks es la función callback que será llamada después de cargar la plantilla. En este caso, añadiremos la plantilla a la ventana modal.
this.getTemplate = function (template, params, callback) {
params = (typeof params == 'object') ? params : {};
template = template || '';
return this.render({
href: '/templates/' + template + '.twig',
base_path: this.params.path, // el widget retornará al objeto /widgets/#WIDGET_NAME#
load: callback // llamar a una función callback
}, params); // parámetros para la plantilla
}
settings: function () {
self.getTemplate( // llamar a la función
'login_block', // especificar el nombre de la plantilla que tenemos en la carpeta con el widget en la carpeta de plantillas
{}, /* datos vacíos para la plantilla, porque primero solicitaremos la plantilla. Si existe, entonces la función callback llamará a una función para agregar los datos a la plantilla, como se muestra a continuación */
function (template) {
template.render({ // parámetros para la plantilla
title: self.i18n('settings').title,
widget_code: self.get_settings().widget_code
})
}
);
}
Esta función toma un marcado HTML o una plantilla con datos para renderizar y lo envuelve en un contenedor estándar de widget antes de ubicarlo en el panel derecho de los widgets. Funciona de la misma manera que el método render()
y complementa el marcado pasado con el marcado almacenado en la variable template_element
del objeto widget.
/*
*almacena el marcado que debe colocarse en el panel derecho de los widgets
*/
var html_data ='<div id="w_logo" class="nw_form">' + '<div id="js-sub-subs-container">' + '</div>' + '<div class="nw-form-button">BUTTON</div></div>' + '<div class="already-subs"></div>';
self.render_template(
{
caption:{
class_name:'new_widget', // nombre de la clase para el contenedor del marcado
},
body: html_data,// marcado
render : '' // la plantilla se envía
}
)
En el ejemplo anterior, demostramos cómo renderizar una página HTML básica sin utilizar plantillas. Sin embargo, el método render_template()
ofrece una forma más eficiente de generar contenido HTML al permitirnos pasar la plantilla y los datos como parámetros. Otra opción es pasar una referencia a la plantilla, similar al método render()
.
/*
* Aquí, la plantilla y los datos para la plantilla se pasan como parámetros
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
b_name:"BOTÓN" // en este caso, es mejor pasar una referencia a lang a través de self.i18n (
}
);
Vemos un widget creado a partir de una plantilla en el panel de widgets en el lado derecho.
Este método está diseñado para enviar una solicitud a tu servidor remoto a través del servidor proxy de Kommo.
Su uso es esencial porque cuando se trabaja con Kommo, el usuario opera utilizando un protocolo SSL seguro, y el navegador puede prevenir solicitudes de dominio cruzado.
El mejor enfoque es tener un certificado SSL firmado en el lado interno del sistema y trabajar sobre HTTPS. La función es similar a jQuery.post() , con la funcionalidad adicional de que puede capturar un error.
self.crm_post (
'http://www.test.com/file.php',
{
name: 'minombre',
login:'miiniciodesesión',
password: 'micontraseña'
} // Pasamos los datos POST utilizando el modelo de objetos de JavaScript
,
function(msg)
{
alert('Todo está OK');
},
'text',
function(){
alert ('Error');
}
)
Si quieres obtener datos del sistema (como user_id
, area
, etc.), también necesitarás utilizar este método, que devolverá los datos en un objeto de JavaScript.
Esta función te permite agregar propiedades al widget.
self.set_settings({parameter:"text"}); // se crea una configuración con el nombre 'parameter' y el valor 'text'
self.get_settings();// como respuesta recibirás un array con una propiedad ya creada
Este método es necesario para obtener la entrada del usuario desde el widget y devolverla como un objeto de JavaScript.
Ejemplo de la respuesta
{
login: "NUEVAPRUEBA",
password: "PRUEBA",
maybe: "Y"
}
Este es otro método que te permite extraer un objeto específico de los archivos de idioma. Este objeto contendrá mensajes en los idiomas locales que el usuario está utilizando. Para usar este método, debes pasar como parámetro el nombre del objeto que deseas extraer.
Llama al método self.i18n('userLang')
y obtén una respuesta:
{
firstWidgetText: "Haz clic en el botón para enviar los datos a un servidor de terceros:"
textIntoTheButton: "Enviar datos",
responseMessage: "Respuesta del Servidor:",
responseError: "Error"
}
Esta función te permite cambiar la configuración predeterminada de los archivos de la carpeta i18n. El objeto lang actual se guarda en la variable langs del objeto widget.
langs = self.langs; // Llamando al objeto actual
langs.settings.apiurl = 'apiurl_new'; // cambia el nombre del campo
self.set_lang(langs); // cambia el objeto actual por un objeto con un campo modificado
console.log(self.langs); // salida a la consola para verificar que el nombre ha cambiado
Esta función obtiene una lista de contactos seleccionados o leads desde la respectiva tabla y la devuelve como un arreglo de objetos. Los objetos contienen dos propiedades: count_selected y selected. Uno de los objetos seleccionados contiene un arreglo de objetos con casillas seleccionadas que contienen correos electrónicos, IDs, teléfonos y propiedades de tipo.
console.log(self.list_selected().selected); // Devuelve dos objetos, elige el objeto seleccionado
// Resultado:
/*0: Object
emails: Array[1]
id: #id#
phones: Array[1]
type: "contact" */
Otra función que viene con este widget se utiliza para alternar la superposición que aparece cuando el widget es llamado desde la lista de contactos o leads.
Para hacerlo, debes pasar el valor true o false como argumento a la función. Si se establece como true, el overlay se habilitará, mientras que si se configura como false se deshabilitará.
self.widgetsOverlay(true);
Cuando el usuario trabaja en las listas de contactos y compañías, puede llamar a la función haciendo clic en el número de teléfono o en la dirección de correo electrónico de un contacto.
Esta función tiene dos parámetros: type
y action
. type
puede ser "email"
o "phone"
, y action
es la función que se invoca cuando el usuario hace clic en el número de teléfono o en la dirección de correo electrónico.
self.add_action("phone",function(){
/*
* código de interacción con el widget VoIP
*/
});
Puedes agregar una nueva fuente al final de la tarjeta de lead , contacto, or compañía . Esta función tiene dos parámetros:source_type
y handler
. source_type
siempre es "sms"
, y handler
es la función que se invoca cuando se hace clic en el botón finalizar. Actualmente, solo se puede especificar un tipo de fuente ("sms"
) y la función handler siempre debe devolver un objeto Promise.
self.add_source("sms", function(params) {
/*
params - este es el objeto en el que estarán los parámetros necesarios para enviar un SMS
{
"phone": 75555555555, // número de teléfono del destinatario
"message": "texto sms", // mensaje a enviar
"contact_id": 12345 // ID de contacto al que está asociado el número de teléfono
}
*/
return new Promise(function (resolve, reject) {
// Aquí se describirá la lógica para enviar SMS
$.ajax({
url: '/widgets/' + self.system().subdomain + '/loader/' + self.get_settings().widget_code +'/send_sms',
method: 'POST',
data: params,
success: function () {
// si se realiza con éxito, se creará una nota como 'sms'
resolve();
},
error: function () {
reject();
}
});
});
});
Esta función te permite conocer a qué pipeline está conectado el widget como fuente. Está disponible si existe un área lead_sources
en el archivo manifest.json.
self.get_pipeline_id()
.then(function (pipeline_id) {
// Desde aquí, puedes iniciar una solicitud utilizando el ID del pipeline
})
.catch(function () {
// manejo del caso cuando el widget no está adjunto al pipeline
});
Un widget puede tener uno de tres estados, los cuales se muestran en el área de ajustes y en el icono del widget.
Los estados disponibles son install cuando el widget no está activo, installed cuando el widget está activo, y error cuando el widget se encuentra en estado de error.
Si un widget depende de datos ingresados por el usuario para una API de un servicio de terceros, y estos datos se ingresan de forma incorrecta, puedes utilizar el estado de error para mostrar el problema..
self.set_status('error');
Este método devolverá el número de versión del widget; puede ser utilizado para restablecer la caché estática después de una actualización. Los datos se devuelven como una cadena (por ej.: 0.0.1
).
Este método devolverá el estado de instalación del widget. Los datos se retornan como una cadena.
Los estados disponibles son: install cuando el widget no está activo, installed cuando el widget está activo, y not_configured (tel recorrido del widget se ha completado, pero los ajustes no están configurados).
Devuelve los datos de la cuenta sin necesidad de hacer una solicitud a la API (el resultado puede no coincidir completamente con la respuesta de la API; si faltan datos, será necesario hacer una solicitud).
Este método no requiere solicitudes a la red y proporciona datos útiles de contactos en el área de tarjetas. Las tarjetas de leads y compañías proporcionan datos sobre los contactos relacionados, y la tarjeta de contacto muestra los datos específicos de ese contacto.
Datos devueltos por este método:
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
El método en sí devuelve un objeto Promise.
