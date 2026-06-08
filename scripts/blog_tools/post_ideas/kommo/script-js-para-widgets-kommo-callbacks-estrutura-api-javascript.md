---
title: "script.js para Widgets Kommo: Callbacks, Estrutura & API JavaScript"
source: "https://pt-developers.kommo.com/docs/scriptjs"
date: "2026-02-19"
---

Um widget é representado como um objeto, contendo propriedades e métodos úteis para trabalhar. Quando o sistema carrega os widgets, ele adiciona a funcionalidade descrita no script.js ao objeto Widget existente no sistema. Isso significa que o objeto CustomWidget
herda propriedades e métodos que serão úteis para trabalhos futuros.
A parte em JavaScript (JS) do widget contém componentes obrigatórios e funções adicionais. Também inclui funções de callback que são acionadas em condições específicas. Vamos examinar a estrutura inicial desse arquivo.
define(['jquery'], function($){
var CustomWidget = function () {
var self = this, // para acessar um objeto a partir dos métodos
system = self.system(), // Método que retorna um objeto com variáveis do sistema
langs = self.langs; // objeto de localização com dados do arquivo de localização (pasta i18n)
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
Todos os três callbacks devem estar presentes no objeto
this.callbacks
. O widget não funcionará nas localizações especificadas (áreas de visibilidade) sem eles.
render: function(){
return true;
}
Ao instalar o widget, o método callbacks.render
é chamado primeiro. Esse método geralmente descreve os passos necessários para exibir o widget. Por padrão, o widget aparecerá apenas no menu de configurações. Para mostrar o widget em outras áreas, como o painel de widgets à direita, você precisa usar métodos específicos dentro dessa função, como os métodos do objeto render()
e/ou render_template()
, que são analisados posteriormente.
É crucial que a função callbacks.render
retorne um valor true
. Pois, sem isso, os métodos callbacks.init
e callbacks.bind_actions
não serão iniciados.
init: function(){
return true;
}
O método init
é executado imediatamente após o callbacks.render
e juntamente com o callbacks.bind_actions
. Normalmente, o método init
é usado para coletar as informações necessárias e realizar outras ações, como comunicação com um servidor de terceiros e autorização de API, caso o widget seja usado para enviar ou solicitar informações. No caso mais simples, ele pode determinar a localização atual do usuário.
Use init
ou bind_actions
se o seu widget reagir a eventos ou precisar ser reinicializado.
O método callbacks.init
deve retornar um valor verdadeiro (true
) para que o trabalho continue.
bind_actions: function(){
return true;
}
Callbacks.bind_actions
é usado para associar eventos às ações do usuário, como quando ele clica em um botão. O método callbacks.bind_actions\
deve retornar true
.
settings: function(){
}
O método callbacks.settings
é acionado quando o usuário clica no ícone do widget na área de configurações. Ele permite adicionar uma janela modal à sua página.
dpSettings: function(){
}
Da mesma forma, o método callbacks.dpSettings
faz o mesmo, mas dentro do escopo do digital_pipeline
.
advancedSettings: function() {
}
Para habilitar o método callbacks.advancedSettings
é necessário especificar a área de conexão do widget advanced_settings
. Esse método é chamado quando o usuário navega até a página de configurações avançadas do widget.
onSave: function () {}
O método callbacks.onSave
é chamado quando o usuário clica no botão Configurar/Salvar nas configurações do widget. Este método deve retornar true
ou um objeto Promise caso seja necessário fazer uma requisição ao seu servidor durante o salvamento.
Ele é útil para enviar dados de formulário e alterar o status do widget. Vale ressaltar que esse método também é acionado quando o widget é desabilitado. O método onSave
é acionado primeiro, seguido pelo método destroy.
leads: { selected: function() {
}
}
Essa função é acionada quando você seleciona itens da lista de leads usando uma caixa de seleção, e então clica no nome do widget no menu adicional que aparece durante a seleção de itens de uma lista. Ela é usada quando você precisa realizar alguma ação com os objetos selecionados.
contacts: { selected: function() {
}
}
Esta função é acionada quando você seleciona itens da lista de contatos usando a caixa de seleção e, em seguida, clica no nome do widget no menu adicional que aparece ao escolher itens da lista. Ela é usada quando você precisa realizar alguma ação com os objetos selecionados.
todo: { selected: function () {}
}
Esta função é acionada quando você seleciona itens da lista de tarefas usando a caixa de seleção e, em seguida, clica no nome do widget no menu adicional que aparece ao escolher itens da lista. Ela é usada quando você precisa realizar alguma ação com os objetos selecionados.
destroy: function(){
}
Esta função também é acionada quando você desabilita o widget através do seu menu de configurações. Por exemplo, se o widget estiver desabilitado, você precisará remover todos os seus elementos do DOM ou tomar qualquer outra ação necessária. Além disso, essa função também é chamada quando você alterna entre as áreas de exibição do widget.
A função define a lógica da fonte e é acionada quando uma fonte, como um SMS, é utilizada.
onSalesbotDesignerSave: function (handler_code, params) {}
A função define a lógica da ação do widget e é chamada quando o widget é adicionado ao construtor do Salesbot durante o processo de salvamento.
onAddAsSource: function (pipeline_id) {}
}
A função é chamada ao adicionar um widget como uma fonte nas configurações do pipeline digital.
onInstall: function () {
}
Um callback opcional que é chamado uma única vez quando o widget é instalado. Ele é usado para executar lógica de inicialização, como criar dados iniciais ou verificar o ambiente. Um erro no onInstall
não interrompe o processo de instalação.
Não se esqueça de que, ao trabalhar com
this
dentro dos callbacks, você não poderá acessar os métodos do objetoWidget
. Portanto, criamos uma variávelself
, mas você pode usar qualquer outro método conveniente para você.
Neste exemplo, vamos mostrar como você pode utilizar o objeto de callback com funções adicionais, junto com algumas funções do objeto widget. Todas essas funções são explicadas em detalhes nos exemplos abaixo. Sugerimos que você percorra o código e consulte as descrições das funções do objeto widget para mais informações.
O widget que temos aqui permitirá selecionar os contatos marcados na sua lista de contatos e enviar seus números de telefone e endereços de e-mail para um servidor de terceiros.
As funções usadas neste exemplo são descritas em detalhes abaixo. Para começar, você deve focar no objeto callbacks.
define(['jquery'], function ($) {
var CustomWidget = function () {
var self = this,
system = self.system;
this.get_ccard_info = function () // Coletando informações de um cartão de contato
{
if (self.system().area == 'ccard') { // Na área do cartão de contato
var phones = $('.card-cf-table-main-entity .phone_wrapper input[type=text]:visible'), // Identificar os números de telefone
emails = $('.card-cf-table-main-entity .email_wrapper input[type=text]:visible'), // Identificar os endereços de e-mail
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
this.sendInfo = function (person_name, settings) // Enviando as informações coletadas
{
self.crm_post(
'http://example.com/index.php',
{
// Enviando dados POST
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
} // Não renderizar contatos/adicionar || leads/adicionar
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
selected: function () { // Lógica para a seleção múltipla de contatos e o clique no nome do widget
var c_data = self.list_selected().selected;
$('#js-sub-lists-container').children().remove(); // O contêiner é limpo e, em seguida, os elementos são coletados no contêiner, selecionados na lista list.container – bloco div do widget, exibido na coluna da direita
var names = [], // Array de nomes
length = c_data.length; // Número de IDs selecionados (a contagem começa do 0)
for (var i = 0; i < length; i++) {
names[i] = {
emails: c_data[i].emails,
phones: c_data[i].phones
};
}
console.log(names);
for (var i = 0; i < length; i++) {
$('#js-km-sub-lists-container').append('<p>Email:' + names[i].emails + ' Telefone:' + names[i].phones + '</p>');
}
$(self.contacts).remove(); // Limpa a variável
self.contacts = names;
}
},
leads: {
selected: function () {
//Isso descreve o comportamento ao selecionar múltiplos contatos e clicar no nome do widget
var c_data = self.list_selected().selected;
$('#js-sub-lists-container').children().remove(); //O contêiner é limpo, e então os itens selecionados na lista são coletados no contêiner. O contêiner é o bloco div do widget, exibido na coluna da direita
var names = [], // Array de nomes
length = c_data.length; //Número de IDs selecionados (a contagem começa do 0)
for (var i = 0; i < length; i++) {
names[i] = {
emails: c_data[i].emails,
phones: c_data[i].phones
};
}
console.log(names);
for (var i = 0; i < length; i++) {
$('#js-km-sub-lists-container').append('<p>Email:' + names[i].emails + ' Telefone:' + names[i].phones + '</p>');
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
O objeto widget fornece vários métodos e funções úteis que podem ser utilizados para realizar diversas tarefas.
Este método específico foi projetado para trabalhar com o motor de templates twig.js engine, sobre o qual você pode aprender mais.
O método render()
funciona como um wrapper para o twig.js e aceita dois parâmetros: as informações do template (data
) e os dados necessários para renderizar o template (params
). Quando esses parâmetros são passados para o método, ele retorna o resultado do template renderizado ao executar o código result = twig(data).render(params)
.
Para ilustrar como isso funciona, vamos examinar um exemplo simples de um template.
var params = [
{name:'nome1',
id: 'id1'},
{name:'nome2',
id: 'id2'},
{name:'nome3',
id: 'id3'}
]; // Array de dados enviados para o template
var template = '<div><ul>' +
'{% for person in names %}' +
'<li>Name : {{ person.name }}, id: {{ person.id }}</li>' +
'{% endfor %}' + '</ul></div>';
console.log(self.render({data: template},{names: params}));
Como resultado, obtemos o markup:
Name: nome1, id: id1
Name: nome2, id: id2
Name: nome3, id: id3
Você pode passar um dos templates do nosso sistema para a função. Para isso, é necessário especificar um link para o template no objeto de dados passado: ref: ‘/tmpl/controls/#TEMPLATE_NAME#.twig
’, onde #TEMPLATE_NAME#
é um dos templates do sistema.
Por exemplo, para criar uma lista suspensa, usamos o template select.twig
:
m_data = [
{option:'opçao1',
id: 'id1'},
{option:'opçao2',
id: 'id2'},
{option:'opçao3',
id: 'id3'}
]; // Array de dados enviados para o template
var data = self.render(
{ref: '/tmpl/controls/select.twig'},// O objeto de dados, neste caso, contém apenas uma referência ao template
{
items: m_data, // Data
class_name:'subs_w', // Especificação da classe
id: w_code +'_list' // Especificação de Id
});
Para visualizar a marcação dos dados, é necessário adicionar dados ao DOM. A marcação da lista suspensa foi projetada no estilo do nosso sistema.
Leia mais sobre controles de formulário nativos.
Ao usar o método render()
você pode fornecer referências não apenas aos templates existentes do sistema, mas também aos seus próprios templates. Para isso, será necessário criar uma pasta de templates dentro da pasta do nosso widget e colocar nela o template template.twig.
Aqui está um exemplo de como renderizar um template:
var params = {}; // dados vazios
var callback = function (template){ // função de callback, chamada se o template for carregado; é passado um objeto template
var markup = template.render(params); //
/*
* Depois o código para adicionar a marcação ao DOM
*/
};
var s = self.render({
href:'templates/template.twig', // endereço do template
base_path: self.params.path; // A forma base para o diretório com o widget
load: callback // A função de callback ocorrerá apenas se o template existir e for carregado
}, params); // Parâmetros para o template
Para chamar uma função de callback quando um template existir em um endereço de link específico, você pode passar a função como um parâmetro junto com o nome do template para a função getTemplate
. O objeto template, que contém o método render com os parâmetros necessários para a renderização, será então passado para a função de callback. Se o template existir na pasta, a função de callback será chamada.
Para simplificar o processo, criaremos uma função chamada getTemplate
, passando os seguintes parâmetros para ela: o parâmetro template
é o nome do template que existe na pasta de templates dentro da pasta do widget, o parâmetro params
é o objeto de parâmetros para o template, e o parâmetro callbacks é a função de callback que será chamada após o carregamento do template; neste caso, vamos adicionar o template à janela modal.
this.getTemplate = function (template, params, callback) {
params = (typeof params == 'object') ? params : {};
template = template || '';
return this.render({
href: '/templates/' + template + '.twig',
base_path: this.params.path, // O widget retornará ao objeto /widgets/#WIDGET_NAME#
load: callback // Chamar uma função de callback
}, params); // Parâmetros para o template
}
settings: function () {
self.getTemplate( // Chamar a função
'login_block', // Especificar o nome do template que temos na pasta com o widget dentro da pasta templates
{}, /* Dados vazios para o template, pois primeiro iremos requisitar o template. Se ele existir, a função de callback chamará uma função para adicionar os dados ao template. Veja abaixo */
function (template) {
template.render({ // parâmetros para o template
title: self.i18n('settings').title,
widget_code: self.get_settings().widget_code
})
}
);
}
Esta função recebe uma marcação HTML ou um template com dados para renderização e a envolve em um wrapper padrão do widget antes de colocá-la no painel direito dos widgets. Ela funciona da mesma forma que o método render()
e complementa a marcação passada com a marcação armazenada na variável template_element
do objeto widget.
/*
* html_data armazena a marcação que precisa ser colocada no painel direito dos widgets
*/
var html_data ='<div id="w_logo" class="nw_form">' + '<div id="js-sub-subs-container">' + '</div>' + '<div class="nw-form-button">BUTTON</div></div>' + '<div class="already-subs"></div>';
self.render_template(
{
caption:{
class_name:'new_widget', // Nome da classe para o wrapper da marcação
},
body: html_data,// Marcações
render : '' // O template não é enviado
}
)
No exemplo anterior, mostramos como renderizar uma página HTML básica sem usar templates. No entanto, o método render_template()
oferece uma maneira mais eficiente de gerar conteúdo HTML, permitindo que passemos um template e dados como parâmetros. Alternativamente, também podemos passar uma referência ao template, de forma similar ao método render()
.
/*
* Aqui, o template e os dados para o template são passados como parâmetros
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
b_name:"Botão" // Neste caso, é melhor passar uma referência para lang via self.i18n()
}
);
Vemos um widget criado por um template no painel de widgets no painel direito.
Este método foi projetado para enviar uma solicitação ao seu servidor remoto via o servidor proxy da Kommo.
Seu uso é essencial porque, ao trabalhar com a Kommo, o usuário opera utilizando um protocolo seguro SSL, e o navegador pode impedir solicitações entre domínios.
A melhor abordagem é ter um certificado SSL assinado no lado do sistema interno e trabalhar sobre HTTPS. A função é semelhante ao jQuery.post() , com a capacidade adicional de capturar um erro.
self.crm_post (
'http://www.test.com/file.php',
{
name: 'meunome',
login:'meulogin',
password: 'minhasenha'
} // Passamos os dados POST usando o modelo de objeto JavaScript
,
function(msg)
{
alert('Está tudo certo');
},
'text',
function(){
alert ('Erro');
}
)
Se você quiser obter dados do sistema (como user_id
, area
etc.), também será necessário usar este método, que retornará os dados em um objeto JavaScript.
Esta função permite adicionar propriedades ao widget
self.set_settings({parameter:"text"}); //A configuração é criada com o parâmetro name e o valor text
self.get_settings();// Em resposta, você receberá um array com a propriedade já criada
Este método é necessário para recuperar a entrada do usuário a partir do widget e retorná-la como um objeto JavaScript.
Example of the response
{
login: "NovoTeste",
password: "teste",
maybe: "Y"
}
Há outro método que permite extrair um objeto específico dos arquivos de idioma. Este objeto conterá mensagens nos locais de idioma que o usuário está utilizando. Para usar este método, você precisa passar o nome do objeto que deseja extrair como parâmetro.
Chame o método self.i18n('userLang')
e obtenha uma resposta:
{
firstWidgetText: "Clique no botão para enviar os dados a um servidor de terceiros:",
textIntoTheButton: "Enviar dados",
responseMessage: "Resposta do Servidor:",
responseError: "Erro"
}
Esta função permite alterar as configurações padrão para arquivos da pasta i18n. O objeto de idioma atual é armazenado na variável langs do objeto widget.
langs = self.langs; // Chamando o objeto atual
langs.settings.apiurl = 'apiurl_new'; // Alterar o nome do campo
self.set_lang(langs); // Alterar o objeto atual para um objeto com um campo alterado
console.log(self.langs); // Saída no console para verificar se o nome foi alterado
Esta função recupera uma lista de contatos ou leads selecionados da respectiva tabela e a retorna como um array de objetos. Os objetos contêm duas propriedades: count_selected e selected. Um dos objetos selecionados contém um array de objetos com caixas de seleção, que incluem propriedades de e-mails, IDs, telefones e tipo.
console.log(self.list_selected().selected); // Retorna dois objetos, escolha o objeto selected
// Resultado:
/*0: Object
emails: Array[1]
id: #id#
phones: Array[1]
type: "contact" */
Outra função que vem com este widget é usada para alternar a sobreposição que aparece quando o widget é chamado a partir da lista de contatos ou leads.
Para isso, você precisa passar um valor de true ou false como argumento para a função. Quando definido como true, a sobreposição será ativada, enquanto definir como false a desativará.
self.widgetsOverlay(true);
Quando o usuário estiver trabalhando na lista de contatos e empresas, ele pode chamar uma função clicando no número de telefone ou no endereço de e-mail de um contato.
Esta função possui dois parâmetros: type
e action
. O type
pode ser "email"
ou "phone"
, e action
é a função chamada quando o usuário clica no número de telefone ou no endereço de e-mail.
self.add_action("phone",function(){
/*
* Código de interação com o widget VoIP
*/
});
Você pode adicionar uma nova fonte ao final do cartão de lead , contato, ou empresa . Esta função tem dois parâmetros: source_type
e handler
. O source_type
é sempre "sms"
, e o handler
é a função chamada quando o botão finalizar é clicado. Atualmente, apenas um tipo de fonte ("sms"
) pode ser especificado, e a função handler deve sempre retornar um objeto Promise.
self.add_source("sms", function(params) {
/*
params - este é o objeto no qual estarão os parâmetros necessários para o envio do SMS
{
"phone": 75555555555, // Número de telefone do destinatário
"message": "texto sms", // Mensagem a ser enviada
"contact_id": 12345 // ID do contato ao qual o número de telefone está vinculado
}
*/
return new Promise(function (resolve, reject) {
// Aqui será descrita a lógica para o envio de SMS
$.ajax({
url: '/widgets/' + self.system().subdomain + '/loader/' + self.get_settings().widget_code +'/send_sms',
method: 'POST',
data: params,
success: function () {
// Se for bem-sucedido, uma nota como ‘sms’ será criada
resolve();
},
error: function () {
reject();
}
});
});
});
Esta função permite descobrir a qual pipeline o widget está conectado como uma fonte. Está disponível se houver uma árealead_sources
no manifest.json.
self.get_pipeline_id()
.then(function (pipeline_id) {
// A partir daqui, você pode iniciar uma solicitação usando o ID do pipeline
})
.catch(function () {
// Tratamento do caso em que o widget não está anexado ao pipeline
});
Um widget pode ter um de três status, que são exibidos na área de configurações e no ícone do widget.
Os status disponíveis são instalar quando o widget não está ativo, desinstalar quando o widget está ativo, e erro quando o widget está em um estado de erro.
Se um widget depender de dados inseridos pelo usuário para uma API de um serviço de terceiros, e esses dados forem inseridos incorretamente, você pode usar o status erro para exibir o problema.
self.set_status('error');
Este método retornará o número da versão do widget; ele pode ser usado para redefinir o cache estático após uma atualização. Os dados são retornados como uma string (por exemplo, 0.0.1).
Este método retornará o status de instalação do widget. Os dados são retornados como uma string.
Os status disponíveis são instalar quando o widget não está ativo, desinstalar quando o widget está ativo, e not_configured (o tour do widget foi concluído, mas as configurações não estão preenchidas).
Retorna os dados da conta sem a solicitação à API (o resultado não corresponde completamente à resposta da API; se os dados necessários não estiverem disponíveis, será necessário fazer uma solicitação).
Este método não requer solicitações de rede e fornece dados úteis de contato na área do cartão.
Os cartões de lead e empresa fornecem dados sobre os contatos relacionados, e o próprio cartão de contato fornece dados para esse contato.
Dados retornados pelo método:
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
O próprio método retorna uma Promise
.
