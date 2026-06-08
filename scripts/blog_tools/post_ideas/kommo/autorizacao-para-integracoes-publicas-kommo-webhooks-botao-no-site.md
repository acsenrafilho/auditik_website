---
title: "Autorização para Integrações Públicas Kommo: Webhooks & Botão no Site"
source: "https://pt-developers.kommo.com/docs/authorization-for-public-integrations"
date: "2026-02-19"
---

Ao desenvolver uma integração pública, com ou sem um widget, a primeira coisa a fazer é criar uma integração. Após criar a integração, você precisa enviá-la para moderação para que, caso seja aprovada, ela seja exibida no Marketplace.
Sua integração pode ser autorizada em uma conta Kommo por meio de um webhook ou utilizando o botão no site, dependendo se há um widget disponível ou não.
O tempo máximo permitido para o envio de um webhook da nossa parte é de 3 segundos. Não verificamos o código de resposta, e o reenvio do webhook não é possível. Por favor, note que cliques virtuais no botão de instalação não são permitidos em widgets.
As integrações públicas com widgets funcionam com a Kommo por meio da API e do SDK web. Elas são exibidas no Marketplace e estão disponíveis para instalação diretamente nele.
Ao instalar o widget por meio da interface do Kommo, o usuário receberá um webhook no URI de Redirecionamento especificado nas configurações da integração, com os parâmetros GET: code
, referer
, e from_widget
.
code
: Representa o código de autorização.referer
: Indica o endereço da conta do usuário.from_widget
: Especifica que a solicitação foi acionada pela instalação do widget.
As integrações públicas sem widgets funcionam com o Kommo apenas via API. Elas são exibidas no Marketplace, mas em um formato somente para visualização.
Quando o usuário clica no ícone da integração, ele verá uma descrição da integração, incluindo como ela funciona e como instalá-la. O usuário será orientado a visitar um site externo fornecido pela integração, e a instalação será realizada através de um botão no site. Clicar no botão abrirá uma nova página onde o usuário pode selecionar sua conta e fornecer consentimento para autorizar a integração.
Após conceder acesso, o usuário será redirecionado para o URI de redirecionamento com os seguintes parâmetros GET: code
, referer
, e state
. Você pode então trocar o código recebido por um token de acesso, e a integração aparecerá na lista de integrações instaladas.
Para passar pela moderação para integrações desse tipo, assegure-se de que a descrição especifique para onde os usuários devem ir para concluir a instalação.
Se você está desenvolvendo uma integração pública sem widget, antes de passar pela moderação, você pode usar o método botão no site, mas em modo limitado. Na janela gerada para conceder acesso, apenas uma conta estará disponível, a mesma em que a integração foi criada. Após selecionar a conta, a mesma mecânica de redirecionamento do usuário funcionará como em integrações públicas.
Se você está desenvolvendo uma integração que possui tanto um widget quanto uma parte do backend que interage com nossa API, você poderá receber um webhook ao instalar o widget.
