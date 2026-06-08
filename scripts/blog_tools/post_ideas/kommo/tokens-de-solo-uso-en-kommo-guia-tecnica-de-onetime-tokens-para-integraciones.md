---
title: "Tokens de solo uso en Kommo – guía técnica de one‑time tokens para integraciones"
source: "https://es-developers.kommo.com/docs/tokens-de-solo-uso"
date: "2026-02-17"
---

Estos son Tokens web JSON (JWT) que pueden ser transferidos junto con una solicitud a recursos de terceros desde la interfaz web de Kommo.
El token contiene información encriptada sobre el usuario desde el cual se realizó una solicitud a un recurso.
El método envía una solicitud AJAX con un token de autorización temporal para el usuario actual
Se añade el encabezado X-Auth-Token a la solicitud. El servidor remoto debe conceder permiso para recibir solicitudes del dominio de la cuenta (configurar CORS).
El método hereda todos los parámetros entrantes de la función jQuery $.ajax()
, y como respuesta devuelve un objeto del tipo jQuery $.Deferred que es compatible con la respuesta del método $.ajax
.
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
url: 'https://example.com/'// proporciona la URL desde donde deseas obtener tu token
}).done(function (response) {
console.log('éxito', response);
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
El algoritmo característico del token HS256.
La clave secreta de la integración se utiliza como clave de encriptación (solo el propietario de la integración tiene acceso a esta clave).
Para decodificar el token, recomendamos utilizar los métodos de las librerías públicas. También puedes usar el decodificador para decodificar, validar y generar el JWT (Token web de JSON).
{
"iss": "https://subdomain.kommo.com",
"aud": "https://external.integration.io",
"jti": "d123f123-5123-b123-a123-ed123ef123f",
"iat": 1594204245,
"nbf": 1594204245,
"exp": 1594206045,
"account_id": 12345678,
"user_id": 87654321,
"subdomain": "subdominio",
"client_uuid": "0b0123f4-d123-4123-9123-e09f123456c"
}
