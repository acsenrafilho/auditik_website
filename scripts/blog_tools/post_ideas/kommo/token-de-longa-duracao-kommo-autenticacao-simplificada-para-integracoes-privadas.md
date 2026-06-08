---
title: "Token de Longa Duração Kommo: Autenticação Simplificada para Integrações Privadas"
source: "https://pt-developers.kommo.com/docs/token-de-longa-dura%C3%A7%C3%A3o"
date: "2026-02-19"
---

Quando você precisa desenvolver uma integração que será usada apenas em sua conta, não é necessário passar pelo processo complexo de obtenção de um código de autorização através do mecanismo de redirecionamento. Tokens de longa duração não possuem um refresh_token
: não é preciso trocá-los ou escrever lógica para monitorar a validade dos tokens. Em vez disso, você pode receber um token de longa duração. Nesse caso, a integração funcionará com os seus direitos, ou seja, direitos de administrador (apenas um usuário com direitos de administrador da conta pode criá-la na conta).
Comece criando uma integração privada.
- Depois que um token for gerado, certifique-se de salvá-lo. Você não poderá acessá-lo novamente.
- Esses tokens são adequados apenas para integrações privadas.
- É menos seguro usar esse tipo de autorização. Esteja ciente de que, se seu token de longa duração for comprometido, sua conta estará em perigo.
Você usará o token para fazer solicitações à sua conta do Kommo por meio de uma integração privada.
Um exemplo de um token - eyJ0eXAiOiJKV1QiLCJhbGiOiJSUz…JrIa3zT0Q
Cole o token no corpo da solicitação para obter todos os leads da sua conta.
curl --request GET \
--url https://$Cole seu subdomínio aqui$.kommo.com/api/v4/leads \
--header 'accept: application/json' \
--header 'authorization: Bearer $COLE_SEU_TOKEN_AQUI$'
import requests
SUBDOMAIN = 'Cole seu subdomínio aqui'
API_KEY = 'Cole seu Token aqui'
CREATE_LEAD_URL = f'{SUBDOMAIN}.kommo.com/api/v4/leads'
body = {
'name' : "Example Lead 1",
"price": 1000,
}
headers = {
'Authorization' : f'Bearer {API_KEY}',
'Content-Type': 'application/json'
}
requests.post(CREATE_LEAD_URL, json=body, headers=headers)
const options = {
method: 'GET',
headers: {
accept: 'application/json',
authorization: 'Bearer $Cole seu Token aqui$'
}
};
subdomain = 'Cole seu subdomínio aqui'
fetch(`https://${subdomain}.kommo.com/api/v4/leads`, options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
<?php
require_once('vendor/autoload.php');
$client = new \GuzzleHttp\Client();
$response = $client->request('GET', 'https://$Cole seu subdomínio aqui$.kommo.com/api/v4/leads', [
'headers' => [
'accept' => 'text/plain',
'authorization' => 'Bearer $Cole seu Tokes aqui$',
],
]);
echo $response->getBody();
You can practice using tokens and sending requests in the API References section.
Na aba Autorização , você pode ver que os tokens de longa duração não apenas têm uma data de emissão, mas também uma data de expiração, e você pode sempre revogar o acesso clicando no botão Revogar acesso.
