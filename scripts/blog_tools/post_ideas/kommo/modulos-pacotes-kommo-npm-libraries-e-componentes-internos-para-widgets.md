---
title: "Módulos & Pacotes Kommo: NPM Libraries e Componentes Internos para Widgets"
source: "https://pt-developers.kommo.com/docs/m%C3%B3dulos-e-pacotes"
date: "2026-02-19"
---

Para melhorar o desempenho da Kommo e aumentar a velocidade da sua operação no navegador do cliente, é recomendado reduzir o número de recursos baixados da rede. Uma maneira de alcançar isso é utilizando as bibliotecas de terceiros fornecidas pelo sistema em seus widgets.
Para adicionar qualquer uma dessas bibliotecas ao seu widget, você pode usar a API da versão especificada. Você pode aprender mais sobre a API clicando nos links para o NPM. Para incluir corretamente a biblioteca como uma dependência no seu arquivo script.js, certifique-se de especificar o código do módulo da tabela nas dependências do widget:
define(['jquery', 'moment'], function ($, moment) {
$('#my_widget_selector').css('color', 'red');
console.log(moment().format('DD-MM-YYYY'));
});
Vale ressaltar que os widgets no Kommo podem utilizar certos recursos incorporados para se integrar perfeitamente com o sistema. Um dos recursos mais utilizados é a janela modal, que está localizada no módulo lib/components/base/modal. Isso permite uma experiência mais nativa e coesa dentro da plataforma.
Aqui está um exemplo de como usar o módulo no arquivo script.js:
define(['jquery', 'underscore', 'lib/components/base/modal'], function ($, _, Modal) {
return function () {
var self = this;
this.callbacks = {
init: function () { return true; },
bind_actions: function () {
$(document).on(
'click.' + self.get_settings().widget_code,
'.my_widget_button',
function () {
new Modal({
class_name: '',
init: _.noop,
destroy: _.noop,
container: document.body,
disable_overlay_click: false,
disable_escape_keydown: false,
disable_enter_keydown: false,
init_animation: false,
default_overlay: false,
focus_element: '.js-modal-accept',
});
}
)
},
render: function () { return true; },
destroy: function () {
$(document).off('.' + self.get_settings().widget_code);
return true;
},
settings: function () { return true; },
onSave: function () { return true; }
}
};
});
Se você deseja utilizar um objeto de janela modal em seu código, você precisará conectá-lo através da função require
(define
no início do script.js) e passar os parâmetros necessários: class_name
, init()
, e destroy()
.
O método init()
deve aceitar os dados que você deseja exibir dentro da janela modal, além dos eventos de gatilho (que habilitarão os métodos do objeto modal para serem executados e exibirem a janela modal no DOM).
Este exemplo mostra o uso do objeto Modal:
define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
var CustomWidget = function () {
this.callbacks = {
// ...
bind_actions: function () {
// ...
var data = '<h1>Teste</h1><p>Algum texto</p>';
modal = new Modal({
class_name: 'modal-window',
init: function ($modal_body) {
var $this = $(this);
$modal_body
.trigger('modal:loaded') // gatilhos para exibir a janela modal
.html(data)
.trigger('modal:centrify') // configura a janela modal
.append('');
},
destroy: function () {
}
});
// ...
return true;
}
}
}
return CustomWidget;
});
