---
title: "OAuth 2.0 da API Kommo: Autenticação & Tokens de Acesso para Integrações"
source: "https://pt-developers.kommo.com/docs/oauth-20"
date: "2026-02-19"
---

OAuth é uma estrutura de autorização bem conhecida que permite que aplicações obtenham acesso limitado a contas de usuários. OAuth define quatro funções:
- Proprietário do recurso é o usuário que autoriza a aplicação a acessar sua conta, com um limite para o escopo da autorização que pode ser concedida.
- Servidor de recursos é o servidor que hospeda os recursos protegidos.
- Cliente é o aplicativo que deseja acessar a conta do usuário.
- Servidor de Autorização verifica a identidade do usuário e emite tokens de acesso para o aplicativo.
Quando um cliente precisa de acesso a um recurso protegido, ele verifica sua identidade com o servidor de autorização. Após a aprovação do proprietário do recurso, o servidor de autorização emite um token de acesso.
Esse token representa um escopo específico, tempo de vida e outros atributos de acesso que são diferentes das credenciais do proprietário do recurso. Esse token pode ser usado pelo cliente para acessar os recursos protegidos hospedados pelo servidor de recursos.
Abaixo está um diagrama de como as funções do OAuth geralmente interagem umas com as outras.
Uma conta de usuário na Kommo se refere ao proprietário do recurso em termos do OAuth. Nesse contexto, sua integração atua como o cliente e acessará e utilizará dados nas contas de usuário no servidor da Kommo (o servidor de recursos) com base nas permissões solicitadas e concedidas. A conta Kommo onde as integrações são criadas é chamada de conta de desenvolvedor. Após obtê-la, você receberá as credenciais da aplicação OAuth.
Aqui estão nossas razões para usar o OAuth:
- Mais seguro
Precisamos do OAuth para permitir que uma integração tenha acesso granular aos dados do usuário da conta Kommo, sem revelar as credenciais do usuário para a integração. Essa é uma grande vantagem do método OAuth em relação ao uso de chaves de API. - Gerenciar permissões
Quando um usuário interage com uma integração que usa OAuth para autenticação, ele será direcionado a uma página onde pode escolher se deseja conceder à integração acesso à sua conta. Ao fazer a solicitação, ele verá os dados específicos que a integração poderá acessar. O papel do OAuth é garantir que essas permissões sejam tratadas de forma segura e correta.
- Instalação de integrações:
Os usuários do Kommo não precisam acessar suas contas do Kommo para encontrar sua integração (aplicativo) e instalá-la. Como desenvolvedor, você pode fornecer um botão em seu site ou uma URL de webhook para instalar um widget a fim de conceder acesso à integração nas contas.
- Suporte ao desenvolvedor:
Ao desenvolver uma integração (aplicativo) e precisar testá-la, você não precisa passar por todo o processo de autorização OAuth. Em vez disso, você pode usar sua conta de desenvolvedor com direitos de administrador, copiar as chaves da janela modal da integração instalada e acessar os dados da conta sem redirecionamento.
Para que uma integração obtenha acesso aos dados da conta do usuário, ela precisa ser instalada/ativada na conta. Uma instalação é a conexão entre uma integração e a conta de usuário específica.
Quando um usuário instala uma integração em uma conta, ele receberá um identificador temporário chamado código de autorização.
- A integração pode ser instalada em mais de uma conta por um usuário, e usuários diferentes podem instalá-la na mesma conta usando o método botão no site. Nesse caso, a integração aparecerá apenas uma vez nas integrações instaladas, e um código de autorização diferente será gerado.
- Se sua integração possui sua própria autorização (por exemplo, uma chave de API), você deve monitorar cuidadosamente as instalações com os mesmos dados de autorização para evitar duplicação/roubo de informações. O usuário pode encontrar as integrações instaladas em Configuração ➡Seção integração ➡Instalados
- Usuários sem direitos de administrador não podem instalar uma integração, mas podem autorizar uma integração já instalada.
Para obter inicialmente um par de tokens de acesso e atualização, você precisará de um código de autorização. Esse código pode ser encontrado na interface ou por meio de um URI de redirecionamento se a autorização foi iniciada a partir de uma janela modal de permissões. O código expira após 20 minutos. É importante notar que o código não é oculto e pode ser visualizado em solicitações de servidor pelos usuários. Portanto, no protocolo OAuth 2.0, ele deve ser trocado por tokens de atualização e acesso usando as chaves dos aplicativos que são conhecidas apenas por você.
Quando uma integração é instalada em uma conta por diferentes usuários, haverá múltiplos códigos de autorização e tokens de acesso/atualização.
O administrador da conta pode visualizar uma lista de usuários que receberam acesso à integração na seção de autorização da janela modal do widget. Nessa seção, o administrador também pode revogar o acesso. Para lidar com o evento de desativação (desinstalação), o desenvolvedor da integração pode se inscrever no evento de revogação de acesso na seção de configurações da integração usando um webhook.
É uma string no padrão JSON Web Token, usada para acessar os serviços da Kommo a partir de usuários identificados. Funciona como um equivalente ao ID de sessão. Cada token de acesso contém:
- ID de Usuário: o ID do usuário ao qual o token está vinculado
- ID de Integraçao: o ID da integração ao qual o token está vinculado
- Conjunto de Ações disponíveis no aplicativo
- ID da Conta: o ID da conta ao qual o token está vinculado
O token de acesso tem uma duração limitada (24 horas) e pode ser obtido usando um código de autorização ou um token de atualização.
É uma string adicional que é emitida juntamente com o token de acesso. Ele é usado para atualizar e renovar o token de acesso cujo período de validade está prestes a expirar. O token de atualização tem uma vida útil de 3 meses, e a cada atualização do token de acesso, um novo token de atualização é gerado. Cada vez que uma sessão expira, você precisará atualizar ambos os tokens, e não pode usar a chave antiga.
Se, após três meses, a integração não tiver sido utilizada, o token de atualização será revogado. Isso significa que o usuário que teve o acesso concedido precisará ter o acesso autorizado novamente.
Vamos analisar o processo completo de obtenção de acesso aos dados, começando pelo registro de uma nova integração. Consideraremos trabalhar diretamente com a API de autorização, mas você pode usar bibliotecas pré-fabricadas para simplificar o desenvolvimento.
Desenvolvemos a autorização com base no protocolo OAuth 2.0, por isso você pode encontrar em código aberto muitos exemplos e documentação que descrevem a lógica de fazer solicitações.
As integrações são usadas para permitir que seu aplicativo/serviço envie solicitações para a API do Kommo.
O primeiro passo é ir para Configurações ➡ Integrações ➡ Criar Integração
- Para criar uma integração, você precisa ter direitos de administrador da conta.
- A integração será atribuída a esta conta. Isso significa que qualquer um dos administradores dessa conta poderá gerenciar a integração e terá acesso às suas chaves compartilhadas. Essa conta será tratada por nós como uma conta de desenvolvedor.
- Se você estiver desenvolvendo uma integração pública, precisará se familiarizar com os requisitos.
Após clicar no botão Criar Integração , aparece um formulário contendo as propriedades da integração.
Após preencher o formulário, salve a integração. A Kommo gerará e exibirá as chaves necessárias na aba de chaves e escopos. Você usará o codigo de autorização no processo de autorização. A Chave secreta e e ID de integração serão utilizados independentemente da conta em que for instalada.
A chave secreta é exibida apenas uma vez após a emissão e fica oculta por padrão, portanto, certifique-se de salvá-la. Ao clicar no botão Gerar chave secreta, você verá uma aba de aviso informando que está prestes a gerar sua nova chave secreta.
Você pode regenerá-la a qualquer momento, mas observe que todo o acesso anterior à integração vinculado à chave antiga será revogado.
Após a emissão de uma chave secreta, você pode copiá-la e salvá-la para uso posterior.
Se você estiver trabalhando com uma integração pública, é possível manter todos os acessos anteriores. Ao regenerar sua chave secreta, você pode escolher se deseja excluir as autorizações antigas ou não, marcando a caixa apropriada.
Você pode obter o código de autorização de três maneiras:
- Copiando-o da janela modal da integração instalada. Isso funcionará se você precisar integrar apenas uma conta da Kommo.
- Se sua integração tiver um widget, após a instalação, um webhook será enviado para o URI de redirecionamento.
- Obtendo o código após o usuário ser redirecionado para o URI de redirecionamento.
Você pode simplificar o desenvolvimento ao obter uma chave via parâmetros GET com o botão no site da Kommo.
- Gere o link para os usuários acessarem. Você precisa enviar o usuário para a URL.
-
https://www.kommo.com/oauth?client_id={Integration_ID} &state={parameter_of_the_state_that_will_be_sent_to_you_to_Redirect_URl} &mode={popup_or_post_message}
Integration_ID
já é conhecido por você a partir da janela modal da integração instalada.
O parâmetrostate
é gerado pelo seu parâmetro de string, talvez seu hash. Ostate
é necessário para que, ao receber uma resposta da Kommo, você possa verificar sua validade comparando o token enviado e o resultante, para garantir que não haja substituição CSRF.
O parâmetromode
é responsável pelo processamento da solicitação para o URI de redirecionamento. No métodopopup
a janela de autorização será fechada, e a transição para o URI de redirecionamento será realizada na janela principal. Se o valorpost_message
for passado, o redirecionamento ocorrerá na janela que foi aberta. Após processar o código de autorização, você precisa fechar a janela.[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
.
É crucial que todo o processo seja transparente para o usuário. Quando os usuários clicarem no link, eles devem estar cientes de que a solicitação de permissões ocorrerá dentro de sua conta Kommo. Além disso, eles precisam estar claros sobre qual integração estão tentando instalar.
- Quando o usuário clicar no link, ele verá o nome da sua integração e a lista de permissões que a integração requer.
- Se o usuário não estiver autorizado, será solicitado que ele se autorize na Kommo. Caso contrário, ele poderá escolher entre as contas em que é o administrador. Para integrações privadas, a lista será limitada a uma única conta.
- Após selecionar uma conta e clicar no botão Permitir, a integração será instalada na conta selecionada e o usuário será redirecionado em uma janela modal ou na janela principal, dependendo do parâmetro de modo. Eles serão redirecionados para o URI de redirecionamento que você indicou na fase de configuração da integração, com os parâmetros GET:
code
,referrer
,state
,from_widget
.
O parâmetrocode
contém o código de Autorização, o parâmetroreferer
representa o endereço da conta do usuário, e o parâmetrostate
é a string que você passou ao abrir a janela. Se nenhuma string foi passada, esse parâmetro não será retornado. Se enviarmos um web hook após a instalação do widget, você receberá adicionalmente o parâmetro GETfrom_widget
.
{Redirect URl}?code=XXX&state={state}&referer={subdomain}.kommo.com&client_id={Integration Id}
- Caso o usuário clique no botão Declinar, ele vai ser redirecionado para o URI de redirecionamento do parâmetro GET
error=access_denied
, e com o parâmetro GETstate
, caso tenha sido enviado antes.
{Redirect URl}?error=access_denied&client_id={Integration Id}&state={state}
Exemplo de processamento de autorização, se um parâmetropost_message
foi enviado
Ao passar o parâmetro GET com o modo post_message
na janela para permitir o acesso, o redirecionamento ocorrerá na mesma janela. Abaixo, discutiremos exemplos de interação entre a janela modal para permitir o acesso e a janela principal usando a função postMessage.
O código abaixo é da janela principal:
var popup;
auth();
// 1. Abre a janela para conceder acesso
function auth() {
popup = window.open('https://www.kommo.com/oauth?client_id=XXX&state=XXX&mode=post_message', 'Allow Access', 'scrollbars, status, resizable, width=750, height=580');
}
// 2. Registrando um manipulador de mensagens da janela popup
window.addEventListener('mensagem', updateAuthInfo);
// 3. A função de manipulador registrada acima
function updateAuthInfo(e) {
if (e.data.error !== undefined) {
console.log('Erro - ' + e.data.error)
} else {
console.log('Autorização completa')
}
// 4. Fechando a janela modal
popup.close();
}
O código abaixo será enviado para a janela modal a partir do seu servidor backend quando o usuário chegar ao URI de redirecionamento:
<!doctype html>
<html lang="en">
<head>
<title>OAuth Postback</title>
<script>
//Passando dados para a janela principal, o conjunto de dados é definido por você
if(window.opener){
window.opener.postMessage({'error': undefined, 'status': 'ok'}, "*");
}
</script>
</head>
</html>
Após processar o código acima, a janela principal indicará o resultado.
Recomendamos fechar a janela modal automaticamente, como é feito no exemplo, para que os usuários não fiquem confusos.
Após obter o código de autorização, você precisa fazer uma solicitação para um método especial método POST /oauth2/access_token
, conforme explicado abaixo. Como resposta, você receberá um par de tokens de acesso e atualização, além do tempo em segundos até que os tokens expirem.
O token de acesso é semelhante a uma chave de sessão. Ele pode ser salvo na integração e usado para solicitações de API até que seu tempo de vida expire. O token deve ser acessível apenas à sua integração, por isso recomendamos não salvá-lo em cookies do navegador ou em arquivos de configuração abertos, etc.
Na seção anterior, você pode ter notado que recebemos um token de atualização junto com um token de acesso. Isso é necessário para continuar trabalhando com a API após a expiração do token de acesso.
Um token de atualização tem duas limitações de duração:
- O token de atualização tem uma duração de 3 meses. Se uma integração não for utilizada em 3 meses e nenhuma solicitação for feita para atualizar o token, a integração perderá o acesso aos dados e será necessário solicitar permissão novamente ao usuário.
- Uma vez que um token de atualização é utilizado para obter um novo par de tokens de acesso e atualização, o antigo token de atualização se torna obsoleto. Assim que você obtiver um novo token de atualização, precisará salvá-lo; caso contrário, será necessário solicitar acesso novamente ao usuário.
Uma vez que a data de expiração tenha passado, não é mais possível obter um token de acesso a partir do token de atualização. Você precisará solicitar um método usando um token de atualização válido para trocá-lo. Como resultado, você receberá novos tokens de acesso e atualização em resposta.
Ao enviar o token de atualização, você recebe um novo par de tokens: acesso e atualização, mas o antigo token de atualização ainda será funcional e você pode usá-lo até que utilize o novo.
Vamos considerar o seguinte cenário:
- Quando um token de acesso expira, a integração envia o token de atualização para obter um novo token de acesso, e como de costume, a Kommo retorna um novo token de atualização junto com ele.
- Ocorre um erro de rede e a integração não recebe os novos tokens de acesso e atualização.
- Nesse caso, a integração deve enviar o token de atualização antigo, que ainda é válido, para obter novos tokens de acesso e atualização.
Com a ajuda do token de acesso recebido, você pode fazer requisições para todos os métodos de API, para os quais o token possui permissões suficientes. O token tem os direitos do usuário que concedeu o acesso.
Você tem a opção de especificar o endereço para o qual a solicitação será enviada quando a integração for desativada.
Assim que o gancho for recebido, você poderá desativar a integração e restringir as solicitações à conta na qual a desconexão ocorreu.
Sugerimos fornecer este link, pois ele ajudará a evitar solicitações desnecessárias à API e a acompanhar quando a integração foi desativada.
Ao trabalhar com a lógica acima, algumas exceções que precisam ser tratadas podem aparecer. Vamos dar uma olhada em todas elas:
- Se o usuário não concedeu permissão para acessar a conta e o botão da Kommo foi utilizado, uma função passada como um dos parâmetros será executada. Se a página foi aberta sem um botão e o usuário recusar, ocorrerá um redirecionamento para o URI de redirecionamento com o parâmetro GET 'error=access_denied'.
- Se o administrador da conta desativou a instalação da integração, o token de acesso concedido a ela será revogado. Ao solicitar a API, você receberá o código HTTP 401. Para continuar o funcionamento da integração, o integrador deve novamente obter autorização para sua integração do usuário.
- Se você não salvou o token de atualização atual, ou se ele foi perdido ou passaram-se mais de 3 meses, para continuar o funcionamento da integração, você precisará passar novamente pelo processo de autorização .
- Se você perdeu as chaves principais de uma integração ou as publicou acidentalmente, você pode atualizar a chave secreta na janela modal da integração da conta onde ela foi criada. Após atualizar a chave secreta da integração, você precisará atualizar a chave secreta nas configurações da sua integração.
- Se ocorreu um erro de rede durante a obtenção dos novos tokens de acesso e atualização, o antigo token de atualização ainda funcionará normalmente. Nesse caso, a integração deve enviar o antigo token de atualização, que ainda é válido, para obter novos tokens de acesso e atualização.
