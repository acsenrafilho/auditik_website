---
title: "Tipos de Campos de Configuração no Kommo: Manifest.json & UI Settings"
source: "https://pt-developers.kommo.com/docs/tipos-de-campos-de-configura%C3%A7%C3%A3o"
date: "2026-02-19"
---

Vamos dar uma olhada mais detalhada nos tipos de campos que podem ser especificados na seção "settings"
do arquivo manifest.json.
Para cada tipo, você encontrará exemplos de uso no manifest.json e, se necessário, um exemplo do arquivo de localização do i18n.
{
"widget":{
"name": "widget.name",
"description": "widget.description",
"short_description": "widget.short_description",
"code": "new_widget",
"secret_key": "57009cb5048a72191f25b01355c17d10dc349d5",
"version": "1.0.0",
"interface_version" : 2,
"init_once" : false,
"locale":[
"en",
"es"
],
"installation": true
},
"locations":[
"ccard-1",
"clist-1"
],
"settings":{
"login":{
"name": "settings.login", //Indica o arquivo de localização na pasta i18n
"type": "text", //Tipo: campo de texto
"required": false
},
"password":{
"name": "settings.password",//Indica o arquivo de localização na pasta i18n
"type": "pass", //Tipo: senha
"required": false
}
}
}
{
"widget":{
"name":"Widget teste",
"short_description":"Uma curta",
"description":"ENGLISH: #SUBDOMAIN# #HOST# #LOGIN# #API_HASH# #USER_ID# #ACCOUNT_ID# Este widget é um exemplo de trabalho com o Kommo."
},
"settings":{
"login":"Login de usuário",
"password":"Senha do usuário"
}
}
Este tipo de campo é usado para exibir uma lista de usuários do sistema juntamente com campos de texto. É útil quando você precisa inserir informações específicas para cada funcionário, como um número de telefone interno ou ramal para o serviço VoIP.
{
"widget":{
},
"locations":[
],
"settings":{
"login":{
},
"password":{
},
"phones":{
"name": "settings.user_phones",
"type": "users",
"required": true
}
}
}
{
"widget":{
},
"settings":{
"login":"Login de usuário",
"password":"Senha do usuário",
"user_phones":"Lista de telefones"
}
}
Uma versão expandida do campo usuários, este tipo de campo contém dois campos para cada usuário. É usado quando cada funcionário precisa fornecer pares de valores, como login e senha.
{
"widget":{
},
"locations":[
],
"settings":{
"auth_data":{
"name":"settings.auth_data",
"type":"users_lp",
"required": false
}
}
}
{
"widget":{
},
"settings":{
"auth_data":"Lista de Auth"
}
}
Os widgets do Kommo permitem adicionar lógica de programação personalizada à página de configurações do widget, incorporando um campo com estrutura e aparência arbitrárias.
O campo com estrutura arbitrária compreende um campo de entrada oculto, um elemento div para exibir elementos DOM para interação do usuário, e algum código JavaScript para fornecer a lógica necessária.
Para usar campos com estrutura arbitrária, você precisa seguir dois passos simples:
- Adicionar um campo ao manifest.json e permitir que o widget seja executado na página de configurações.
- Implementar a leitura e escrita dos dados.
Não se esqueça de adicionar a área
settings
ao arraylocations
!
{
"widget":{
},
"locations":[
"ccard-1",
"clist-1",
"settings"
],
"settings":{
"myfield": {
"name": "settings.myfield",
"type": "custom",
"required": true
}
}
}
Um campo com o tipo customizado pode conter uma string JSON ou um número. O tipo de dado string não será armazenado no servidor.
Para começar, você precisará construir o widget e carregá-lo na sua conta. Depois de fazer isso, um div com o ID <widget code>_custom_content
e um input oculto com o ID <widget code>_custom
estarão disponíveis para você.
Se você quiser fazer alterações nos campos do formulário e seus botões, você precisará primeiro criar um evento de mudança no input oculto do sistema. Aqui está um exemplo de como você pode fazer isso:
$('input[name="nome do seu campo"]').trigger('change');
