---
title: "Limitaciones de la API Kommo – reglas, máximos de entidades y límites técnicos para integraciones"
source: "https://es-developers.kommo.com/docs/limitaciones"
date: "2026-02-17"
---

Toda comunicación con la API se realiza en un formato encriptado a través del protocolo SSL. Esto significa que todas las referencias a la API deberán contener el protocolo HTTPS. Es fundamental recordar esto al acceder a nuestro sistema a través de JavaScript, especialmente cuando se hace referencia a recursos de terceros, como el acceso a WebSockets. Dentro del sistema, los usuarios siempre mantienen una conexión segura, y los intentos de acceder a contenido HTTP serán bloqueados o resultarán en una advertencia del navegador del usuario.
Los Token de acceso, Token de actualización, client_secret o Token de larga duración deberán ser almacenados en un lugar seguro, ya que estos datos son privados. En caso de una fuga de datos, es esencial actualizar primero el client_secret de la integración, seguido por los Tokens de acceso y de actualización.
Las solicitudes no deben realizarse a través del dominio comúnhttp://www.kommo.com
, sino en la dirección exacta de tu cuenta, por ejemplo, https://subdomain.kommo.com
.
Para trabajar con nuestra API, se requiere uno de los siguientes protocolos criptográficos: TLS 1.1, TLS 1.2. La versión recomendada es TLS 1.2.
La librería cURL soporta TLS 1.1 / 1.2, a partir de la versión 7.34.0. En los parámetros de la sesión de cURL, puedes especificar explícitamente la versión del protocolo:
$curl=curl_init(); #Guardar el descriptor de la sesión de cURL
curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
No podemos apoyar el uso del protocolo SSLv3, ya que se considera vulnerable.
Existen mecanismos para limitar la actividad al trabajar con la API – no más de 7 solicitudes por segundo.
En caso de actividad sospechosa a través de la API o falla de integración, se restringirán las solicitudes desde tu dirección IP. Por ejemplo, si se solicitan los mismos datos varias veces en un corto período de tiempo, o si hay una iteración descontrolada a través de todos los datos. Recomendamos utilizar el encabezado If-Modified-Since al trabajar con listas de leads, contactos, empresas o tareas.
Código HTTP 429: en caso de exceder el número de solicitudes – se devolverá el Código HTTPS 429.
**Código HTTP 403:**si las restricciones son infringidas repetidamente, la dirección IP se bloquea y cualquier código en la API devolverá el código HTTP 403 para cualquier petición.
- El número máximo de entidades retornadas (leads / contactos / empresas ) no es superior a 250.
- El número máximo de entidades añadidas/actualizadas no es superior a 250.
Para un rendimiento óptimo de la integración y para evitar errores, recomendamos añadir/actualizar no más de 50. Si recibes un código HTTP 504, te sugerimos reducir el número de entidades añadidas/actualizadas en la solicitud y repetirla. - El número máximo de fuentes por integración es 100.
- Solo puedes pasar 40 valores de campos personalizados por entidad añadida al realizar la adición compleja de un lead.
- El número máximo de pipelines en la cuenta es 50.
- Cada pipeline puede tener no más de 100 etapas incluidas las del sistema (Cerradas y Ganadas).
- El número de webhooks por cuenta está limitado a 100.
- El número máximo de listas por cuenta es 10.
- El almacenamiento de archivosestá limitado a 10 GB en la cuenta de prueba.
- Fuentes de Kommo AI: para el
agent
100 para cuentas de pago, 10 para cuentas de prueba. Para lasuggested_reply
100 para cuentas de pago y 10 para cuentas de prueba. Los límites no se superponen para los diferentes tipos de funcionalidad.
