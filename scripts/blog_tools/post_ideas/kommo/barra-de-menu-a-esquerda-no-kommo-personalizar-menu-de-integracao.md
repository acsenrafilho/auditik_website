---
title: "Barra de Menu à Esquerda no Kommo — Personalizar Menu de Integração"
source: "https://pt-developers.kommo.com/docs/barra-de-menu-%C3%A0-esquerda"
date: "2026-02-25"
---

Seu widget será inicializado no menu à esquerda apenas se você criar uma integração pública.
Ao construir uma integração, você pode optar por adicionar uma nova seção à barra de menu à esquerda ou uma subseção dentro das seções existentes Análise de Dados ou Configurações.
Para diferenciar sua integração das seções padrão no menu à esquerda, a seção adicionada será exibida da maneira como é mostrada na tela.
Para adicionar sua própria seção à barra de menu à esquerda, você precisa adicionar o seguinte código ao manifest.json
{
...
"locations": [
"widget_page"
],
"left_menu": {
"realty_widget_code": {
"title": "lang.code",
"icons": {
"light": "images/light.svg",
"dark": "images/dark.svg"
},
"submenu": {
"sub_item_code_1": {
"title": "lang.code", // seção do código lang
"sort": 2
},
"sub_item_code_2": {
"title": "lang.code",
"sort": 1
}
}
}
},
...
}
Como mostrado, você precisa adicionar "widget_page"
à lista de localizações do widget. Depois de fazer isso, a propriedade "left_menu"
aparecerá junto com a chave "realty_widget_code"
, que é o código da seção do menu à esquerda.
Por padrão, sua nova seção será adicionada como o último ícone no menu abaixo de Configurações, mas você pode alterar sua posição. No exemplo abaixo, ela é movida para abaixo da seção Leads.
{
...
"left_menu": {
"realty_widget_code": {
"title": "lang.code",
"icons": {
"light": "images/light.svg",
"dark": "images/dark.svg"
},
"sort": {
"after": "leads"
},
"submenu": {
"sub_item_code_1": {
"title": "lang.code"
},
"sub_item_code_2": {
"title": "lang.code"
}
}
}
}
...
}
Aqui está a lista de seções que podem ser inseridas como um valor "after"
:
- Painel
- Leads
- Tarefas
- Estatísticas
- Configurações
Para o novo menu à esquerda, Integrações fixadas serão adicionadas a uma lista separada do menu principal, abaixo dos itens padrão. Elas serão posicionadas de acordo com a data de criação (mais recente primeiro), e também pelo valor numérico no campo de distribuição. O parâmetro
após
ouafter
não mais afeta o posicionamento dos itens de integração no novo menu, dado que agora eles estão posicionados somente entre os itens fixados do menu.Itens de submenu são distribuídos em relação uns aos outros somente através do valor numérico no campo
sort
.
Você também pode ocultar seções padrão do menu do sistema, exceto Configurações. Para isso, use este código no manifest.json:
{
...
"left_menu": {
"stats": {
"is_hidden": true
},
"mail": {
"is_hidden": true
}
}
...
}
Lista de seções da barra de menu que podem ser ocultadas:
- Painel
- Leads
- Tarefas
- Estatísticas
Sua integração também pode ser colocada como uma subseção nas seções do sistema Estatísticas (Analytics) e Configurações. Você pode gerenciar a ordem das subseções usando a propriedade "sort". Abaixo está um exemplo do código em manifest.json para adicionar uma nova subseção à seção Estatísticas (Analytics):
{
...
"left_menu": {
"stats": {
"submenu": {
"custom_sub_item_1": {
"title": "lang.code"
},
"custom_sub_item_2": {
"title": "lang.code"
}
}
}
},
...
}
Para processar os cliques nas seções da barra de menu, é fornecido um callback especial chamado initMenuPage
. Esse callback recebe os seguintes tipos de objetos:
{
"location": "widget_page", // "stats" ou "settings"
"item_code": "custom_item_1", // apenas nas seções da barra de menu à esquerda criadas
"subitem_code": "sub_item_1" // código da subseção
}
"location"
recebe o nome da entidade, onde a seção da barra de menu está localizada. Como já sabemos, a seção da barra de menu também pode ser adicionada como uma subseção nas seções existentes do sistema.
Se o usuário entrar na subseção da barra de menu, coloque o código da seção do menu em "item_code"
, e o código da subseção em "subitem_code"
.
Aqui está um exemplo de implementação do callback initMenuPage
:
{
this.callbacks = {
/**
* O método é acionado quando o usuário entra na página do widget personalizada.
* Devemos renderizar a página com base no seu estado atual.
*
* @param {Object} params - Os parâmetros do estado atual da página são:
* @param {string} params.location - A localização atual (e.g., 'widget-page', 'stats', 'settings')
* @param {string} [params.item_code] - O código do item especificado no manifest.json (e.g.,'custom_item_1', apenas para seções personalizadas)
* @param {string} [params.subitem_code] - O código da subseção especificado no manifest.json (e.g.,'custom_sub_item_3',apenas para subseções)
*/
initMenuPage: _.bind(function (params) {
switch (params.location) {
case 'stats': // Para a seção 'stats' só obtemos subitem_code
switch (params.subitem_code) {
case 'sub_item_1':
self.getTemplate(
'stats__sub_item_1',
{},
function (template) {
$('#work-area-' + self.get_settings().widget_code).html('Item de Análises, subseção 1');
});
break;
case 'sub_item_2':
self.getTemplate(
'stats__sub_item_2',
{},
function (template) {
$('#work-area-' + self.get_settings().widget_code).html('Item de Análises, subseção 2');
});
break;
}
break;
case 'settings': //Para a seção 'settings' nenhum item_code ou subitem_code é passado.
// Nenhum tratamento específico é necessário para 'settings'
break;
case 'widget_page': // Para páginas de widgets personalizadas, tanto o item_code quanto o subitem_code são usados
switch (params.item_code) {
case 'custom_item_3':
switch (params.subitem_code) {
case 'sub_item_1':
self.getTemplate(
'custom_item_3__sub_item_1',
{},
function (template) {
$('#work-area-' + self.get_settings().widget_code).html('Item 3, subseção 1');
});
break;
// Trate outros subitens para custom_item_3
}
break;
// Trate outros itens personalizados
}
break;
}
}, self),
}
}
