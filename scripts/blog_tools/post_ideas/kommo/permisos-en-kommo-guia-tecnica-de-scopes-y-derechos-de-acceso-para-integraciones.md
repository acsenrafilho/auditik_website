---
title: "Permisos en Kommo – guía técnica de scopes y derechos de acceso para integraciones"
source: "https://es-developers.kommo.com/docs/permisos"
date: "2026-06-03"
---

El alcance (o lista de permisos) es un conjunto de acciones disponibles en la integración que se pueden realizar en nombre del usuario mediante el protocolo OAuth.
Los permisos se clasifican en dos grupos:
- Acceso a los datos de la cuenta según los derechos del usuario. Todos los métodos de la API son accesibles, excepto aquellos que interactúan con el Centro de notificaciones.
- Centro de notificaciones
Esta integración solo puede ser instalada por administradores y autorizada por distintos usuarios. Por esta razón, existen limitaciones en los derechos de acceso a los datos, según los permisos y derechos del usuario que los autoriza.
El administrador de la cuenta puede revocar el acceso a cualquier integración instalada para cualquier usuario. Esto se puede hacer en la sección de integraciones, dentro de la ventana modal de integración. Los usuarios solo pueden revocar el acceso que hayan otorgado desde su propio perfil. Si es necesario restaurar el acceso, deberán solicitar nuevamente el permiso a los administradores de la cuenta y a los usuarios.
La notificación sobre la revocación del acceso se enviará al Webhook (Webhook de notificación de acceso revocado) especificado al momento de crear la integración.
Si has cambiado los permisos que solicita tu integración, deberás pedir a los usuarios que ya los habilitaron que otorguen el acceso nuevamente.
Ejemplo:
Al crear una integración, no seleccionaste el acceso al Centro de notificaciones, y los usuarios ya le habían otorgado a tu integración un acceso de alcance limitado. Luego, editaste el alcance en los ajustes de la integración para otorgar todos los derechos. Esto significa que los usuarios que tenían un alcance limitado seguirán trabajando con ese mismo alcance. Para obtener el nuevo alcance de los mismos usuarios, deberás solicitarles nuevamente su autorización.
