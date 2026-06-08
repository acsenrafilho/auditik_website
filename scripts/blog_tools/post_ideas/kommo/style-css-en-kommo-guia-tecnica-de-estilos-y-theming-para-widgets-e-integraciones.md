---
title: "Style CSS en Kommo – guía técnica de estilos y theming para widgets e integraciones"
source: "https://es-developers.kommo.com/docs/style-css"
date: "2026-02-17"
---

Para asegurarse de que el widget no entre en conflicto con otros elementos del sistema y widgets, su archivo CSS debe contener nombres de clases únicas para todos los elementos principales e hijos. Además, los estilos para los elementos hijos deben configurarse en cascada en relación con la clase base.
.card-widgets__widget-new_widget .card-widgets__widget__body {
padding: 0 10px 0px;
padding-bottom: 5px;
background-color: grey;
}
.km-form {
padding: 5px 15px 15px;
margin-bottom: 10px;
background: #fff;
}
.js-km-caption {
display: block;
margin: auto;
background-color: grey;
}
.lists_kommo_km ul li span {
color: #0E0142;
;
}
.km-form-button {
padding: 5px 0;
background: #F3EFFF;
text-align: center;
font-weight: bold;
text-transform: uppercase;
border: 1px solid rgba(0, 0, 0, 0.09);
-webkit-box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
-webkit-border-radius: 2px;
border-radius: 2px;
font-size: 13px;
cursor: pointer;
}
.km-form-button:active {
background: grey;
}
.km-already-subs {
position: absolute;
width: 245px;
bottom: 10px;
right: 15px;
cursor: pointer;
color: #F9B629;
background: #fff;
}
#js-km-sub-lists-container, #js-km-sub-subs-container {
min-height: 38px;
}
Es necesario pasar la versión del widget como parámetro cuando se conecta el archivo CSS para evitar casos de almacenamiento en caché del archivo style.css.
👇Aquí hay un ejemplo de cómo conectar un archivo CSS:
define(['jquery'], function ($) {
var CustomWidget = function () {
var self = this, // para acceder a un objeto desde los métodos
system = self.system(), //este método devuelve un objeto con las variables del sistema
langs = self.langs; //objeto de localización con los datos del archivo de localización (carpetas i18n)
this.callbacks = {
settings: function () {},
init: function () {
// devuelve la configuración del widget
var settings = self.get_settings();
// el archivo CSS verifica si style.css está conectado
if ($('link[href="' + settings.path + '/style.css?v=' + settings.version +'"').length < 1) {
// conecta el archivo style.css pasando la versión del widget como parámetro
$("head").append('<link href="' + settings.path + 'style.css?v=' + settings.version + '" type="text/css" rel="stylesheet">');
}
return true;
},
bind_actions: function () {
return true;
},
render: function () {
return true;
},
dpSettings: function () {},
advancedSettings: function () {},
destroy: function () {},
contacts: {
selected: function () {}
},
leads: {
selected: function () {}
},
onSave: function () {}
};
return this;
};
return CustomWidget;
});
