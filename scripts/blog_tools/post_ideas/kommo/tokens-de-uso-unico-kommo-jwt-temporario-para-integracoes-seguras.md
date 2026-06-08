---
title: "Tokens de Uso Único Kommo: JWT Temporário para Integrações Seguras"
source: "https://pt-developers.kommo.com/docs/tokens-de-uso-%C3%BAnico"
date: "2026-02-19"
---

Estes são tokens JSON Web Token (JWT) que podem ser transferidos junto com uma solicitação para recursos de terceiros a partir da interface Web do Kommo.
O token contém informações criptografadas sobre o usuário que fez uma solicitação para um recurso.
O método envia uma solicitação AJAX com um token de autorização temporário para o usuário atual.
O cabeçalho X-Auth-Token é adicionado à solicitação. O servidor remoto deve conceder permissão para receber solicitações do domínio da conta (configurar CORS).
O método herda todos os parâmetros de entrada da função jQuery $.ajax()
e, em resposta, também retorna um objeto do tipo jQuery $.Deferred, totalmente compatível com a resposta do método $.ajax.
define([], function() {
'use strict';
return function() {
var self = this;
this.callbacks = {
init: function() {
return true;
},
render: function() {
self.$authorizedAjax({
url: 'https://example.com/'// fornecer a URL onde você deseja obter seu token
}).done(function (response) {
console.log('sucesso', response);
}).fail(function (err) {
console.log('erro', err);
});
return true;
},
bind_actions: function() {
return true;
}
};
return this;
};
});
O algoritmo de assinatura do token é o HS256.
A chave secreta da integração é utilizada como a chave de criptografia (somente o proprietário da integração tem acesso a essa chave).
Para decifrar o token, recomendamos o uso dos métodos das bibliotecas públicas. Você também pode usar o depurador para decifrar, validar e gerar o JWT (JSON Web Token).
{
"iss": "https://subdomain.kommo.com",
"aud": "https://external.integration.io",
"jti": "d123f123-5123-b123-a123-ed123ef123f",
"iat": 1594204245,
"nbf": 1594204245,
"exp": 1594206045,
"account_id": 12345678,
"user_id": 87654321,
"subdomain": "subdomínio",
"client_uuid": "0b0123f4-d123-4123-9123-e09f123456c"
}
