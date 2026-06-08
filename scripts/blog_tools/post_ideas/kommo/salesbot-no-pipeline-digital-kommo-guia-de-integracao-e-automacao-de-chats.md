---
title: "Salesbot no Pipeline Digital Kommo — Guia de Integração e Automação de Chats"
source: "https://pt-developers.kommo.com/docs/salesbot-no-pipeline-digital"
date: "2026-02-17"
---

Para começar, você precisa conectar a integração com chats na coluna esquerda do Pipeline Digital. As instruções para cada mensageiro estão disponíveis na janela de configurações. Após conectar a integração de chat, você pode ativar o Salesbot para gerenciar novos chats recebidos, bem como configurar bots para etapas específicas.
Você pode conectar o Salesbot de duas maneiras:
- Acesse a seção Leads ➡️ Automatize ➡️ selecione uma etapa ➡️ Adicionar gatilho ➡️ escolha Robô de vendas.
Em seguida, selecione Criar um novo robô. Na janela modal, você pode optar por um modelo padrão ou criar um bot do zero.
- Acesse a seção Configuraçoes ➡️ Ferramentas de comunicação tab ➡️ Salesbots ➡️ Criar ou importar um novo robô.
Na janela modal com os passos do Salesbot, clique em Ver códgio para visualizar o código do bot.
Negócios que entraram na etapa antes da adição da ação no Pipeline Digital serão ignorados, a menos que você marque a opção Aplicar o gatilho à todos os leads já nesta etapa.
O Salesbot utiliza um objeto JSON estruturado com chaves específicas. No exemplo abaixo o bot apresentará a seguinte pergunta, "Por favor, forneça seu número de telefone e e-mail"
e adicionará a tag "salesbot"
. Após a resposta do usuário, o bot validará os dados e responderá com uma das mensagens especificadas. Para mais detalhes sobre predefinições, consulte a próxima seção.
[
{
"question": [
{
"handler": "show",
"params": {
"type": "text",
"value": "Por favor, forneça seu número de telefone e e-mail"
}
},
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "salesbot"
}
}
}
],
"answer": [
{
"handler": "preset",
"params": {
"name": "contacts.validate_base_info",
"params": {
"empty_email": "Por favor, forneça seu e-mail",
"empty_phone": "Por favor, forneça seu número de telefone",
"invalid_phone": "Parece que o número de telefone pode estar incorreto",
"success": "Obrigado",
"empty_all": "Por favor, forneça seu número de telefone e e-mail"
}
}
}
]
}
]
Nos objetos "question"
, "answer"
, ou "finish"
devem existir handlers (manipuladores).
- Os dados no objeto
"question"
lidam com as ações que ocorrerão quando uma mensagem for enviada ao usuário. - Os dados no objeto
"answer"
gerenciam as ações que ocorrerão quando o usuário responder. - Os dados no objeto
"finish"
definem as ações que ocorrerão quando o bot for concluído.
Podem existir múltiplas chaves. No entanto, há uma limitação no tamanho do JSON, que não pode exceder 64KB.
In the "question"
, "answer"
, and "finish"
objects, there should be handlers.
Before adding the JSON object to the bot, make sure to validate it.
Se uma mensagem do bot não puder ser entregue ao cliente, por exemplo, quando o cliente bloqueou mensagens desse chat, o bot pode lidar com o erro e executar manipuladores específicos.
Exemplo:
{
"0":{
"question":[
...
],
"answer":[
...
]
},
"error":[
{
"handler":"action",
"params":{
"name":"change_status",
"params":{
"value":142
}
}
}
]
}
Este manipulador aceita leads recebidos se configurado no Salesbot.
O manipulador "show"
envia uma mensagem ou botões para o chat do cliente. Atualmente, qualquer texto enviado suporta os seguintes placeholders:
Para placeholders de contato, é utilizado o contato principal do lead ou o contato do chat em que a comunicação com o cliente está acontecendo.
Parâmetros do manipulador para envio de texto.
{
"handler": "show",
"params": {
"type": "text",
"value": "Por favor, forneça seu número de telefone e e-mail",
"quick_replies": [
"user_phone_number",
"user_email"
]
}
}
Parâmetros do manipulador para envio de botões.
{
"handler": "show",
"params": {
"type": "buttons",
"value": "Escolha o tipo de participação:",
"buttons": [
"Presença pessoal",
"Online"
]
}
}
Parâmetros do manipulador para envio de botões com links para recursos externos.
{
"handler": "show",
"params": {
"type": "buttons_url",
"value": "Links para recursos externos",
"buttons": [
{
"text": "Bing",
"url": "https://www.bing.com"
},
{
"text": "Google",
"url": "https://google.com"
}
]
}
}
Se você quiser enviar links para redes sociais e habilitar o auto-linking, os links devem estar no seguinte formato:
O manipulador de botões é projetado para ser inserido no bloco de lógica de resposta e permite processar respostas dos botões enviados ou respostas de correspondência exata.
{
"handler": "buttons",
"params": [
{
"value": "Presença pessoal",
"params": [
{
"handler": "...",
"params": {...}
}
]
},
{
"value": "Online",
"params": [
{
"handler": "...",
"params": {...}
}
]
}
]
}
O manipulador "buttons"
espera um array de objetos para inserir nos parâmetros, nos quais qualquer um dos manipuladores especificados nesta página pode ser chamado.
O manipulador goto permite pular para uma etapa específica no cenário, por exemplo, se você precisar realizar certas ações repetidamente.
A contagem das etapas começa a partir de 0.
{
"handler": "goto",
"params": {
"type": "question",
"step": 3
}
}
É utilizado para aguardar uma resposta do usuário a uma pergunta específica. Ele permite que você faça uma pergunta ao usuário e espere pela resposta dele antes de prosseguir com outras ações.
{
"handler": "wait_answer",
"params": {
"type": "question",
"step": 2
}
}
O manipulador "find"
permite localizar uma entidade e usar seus dados. Se um elemento for encontrado, você pode usar os seguintes placeholders:
{{founded_id}}
– se um item da lista for encontrado.{{contact_double.*}}
– se um duplicado de contato for encontrado, permitindo acessar seus campos de maneira semelhante ao{{contact.*}}
placeholders.
{
"handler": "find",
"params": {
"type": "contact_double",
"params":{
"type": "name",
"actions": [
{
"handler": "show",
"params": {
"type": "buttons",
"value": "O número {{contact_double.cf.3574}} é seu?",
"buttons": [
"Sim",
"Não"
]
}
}
]
}
}
}
{
"handler": "find",
"params": {
"type": "catalog_elements",
"params": {
"value": "Salesbot",
"catalog_id": "15123",
"actions": [
{
"handler": "show",
"params": {
"type": "buttons",
"value": "An element was found with ID - {{founded_id}}🟥",
"buttons": [
"Yes🟥",
"No🟥"
]
}
}
]
}
}
}
O manipulador "filter"
permite encontrar uma entidade e usar seus dados. Se um elemento for encontrado, você pode usar os placeholders para os campos personalizados de external_lead
e external_contact
.
{
"handler": "filter",
"params": {
"type": 2,
"value": "{{lead.cf.111}}",
"custom_fields_id": 222,
"actions": [
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 1,
"value": "{{external_contact.cf.333}}",
"custom_fields_id": 444,
"enum": "WORK"
}
}
}
]
}
}
O manipulador "action"
permite realizar uma das ações possíveis:
A ação "unsorted"
permite aceitar ou rejeitar um Lead de Entrada.
{
"handler": "action",
"params": {
"name": "unsorted",
"params": {
"value": "accept"
}
}
},
{
"handler": "action",
"params": {
"name": "unsorted",
"params": {
"value": "decline"
}
}
}
A ação "change_status"
Permite alterar a etapa do lead.
{
"handler": "action",
"params": {
"name": "change_status",
"params": {
"value": 142
}
}
}
A ação "set_tag"
atribuirá uma tag ao lead ou contato e suporta o placeholder {{origin}}
, que especificará a origem do lead.
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "Salesbot"
}
}
},
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "{{origin}}"
}
}
}
A ação "unset_tag"
remove a tag de um negócio ou contato.
{
"handler": "action",
"params": {
"name": "unset_tag",
"params": {
"type": 2,
"value": "Salesbot"
}
}
}
A ação "set_custom_fields"
definirá os valores de campos personalizados para um lead ou contato. Você pode encontrar os IDs dos campos na seção Configurações de um lead/contato ou usando o método para obter a lista de campos da entidade. É possível usar placeholders descritos na seção "show"
como valores para os campos.
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "Value of the field",
"custom_fields_id": 123,
"option": "add"
}
}
},
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "{{message_text}}",
"custom_fields_id": 987
}
}
},
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": "lead",
"value": "{{last_validation_result}}",
"custom_field": "{{cf.talk.nps}}"
}
}
}
A ação "subscribe"
irá inscrever um usuário ou grupo de usuários no chat.
{
"handler": "action",
"params": {
"name": "subscribe",
"params": {
"type": "group",
"value": 111
}
}
},
{
"handler": "action",
"params": {
"name": "subscribe",
"params": {
"type": "user",
"value": "{{lead.responsible_user_id}}"
}
}
}
A ação "unsubscribe"
irá desinscrever um usuário ou grupo de usuários do chat.
{
"handler": "action",
"params": {
"name": "unsubscribe",
"params": {
"type": "user",
"value": "{{lead.responsible_user_id}}"
}
}
}
A ação "add_lead_contact"
criará um lead e um contato e os vinculará. Todos os campos para o lead e o contato podem ser configurados. Os valores dos campos personalizados suportam os mesmos placeholders do manipulador "show"
. Um "preset"
também é suportado, permitindo que o contato e o lead sejam criados somente se uma mensagem ou número de telefone for recebido do cliente.
{
"handler": "action",
"params": {
"name": "add_lead_contact",
"params": {
"preset": "contacts.require_email_or_phone",
"lead": {
"name": "Nome do lead",
"status_id": 142,
"responsible_user_id": 123,
"price": 2000,
"tags": "",
"custom_fields": [
{
"id": 77744111,
"values": [
{
"value": "{{contact.name}}"
}
]
},
{
"id": 77744222,
"values": [
{
"value": "{{lead.cf.77744222}}"
}
]
}
]
},
"contact": {
"name": "Nome do contato",
"responsible_user_id": 123,
"tags": "",
"custom_fields": [
{
"id": 77744444,
"values": [
{
"value": "{{message_text.email}}",
"enum": "WORK"
}
]
},
{
"id": 77744555,
"values": [
{
"value": "{{message_text.phone}}",
"enum": "WORK"
}
]
}
]
}
}
}
}
A ação "set_budget"
definirá o valor de venda para o lead.
{
"handler": "action",
"params": {
"name": "set_budget",
"params": {
"value": "{{lead.cf.555123}}*{{lead.cf.555321}}"
}
}
}
A ação "add_linked_company"
adiciona uma empresa vinculada a um lead e a um contato.
{
"handler": "action",
"params": {
"name": "add_linked_company",
"params": {
"name": "{{message_text}}"
}
}
}
A ação add_note
adiciona uma nota
{
"handler": "action",
"params": {
"name": "add_note",
"params": {
"element_type": 1,
"note_type": 4,
"text": "Texto da nota"
}
}
}
A ação "link"
vincula elementos.
{
"handler": "action",
"params": {
"name": "link",
"params": {
"from": 2,
"to": 11,
"to_id": "{{founded_id}}",
"to_catalog_id": 123
}
}
}
A ação change_responsible_user
altera o usuário responsável por um lead ou pelo contato associado.
{
"handler": "action",
"params": {
"name": "change_responsible_user",
"params": {
"value": 123,
"type": 2
}
}
}
A ação "link_to_unsorted"
vincula um chat de leads recebidos ao contato especificado em um lead. Se o contato especificado não existir no lead, o vínculo não ocorrerá. Se contact_id
não for fornecido, um contato será criado no lead especificado.
{
"handler": "action",
"params": {
"name": "link_to_unsorted",
"params": {
"entity_type": 2,
"entity_id": "12345"
}
}
}
O manipulador "meta"
é projetado para lidar com dados adicionais enviados quando o chat é iniciado.
Para mais informações sobre o envio de metadados, consulte a documentação do mensageiro:
{
"handler": "meta",
"params": {
"delimiter": "-",
"values": [
"lead.tags",
"lead.custom_fields.123",
"lead.custom_fields.124",
"lead.tags"
]
}
}
O manipuldor "condition"
é projetado para criar condições lógicas.
{
"handler": "condition",
"params": {
"term1": "chat.origin",
"term2": "telegram",
"operation": "=",
"result": [
{
"handler": "action",
"params": {
"name": "change_status",
"params": {
"value": 123
}
}
}
]
}
}
O manipulador "validations"
é projetado para criar condições lógicas.
{
"handler": "validations",
"params": {
"logic": "and",
"conditions": [
{
"client_value": "{{message_text}}",
"type": "regex",
"condition_value": "/[0-9]+/",
"operation": "contains"
},
{
"client_value": "{{message_text}}",
"type": "simple",
"condition_value": "654",
"operation": "equal"
},
{
"client_value": "{{message_text}}",
"type": "range_numbers",
"condition_value": {
"from": 123,
"to": 321
},
"operation": "contains"
},
{
"client_value": "{{message_text}}",
"type": "email",
"condition_value": "",
"operation": "contains"
}
],
"result": [
{
"handler": "goto",
"params": {
"type": "question",
"step": 3
}
}
]
}
}
A condição "simple"
verifica a igualdade/desigualdade ou compara o comprimento.
{
"client_value": "{{message_text}}",
"type": "simple",
"condition_value": "654",
"operation": "equal"
}
As condições "email"
e "phone"
verificam se uma string contém um número de telefone ou um email.
{
"client_value": "{{message_text}}",
"type": "email",
"condition_value": "",
"operation": "contains"
}
A condição "regex"
verifica se uma string contém uma expressão regular.
{
"client_value": "{{message_text}}",
"type": "regex",
"condition_value": "/[0-9]+/",
"operation": "contains"
}
A condição "range_numbers"
verifica se uma string contém um número dentro de um intervalo especificado.
{
"client_value": "{{message_text}}",
"type": "range_numbers",
"condition_value": {
"from": 123,
"to": 321
},
"operation": "contains"
}
O manipulador "preset"
foi projetado para processar mensagens recebidas usando modelos predefinidos.
O modelo "contacts.validate_base_info"
permite obter e verificar informações do usuário e, em seguida, solicitar qualquer informação faltante.
{
"handler": "preset",
"params": {
"name": "contacts.validate_base_info",
"params": {
"empty_email": "Por favor, forneça seu e-mail.",
"empty_phone": "Por favor, forneça seu número de telefone.",
"invalid_phone": "Parece que há um erro no número de telefone.",
"success": "Obrigado.",
"empty_all": "Por favor, forneça seu e-mail e número de telefone.",
"check_doubles": true,
"phone_doubles": "Este número de telefone já está em uso. Por favor, insira um número diferente.",
"email_doubles": "Este e-mail já está em uso. Por favor, insira um e-mail diferente.",
"all_doubles": "Este número de telefone e e-mail já estão em uso. Por favor, insira informações de contato diferentes.",
"use_quick_replies": true
}
}
}
O modelo "contacts.get_base_info"
permite obter informações sem fazer perguntas adicionais.
{
"handler": "preset",
"params": {
"name": "contacts.get_base_info"
}
}
O manipulador "send_internal"
permite enviar uma mensagem interna no chat do lead.
Se tanto
group_id
quantouser_id
forem especificados simultaneamente, a mensagem será enviada para o grupo de usuários.
{
"handler": "send_internal",
"params": {
"entity_id": "{{lead.id}}",
"entity_type": 2,
"message": "Olá!"
}
}
O handler send_external_message
envia uma mensagem/botões para o chat do cliente. A principal diferença em relação ao handler show
é a capacidade de especificar destinatários e canais de chat da mensagem enviada.
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Provide your phone number and email"
},
"recipient": {
"type": "main_contact",
"way_of_communication": "over_all"
},
"channels": [
{
"id": 23499795
}
],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": {
"handler": "goto",
"params": {
"step": 1,
"type": "question"
}
}
}
}
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Choose the option:",
"buttons": [
{
"type": "inline",
"text": "Option 1"
},
{
"type": "inline",
"text": "Option 2"
}
]
},
"recipient": {
"type": "main_contact",
"way_of_communication": "over_all"
},
"channels": [
{
"id": 23499795
}
],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": {
"handler": "goto",
"params": {
"step": 1,
"type": "question"
}
}
}
}
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Buttons with links",
"buttons": [
{
"type": "url",
"text": "Google",
"url": "https://google.com"
},
{
"type": "url",
"text": "YouTube",
"url": "https://youtube.com"
}
]
},
"recipient": {
"type": "main_contact",
"way_of_communication": "over_all"
},
"channels": [],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": null
}
}
{
"handler": "send_external_message",
"params": {
"message": {
"type": "external",
"text": "Provide your phone number and email"
},
"recipient": {
"type": "filtered_contacts",
"filter": {
"logic": "and",
"result": 1,
"conditions": [
{
"term1": "{{contact.cf.1880614.is_checked}}",
"term2": "{{contact.cf.1880614.1300836}}",
"operation": "=",
"value_type": "value"
}
]
},
"way_of_communication": "over_all"
},
"channels": [],
"metadata": {
"facebook_tag": "CONFIRMED_EVENT_UPDATE"
},
"on_error": {
"handler": "goto",
"params": {
"step": 1,
"type": "question"
}
}
}
}
O manipulador "widget_request:
é projetado para enviar webhooks para URLs externas do Salesbot.
Você pode usar esse manipulador apenas a partir do passo Widget do Salesbot. Encontre informações adicionais sobre o widget no Salesbot aqui.
{
"handler": "widget_request",
"params": {
"url": "https://example.com/endpoint",
"data": {
"contact": "{{contact.name}}",
"from": "widget"
}
}
}
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
O endpoint receberá uma requisição POST. Para confirmar que o webhook foi recebido, é necessário responder dentro de 2 segundos com o código de status HTTP 200.
{
"token": "JWT_TOKEN",
"data": {
"contact": "Nome do contato",
"from": "widget"
},
"return_url": "https://subdomain.kommo.com/api/v4/salesbot/321/continue/123"
}
O JWT token é necessário para validar os dados enviados na requisição. Ele é assinado com a chave secreta do cliente.
Para retomar a operação do bot, é necessário fazer uma requisição com os dados. O bot atual não continuará sua operação até receber a requisição. Além disso, você não poderá continuar a execução do bot se outro bot para a mesma entidade já estiver em execução.
O manipulador "stop"
é destinado a realizar ações quando o bot terminar.
{
"finish": [
{
"handler": "stop",
"params": {
"action": "talk-close"
}
},
{
"handler": "stop",
"params": {
"action": "salesbot-start",
"bot": 1234
}
}
]
}
Assinando um grupo de usuários para o chat.
[
{
"question": [
{
"handler": "action",
"params": {
"name": "subscribe",
"params": {
"type": "group",
"value": 111
}
}
}
]
}
]
Movendo o lead para outro estágio.
[
{
"question": [
{
"handler": "action",
"params": {
"name": "change_status",
"params": {
"value": 142
}
}
}
]
}
]
Enviando qualquer texto para o cliente:
[
{
"question": [
{
"handler": "show",
"params": {
"type": "text",
"value": "Olá"
}
}
]
}
]
Enviando uma mensagem com os botões de seleção:
[
{
"question": [
{
"handler": "show",
"params": {
"type": "buttons",
"value": "Por favor, escolha o tipo de participação:",
"buttons": [
"Offline",
"Online"
]
}
}
],
"answer": [
{
"handler": "buttons",
"params": [{
"regex": "/offline/iu",
"params": [{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "Offline",
"custom_fields_id": 4242
}
}
}]
},
{
"regex": "/online/iu",
"params": [{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"value": "Online",
"custom_fields_id": 4242
}
}
}]
}]
}]
}
]
Definindo uma tag para um lead:
[
{
"question": [
{
"handler": "action",
"params": {
"name": "set_tag",
"params": {
"type": 2,
"value": "salesbot"
}
}
}
]
}
]
Definindo um valor para um campo personalizado:
[
{
"question": [
{
"handler": "action",
"params": {
"name": "set_custom_fields",
"params": {
"type": 2,
"custom_fields_id": 123,
"value": "Valor do campo"
}
}
}
]
}
]
Salvando metadados no cartão do lead.
[
{
"question": [
{
"handler": "meta",
"params": {
"delimiter": "-",
"values": [
"lead.tags",
"lead.custom_fields.123",
"lead.custom_fields.124",
"lead.tags"
]
}
}
]
}
]
Solicitando e-mail e número de telefone, gravando no cartão do lead apenas a partir da primeira resposta.
[
{
"question": [
{
"handler": "show",
"params": {
"type": "text",
"value": "Por favor, forneça seu número de telefone e e-mail."
}
}
],
"answer": [
{
"handler": "preset",
"params": {
"name": "contacts.get_base_info"
}
}
]
}
]
