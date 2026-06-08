---
title: "SDK do Cartão Kommo: Construir Widgets para Cartões de CRM"
source: "https://pt-developers.kommo.com/docs/sdk-do-cart%C3%A3o"
date: "2026-02-19"
---

O sistema permite incorporar o widget em três locais diferentes dentro dos cartões: lead, contato e empresa. Isso pode ser feito das seguintes maneiras:
- Adicionando uma nova aba nos cartões de lead, contato e empresa.
- A capacidade de adicionar seu manipulador para a ação Chamar no menu de contexto do número de telefone do contato no cartão de negociação. Capacidade de adicionar o item Escrever primeiro ao menu de contexto do número de telefone do contato no cartão de negociação.
- Adicionando uma nova fonte no controle de submissão na parte inferior do feed do cartão.
- Exibindo o modelo do widget no painel lateral direito.
Você precisa especificar todos os locais do cartão onde o widget deve funcionar:
lcard
(lead)ccard
(contato)comcard
(empresa)
Usando este método, o desenvolvedor pode adicionar uma nova aba ao cartão da entidade. Esta aba adicionada exibirá diversos produtos que podem ser vinculados e desvinculados da entidade, além de permitir a busca por eles e a alteração de suas quantidades.
Caso você não utilize o mecanismo padrão para trabalhar com produtos, pode usar callbacks nesta seção para exibir dados arbitrários em uma aba no cartão.
Para adicionar uma nova aba, siga estes passos:
- No arquivo manifest.json especifique as áreas necessárias no objeto de localizações (
lcard-0
,ccard-0
,comcard-0
,settings
,card_sdk
). - Implemente os métodos do objeto de callback descritos abaixo para renderizar os produtos no cartão da entidade.
Quatro métodos devem ser criados no objeto de callbacks no arquivoscript.js do widget,
loadPreloadedData
loadElements
linkCard
searchDataInCard
O métodoloadPreloadedData()
é acionado quando a aba do widget é inicializada.
É responsável por exibir os dados que devem ser adicionados ao cartão quando o campo de busca é aberto.
O método retorna um objeto Promise que, após a conclusão da solicitação, retorna um array de objetos.
Um exemplo de um objeto no array:
{
"id": 934244, // ID
"sku": "SNI/01/136/0500", // Código de Unidade de Manutenção de Estoque (SKU)
"name": "Nome", // titulo do item
"price": "999" // preço do item
}
Um exemplo :
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
Se o seu widget não trabalhar com produtos, mas você precisar renderizar alguns dados na aba, você pode usar este método com o seguinte conteúdo:
loadPreloadedData: function () {
var $widget_tab = $('#' + self.get_settings().widget_code);
$widget_code.html('corpo do widget aqui');
return Promise.resolve({});
}
Este método é chamado durante a inicialização da aba associada ao widget.
Ele é responsável por exibir os elementos vinculados ao cartão.
O método retorna um objeto Promise que, após a conclusão da solicitação, retorna um array de objetos.
Um exemplo de um objeto no array:
{
"id": 934244, // ID
"sku": "SNI/01/136/0500", // Código de Unidade de Manutenção de Estoque (SKU)
"name": "Nome", // titulo do item
"price": "999", // preço do item
"quantity": 2 // quantidade de itens
}
Um exemplo :
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
Parâmetros
O método é invocado ao salvar itens vinculados aos cartões, modificar a quantidade e desvinculá-los.
Ele é responsável por vincular e desvincular itens de um cartão.
O que deve ser passado para o método:
Um exemplo de uso do método:
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
O método é chamado ao buscar itens.
Ele é responsável por exibir os itens encontrados.
O método retorna um objeto Promise que, após a conclusão da solicitação, retorna um array de objetos.
Um exemplo de um objeto no array:
{
"id": 934244, // ID
"sku": "SNI/01/136/0500", // Código de Unidade de Manutenção de Estoque (SKU)
"name": "Name", // titulo do item
"price": "999" // preço do item
}
Um exemplo de uso do método:
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
Parâmetros do método
O Kommo permite que os gerentes façam chamadas a partir de qualquer cartão de contato, empresa ou lead, simplesmente clicando no número de telefone no cartão.
Essa funcionalidade é implementada usando a função add_action(type, action)
:
Por exemplo, você pode usar a função add_action(type, action)
colocando-a na função de retorno de chamada init
, que faz parte da estrutura do script.js.
init: function(){
/*
* add call_to action
* type: phone
* Valor do campo telefone
*/
self.add_action('phone', function(data){
self.crm_post (
/* Envie a solicitação para o seu serviço VoIP
* Para realizar a discagem do número
* O método crm_post (url, data, callback, type, error)
*/
'http://yourservice.com/dealmethod.php',
{
call_to: data.value
},
function(msg){
alert('A chamada é realizada');
},
'texto',
function(){
alert ('Erro');
}
);
});
}
Você precisa declarar as localizações do widget no manifest.json para executar a função
add_action(type, action)
. Você deve configurar essas localizações onde os números de telefone são exibidos.
O seguinte exemplo especifica todas as localizações do widget onde os números de telefone podem ser encontrados.
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
Se você quiser alterar o rótulo do botão que aparece ao clicar em um número de telefone ou endereço de e-mail, será necessário fazer as alterações necessárias no arquivo de localização .json localizado no diretório i18n da estrutura do seu widget.
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
Se o parâmetro call_action
não for especificado, o rótulo do botão será o nome do seu widget, que é um parâmetro obrigatório no manifest.json. O valor de call_action"
será automaticamente inserido no botão quando o widget for inicializado.
Ele permite especificar uma nova origem que será exibida na parte inferior do feed do cartão de lead, contato ou empresa.
Para fazer isso, você deve chamar o método this.add_source(source_type, callback [,source_text])
do objeto Widget
.
Geralmente, é melhor selecionar um source_type
específico e usar custom
apenas se nenhuma das outras opções for adequada. Nesse cenário, fontes externas funcionarão da mesma forma que fontes do sistema.
Se o source_type
for sms
, então o controle do sistema é utilizado, e o callback é uma função que é acionada ao clicar no botão Enviar.
Nessa situação, o callback deve sempre retornar um objeto Promise.
Um exemplo:
self.add_source('sms', function (params) {
/*
params - Um objeto com os parâmetros necessários para o envio de SMS, passado para o callback
{
'phone': 75555555555, // Número de telefone do destinatário
'message': 'sms text', // Mensagem a ser enviada
'contact_id': 12345 // ID do contato associado ao número de telefone
}
*/
return new Promise(function (resolve, reject) {
// O local para a lógica de envio de SMS
$.ajax({
url: '/widgets/' + self.system().subdomain + '/loader/' + self.get_settings().widget_code + '/send_sms',
method: 'POST',
data: params,
success: function () {
// Se bem-sucedido, uma nota do tipo ‘sms’ será criada automaticamente
resolve();
},
error: function () {
reject();
}
});
});
});
Se o tipo de fonte for diferente, um elemento de controle JQuery será passado para o callback para criar qualquer lógica.
self.add_source('email', function ($el) {
console.log($el);
}, 'Gmail');
Se o seu widget estiver localizado no painel direito, para que o sistema conte corretamente o número de widgets no painel direito antes de exibir o cartão, você deve especificar o sufixo 1
na localização. Por exemplo, se o widget for usado no cartão de lead e aparecer no painel direito, as localizações no manifest.json
devem ser definidas da seguinte maneira:
{
...,
"locations": [
"lcard-1"
],
...
}
Para garantir que seu bloco seja exibido corretamente no painel direito, use o método render_template()
no callback render
do widget. Aqui está um exemplo de como chamá-lo com os parâmetros necessários:
self.render_template({
body: '',
caption: {
class_name: 'widget-caption-unique-class-name'
},
render: '<div class="widget-body-unique-class-name">' +
‘número de leads: {{contagem}}’ +
'</div>'
}, { contagem: 10 });
O sistema criará automaticamente o cabeçalho com o logo. Você pode fornecer sua legenda e ajustar os estilos usando as imagens localizadas na pasta images
do widget.
