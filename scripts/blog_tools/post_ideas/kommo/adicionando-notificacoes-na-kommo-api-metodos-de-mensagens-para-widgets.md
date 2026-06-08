---
title: "Adicionando Notificações na Kommo: API & Métodos de Mensagens para Widgets"
source: "https://pt-developers.kommo.com/docs/adicionando-notifica%C3%A7%C3%B5es"
date: "2026-02-19"
---

Para publicar notificações, é implementada uma API pública, acessada chamando os métodos correspondentes do objeto global APP da Kommo. Ao chamar o método, é necessário transferir um objeto com a descrição da notificação.
O método é projetado para acionar uma notificação pop-up, que aparecerá apenas na interface e não será duplicada em outros canais de entrega.
show_message()
Exemplo:
var message_params = {
header: "Aviso",
text: "Conexão estabelecida",
date: 1714566795,
icon: "https://www.example.com/images/telephone.png"
};
APP.notifications.show_message(message_params);
Resultado:
O método exibirá uma notificação de erro na interface da conta, e a mensagem não será enviada por outros canais de entrega.
show_message_error()
var error_params = {
header: “Aviso”,
text: “Conexão com o servidor perdida”
};
APP.notifications.show_message_error(error_params);
O método permite exibir uma notificação pop-up para uma chamada ou erro. Se esta funcionalidade for utilizada, ela aparecerá apenas na interface e não será enviada por outros canais.
show_notification()
var notification = {
text: {
header: "Chamada de saída",
text: "Discando o número +19872345678"
},
type: "call"
};
APP.notifications.show_notification(notification);
var notification = {
text: {
header: "Erro",
text: "Erro ao trabalhar com o widget"
},
type: "error"
};
APP.notifications.show_notification(notification);
O método permite adicionar uma notificação de erro ao centro de notificações, e a mensagem será enviada para todos os canais ativos na conta do usuário.
add_error()
var error_params = {
header: "Erro",
text: "Falha ao configurar a tarefa! Contato não encontrado!",
date: 1714566795,
link: "/contacts/list/?term=4951234567"
};
APP.notifications.add_error(error_params);
Notificação por e-mail sobre o erro:
Notificação recebida no aplicativo móvel:
A API do Centro de Notificações permite exibir uma mensagem de chamada recebida. A notificação será transmitida por todos os canais de entrega ativos.
add_call()
var call_params = {
text: "Chamada de +1 (415) 523-7743",
date: 1714566795,
from: "João Santos",
to: "Maria da Silva",
element: { id: 18221265, type: "contact" },
duration: 250,
link: 'https://example.com/dialog.mp3'
};
APP.notifications.add_call(call_params);
