---
title: "Salesbot no Kommo — Guia de Integração e Fluxos para Desenvolvedores"
source: "https://pt-developers.kommo.com/docs/salesbot"
date: "2026-02-17"
---

Existe a opção de automatizar processos rotineiros criando bots, e, claro, oferecemos a capacidade de estender a funcionalidade dos bots usando widgets.
Para que um widget funcione no construtor de bots, siga estas etapas:
{
...
"locations": [
"salesbot_designer"
],
...
}
Este objeto descreve os campos para exibir a interface de configurações do widget no designer do Salesbot:
"salesbot_designer": {
"logo": "/widgets/my_widget/images/image.jpg",
"handler_name": {
"name": "settings.handler_name",
"settings": {
"text": {
"name": "settings.text",
"default_value": "Olá, eu sou o Salesbot!",
"type": "text",
"manual": true, // true - o usuário deve inserir um valor
// false - o usuário seleciona um valor do campo
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
Os campos na propriedade de configurações podem ter as seguintes opções de tipo:
- text
- numeric
- url (link)
Se essas configurações forem especificadas corretamente, o widget aparecerá na janela modal dos widgets do designer do Salesbot.
As configurações para cada handler são especificadas no arquivo manifest.json e são usadas no código do Salesbot.
Os seguintes callbacks podem ser adicionados ao script.js:
Depois que o usuário configura sua sequência no designer do Salesbot e clica no botão Salvar, o callback onSalesbotDesignerSave
é executado no widget.
O método deve retornar uma string no formato de código JSON para o Salesbot, considerando os códigos de saída do bot.
Ele aceita os seguintes parâmetros de entrada:
handler_code
(o código do handler do objeto no objetosalesbot_designer
)params
(as configurações do widget no formato especificado)
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
No Exemplo 2, o widget de envio de SMS envia uma solicitação ao seu serviço para enviar uma mensagem. Após receber uma resposta, ele entra em um bloco condicional. Se o status da resposta for bem-sucedido, ele segue para o ponto de saída success
. Se o envio falhar e um erro for recebido, ele segue para o ponto de saída fail
. Caso o usuário tenha configurado uma sequência no bot para erros (por exemplo, se o SMS não pôde ser enviado, então enviar um e-mail para o cliente), o bot seguirá essa sequência.
Quando o usuário clicar no botão Adicionar abaixo do widget, o callbacksalesbotDesignerSettings
será acionado. Com esse callback, é possível alterar a aparência do bloco do widget no designer.
O método pode retornar um objeto com a chave exits
, que conterá os possíveis pontos de saída do bloco do widget no bot. Um widget pode ter um ou vários resultados possíveis (por exemplo, a execução pode terminar com um erro, e o bot precisará ser direcionado para um cenário alternativo).
A matriz exits
deve conter objetos com as chaves code
(código de saída) e title
(nome de saída).
O callback aceita os seguintes parâmetros:
body
– objeto jQuery do bloco do widgetrenderRow
– uma função que recebe o nome do campo como parâmetro e retorna a marcação do campo nos estilos do designerparams
– configurações do handler já criado
function(caption) {
return twig({
ref: '/tmpl/salesbot_designer/controls/widget_param.twig',
}).render({
caption: caption,
is_widget: true,
});
}
Exemplos de implementação deste callback:
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
