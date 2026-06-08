---
title: "Botão de Chat do Site via API Kommo: Configuração & Personalização"
source: "https://pt-developers.kommo.com/docs/bot%C3%A3o-de-chat-do-site-via-api"
date: "2026-02-19"
---

Tudo descrito neste artigo funciona apenas com o código para adicionar o botão de chat do site copiado da interface do Kommo.
Acesse um Pipeline ➡️ Automatize ➡️ + Adicionar fonte no menu à esquerda ➡️
➡️ Vá até a aba Instalação ➡️ Copie o código.
É necessário configurar o objeto de configurações window.crmPluginConfig
para o Botão de Chat do Site em qualquer lugar da página antes de incluir o código do botão em si.
window.crmPluginConfig = {
hidden: false, // Esconder o botão ao carregar a página
color: '#000', // Mudar a cor do botão, ignorando a cor configurada na Kommo
onlinechat: {
mode: 'widget', // Pode ser também ‘frame’, mais detalhes abaixo
user_id: '', // ID do usuário do chat online (parâmetro opcional)
locale: {
extends: "com",
compose_placeholder: "Escreva sua pergunta…",
},
theme: {
header: false,
},
},
};
Vamos dar uma olhada mais detalhada nas configurações do chat online.
window.crmPluginConfig = {
onlinechat: {
mode: 'frame',
container: '#custom_chat_holder',
},
};
Neste caso, ao clicar no ícone do chat online no botão, o chat será aberto não em um bloco pop-up ao lado do botão, mas em um elemento específico da página indicado na propriedade container.
Neste modo, as mensagens pop-up que chegam param de aparecer ao lado do botão. Quando uma nova mensagem chega no chat online, ela exibe apenas a contagem de mensagens não lidas.
Lista completa de strings disponíveis para localização:
window.crmPluginConfig = {
onlinechat: {
locale: {
extends: 'pt',
date_format: 'dd.MM.YYYY',
time_format: 'HH:mm',
compose_placeholder: 'Escreva uma mensagem...',
delivery_status_sending: 'Enviando',
delivery_status_sent: 'Enviado',
delivery_status_read: 'Lido',
delivery_status_error: 'Erro',
powered_by: 'Powered by',
new_messages: 'Novas mensagens'
},
},
};
Você pode enviar apenas as strings necessárias para tradução, especificando o locale
inicial via extends
. Atualmente, o chat online suporta três localizações integradas: en, es, pt.
Para date_format
e time_format
você pode especificar quaisquer valores válidos da biblioteca date-fns.
window.crmPluginConfig = {
onlinechat: {
theme: {
background: 'yellow', // fundo
system_color: 'pink', // cor dos textos do sistema (status de entrega, data)
header: { // você pode especificar header: false, e assim ele não será renderizado
background: 'skyblue', // cor do fundo do topo do chat
color: 'black', // cor do texto superior
},
message: {
outgoing_background: 'red', // fundo da mensagem do usuário
outgoing_color: 'white', // cor da mensagem do usuário
incoming_background: 'blue', // fundo da resposta
incoming_color: 'white', // cor da resposta
},
compose: {
height: 100, // altura mínima em pixels (máximo 170px, não pode ser alterado)
button_background: 'black', // fundo do botão de envio
}
},
},
};
Todas as cores devem ser especificadas em um formato que possa ser processado pelo CSS no navegador (por exemplo, código hex, rgb, rgba).
Aplique a propriedade user_id
para criar o ID de usuário do seu chat online. Isso pode ser útil em casos onde você deseja continuar a conversa em um chat já existente, caso o usuário esteja logado em outro dispositivo.
Exemplo de uso:
- O cliente de uma loja online está autorizado em sua conta e inicia o diálogo no chat online (onde o
user_id
foi previamente transferido). - O mesmo cliente decide fazer login de outro dispositivo (por exemplo, um celular).
- Após o cliente ser autorizado em sua conta, passamos o mesmo
user_id
. - Quando o cliente abre a janela do chat online, um diálogo existente com todo o histórico de mensagens será exibido.
Recomenda-se fortemente que o user_id
seja criptografado usando qualquer algoritmo de criptografia conveniente para você (SHA-256, MD-5, etc.) para proteger contra o acesso à conversa por tentativa de iteração sobre o ID de usuário.
window.crmPluginConfig = {
onlinechat: {
user_id: 'abc123'
},
};
Para trabalhar com chats, é fornecida uma função especial em JavaScript chamada crmPlugin
. Ela pode ser usada em qualquer lugar depois de instalar o código do botão.
Métodos suportados:
crmPlugin(‘runChatShow’)
– exibir o chat.crmPlugin(‘runChatHide’)
– ocultar o chat.
Às vezes, é necessário destruir a instância atual do botão e inicializar uma nova, por exemplo, para iniciar um chat com um user_id
diferente.
Método para destruir uma instância:
crmPlugin(‘runDestroy’)
– remover a instância atual do botão.
Também são fornecidos callbacks para responder a eventos que ocorrem no botão e no chat online.
crmPlugin('onChatShow|onChatHide', function () {
});
crmPlugin('onChatReady', function () {
// O chat é inicializado
// Permite trabalhar com ele por meio da API JavaScript
crmPlugin('runChatShow');
});
crmPlugin('onButtonClick', function (service, link) {
// quando o botão é clicado
// parâmetros de entrada:
// código do serviço
// URL do link clicado
});
crmPlugin('onConversationsChange', function (conversations) {
// Ao mudar de conversa
//
// Quando múltiplas conversas estão desativadas, o evento será acionado uma única vez
// Nesse caso, o valor de conversations será false
//
// Parâmetros recebidos:
// conversations - array de conversas visíveis
// formato da conversa
//
// {
// name: 'A123',
// is_closed: true | false,
// last_message: {
// media: {
// url: 'https://path_to_resource.mp4',
// thumbnail: 'https://path_to_preview.jpg',
// } | undefined,
// created_at: 1655283158457,
// is_out: true | false,
// text: 'Olá',
// type: 'text' | 'video' | 'photo',
// author: {
// name: author.name,
// } | undefined,
// },
// },
});
ocê pode passar seus próprios parâmetros para o chatbot online usando o método crm_plugin.setMeta
e construir diferentes cadeias de comportamento do bot com base nesses parâmetros.
Por exemplo, se um usuário estiver autenticado no seu site e você quiser cumprimentá-lo pelo nome, será necessário chamar o seguinte código no seu site:
var NOME_DE_USUARIO = "";
crm_plugin.setMeta({
bot_params: {
username: NOME_DE_USUARIO
}
});
Adicione a mensagem de boas-vindas olá,{{bot_params.username}}
no chatbot online.
Além disso, o chatbot online suporta uma condição com a verificação de bot_params
no primeiro passo, permitindo implementar facilmente, por exemplo, multilinguismo na mensagem de boas-vindas.
No seu site, você precisará encaminhar o parâmetro com o idioma atual do usuário:
var LOCALE = "com"; // Obter o idioma via geoip ou API do navegador
crm_plugin.setMeta({
bot_params: {
locale: LOCALE
}
});
Coloque a condição em primeiro lugar no bot e, na área de texto da condição, adicione o seguinte código:
// Como você pode ver, trata-se de um array
// então podem existir várias condições “e”
[
{
"term1": "{{bot_params.locale}}",
"term2": "com",
"operation": "="
}
]
Agora, se o usuário acessar o site e determinarmos que o idioma dele é inglês, ele será direcionado para o ramo do bot em inglês.
Você também pode adicionar scripts em outros idiomas através da interface de blocos, e sempre haverá um bloco “else” comum, que conterá um ramo de script alternativo caso o usuário não se enquadre em nenhuma das condições.
Para enviar seu próprio hook para acionar uma ação-chave, execute o seguinte código em qualquer lugar após conectar o código do botão ou por algum evento do navegador (por exemplo, ao clicar em um botão):
crmPlugin('sendKeyActionHook', 'Nome do Hook');
Você pode defini-lo na aba Configurações Avançadas nas Configurações do Botão de Chat no Site.
