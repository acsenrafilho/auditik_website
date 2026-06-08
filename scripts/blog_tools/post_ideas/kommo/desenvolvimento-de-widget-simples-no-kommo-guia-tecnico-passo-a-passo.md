---
title: "Desenvolvimento de Widget Simples no Kommo: Guia Técnico Passo a Passo"
source: "https://pt-developers.kommo.com/docs/desenvolvimento-de-widget-simples"
date: "2026-02-19"
---

Neste tutorial, explicaremos como criar um widget básico que pode ser usado para integração privada.
Os objetivos principais deste tutorial são:
- fornecer uma compreensão detalhada de como um widget funciona
- demonstrar a comunicação entre diferentes arquivos dentro do widget
Um widget é uma pequena aplicação ou ferramenta funcional que pode ser integrada à plataforma Kommo para ampliar suas capacidades e melhorar sua funcionalidade.
Widgets na Kommo são usados para fornecer recursos adicionais, otimizar fluxos de trabalho e melhorar a experiência do usuário, permitindo interação perfeita com serviços de terceiros ou funcionalidades personalizadas diretamente na interface do CRM.
Antes de começar a trabalhar em um widget, há várias coisas que você precisa saber ou explorar.
1. Conta na Kommo
Para criar uma integração e fazer upload de um widget, você precisa registrar uma conta na Kommo. Você pode usar qualquer tipo de conta (trial/técnica/corporativa) para fazer upload e testar seu widget, mas recomendamos usar uma conta trial para testar sua integração.
2. Usuário confiante da Kommo
Para desenvolver para usuários do Kommo, você deve ser um usuário experiente. Leva tempo para entender como o sistema funciona e como diferentes objetos interagem entre si. Caso só conheça o nome do Kommo, recomendamos explorar a plataforma. Isso ajudará a entender melhor as necessidades dos futuros usuários do seu widget.
3. Use o VS Code
Você deve estar familiarizado com o uso do VS Code ou outro editor de código. Desenvolvedores podem usar o VS Code para construir, editar e depurar código e, em seguida, publicar facilmente o aplicativo que estão criando.
4. Conhecimento básico de CSS e HTML
Espera-se algum conhecimento de CSS e HTML, já que um widget está focado na parte visual de uma integração. Eles são fundamentais para o desenvolvimento web, com o HTML fornecendo a estrutura básica e o CSS adicionando elementos de estilo.
Não temos como objetivo ensinar programação.
5. Conhecimento confortável de JavaScript
O arquivo script.js é escrito em JavaScript.
Para desenvolver um widget, você deve ter um bom entendimento de JavaScript.
Você precisa estar familiarizado com conceitos como variáveis, funções, objetos, arrays e manipulação do DOM.
➕ Além disso, conhecimento sobre manipulação de eventos, programação assíncrona e AJAX será benéfico para criar widgets interativos e dinâmicos.
6. Familiaridade com JQuery
JQuery é uma biblioteca JavaScript criada para facilitar seu trabalho.
$(document).ready(function(){
$("p").click(function(){
$(this).hide();
});
});
7. Conhecimento de Twig
Certifique-se de estar familiarizado com o Twig. Twig é um mecanismo de template projetado para gerar HTML. É usado principalmente com PHP, mas aqui é combinado com JavaScript para gerar HTML no lado do cliente em vez de no servidor.
Exemplo de um arquivo delete_button.twig:
<span id="{{ id }}" class="button-delete {{ class_name }}">
<span class="icon icon-delete-trash"></span>
{{text}}
</span>
No Kommo, um widget é um arquivo compactado contendo múltiplos arquivos.
Alguns arquivos são obrigatórios, outros adicionam funcionalidades e design.
Vamos olhar mais de perto cada componente do widget.
O arquivo manifest.json é o principal de um widget. Ele conecta arquivos de localização, imagens e arquivos JS.
Este arquivo inclui o nome do widget, descrição, imagens, versão, arquivos de linguagem e diferentes tipos de configurações.
No manifest.json, você deve indicar em qual Marketplace seu widget será exibido (escolher os idiomas aqui), em qual parte do sistema seu widget será inicializado (ex.: perfil de contato ou pipeline digital), um e-mail para dúvidas de clientes e mostrar a versão do widget..
Um widget é representado como um objeto contendo propriedades e métodos úteis. Quando o sistema carrega widgets, ele adiciona a funcionalidade descrita em script.js ao objeto existente do sistema Widget. Isso significa que o objeto CustomWidget
herda propriedades e métodos que serão úteis para trabalhos posteriores.
O JavaScript (JS) do widget contém componentes obrigatórios e funções adicionais, incluindo funções de callback acionadas em condições específicas.
Com o script.js, você tem uma ferramenta simples para interagir com o DOM e realizar requisições cross-domain. Você pode usá-lo para criar widgets de texto básico, modificar o design dos elementos da página, gerar blocos de informação a partir de dados externos ou enviar dados para serviços externos. Essas alterações funcionarão imediatamente para todos os usuários da sua conta.
A pasta i18n é onde você adiciona arquivos de localização.
Se deseja que seu widget esteja disponível em todos os idiomas, adicione arquivos de localização como en.json, es.json, pt.json.
Se houver mais de uma localização, todas devem ter a mesma estrutura.
Exemplo
{
"widget":{
"name":"My Widget",
"short_description":"Short description",
"description":"Full description",
"tour_description":"Tour description"
}
}
{
"widget":{
"name":"Mi Widget",
"short_description":"Descripción breve",
"description":"Descripción completa",
"tour_description":"Descripción del Tour"
}
}
{
"widget":{
"name":"Meu widget",
"short_description":"Descrição curta",
"description":"Descrição completa",
"tour_description":"Descrição de tour"
}
}
Você pode passar um dos templates do nosso sistema para a função; para isso, é necessário especificar um link para o template no objeto de dados passado: ref: ‘/tmpl/controls/#TEMPLATE_NAME#.twig’
, onde #TEMPLATE_NAME#
é um dos templates do sistema.
Você passa ref: ‘/tmpl/controls/#TEMPLATE_NAME#.twig
e os parâmetros do template para o método self.render()
.
Dessa forma, não é necessário adicionar templates à pasta templates.
define(['jquery'], function ($) {
'use strict';
return function () {
var self = this;
this.callbacks = {
render: function () {
return true;
},
init: function () {
return true;
},
bind_actions: function () {
return true;
},
settings: function () {
var $modal_body = $('.modal.' + self.get_settings().widget_code + ' .modal-body'),
$widget_settings = $modal_body.find('.widget_settings_block');
$widget_settings.html(
self.render({ ref: '/tmpl/controls/button.twig' }, {
text: 'Button'
})
);
return true;
},
onSave: function () {
return true;
}
};
};
});
Um botão do exemplo acima ficará assim.
Você pode passar outro parâmetros além de text
.
Por exemplo, se você passar true
para o parâmetro blue
o botão ficará azul.
Você pode fornecer referências não apenas para modelos existentes do sistema, mas também para seus próprios modelos. Para isso, será necessário criar uma pasta templates dentro da pasta do widget e colocar o modelo twig nela.
Mesmo que seu widget não seja exibido explicitamente em nenhum lugar, exceto na seção de integração, ainda será necessário fazer upload da pasta images .
Número de logotipos a serem enviados: 5
🌠logo_min.png
🎑 logo_medium.png
🌁logo_main.png
🏞logo.png
🌇logo_small.png
Se o seu widget for inicializado no Digital Pipeline, você também deve adicionar logo_dp.png à pasta images.
Outras imagens (exceto imagens de slideshows) podem estar nos formatos SVG ou JPG.
O arquivo CSS contém os estilos do widget.
Para garantir que o widget não entre em conflito com outros elementos do sistema e widgets, seu arquivo CSS deve conter nomes de classes exclusivos para todos os elementos principais e filhos.
- Você deve se lembrar de que, se criar um widget público, ele estará disponível para todos no Marketplace (no idioma correspondente), mas, se criar um privado, será necessário instalá-lo em cada conta onde se espera que seja utilizado.
- Um widget privado não é inicializado na barra de menu à esquerda.
Ao planejar este tutorial, queríamos algo que demonstrasse a interação entre diferentes campos (incluindo campos personalizados), algo que utilizasse variáveis de ambiente, permitisse adicionar templates, mostrasse como executar uma ação ao clicar em outra parte do sistema e que possibilitasse conceder diferentes direitos aos usuários.
Então, tivemos a ideia de um widget de Aniversário.
Nas configurações do widget, é possível:
- Escolher um perfil (Contato ou Lead) com um campo personalizado de Aniversário.
- Caso não possua esse campo, você pode criá-lo nas configurações.
- Escolher um perfil onde uma tarefa será criada, o tipo da tarefa, os usuários responsáveis pela tarefa e o texto da tarefa.
- Criar um template que possa ser enviado ao cliente.
Se for o dia do aniversário do cliente e o usuário responsável pela tarefa acessar o perfil do cliente, uma tarefa será gerada. Se outro usuário responsável ou o mesmo usuário abrir o perfil novamente, a tarefa não será recriada.
O widget será exibido no painel direito de um perfil de lead. Se a data atual coincidir com a data de aniversário definida no perfil do lead ou do contato, será exibido um botão Enviar felicitações de aniversário. Caso contrário, aparecerá uma mensagem informando que nenhum de seus clientes comemora aniversário neste dia.
Ao clicar no botão, será aberta uma lista de templates com os templates do widget no topo, permitindo que você escolha um deles para enviar ao cliente.
Vamos dar uma olhada no esqueleto do widget e em sua parte principal, manifest.json.
{
"widget": {
"name": "widget.name",
"description": "widget.description",
"short_description": "widget.short_description",
"version": "1.0.1",
"interface_version": 2,
"init_once": false,
"locale": [
"en",
"pt",
"es"
],
"installation": true,
"support": {
"link": "https://kommo.com",
"email": "[email protected]"
}
},
"locations": [
"settings",
"lcard-1",
"ccard-0"
],
"tour": {
"is_tour": true,
"tour_images": {
"en": [
"/images/slideshow_1_en.jpg",
"/images/slideshow_2_en.jpg",
"/images/slideshow_3_en.jpg"
],
"es": [
"/images/slideshow_1_es.jpg",
"/images/slideshow_2_es.jpg",
"/images/slideshow_3_es.jpg"
],
"pt": [
"/images/slideshow_1_pt.jpg",
"/images/slideshow_2_pt.jpg",
"/images/slideshow_3_pt.jpg"
]
},
"tour_description": "widget.tour_description"
},
"settings": {
"custom": {
"name": "settings.custom",
"type": "custom",
"required": false
}
}
}
Analisaremos cada parte do widget com mais detalhes.
"widget": {
"name": "widget.name",
"description": "widget.description",
"short_description": "widget.short_description",
Aqui, mostramos que o nome do widget, a descrição e uma breve descrição serão retirados de arquivos de localização.
"version": "1.0.1",
"interface_version": 2,
"init_once": false,
Aqui, você define a versão do seu widget, mas como não é necessário atualizar um widget privado, você pode passar qualquer versão aqui.
"interface_version"
deve ser sempre definido como 2
.
Como o widget que estamos desenvolvendo não é VoIP, configuramos "init_once"
como false
.
O método init_once
é responsável pela inicialização do widget. Se não houver um contexto comum para todas as páginas, você deve definir como false
.
"locale": [
"en",
"pt",
"es"
],
Como estamos criando um widget que pode ser visualizado ao alternar idiomas, mencionamos todos os idiomas que suportamos no array "locale"
.
"en"
representa o inglês.
"pt"
representa o português.
"es"
representa o espanhol.
Definimos "installation"
como true
já que precisamos acertar as configurações internamente.
Normalmente, definimos "installation"
como false
se as configurações forem gerenciadas em outro sistema que interage com a Kommo via API.
"locations": [
"settings",
"lcard-1",
"ccard-0"
],
O campo "locations"
define em quais áreas o widget será inicializado (será visualizado).
Nosso widget será inicializado em:
"settings"
(página de instalação e configuração do widget)"lcard-1"
(o widget será exibido no painel lateral direito de um perfil de Lead)"ccard-0"
(o widget será inicializado em um perfil de Contato, mas não aparecerá no painel lateral direito)
"tour": {
"is_tour": true,
"tour_images": {
"en": ["/images/slideshow_1_en.jpg", "/images/slideshow_2_en.jpg", "/images/slideshow_3_en.jpg"],
"es": ["/images/slideshow_1_es.jpg", "/images/slideshow_2_es.jpg", "/images/slideshow_3_es.jpg"],
"pt": ["/images/slideshow_1_pt.jpg", "/images/slideshow_2_pt.jpg", "/images/slideshow_3_pt.jpg"]
},
"tour_description": "widget.tour_description"
}
Fornecemos três imagens em cada idioma para o slideshow do widget.
"widget.tour_description"
será extraído dos arquivos i18n.
"settings": {
"custom": {
"name": "settings.custom",
"type": "custom",
"required": false
}
}
}
Como temos diferentes tipos de entrada, criamos configurações personalizadas. Todos os campos serão extraídos dos arquivos i18n.
Devemos adicionar todas as imagens que o widget utilizará à pasta images.
Há muitas imagens na pasta. Elas servem a diferentes propósitos.
Logos são imagens exibidas nas áreas de inicialização do widget. Todas elas devem ser adicionadas à pasta, caso contrário, você receberá uma mensagem de erro do sistema, como:
As imagens mais importantes que devemos adicionar são:
As imagens de logo devem estar no formato PNG!
Como o widget não é inicializado no Digital Pipeline, não adicionamos um logo_dp à pasta images.
As imagens do slideshow são exibidas na tela de instalação para mostrar sua integração em ação.
Elas não são obrigatórias para uma integração privada, mas as adicionamos para fins de tutorial.
O que você deve lembrar ao adicionar imagens de slideshow:
- você deve adicionar de 1 a 5 imagens
- elas devem ter 1188×616 pixels cada, no formato JPG
- elas devem mostrar visualmente a funcionalidade da integração, como a integração será exibida na Kommo e seu valor para o usuário
- elas devem ser de alta qualidade
Se o seu widget suporta diferentes idiomas, você deve fornecer imagens de slideshow em todos os idiomas.
Outras imagens estão no formato SVG.
Elas devem melhorar a interface do widget, tornando-a mais intuitiva.
Uma interface intuitiva é uma interface amigável ao usuário, que funciona como esperado e parece natural para o usuário.
É bastante óbvio que, ao passar o mouse ou clicar neste botão, ele mostrará algumas informações sobre um tópico que você pode ter dificuldades em entender.
Cada linha e palavra usada no widget deve ser traduzida para todos os idiomas em que o widget será utilizado.
A estrutura deve ser a mesma em todos os arquivos.
{
"widget": {
"name": "Aniversário",
"short_description": "Widget Feliz Aniversário",
"description": "O widget de Feliz Aniversário atribui uma tarefa no dia do aniversário do cliente, para que você nunca perca uma data importante.",
"tour_description": "O widget de Feliz Aniversário atribui uma tarefa no dia do aniversário do cliente, para que você nunca perca uma data importante."
},
"settings": {
"custom": "Configurações",
"options": {
"title": "Configurações",
"desc": "Defina o formulário para criar uma nova tarefa"
},
"base": "Automaticamente cria tarefas dentro de um perfil selecionado no dia do aniversário do seu cliente.",
"not_active": "Instale o widget para começar a configuração",
"lead": "Lead",
"contact": "Contato",
"field": {
"title": "Campo de aniversário",
"desc": "Selecione um campo que contenha a data de aniversário",
"tip": "Selecione um tipo de campo “data”, “aniversário” ou “data e hora”, ou crie um novo campo ao clicar “adicionar novo campo”.",
"or": "ou ",
"create": "Adicionar novo campo"
},
"entity": {
"options": {
"contact": "Contato",
"lead": "Lead"
}
},
"type": {
"title": "Tipo de tarefa",
"desc": "Selecione o tipo de tarefa que será atribuida"
},
"responsible": {
"title": "Usuário responsável",
"desc": "Escolha o usuário responsável por esta tarefa",
"select": "Usuários selecionados",
"numeral": "usuário,usuário,usuários",
"current": "Usuário responsável atual"
},
"text": {
"title": "Descrição da tarefa",
"desc": "Escreva a descrição ou deixe o campo em branco",
"placeholder": "Descrição da tarefa…"
},
"template": {
"title": "Modelos de chat",
"desc": "Crie um modelo de chat para enviar aos seus clientes",
"name": {
"title": "Nome do modelo",
"desc": "Insira o nome do modelo que aparecerá no perfil"
},
"text": {
"title": "Texto da mensagem",
"desc": "Escreva a mensagem que será enviada ao cliente",
"placeholder": "Mensagem…"
},
"list": {
"title": "Lista de modelos criados"
},
"create": "Criar um modelo"
},
"errors": {
"template_fields_required": "Insira o nome do modelo e o texto da mensagem para continuar"
},
"modal": {
"title": "Criar novo campo Aniversário",
"name": {
"title": "Nome do campo",
"desc": "Inserir nome do campoo"
},
"entity": {
"title": "Tipo de objeto",
"desc": "Selecionar tipo de objeto"
},
"success_saved": "Novo campo Aniversário foi criado com sucesso",
"create": "Criar campo"
},
"widget_panel": {
"birthday": "Hoje é aniversário do seu cliente!",
"not_birthday": "Sem aniversários hoje. Cheque de novo amanhã!",
"congratulate": "Enviar parabéns"
}
}
}
Para que o arquivo script.js não fique muito longo, dividimos algumas partes dele em classes. Dessa forma, ele fica mais fácil de ler, editar e gerenciar.
Só não se esqueça de importar essas classes no início do arquivo script.js.
define(
[
'./classes/template.js',
'./classes/loader.js',
'./classes/kommo.js',
'./classes/events.js',
'./classes/settings.js',
'./plugins/jquery.serializejson.min.js',
]
O que acontece no arquivo cache.js?
return class Cache {
constructor () {
window.KommoWidget.cache = window.KommoWidget.cache || {}
}
Quando um objeto Cache é criado, ele verifica se já existe um objeto de cache na propriedade KommoWidget
do objeto window. Se o objeto de cache não existir, um objeto de cache vazio é criado.
As seguintes chaves:valores são armazenadas no cache.
kbd_account :
{
payload: {
id: number; //ID da conta
name: string; //Nome da conta
subdomain: string;
created_at: number; //unix timeStamp
created_by: number;
updated_at: number; //unix timeStamp
updated_by: number;
current_user_id: number;
country: string;
currency: string;
currency_symbol: string;
customers_mode: string;
is_unsorted_on: boolean;
mobile_feature_version: number;
is_loss_reason_enabled: boolean;
is_helpbot_enabled: boolean;
is_technical_account: boolean;
contact_name_display_order: number;
_links: { self: { href: string } }; // Requisição GET para conta
_embedded: {
task_types: [
{
id: number;
name: string;
color: null;
icon_id: null;
code: string;
}
];
};
};
expires: number; //unix timeStamp
}
Agora, vamos dar uma olhada nos métodos do Cache.
getItem(key)
O método é usado para recuperar um valor do cache com base em uma chave fornecida.
getItem(key) {
let result;
if (window.KommoWidget.cache[key]) {
result = window.KommoWidget.cache[key];
} else {
let cache = JSON.parse(window.sessionStorage.getItem(key) || null);
if (cache !== null && cache.expires <= Math.floor(Date.now() / 1000)) {
window.sessionStorage.removeItem(key);
}
result = (cache || {}).payload || null;
}
return result;
}
Ele verifica se o valor para a key
existe no objeto de cache no KommoWidget
. Se existir, ele é retornado.
Se o valor não estiver no cache, o método verifica o sessionStorage
. Se o valor for encontrado no sessionStorage
e não tiver expirado, ele é recuperado e retornado. Se o valor tiver expirado, o valor é removido do sessionStorage
. Caso contrário, null é retornado.
setItem(key, value, expires, local)
O método é usado para definir um valor no cache.
setItem(key, value, expires, local) {
if (local) {
window.KommoWidget.cache[key] = value;
} else {
window.sessionStorage.setItem(
key,
JSON.stringify({
payload: value,
expires: Math.floor(Date.now() / 1000) + expires,
})
);
}
}
Se local
for true, o valor é armazenado diretamente no objeto de cache no KommoWidget
. Caso contrário, o valor é armazenado no sessionStorage
. Em ambos os casos, o valor é serializado para JSON e armazenado junto com o período de expiração.
removeItem(key)
O método é usado para remover um valor do sessionStorage
com base em uma chave fornecida.
removeItem (key) {
window.sessionStorage.removeItem(key)
}
A primeira coisa que fazemos é importar cache.js.
define(
[
'./cache.js'
],
request (type, payload, method, options = {})
request(type, payload, method, options = {}) {
let cache = new Cache();
return new Promise(function (resolve, reject) {
let data = null;
if (options.cache) {
data = cache.getItem(options.cache.key);
}
if (!data) {
$.ajax({
url: options.baseURL + type,
data: payload,
method: method,
beforeSend: function (xhr) {
xhr.withCredentials = true;
},
headers: options.headers || {},
})
.done(function (data) {
resolve(data);
})
.fail(function (resp) {
reject(resp);
});
} else {
resolve(data);
}
}).then(function (data) {
return new Promise(function (resolve) {
if (options.embedded && (data || {})["_embedded"]) {
data = (data || {})["_embedded"][options.embedded] || [];
}
if (options.cache && data) {
cache.setItem(
options.cache.key,
data,
options.cache.expires,
options.cache.local || false
);
}
if (options.rk) {
data = (data || {})[options.rk] || null;
}
resolve(data);
});
});
}
O método faz uma solicitação HTTP. Ele aceita um tipo de solicitação (type
), dados para enviar (payload
), método de solicitação (method
) e parâmetros (options
). Se a opção de cache for especificada nos parâmetros, tenta-se recuperar dados do cache. Se não houver dados no cache, uma solicitação AJAX é executada.
A primeira coisa que fazemos é importar http.js.
define(
[
'./http.js',
],
getAccount ()
getAccount() {
return this.http.request(
"/api/v4/account",
{ with: "task_types" },
"GET",
{
cache: { key: "kbd_account", expires: 60 },
baseURL: window.location.origin,
}
);
}
O método usa o método request() do objeto http para fazer uma solicitação HTTP para obter informações da conta.
getTasks(filter)
getTasks(filter) {
return this.http
.request(
"/api/v4/tasks",
{
filter: filter,
},
"GET",
{
baseURL: window.location.origin,
}
)
.then(function (data) {
return ((data || {})._embedded || {}).tasks || [];
});
}
O método usa o método request()
do objeto http
para fazer uma solicitação HTTP para recuperar tarefas com o filtro dado.
createTask(payload)
createTask(payload) {
return this.http
.request("/api/v4/tasks", JSON.stringify([payload]), "POST", {
baseURL: window.location.origin,
})
.then(function (data) {
return ((data || {})._embedded || {}).tasks || [];
});
O método usa o método request()
do objeto http
para fazer uma solicitação HTTP para criar uma nova tarefa. Ele envia uma solicitação POST para o endpoint '/api/v4/tasks'
, passando os dados da nova tarefa no corpo.
createField(et, payload)
createField(et, payload) {
let _this = this;
return _this.http
.request(
"/api/v4/" + et + "/custom_fields",
JSON.stringify([payload]),
"POST",
{
baseURL: window.location.origin,
headers: {
"Content-Type": "application/json",
},
}
)
.then(function (data) {
return (((data || {})._embedded || {}).custom_fields || [])[0] || {};
});
}
O método usa o método request()
do objeto http
para criar um novo campo personalizado para a entidade fornecida (et
). Ele envia uma solicitação POST para o endpoint '/api/v4/{et}/custom_fields'
, passando os dados do novo campo personalizado no corpo da solicitação.
createTemplate(payload)
createTemplate(payload) {
return this.http
.request(
"/ajax/v1/chats/templates/add",
JSON.stringify({
request: payload,
}),
"POST",
{
baseURL: window.location.origin,
headers: {
"Content-Type": "application/json",
},
}
)
.then(function (data) {
return (
((((data || {}).response || {}).chats || {}).templates || {})
.added || 0
);
});
}
O método usa o método request()
do objeto http
para criar um novo modelo de chat. Ele envia uma solicitação POST para o endpoint '/ajax/v1/chats/templates/add'
, passando os dados do novo modelo no corpo da solicitação.
getTemplates()
getTemplates() {
return this.http
.request(
"/ajax/v4/chats/templates",
{
with: "integration,reviews",
limit: 50,
page: 1,
},
"GET",
{
baseURL: window.location.origin,
}
)
.then(function (data) {
return ((data || {})._embedded || {}).chat_templates || {};
});
}
O método usa o método request()
do objeto http
para obter uma lista de modelos de chat. Ele envia uma solicitação GET para o endpoint '/ajax/v4/chats/templates'
.
getUsers(users =[], page = 1)
getUsers(users = [], page = 1) {
let _this = this;
return this.http
.request(
"/api/v4/users",
{
limit: 100,
page: page,
},
"GET",
{
baseURL: window.location.origin,
}
)
.then(function (data) {
return new Promise((resolve) => {
let tmp = ((data || {})._embedded || {}).users || [];
tmp.forEach(function (user) {
if (user.rights.is_active) {
users.push({
id: user.id,
option: user.name,
name: user.name,
is_admin: user.rights.is_admin,
});
}
});
if (data._page_count > 1 && data._page < data._page_count) {
resolve(_this.getUsers(users, page + 1));
} else {
resolve(users);
}
});
O método usa o método request()
do objeto http
para obter uma lista de usuários. Ele envia uma solicitação GET para o endpoint '/api/v4/users'
, adicionando todos os usuários a um array de usuários.
getTaskTypes()
getTaskTypes() {
let _this = this;
return this.getAccount().then(function (account) {
let types = ((account || {})._embedded || {}).task_types || {};
types = Object.values(types).filter(function (item) {
item.option = item.name;
return item;
});
return types;
});
}
O método é usado para obter uma lista de tipos de tarefas das informações da conta. Primeiro, ele chama o método getAccount()
para obter informações da conta e, em seguida, extrai os tipos de tarefas dos dados recuperados.
getFields(et, page = 1, fields =[])
getFields(et, page = 1, fields = []) {
let _this = this;
return _this.http
.request(
"/api/v4/" + et + "/custom_fields",
{
page: page,
},
"GET",
{
baseURL: window.location.origin,
}
)
.then(function (data) {
let cf = ((data || {})._embedded || {}).custom_fields || [];
if (cf.length === 0) {
return fields;
}
fields = fields.concat(cf);
if (((data || {})._page_count || 0) > 1) {
page++;
return _this.getFields(et, page, fields);
} else {
return fields;
}
});
}
O método usa o método request()
do objeto http
para obter uma lista de campos personalizados para a entidade fornecida (et
). Ele envia uma solicitação GET para o endpoint '/api/v4/{et}/custom_fields'
, coletando todos os campos em um array de campos.
getEmptyPromise()
getEmptyPromise() {
return new Promise(function (resolve) {
resolve([]);
});
}
O método é usado na próxima função que deve retornar uma Promise. Mas, se não houver nada para retornar, ela chama getEmptyPromise()
.
getFieldsByType(fieldTypes, entityType = null, addPostfix = false)
getFieldsByType(fieldTypes, entityType = null, addPostfix = false) {
let _this = this;
let entityTypes = [];
if (entityType) {
entityTypes = !Array.isArray(entityType) ? [entityType] : entityType;
}
return Promise.all([
$.inArray(APP.element_types.leads, entityTypes) >= 0
? _this.getFields("leads")
: _this.getEmptyPromise(),
$.inArray(APP.element_types.contacts, entityTypes) >= 0
? _this.getFields("contacts")
: _this.getEmptyPromise(),
]).then(function ([leadFields, contactFields]) {
let fields = [];
if (!Array.isArray(fieldTypes)) {
fieldTypes = [fieldTypes];
}
entityTypes.forEach(function (et) {
let cf = {};
let postfix = "";
switch (et) {
case APP.element_types.contacts:
cf = contactFields;
postfix += " (" + _this.widget.i18n("settings.contact") + ")";
break;
case APP.element_types.leads:
cf = leadFields;
postfix += " (" + _this.widget.i18n("settings.lead") + ")";
break;
}
if (!addPostfix) {
postfix = "";
}
if (cf.length > 0) {
cf.forEach(function (field) {
if (
APP.cf_types[field.type] &&
$.inArray(APP.cf_types[field.type], fieldTypes) >= 0
) {
fields.push({
id: field.id,
code: (field.code || "").toLowerCase(),
sort: field.sort,
option: field.name + postfix,
type: APP.cf_types[field.type],
entity_type: et,
parent_id: 0,
enums: field.enums || [],
is_hidden: false,
});
}
});
}
});
return fields;
});
}
O método é usado para obter campos personalizados de tipos específicos. Ele envia consultas para recuperar campos de vários tipos de entidades (contatos, leads) e retorna um array de objetos de campo que correspondem aos critérios fornecidos.
Primeiro, importamos a biblioteca moment e o módulo 'lib/components/base/modal'
. Essas dependências são nossos módulos de sistema que você pode usar.
define(
[
'moment',
'lib/components/base/modal',
],
settings()
settings() {
let _this = this;
const MODAL_DESTROY_TIMEOUT = 3000;
$(".kommo-birthday__field-create__link").on("click", function () {
let modal = _this.widget.templates.twig.modal(
_this.widget.templates.render("settings.modal", {
prefix: _this.widget.config.prefix,
langs: _this.widget.i18n("settings.modal"),
name: _this.widget.templates.twig.input({
block: "field",
code: "name",
}),
entity: _this.widget.templates.twig.select({
block: "field",
code: "entity",
items: [
{
id: APP.element_types.contacts,
option: _this.widget.i18n("settings.entity.options.contact"),
},
{
id: APP.element_types.leads,
option: _this.widget.i18n("settings.entity.options.lead"),
},
],
selected: APP.element_types.contacts,
}),
button: _this.widget.templates.twig.button({
block: "field",
code: "btn",
text: _this.widget.i18n("settings.modal.create"),
}),
}),
function () {},
_this.widget.config.prefix + "__field-modal"
);
$("#" + _this.widget.config.prefix + "-field-btn-id").on(
"click",
function () {
const resultModal = new Modal();
let selected = {};
let form =
$(
"#" + _this.widget.config.prefix + "__field-form"
).serializeJSON().params || {};
let et = parseInt(form.field.entity) === 1 ? "contacts" : "leads";
_this.widget.kommo
.createField(et, {
type: "birthday",
name: form.field.name,
})
.then(function (result) {
selected = result;
return _this.widget.kommo.getFieldsByType(
[
APP.cf_types.date,
APP.cf_types.date_time,
APP.cf_types.birthday,
],
[APP.element_types.contacts, APP.element_types.leads],
true
);
})
.then(function (fields) {
$("." + _this.widget.config.prefix + "__field-id").replaceWith(
_this.widget.templates.twig.select({
block: "field",
code: "id",
items: fields,
selected: selected.id || 0,
})
);
modal.destroy();
resultModal.showSuccess(
_this.widget.i18n("settings.modal.success_saved"),
false,
MODAL_DESTROY_TIMEOUT
);
})
.catch(() => {
resultModal.showError("", false);
});
}
);
});
if (_this.widget.info.params.templates.length > 0) {
let created = _this.widget.info.params.templates.split(",");
$("#kommo-birthday-templates-list").val(
_this.widget.info.params.templates || ""
);
_this.widget.kommo.getTemplates().then(function (templates) {
created = created.map(function (item) {
return parseInt(item);
});
templates.filter(function (item) {
if ($.inArray(item.id, created) > -1) {
$("#kommo-birthday-templates-list-ul").append(
"<li>" + item.name + "</li>"
);
}
});
});
}
$("#kommo-birthday-template-create-id").on("click", function () {
let name = $("#kommo-birthday-template-name-id").val();
let text = $("#kommo-birthday-template-text-id").val();
if (name.length === 0 || text.length === 0) {
new Modal().showError(
_this.widget.i18n("settings.errors.template_fields_required"),
false
);
} else {
_this.widget.kommo
.createTemplate({
name: name,
reply_name: name,
content: text,
reply_text: text,
is_editable: true,
type: "amocrm",
attachments: [],
buttons: [],
widget_code: null,
client_uuid: null,
creator_logo_url: null,
waba_footer: null,
waba_category: null,
waba_language: null,
waba_examples: {},
reviews: null,
waba_header: null,
waba_selected_waba_ids: [],
})
.then(function (id) {
if (parseInt(id) > 0) {
$("#kommo-birthday-template-text-id").val("");
$("#kommo-birthday-template-name-id").val("");
let old = $("#kommo-birthday-templates-list").val().split(",");
old.push(id);
old = old.filter(function (item) {
return parseInt(item) > 0;
});
$("#kommo-birthday-templates-list").val(old.join(","));
$("#kommo-birthday-templates-list-ul").append(
"<li>" + name + "</li>"
);
}
});
}
});
}
O método processa eventos, como cliques no link para criar um campo personalizado para o widget (exibindo um modal, desenhando inputs e botões nele, criando um campo personalizado ao clicar no botão) e o botão de criação de modelos.
getBirthdayInfo()
getBirthdayInfo() {
const fieldId = parseInt(
this.widget.getNested(this.widget.info.params, "field.id", "")
);
const $wrap = $('.linked-form__field[data-id="' + fieldId + '"]');
const filtered = $wrap.filter(function () {
const formattedDate = Moment().format(
APP.system.format.date.date_short
);
const dayMonth = $(this).find("input").val().slice(0, -5);
return dayMonth === formattedDate;
});
const currentDate = Moment().format(APP.system.format.date.date);
return {
isBirthday: filtered.length > 0,
currentDate: currentDate,
};
}
Esse método recupera informações de aniversário da página atual. Ele verifica se algum contato ou lead faz aniversário hoje e retorna a data atual.
card()
card() {
const _this = this;
const { isBirthday } = _this.getBirthdayInfo();
if (isBirthday) {
let entityType = parseInt(
_this.widget.getNested(_this.widget.info.params, "entity.type", 2)
);
let responsibles = _this.widget.getNested(
_this.widget.info.params,
"tasks.responsible",
{}
);
if (responsibles[1]) {
responsibles[APP.data.current_card.main_user] =
APP.data.current_card.main_user;
}
if (
entityType === parseInt(APP.data.current_card.element_type) &&
responsibles[APP.constant("user").id]
) {
_this.createTask(isBirthday);
}
}
}
O método verifica se a data de hoje corresponde ao aniversário. Se corresponder e condições específicas (o usuário está no perfil do lead, o usuário é responsável por enviar uma mensagem ao cliente) forem atendidas, ele chama um método para criar uma nova tarefa.
createTask(isBirthday)
createTask(isBirthday) {
const _this = this;
let { currentDate } = _this.getBirthdayInfo();
if (isBirthday) {
const taskType = parseInt(
_this.widget.getNested(_this.widget.info.params, "tasks.type", 1)
);
_this.widget.kommo
.getTasks({
is_completed: 0,
entity_type: APP.data.current_entity,
entity_id: APP.data.current_card.id,
task_type: taskType,
})
.then(function (tasks) {
if (tasks.length === 0) {
_this.widget.kommo.createTask({
responsible_user_id: APP.constant("user").id,
entity_id: APP.data.current_card.id,
entity_type: "leads",
task_type_id: taskType,
text: _this.widget.getNested(
_this.widget.info.params,
"tasks.text",
"-"
),
complete_till: Moment(
(currentDate += " 23:59"),
APP.system.format.date.full
).unix(),
});
}
});
}
}
Se hoje for aniversário e nenhuma tarefa tiver sido criada, este método criará uma nova tarefa usando as informações do aniversário e os parâmetros da tarefa.
prepend(elem)
prepend (elem) {
elem.prepend(this.getHtml())
return this
}
O método adiciona conteúdo de carregador HTML antes do elemento elem
especificado.
append(elem)
append (elem) {
elem.append(this.getHtml())
return this
}
O método adiciona conteúdo de carregador HTML após o elemento elem
especificado.
getHtml()
getHtml() {
let _this = this
if (_this.html.length === 0) {
_this.html = _this.templates.render(
'loader',
{
widget: _this.langs.widget.name,
icons: _this.widget.config.icons,
},
)
}
return _this.html
}
O método obtém o conteúdo HTML do carregador. Se o HTML ainda não tiver sido gerado, o método renderizará o template Twig do carregador.
hide()
hide () {
return $('.kommo-loader').hide()
}
O método acessa elementos com a classe '.kommo-loader'
e os oculta.
show()
show () {
$('.kommo-loader').show()
return this
}
O método acessa elementos com a classe "kommo-loader" e os exibe.
remove()
remove () {
$('.kommo-loader').remove()
return this
}
The method accesses elements with the "kommo-loader" class and deletes them.
displaySaveBtn(code)
displaySaveBtn(code) {
$(".modal." + code)
.find(".widget_settings_block__controls")
.show();
return this;
}
O método exibe um botão de salvar em uma janela modal com a classe de código especificada.
save(evt)
save (evt) {
let _this = this
let code = _this.widget.params.widget_code
let isActive = false
let params = ($('#' + _this.widget.config.prefix + '-settings__form').serializeJSON() || {}).params || {}
return new Promise(function (resolve, reject) {
isActive = evt.active === 'Y'
let data = {
is_active: isActive,
}
let installed = ((_this.widget.params || {}).active || 'N') === 'Y'
if (!installed) {
resolve({ 'reinstall': true })
}
if (isActive) {
if (!_this.widget.validateSettings(params)) {
$('.modal.' + code).
find('.js-widget-save').
trigger('button:save:error')
reject()
} else {
data.params = params
}
}
_this.widget.info = data
evt.fields.custom = JSON.stringify(params)
resolve(data)
}).then(function () {
return true
})
}
O método é usado para salvar as configurações do widget. Ele lida com o evento evt
e retorna uma Promise
. Dentro do método, ele verifica o status do widget (isActive
), reúne dados do formulário de configurações (params
), cria um objeto (data
) com informações sobre o estado do widget e lida com o caso em que o widget foi desinstalado. Após o processamento, o método retorna o objeto data ao salvar com sucesso.
load()
load () {
let _this = this
return new Promise((resolve, reject) => {
_this.widget.info.params = (_this.widget.params || {}).custom || {}
if (typeof _this.widget.info.params === 'string') {
_this.widget.info.params = JSON.parse(_this.widget.info.params)
}
if (!_this.widget.info.params.templates) {
_this.widget.info.params.templates = ''
}
resolve([])
})
}
O método é usado para carregar as configurações do widget. Ele retorna uma Promise
e realiza a configuração preliminar dos parâmetros do widget, como params.templates
.
O arquivo classes/template.js
, usado para renderizar templates, é apenas um wrapper em torno dos métodos this.render
do widget. Isso simplifica o código, mas não significa que você precisa usar essa implementação específica. Você pode seguir o básico ou criar sua própria solução. O que é fornecido aqui é um exemplo que pode ser aprimorado.
Primeiro, importamos as bibliotecas jquery, twigjs, text e o módulo 'lib/components/base/modal'
.
define(
[
'jquery',
'lib/components/base/modal',
'twigjs',
'text',
]
flushTextPlugin()
flushTextPlugin () {
text.useXhr = function () {
return true
}
}
O método é usado para alterar temporariamente as configurações para carregar arquivos de texto, de modo que eles sejam sempre carregados via XHR.
restoreTextPlugin()
restoreTextPlugin () {
text.useXhr = this.textSavedXhr
}
O método é usado para restaurar as configurações padrão para carregar arquivos de texto após uma alteração temporária (flushTextPlugin()
).
checkRegistry(name)
checkRegistry (name) {
let id = 'kommo_bd_' + name
return !!(Twig.Templates || {}).registry[id]
}
O método é usado para verificar a existência de um template Twig.
getFromRegistry(name)
getFromRegistry (name) {
let id = 'kommo_bd_' + name
return (Twig.Templates || {}).registry[id] || ''
}
O método é usado para recuperar um template Twig pelo seu nome.
preload()
preload () {
return Promise.all([
this.loadCss(),
this.loadTemplates(),
],
)
}
O método é usado para pré-carregar templates e arquivos CSS. Ele retorna uma Promise
que é resolvida após todos os recursos terem sido carregados.
loadTemplates()
loadTemplates() {
let _this = this;
return new Promise(function (resolve) {
let area = APP.widgets.system.area;
let templates = _this.templates.params[area] || [];
_this.flushTextPlugin();
if (templates.length > 0) {
let load = [];
let ids = [];
templates.forEach(function (template) {
if (template.id.indexOf(_this.widget.config.code) === -1) {
template.id = _this.widget.config.code + "_" + template.id;
}
if (!template.url) {
template.url =
_this.widget.params.path +
"/assets/templates" +
template.path +
".twig?v=" +
_this.widget.get_version();
}
if (!_this.checkRegistry(template.id)) {
load.push("text!" + template.url);
ids.push(template.id);
} else {
_this.templates.html[template.id] = _this.getFromRegistry(
template.id
);
}
});
if (load.length > 0) {
require(load, function () {
for (let i = 0; i < arguments.length; i++) {
_this.addTemplate(ids[i], arguments[i]);
}
resolve();
});
} else {
resolve();
}
} else {
resolve();
}
});
}
O método é usado para carregar templates. Esse método utiliza APP.widgets.system.area
para determinar a área atual dentro da aplicação. Ele retorna uma Promise que é resolvida após todos os templates terem sido carregados.
addTemplate(name, data)
addTemplate(name, data) {
let id = "kommo_bd_" + name;
if (this.checkRegistry(name)) {
this.templates.html[name] = Twig.Templates.registry[id];
return;
}
this.templates.html[name] = twig({
id: id,
data: data,
allowInlineIncludes: true,
});
}
O método é usado para adicionar um template ao Twig. Se um template com o nome fornecido já existir no registro, ele é atualizado; caso contrário, um novo template é criado.
loadCss()
loadCss() {
let _this = this;
return new Promise(function (resolve) {
let html = "";
_this.css.forEach((file) => {
let $style = null;
let path =
_this.widget.params.path +
"/assets/css/" +
file.name +
".css?v=" +
_this.widget.params.version;
if (file.append_id) {
$style = $("#" + file.append_id);
} else {
$style = $('link[href="' + path + '"]');
}
if ($style.length < 1) {
html +=
'<link type="text/css" rel="stylesheet" href="' + path + '"';
if (file.append_id) {
html += ' id="' + file.append_id + '"';
}
html += ">";
}
});
if (html.length > 0) {
$("head").append(html);
}
resolve();
});
}
O método é usado para carregar arquivos CSS. Ele retorna uma Promise que é resolvida após todos os arquivos CSS terem sido carregados.
render(name, params)
render(name, params) {
name = this.widget.config.code + "_" + name;
return this.templates.html[name].render(params || {});
}
O método é usado para renderizar um template pelo seu nome e passar parâmetros para ele.
installPlaceholder(wrapDiv, exception = null)
installPlaceholder(wrapDiv, exception = null) {
let params = {
prefix: this.widget.config.prefix,
langs: this.widget.i18n("settings"),
active: false,
};
if (exception !== null) {
params.exception = exception;
}
wrapDiv.prepend(this.render("settings.base", params));
$("#kommo-settings").fadeIn(300);
this.widget.loader.displaySaveBtn(this.widget.params.widget_code);
return this.widget.loader.hide();
}
O método é usado para instalar um placeholder em um local específico na página, conforme indicado pelo argumento wrapDiv
. O argumento exception
pode ser usado para especificar um elemento que deve ser excluído da instalação do placeholder.
get twig ()
O getter retorna um objeto com métodos para gerar vários elementos da interface do usuário com base nos templates Twig da Kommo.
Há apenas um arquivo nesta pasta, chamado jquery.serializejson.min.js
.
Este plugin é projetado para serializar dados de formulários no formato JSON. Ele permite converter dados inseridos pelo usuário em um formulário para JSON.
Ao abrir a pasta assets você verá duas outras pastas: css e templates.
Temos dois arquivos CSS na pasta (kommo.css e style.css) por vários motivos, como organização do código (tornando os estilos mais legíveis), modularidade (separar estilos para diferentes partes do código), reutilização (por exemplo, arquivos com estilos comuns podem ser incluídos em vários projetos para manter uma aparência consistente), gerenciamento de dependências (usar vários arquivos CSS simplifica o gerenciamento de dependências entre estilos, permitindo adicionar ou remover arquivos sem precisar alterar todo o projeto) e otimização do carregamento da página (dividir os estilos em vários arquivos permite que o navegador carregue apenas os arquivos CSS necessários para uma página ou componente específico).
Como a exibição de uma tooltip ao passar o mouse sobre uma imagem é implementada
.kommo__tooltip-wrap:hover .kommo-holdings__settings__tooltip {
visibility: visible !important;
opacity: 1 !important;
}
.kommo__tooltip-wrap:hover .kommo__settings__tooltip, .kommo__tooltip-wrap--icon:hover .kommo__settings__tooltip {
visibility: visible !important;
opacity: 1 !important;
}
Quando o mouse passa sobre um elemento com a classe kommo__tooltip-wrap
, as tooltips se tornam visíveis e opacas.
loader.twig
Representa um bloco de carregamento exibido na página enquanto o conteúdo está carregando ou operações assíncronas estão sendo realizadas.
base.twig
Usado para exibir as configurações básicas do widget.
modal.twig
Usado para exibir uma janela modal de configurações.
widget_right_panel.twig
Este template é utilizado para exibir um widget no painel direito. Ele recebe dois parâmetros: “text”, que variará dependendo de haver ou não uma pessoa fazendo aniversário naquele dia, e um botão (que será exibido apenas se houver uma pessoa fazendo aniversário).
responsible
responsible: _this.templates.twig.dropdown({
block: 'tasks',
code: 'responsible',
title_empty: _this.i18n('settings.responsible.select'),
title_numeral: _this.i18n(
'settings.responsible.numeral'),
name_is_array: true,
items: users.filter(function (user) {
user.name = 'params[tasks][responsible][' + user.id + ']'
user.is_checked = !!(_this.getNested(
_this.info.params,
'tasks.responsible', {})[user.id]
)
return user
}),
Uma lista suspensa é adicionada, onde os usuários responsáveis (usuário) são adicionados às informações/parâmetros do widget quando uma caixa de seleção é clicada.
click
.then(() => {
$(".kommo-birthday__button-congratulate").on(
"click",
function () {
setTimeout(function () {
$(".feed-compose__quick-actions-wrapper").click();
}, QUICK_ACTIONS_CLICK_TIMEOUT);
}
);
});
Ao clicar no botão (“Enviar um desejo de aniversário”), uma lista de modelos que podem ser enviados para o chat é aberta.
O botão funciona corretamente se os chats já estiverem abertos. A funcionalidade não inclui a troca para um chat a partir de outros estados.
Você pode encontrar o widget no Github.
Para criar uma integração privada você deve:
- Vá para as Configurações no menu à esquerda
- Clique em Integrações
- Clique no botão azul + Criar Integração no canto superior direito
Para fazer o upload do arquivo do widget, você precisa clicar no botão Fazer upload.
Antes de fazer o upload do arquivo com o widget, certifique-se de que todos os arquivos estão no nível raiz do arquivo compactado.
…e é isso!
Agora é hora de testar o widget!
