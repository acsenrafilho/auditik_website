---
title: "Códigos de status HTTP em Kommo – respostas de API e tratamento de erros técnicos"
source: "https://pt-developers.kommo.com/docs/c%C3%B3digos-de-status-http"
date: "2026-02-17"
---

A classe de código de status 2xx (Sucesso) indica que a requisição do cliente foi recebida, compreendida e aceita com sucesso.
O código de status de resposta bem-sucedido HTTP 200 OK indica que uma requisição foi bem-sucedida. Segue um exemplo da requisição com código de status 200 ao obter informações da conta:
{
"id": 123123123,
"name": "seunome",
"subdomain": "seudominio",
"created_at": 1739794993,
"created_by": 0,
"updated_at": 17234645,
"updated_by": 0,
"current_user_id": 123423,
"country": "BR",
"currency": "BRL",
"currency_symbol": "R$",
"_links": {
"self": {
"href": "https://subdominio.kommo.com/api/v4/account"
}
}
}
O código de status de resposta bem-sucedido HTTP 201 Criado indica que a requisição HTTP resultou na criação de uma entidade. Segue um exemplo do código de status 201 para a criação de um campo personalizado:
{
"id": 1016236,
"name": "Client Type",
"type": "select",
"account_id": 34389139,
"code": null,
"sort": 500,
"is_api_only": false,
"enums": [
{
"id": 867968,
"value": "Novo",
"sort": 500
},
{
"id": 867970,
"value": "Regular",
"sort": 500
},
{
"id": 867972,
"value": "VIP",
"sort": 500
}
],
"group_id": null,
"required_statuses": [],
"is_deletable": true,
"is_predefined": false,
"entity_type": "leads",
"tracking_callback": null,
"remind": null,
"triggers": [],
"currency": null,
"hidden_statuses": [],
"chained_lists": null,
"_links": {
"self": {
"href": "https://subdominio.kommo.com/api/v4/leads/custom_fields/1016236"
}
}
}
O código de status de resposta bem-sucedido HTTP 204 Sem conteúdo indica que uma requisição foi bem-sucedida, mas não há conteúdo no recurso. Por exemplo, você pode enviar uma requisição para obter a lista de fontes de uma integração, mas receberá o código de status 204 se não tiver nenhuma.
A classe de código de status 4xx (Erro do cliente) indica que o cliente parece ter cometido um erro. Isso significa que a requisição tem uma sintaxe incorreta ou não pode ser atendida.
O código de status de resposta de erro do cliente HTTP 400 Solicitação inválida indica que o servidor não processou a requisição devido a algo que o servidor considerou um erro do cliente. O motivo para uma resposta 400 é normalmente devido a um erro na sintaxe de requisição, estrutura de mensagem de requisição inválida ou roteamento de requisição enganoso.
{
"validation-errors": [
{
"request_id": "0",
"errors": [
{
"code": "NotSupportedChoice",
"path": "custom_fields_values.0.field_id",
"detail": "O valor selecionado não é uma opção válida."
},
{
"code": "InvalidType",
"path": "status_id",
"detail": "Este valor deve ser do tipo array."
}
]
}
],
"title": "Bad Request",
"type": "https://httpstatus.es/400",
"status": 400,
"detail": "Falha na validação da requisição"
}
{
"title": "Bad Request",
"type": "https://httpstatus.es/400",
"status": 400,
"detail": "Os dados da requisição não podem estar em branco"
}
O código de status de resposta de erro do cliente HTTP 401 Não autorizado indica que uma requisição não foi bem-sucedida porque não possui credenciais de autenticação válidas para o recurso solicitado. Na Kommo, você pode obter esse código de status em caso de uso de dados de conta inválidos, tokens expirados ou método de autorização não suportado.
{
"title": "Unauthorized",
"type": "https://httpstatus.es/401",
"status": 401,
"detail": "Nome de usuário ou senha inválido(a)"
}
O código de status de erro do cliente HTTP 402 Pagamento necessário indica que o período de pagamento/avaliação da sua conta Kommo terminou e você precisa renová-la.
{
"title": "Payment Required",
"type": "https://httpstatus.es/402",
"status": 402,
"detail": "Pagamento necessário"
}
O código de status de resposta de erro do cliente HTTP 404 Não encontrado indica que o servidor não consegue encontrar o recurso requisição. Neste caso, tentamos receber informações de um recurso inexistente /exemplo
.
{
"title": "Not Found",
"type": "https://httpstatus.es/404",
"status": 404,
"detail": "Não é possível obter https://subdominio.kommo.com/exemplo"
}
{
"status": 0,
"error_code": 404,
"error_type": "ORIGIN_NOT_REGISTERED",
"error_description": "NOT_FOUND"
}
Não é possível obter### 405 Método não permitido
O código de status de resposta de erro do cliente HTTP 405 Método não permitido indica que o servidor reconhece o método da requisição, mas o recurso de destino não suporta esse método. Se você usar um método indisponível para uma requisição específica, receberá uma resposta 405.
{
"title": "Method Not Allowed",
"type": "https://httpstatus.es/405",
"status": 405,
"detail": "Método não permitido"
}
O código de status de resposta de erro do cliente HTTP 422 Conteúdo não processável indica que o servidor compreendeu o tipo de conteúdo da requisição e que a sintaxe da requisição estava correta, mas não foi possível processar as instruções. Aqui está um exemplo da resposta para adicionar mais de 250 leads por requisição.
{
"title": "Unprocessable Entity",
"type": "https://httpstatus.es/422",
"status": 422,
"detail": "Limite de 250 por página"
}
O código de status de resposta de erro do cliente HTTP 429 Muitas requisições indica que o cliente enviou muitas requisições em um determinado período de tempo. Se você recebeu o código 429 muitas vezes, sua conta pode ser bloqueada e você receberá uma resposta 403 em qualquer requisição de API. Familiarize-se com nossos limites se receber esse código de status. Aqui está a resposta que você pode receber se exceder o limite de 7 requisições por segundo por IP.
{
"title": "Too Many Requests",
"type": "https://httpstatus.es/429",
"status": 429,
"detail": "Você enviou muitas requisições em um determinado período de tempo. Tente novamente mais tarde.",
"retry_after": 300
}
O código de status de resposta de erro do cliente HTTP 403 Proibido indica que o servidor entendeu a requisição, mas se recusou a processá-la. Na Kommo, você pode obter o código de status 403 se receber um bloqueio da API (verifique o código de status 429) ou passar um X-Signature
inválido para os métodos da API de chats.
{
"status": 0,
"error_code": 403,
"error_type": "ORIGIN_INVALID_SIGNATURE",
"error_description": "invalid signature"
}
403 Forbidden
O código de status de resposta de erro do servidor HTTP 500 Erro interno do servidor indica que o servidor encontrou uma condição inesperada que o impediu de atender à requisição. Se você receber essa resposta, entre em contato com nosso suporte.
{
"title": "ErrInternalServer",
"status": 500,
"detail": "Nossa equipe provavelmente já está trabalhando na resolução do problema.",
"trace_id": "8e9b1e47-1ea4-111f0-a4f9-0031163e1de759"
}
