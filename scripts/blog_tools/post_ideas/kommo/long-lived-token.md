---
title: "Long-lived token"
source: "https://developers.kommo.com/docs/long-lived-token"
date: "2026-03-13"
---

When you need to develop an integration that will only be used in your account, there’s no need to go through the difficult process of getting an authorization code through the redirect mechanism. Long-lived tokens do not have a refresh_token
: you don't have to exchange them or write logic to monitor the relevance of the tokens. Instead, you can receive a long-lived token. In this case, the integration will work with your rights, i.e. administrator rights (only a user with account administrator rights can create it in the account).
Start by creating a private integration.
- Once a token has been generated, make sure to save it. You won’t be able to access it again
- Such tokens are suitable only for private integrations
- It is less safe to use this kind of authorization. Be aware that if your long-lived token is compromised, your account is in danger.
You will use the token to make requests to your Kommo account via a private integration.
An example of a token - eyJ0eXAiOiJKV1QiLCJhbGiOiJSUz…JrIa3zT0Q
Paste the token into the body of the request to get all the leads of your account.
curl --request GET \
--url https://$PASTE_YOUR_SUBDOMAIN_HERE$.kommo.com/api/v4/leads \
--header 'accept: application/json' \
--header 'authorization: Bearer $PASTE_YOUR_TOKEN_HERE$'
import requests
SUBDOMAIN = ''
API_KEY = ''
CREATE_LEAD_URL = f'https://{SUBDOMAIN}.kommo.com/api/v4/leads'
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
authorization: 'Bearer $PASTE_YOUR_TOKEN_HERE$'
}
};
subdomain = 'PASTE_YOUR_SUBDOMAIN_HERE'
fetch(`https://${subdomain}.kommo.com/api/v4/leads`, options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
<?php
require_once('vendor/autoload.php');
$client = new \GuzzleHttp\Client();
$response = $client->request('GET', 'https://$PASTE_YOUR_SUBDOMAIN_HERE$.kommo.com/api/v4/leads', [
'headers' => [
'accept' => 'text/plain',
'authorization' => 'Bearer $PASTE_YOUR_TOKEN_HERE$',
],
]);
echo $response->getBody();
You can practice using tokens and sending requests in the API References section.
In the Authorization tab, you can see that long-lived tokens have not only an issue date, but also an expiration date, and you can always revoke access by clicking the Revoke access button.
