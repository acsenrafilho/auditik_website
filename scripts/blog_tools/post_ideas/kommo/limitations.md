---
title: "Limitations"
source: "https://developers.kommo.com/docs/limitations"
date: "2026-03-25"
---

All communication with the API occurs in an encrypted form over the SSL protocol. This means that all references to the API must contain the HTTPS protocol. It is especially important to remember this when accessing our system through JavaScript, particularly when referring to third-party resources, such as accessing WebSockets. Inside the system, users are always in a secure connection, and attempts to access HTTP content will be blocked or result in a warning from the user’s browser.
Access Token, Refresh Token, client_secret, or Long-lived Token must be stored in secure storage, since this data is private. In the event of a data leak, it is essential to update the client_secret of the integration first, followed by the Access and Refresh tokens.
All requests must not be made on the common domain https://www.kommo.com
, but on the exact address of your account, for example, https://subdomain.kommo.com
.
To work with our API, one of the following cryptographic protocols is required: TLS 1.1, TLS 1.2 . The recommended version is TLS 1.2
The cURL library supports TLS 1.1 / 1.2, starting with version 7.34.0. In the parameters of the cURL session, you can explicitly specify the protocol version:
$curl=curl_init(); #Save the cURL session descriptor
curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
We completely refuse to support the SSLv3 protocol, since this protocol is considered to be vulnerable.
There are mechanisms for limiting the activity of working with the API – not more than 7 requests per second.
In the event of suspicious activity via the API or integration failure, requests from your IP address will be restricted. For example, if the same data is requested multiple times in a short period, or if there is uncontrolled iteration through all data.
429 HTTP code: in case of exceeding the number of requests – the HTTP code 429 will be returned.
403 HTTP code: if the restrictions are repeatedly violated, the IP address is blocked and any code in the API will return HTTP code 403 for any request for this IP.
- The maximum number of returned entities (leads / contacts / companies ) is not more than 250.
- The maximum number of entities added/updated is no more than 250.
For more optimal integration performance and to avoid errors, we recommend to add/update no more than 50. If you receive a 504 HTTP code, we recommend to reduce the number of entities added/updated in the request and repeat the request. - The maximum number of sources per integration is 100.
- You can only pass 40 custom field values per added entity when performing complex addition of a lead.
- The maximum number of pipelines on the account is 50.
- Each pipeline can have no more than 100 stages including system ones (Closed and Won).
- The number of webhooks per account is limited to 100
- The maximum number of lists per account is 10
- The files storage is limited to 10 GB on a trial account
- Kommo AI sources: for
agent
- 100 for paid accounts, 10 - for trial account. Forsuggested_reply
- 100 for paid accounts and 10 for trial accounts. Limits do not overlap for different types of functionality.
