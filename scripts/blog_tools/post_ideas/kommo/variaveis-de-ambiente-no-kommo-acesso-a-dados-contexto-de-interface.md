---
title: "Variáveis de Ambiente no Kommo: Acesso a Dados & Contexto de Interface"
source: "https://pt-developers.kommo.com/docs/vari%C3%A1veis-de-ambiente"
date: "2026-02-19"
---

Se precisar interagir com a conta de um cliente, você pode acessar o objeto global APP, que fornece dados relevantes com base na interface de usuário que o cliente está utilizando no momento.
Para explorar as capacidades dessa ferramenta, abra o console e digite APP.
APP.getBaseEntity()
O método retornará uma string indicando a entidade em que você está atualmente (por exemplo, leads ou contatos).
APP.isCard()
O método retornará um valor booleano (true/false
) indicando se você está atualmente no cartão.
APP.getWidgetsArea()
O método retornará o código da página em que você está no momento.
APP.lang_id
A propriedade armazena o código da língua configurada no perfil do usuário.
Constantes disponíveis
A função foi projetada para recuperar o valor da constante associado à chave passada.
APP.constant('user')
{
amojo_id: "1111111-2222-3333-4444-55555555555555",
api_key: "",
group_mates_ids: (5) [123456, 234567, 3456789, 4567890, 0987654],
id: 123456,
login: "[email protected]",
name: "Nome da empresa",
personal_mobile: "+1234567890",
photo: "/v3/users/some-photo/avatar/?1234567890",
settings:
{layout_width: {…}, feed_filter: null, notify_time_before_task: 300, default_task_preset: '', need_msec: false, …},
sso_auth: false,
theme: 1,
tour: false,
user_rank: "master",
uuid: "55555555-6666-7777-8888-999999999",
[[Prototype]]: Object
}
Por outro lado, se um valor for passado, ele definirá o valor da constante para esse valor.
- As integrações públicas possuem diretrizes específicas que proíbem a reatribuição de constantes do sistema.
- As constantes do sistema que não estão incluídas na lista acima podem mudar ou até desaparecer completamente.
A principal parte do sistema é implementada no framework backbone.js . Você pode consultar a documentação do framework para trabalhar com variáveis de ambiente.
Se você estiver trabalhando com qualquer interface do sistema, exceto os cartões, pode acessar o objeto APP.data.current_view object
, que contém o elemento DOM raiz da interface atual onde o usuário está trabalhando (APP.data.current_view.$el
).
Se o usuário estiver trabalhando com qualquer interface de lista, como leads, contatos, empresas ou tarefas, você pode acessar a propriedade APP.data.current_list
dentro do objeto APP. Essa propriedade contém uma coleção dos itens da lista atual, com informações recuperadas das colunas exibidas. Esses dados incluem a propriedade id
, name
(nome da entidade), e checked
(que determina se o elemento na lista está selecionado ou não).
Caso o usuário esteja trabalhando com qualquer cartão, você pode acessar a propriedade APP.data.current_card
. Essa propriedade fornece acesso aos dados do cartão atual no qual o usuário está trabalhando. Ao acessar essa propriedade, é essencial verificar sua presença, pois ela pode ser false se o usuário não estiver em nenhum cartão no momento. Se você acessar diretamente qualquer valor filho sem verificar a presença da propriedade, isso pode resultar em um erro.
Através de APP.data.current_card
você pode obter os seguintes dados:
-
APP.data.current_card.id
**id** do cartão atual, se o cartão for novo (estiver sendo criado), seu id será 0.
-
APP.data.current_card.model
O modelo [ backbone](https://www.npmjs.com/package/backbone) armazena os dados atuais no momento da entrada, o que significa que, mesmo que o usuário tenha feito alterações em um campo, mas ainda não tenha salvado, o valor inserido ainda estará acessível através do modelo.
Quando o Kommo é atualizado, o sistema atualiza automaticamente a página.
No entanto, pode haver situações em que esse comportamento precise ser temporariamente interrompido, como durante uma ligação telefônica, para evitar qualquer interrupção para o usuário. Nesses casos, você pode usar um método específico para pausar as atualizações até que a ligação termine, evitando perturbar o usuário com atualizações desnecessárias.
O método descrito permite que você recupere facilmente informações sobre o status online dos usuários. O status pode ser true (se o usuário estiver online) ou false (se o usuário estiver offline).
APP.sdk.showUserStatus() // objeto com todos os IDs dos usuários e seu status
// Exemplo de resposta:
{
{
id: 123456,
online: true
},
{
id: 123456,
online: false
}, ...
}
Chamar o método sem parâmetros retornará um objeto contendo os IDs de todos os usuários e seus status online.
APP.sdk.showUserStatus('online')// array de todos os IDs dos usuários online.
// Exemplo de resposta:
[123456, 123457...]
Chamar este método com a flag “online” irá listar os IDs de todos os usuários online.
var id_user = 123456; // ID único da conta
var status_user = APP.sdk.showUserStatus(id_user) ; // status do usuário online (true ou false)
Para recuperar o status de um usuário específico, você pode chamar o método com o identificador único da conta do usuário. A função retornará true se o usuário estiver online e false se não estiver.
APP.sdk.showUserStatus(1111111) // objeto com todos os IDs dos usuários e seus status
É importante observar que, se um ID de usuário incorreto for inserido ou ocorrer um erro ao escrever a flag, a função ainda funcionará, retornando o objeto de IDs com os status online de todos os usuários.
