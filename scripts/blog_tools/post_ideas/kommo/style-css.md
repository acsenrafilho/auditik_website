---
title: "style.css"
source: "https://developers.kommo.com/docs/style-css"
date: "2025-06-08"
---

To ensure that the widget does not clash with other system elements and widgets, its CSS file should contain unique class names for all main and child elements. Additionally, the styles for child elements should be set in a cascade relative to the base class.
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
It is necessary to pass the widget version as a parameter when connecting the CSS file to avoid cases of caching of the style.css file.
👇There is an example of connecting a CSS file:
define(['jquery'], function ($) {
var CustomWidget = function () {
var self = this, // to access an object from methods
system = self.system(), //this method returns an object with system variables
langs = self.langs; //localization object with data from the localization file (i18n folders)
this.callbacks = {
settings: function () {},
init: function () {
// returns widget settings
var settings = self.get_settings();
// css checks whether style.css is connected
if ($('link[href="' + settings.path + '/style.css?v=' + settings.version +'"').length < 1) {
// connects the style.css file passing the widget version as a parameter
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
