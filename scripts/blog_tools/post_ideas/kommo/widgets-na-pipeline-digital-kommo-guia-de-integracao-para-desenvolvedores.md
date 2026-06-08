---
title: "Widgets na Pipeline Digital Kommo — Guia de Integração para Desenvolvedores"
source: "https://pt-developers.kommo.com/docs/widgets-na-pipeline-digital"
date: "2026-02-17"
---

Widgets podem interagir com a funcionalidade da pipeline digital e responder a qualquer um dos seguintes eventos:
- E-mail recebido
- Chamada recebida
- Mensagem de chat recebida
- Avançar para o estágio
- Entrar no site (para este evento, é possível configurar a ação pendente)
Para que o widget interaja com a Pipeline Digital, o arquivo manifest.json deve especificar o escopo digital_pipeline
e o bloco dp/settings\
.
Quando um evento ocorre, enviaremos um webhook para o endereço especificado. É importante observar que esperamos uma resposta rápida do seu “accepter”.
Usando a propriedade webhook_url
do manifest.json, você pode recuperar dados da pipeline digital para o seu servidor sem a necessidade de enviar o widget para moderação.
{
"event": {
"type": 15,
"type_code": "lead_appeared_in_status",
"data": {
"id": 123123, // ID do Lead
"element_type": 2, // Tipo de entidade (2 - lead)
"status_id": 654321, // ID da Etapa
"pipeline_id": 123456, // ID do Pipeline
"direction_of_movement": "went_to_trigger"// a direção do movimento do lead em relação ao gatilho
},
"time": 1491300016
},
"action": {
"settings": {
"widget": {
"settings": {
//Configurações do widget da pipeline digital
}
}
}
},
"subdomain": "minha_empresa",
"account_id": XXXXXXX
}
Se você definir action_multiple
como true
no bloco dp
do manifest.json, permite que a ação do widget se estenda por vários estágios. Quando o estágio de um lead muda e está dentro dos estágios cobertos pelo widget, você recebe o tipo com o código 15
. Quando o lead transita para um estágio que ativa seu widget, você recebe o tipo com o código 14
.
Esta seção não inclui a parte de backend do widget e o código não funcionará sem o backend. Aqui, queremos apenas demonstrar as capacidades funcionais do widget na Pipeline Digital.
Assim que o widget for adicionado com sucesso e estiver disponível para integração, o acesso às suas configurações será possível em várias áreas. O acesso total às configurações estará disponível de forma padrão, como para todas as integrações, na seção Configurações ➡️ Integrações da sua conta. Caso o widget seja uma integração com a Pipeline Digital, o acesso também aparecerá nas configurações da Pipeline Digital, na seção Leads, onde é possível gerenciar ações automáticas para todos os leads.
Este elemento é renderizado do nosso lado, incluindo a seleção da condição sob a qual a ação do widget será executada. Do seu lado, é necessário preencher o elemento com configurações rápidas ou seleções de ações que serão realizadas quando a condição escolhida pelo usuário for atendida.
Por exemplo, vamos descrever a parte front-end do widget no script.js, que exibe as configurações dentro do elemento de configurações rápidas. Escolheremos enviar uma mensagem quando uma condição selecionada pelo usuário for atendida (veja o exemplo no screenshot acima).
Exemplo
dpSettings: function() {
var w_code = self.get_settings().widget_code, // Código do widget especificado no manifest.json
lang = self.i18n('settings'),
dp_modal = $(".digital-pipeline__short-task_widget-style_" + w_code)// Podemos referenciar o elemento que contém especificamente o seu widget.
.parent()
.parent()
.find('[data-action=send_widget_hook]'),
message_label = dp_modal.find('[title^=' + lang.message.split(" ")[0] + ']'), // Suas explicações para os campos, descritos no com.json.
message_label_new = "" + lang.message + "",
message_input = dp_modal.find('input[name=message]'), // A referência ao texto inserido
message_textarea = self.render( // Renderize o campo de entrada de texto
{
ref: '/tmpl/controls/textarea.twig'
}, {
id: 'dp_message',
style: {
'width': '396px',
'margin-top': '5px',
'margin-bottom': '-3px'
},
value: message_input.val(),
placeholder: lang.message
}
);
message_label.hide().after(message_label_new);
message_input.hide().after(message_textarea);
return true;
}
É importante lembrar sobre declarar as configurações em manifest.json.
"locations": [
"settings",
"digital_pipeline"
],
"dp": {
"settings": {
"message": {
"name": "settings.message",
"type": "text",
"required": true
}
}
Os placeholders são usados para preencher automaticamente dados dos perfis de lead/contato/empresa nas mensagens de texto. Com a presença de placeholders na integração, você pode criar mensagens de texto universais para toda uma lista de contatos, economizando tempo na substituição de dados em cada caso individual.
No caso de sua integração ter uma função de envio de informações, pode ser útil enviar informações apenas para o contato principal. Um lead pode ter mais de um contato, então a implementação da função de enviar informações somente para o contato principal pode ser útil para os usuários.
Você precisa adicionar a capacidade de selecionar uma distribuição apenas para o contato principal na área de configuração rápida, quando conectar o widget em ações automáticas para todos os leads no pipeline digital.
dpSettings: function() {
var lang = self.i18n('dp.settings');
var form = $('#widget_settings__fields_wrapper');
var field_divs = form.find('.widget_settings_block__input_field');
var textarea_div = field_divs.first();
textarea_div.html('<textarea name="message" ' +
'style="height:50px; width: 100%;" ' +
'id="message" ' +
'class="text-input text-input-textarea digital-pipeline__add-task-textarea textarea-autosize task-edit__textarea">' +
'' + textarea_div.find('input').val() +
'</textarea>');
var checkbox_template = '<label class="control-checkbox">' +
'<div class="control-checkbox__body">' +
'<input type="checkbox" id=""/>' +
'<span class="control-checkbox__helper"></span>' +
'</div>' +
'<div class="control-checkbox__text element__text">' +
'<span class="control-checkbox__note-text">' + lang.only_main.name + '</span>' +
'</div>' +
'</div>' +
'</label>';
var checkbox_div = field_divs.last();
checkbox_div.siblings().html('');
checkbox_div.html(checkbox_template);
return true;
}
No caso de, com base nos resultados do seu widget, você precisar adicionar as informações de notificação apropriadas no perfil da entidade, recomendamos usar a adição de um evento de sistema( nota).
Os eventos são exibidos nos perfis junto com as tarefas, sempre em ordem cronológica.
Para adicionar um evento de sistema (nota), você deve especificar "note_type": "extended_service_message"
.
Na Kommo, há uma opção para conectar um salesbot já implementado. Esse bot pode ser programado para realizar ações específicas e ajudar a coletar dados dos usuários por meio de mensageiros (Telegram, Facebook Messenger, Viber).
Um guia detalhado sobre como conectar, funcionalidades, configurações, idiomas e como trabalhar com o nosso Salesbot pode ser encontrado na seção do Salesbot.
Todo conta no Kommo com um plano avançado ou superior tem a capacidade de notificar seu servidor web sobre ações. Esses WebHooks podem ser usados para atualizar as informações dos leads em sua loja, enviar notificações por SMS ou automatizar o gerenciamento de leads. Cada WebHook pode ser configurado para operações e eventos específicos.
WebHooks são notificações enviadas para aplicativos de terceiros sobre eventos que ocorrem no Kommo. Para mais informações sobre como os WebHooks funcionam e sobre o pipeline digital, consulte a seção de WebHook.
