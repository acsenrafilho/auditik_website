---
title: "Webhooks en el pipeline digital de Kommo – guía técnica de configuración y eventos"
source: "https://es-developers.kommo.com/docs/webhooks-en-pipeline-digital"
date: "2026-04-06"
---

Los webhooks son notificaciones enviadas a aplicaciones de terceros para informarles sobre eventos que han ocurrido en Kommo. Puedes configurar las direcciones HTTP de tus aplicaciones y las reglas asociadas en la configuración del pipeline digital en Kommo.
Puedes encontrar más información sobre esta tecnología en la sección WebHooks REST API. Aunque la tecnología utilizada para los webhooks en el pipeline digital es similar a la que se usa en los ajustes de cuenta (Ajustes ➡ Integración ➡ Web hooks), existen varias diferencias.
- Primero, la lista de eventos para los cuales se envían notificaciones es más limitada.
- En segundo lugar, la lógica de reintentos. Si se recibe una respuesta no válida, el sistema realiza hasta 4 intentos de reenvío en un período de una hora. Los reintentos pueden deshabilitarse temporalmente para una dirección específica en la siguiente condición: si se reciben más de 100 respuestas no válidas desde esa dirección en los últimos 5 minutos. Cuando se supera este umbral, el sistema suspende los intentos de reenvío durante 5 minutos, a partir del momento en que se alcanza dicho umbral. Una vez transcurrido este período de suspensión, el mecanismo de reintentos se reanuda automáticamente.
Lista de eventos posibles:
- Correo entrante
- Llamada entrante
- Mensaje entrante
- Visita al sitio web
- Cambio de etapa
Dirígete al pipeline digital (Leads ➡ Automatiza en la esquina superior derecha) y selecciona añadir una acción automática para todos los leads en la etapa que necesitas.
Luego selecciona API: + Enviar un webhook.
Selecciona el evento que disparará el webhook.
Ingresa la URL a la que se enviará el webhook.
El webhook envía una solicitud POST a una aplicación de terceros que contiene una variable con el siguiente formato:{"lead":{"event":{entity fields array}}}
.
Evento de correo entrante:
{
"leads": {
"mail_in": {[
"id": XXXXXXX,
"pipeline_id": 1111XXX,
"status_id": 2222XXX
]}
}
}
Evento de cambio de etapa:
{
"leads": {
"status": {[
"id": XXXXXXX,
"old_pipeline_id": 123XXX,
"pipeline_id": 321XXXX,
"old_status_id": 567XXXX
"status_id": 765XXXX
]}
}
}
