---
title: "One-time tokens"
source: "https://developers.kommo.com/docs/one-time-tokens"
date: "2025-06-08"
---

These are JSON Web Token (JWT) tokens that can be transferred together with a request to third-party resources from the Kommo Web interface.
The token contains encrypted information about the user from which a request was made to a resource.
The method sends an ajax request with a temporary authorization token for the current user.
The X-Auth-Token header is added to the request. The remote server must give permission to receive requests from the account domain (configure CORS).
The method inherits all incoming parameters of the jQuery $.ajax()
function, and in response also returns an object of the type jQuery $.Deferred that is fully compatible with the response of the $.ajax
method.
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
url: 'https://example.com/'// provide URL where you want to get your token
}).done(function (response) {
console.log('success', response);
}).fail(function (err) {
console.log('error', err);
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
The token signature algorithm is HS256.
The integration secret key is used as the encryption key (only the integration owner has access to this key).
To decode the token, we recommend using the methods from the public libraries. You can also use the debugger to decode, validate, and generate the JWT (JSON Web Token).
{
"iss": "https://subdomain.kommo.com",
"aud": "https://external.integration.io",
"jti": "d123f123-5123-b123-a123-ed123ef123f",
"iat": 1594204245,
"nbf": 1594204245,
"exp": 1594206045,
"account_id": 12345678,
"user_id": 87654321,
"subdomain": "subdomain",
"client_uuid": "0b0123f4-d123-4123-9123-e09f123456c"
}
