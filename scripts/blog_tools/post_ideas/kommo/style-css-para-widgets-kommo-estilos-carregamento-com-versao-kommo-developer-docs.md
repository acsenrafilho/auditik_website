---
title: "style.css para Widgets Kommo: Estilos & Carregamento com Versão | Kommo Developer Docs"
source: "https://pt-developers.kommo.com/docs/stylecss"
date: "2026-02-19"
---

Para garantir que o widget não entre em conflito com outros elementos do sistema e widgets, seu arquivo CSS deve conter nomes de classes exclusivos para todos os elementos principais e filhos. Além disso, os estilos para os elementos filhos devem ser definidos em cascata em relação à classe base.
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
É necessário passar a versão do widget como um parâmetro ao conectar o arquivo CSS para evitar casos de cache do arquivo style.css.
👇Aqui está um exemplo de conexão de um arquivo CSS:
define(['jquery'], function ($) {
var CustomWidget = function () {
var self = this, // Para acessar um objeto a partir dos métodos
system = self.system(), //Este método retorna um objeto com variáveis do sistema
langs = self.langs; //Objeto de localização com dados do arquivo de localização (pastas i18n)
this.callbacks = {
settings: function () {},
init: function () {
// Retorna as configurações do widget
var settings = self.get_settings();
// O CSS verifica se o arquivo style.css está conectado
if ($('link[href="' + settings.path + '/style.css?v=' + settings.version +'"').length < 1) {
// Conecta o arquivo style.css passando a versão do widget como parâmetro
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
