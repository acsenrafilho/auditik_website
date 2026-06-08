---
title: "HTTP status code"
source: "https://developers.kommo.com/docs/http-codes"
date: "2025-06-08"
---

The 2xx (Successful) class of status code indicates that the client's request was successfully received, understood, and accepted.
The HTTP 200 OK successful response status code indicates that a request has succeeded. Here is an example of the request with 200 status code when you are getting account info:
{
"id": 123123123,
"name": "yourname",
"subdomain": "yourdomain",
"created_at": 1739794993,
"created_by": 0,
"updated_at": 17234645,
"updated_by": 0,
"current_user_id": 123423,
"country": "NL",
"currency": "EUR",
"currency_symbol": "€",
"_links": {
"self": {
"href": "https://subdomain.kommo.com/api/v4/account"
}
}
}
The HTTP 201 Created successful response status code indicates that the HTTP request has led to the creation of an entity. Here's an example of 201 status code for creating a custom field:
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
"value": "New",
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
"href": "https://subdomain.kommo.com/api/v4/leads/custom_fields/1016236"
}
}
}
The HTTP 204 No Content successful response status code indicates that a request has succeeded, but there is no content on the resource. As an example, you can send request for getting sources list of an integration, but you'll recieve 204 status code if you don't have any.
The 4xx (Client Error) class of status code indicates that the client seems to have erred. It means the request has bad syntax or can't be fulfilled.
The HTTP 400 Bad Request client error response status code indicates that the server would not process the request due to something the server considered to be a client error. The reason for a 400 response is typically due to malformed request syntax, invalid request message framing, or deceptive request routing.
{
"validation-errors": [
{
"request_id": "0",
"errors": [
{
"code": "NotSupportedChoice",
"path": "custom_fields_values.0.field_id",
"detail": "The value you selected is not a valid choice."
},
{
"code": "InvalidType",
"path": "status_id",
"detail": "This value should be of type array."
}
]
}
],
"title": "Bad Request",
"type": "https://httpstatus.es/400",
"status": 400,
"detail": "Request validation failed"
}
{
"title": "Bad Request",
"type": "https://httpstatus.es/400",
"status": 400,
"detail": "Request data can not be empty"
}
The HTTP 401 Unauthorized client error response status code indicates that a request was not successful because it lacks valid authentication credentials for the requested resource. In Kommo you can get this status code in case of using invalid account data, expired tokens or unsupported authorization method.
{
"title": "Unauthorized",
"type": "https://httpstatus.es/401",
"status": 401,
"detail": "Invalid user name or password"
}
The HTTP 402 Payment Required client error status code indicates that your Kommo account paid/trial period has ended and you need to renew it.
{
"title": "Payment Required",
"type": "https://httpstatus.es/402",
"status": 402,
"detail": "Payment required"
}
The HTTP 404 Not Found client error response status code indicates that the server can't find the requested resource. In this case we've tried to receive information of non-existed resource /example
.
{
"title": "Not Found",
"type": "https://httpstatus.es/404",
"status": 404,
"detail": "Cannot GET https://subdomain.kommo.com/example"
}
{
"status": 0,
"error_code": 404,
"error_type": "ORIGIN_NOT_REGISTERED",
"error_description": "NOT_FOUND"
}
The HTTP 405 Method Not Allowed client error response status code indicates that the server knows the request method, but the target resource doesn't support this method. If you use unavailable method for a particular request, you'll get 405 response.
{
"title": "Method Not Allowed",
"type": "https://httpstatus.es/405",
"status": 405,
"detail": "Method Not Allowed"
}
The HTTP 422 Unprocessable Content client error response status code indicates that the server understood the content type of the request content, and the syntax of the request content was correct, but it was unable to process the instructions. Here is an example of the response for adding more than 250 leads per 1 request.
{
"title": "Unprocessable Entity",
"type": "https://httpstatus.es/422",
"status": 422,
"detail": "Limit 250 per page"
}
The HTTP 429 Too Many Requests client error response status code indicates the client has sent too many requests in a given amount of time. If you got the 429 too many times, your account may be blocked, and you'll get 403 response on any API request. Familiarize yourself with our limits if you receive this status code.
Here's the response that you can get if you exceed the limit of 7 requests per second for IP.
{
"title": "Too Many Requests",
"type": "https://httpstatus.es/429",
"status": 429,
"detail": "You have sent too many requests in a given amount of time. Please try again later.",
"retry_after": 300
}
The HTTP 403 Forbidden client error response status code indicates that the server understood the request but refused to process it. In Kommo you can get 403 status code if you get API block (check 429 status code), or pass invalid X-Signature
for Chats API methods.
{
"status": 0,
"error_code": 403,
"error_type": "ORIGIN_INVALID_SIGNATURE",
"error_description": "invalid signature"
}
403 Forbidden
The HTTP 500 Internal Server Error server error response status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request. If you see this response, please, contact our support.
{
"title": "ErrInternalServer",
"status": 500,
"detail": "Our team are probably already working on the elimination of the problem",
"trace_id": "8e9b1e47-1ea4-111f0-a4f9-0031163e1de759"
}
