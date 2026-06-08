---
title: "Webhooks en Kommo – guía técnica de configuración y notificaciones de eventos"
source: "https://es-developers.kommo.com/docs/webhooks"
date: "2024-09-17"
---

Los Webhooks son notificaciones para aplicaciones de terceros que envían avisos sobre eventos que han ocurrido en Kommo. Puedes configurar las direcciones HTTP de tus aplicaciones y las reglas asociadas en los ajustes de tu cuenta en el Marketplace de Kommo.
Es posible trabajar con Webhooks a través de la API con los planes Avanzado, Pro y Empresarial.
Ejemplos de escenarios:
- Luego de una transacción exitosa, puedes enviar la información de la transacción a tu aplicación de contabilidad y generar automáticamente una factura de pago.
- Puedes añadir los correos electrónicos de tus nuevos contactos a la lista de correo del sistema CRM.
- Puedes configurar las notificaciones SMS sobre los cambios en tu cuenta.
Lista de entidades admitidas:
- Leads
- Contactos
- Compañías
- Tareas
- Elementos de la lista
- Conversaciones
- Notas
- Lead agregado
- Lead editado
- Lead borrado
- Lead restaurado
- Estado del lead cambiado
- Us. resp. del lead cambiado
- Contacto agregado
- Contacto editado
- Contacto eliminado
- Contacto restaurado
- Us. resp. del contacto cambiado
- Compañía agregada
- Compañía editada
- Compañía eliminada
- Compañía restaurada
- Us. resp. de la compañía cambiado
- Tarea agregada
- Tarea editada
- Tarea eliminada
- Us. resp. de la tarea cambiado
- Lead entrante agregado
- Lead entrante editado
- Lead entrante eliminado
- Mensaje entrante recibido
- Conversación agregada
- Conversación editada
- Nota agregada al lead
- Nota agregada al contacto
- Nota agregada a la compañía
- Agregar elemento a Productos
- Actualizar elemento en Productos
- Eliminar elemento de Productos
Descripción de los parámetros en Ajustes:
La configuración de Webhooks implica los siguientes tres pasos:
Ve a Ajustes -> Integración y haz clic en Web hooks en la esquina superior derecha.
Ingresa la URL del Webhook.
Selecciona los eventos que enviarán una notificación. Luego haz clic en Guardar.
- Realiza la acción seleccionada al crear un Webhook.
- En tu aplicación, revisa los datos recibidos de Kommo.
- Si los datos no han llegado, verifica que la URL ingresada sea correcta y procede al paso 1.
El Webhook se envía en formato x-www-form-urlencoded
a una aplicación de terceros; la información detallada sobre la entidad está descrita en las solicitudes GET de la sección actual.
POST En caso de crear y actualizar una entidad:
{
"entity":{
"add/update":[
{
"array of entity fields":"valores de los campos de la entidad"
}
]
}
}
En caso de borrar una entidad:
{
"entity":{
"delete":[
{
"id":"id"
}
]
}
}
{
"leads":{
"add":[
{
"id":"1111111",
"name":"Nuevo Lead",
"status_id":"2222222",
"price":"500",
"responsible_user_id":"3333333",
"last_modified":"1726566390",
"modified_user_id":"44444444",
"created_user_id":"44444444",
"date_create":"1726566390",
"pipeline_id":"5555555",
"account_id":"66666666",
"custom_fields":[
{
"id":"77777777",
"name":"Beneficio",
"values":[
{
"value":"0"
}
]
},
{
"id":"88888888",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"9999999",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"12345678",
"name":"Interruptor de palanca",
"values":[
{
"value":"1"
}
]
},
{
"id":"87654321",
"name":"Fecha",
"values":[
"1729717200"
]
},
{
"id":"12312312",
"name":"Moneda",
"values":[
{
"value":"200"
}
]
}
],
"created_at":"1726566390",
"updated_at":"1726566390"
}
]
}
{
"leads":{
"update":[
{
"id":"123456789",
"name":"",
"status_id":"67548615",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"11000000",
"last_modified":"1726567767",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"17265663a90",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Beneficio",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"1246485",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246487",
"name":"Interruptor de palanca",
"values":[
{
"value":"1"
}
]
},
{
"id":"1246491",
"name":"Fecha",
"values":[
"1729717200"
]
},
{
"id":"1246493",
"name":"Moneda",
"values":[
{
"value":"200"
}
]
}
],
"created_at":"1726566390",
"updated_at":"1726567767"
}
]
}
}
{
"leads":{
"delete":[
{
"id":"12345678",
"status_id":"67548607",
"pipeline_id":"8572511"
}
]
}
}
{
"leads":{
"restore":[
{
"id":"15317715",
"name":"123",
"status_id":"67548607",
"price":"80",
"responsible_user_id":"12345678",
"last_modified":"1726572650",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726571070",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Beneficio",
"values":[
{
"value":"1000"
}
]
}
],
"created_at":"1726571070",
"updated_at":"1726572650"
}
]
}
}
{
"leads":{
"status":[
{
"id":"15318175",
"name":"",
"status_id":"67548619",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"12345678",
"last_modified":"1726572758",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726572752",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Beneficio",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"1246485",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246489",
"name":"Seleccionar",
"values":[
{
"value":"2",
"enum":"908107"
}
]
},
{
"id":"1246491",
"name":"Fecha",
"values":[
"1725915600"
]
}
],
"created_at":"1726572752",
"updated_at":"1726572758"
}
]
}
}
{
"leads":{
"responsible":[
{
"id":"15318175",
"name":"",
"status_id":"67548619",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"1234567",
"last_modified":"1726572882",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726572752",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Beneficio",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Texto",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"1246485",
"name":"Numérico",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246489",
"name":"Seleccionar",
"values":[
{
"value":"2",
"enum":"908107"
}
]
},
{
"id":"1246491",
"name":"Fecha",
"values":[
"1725915600"
]
}
],
"old_responsible_user_id":"12345673",
"created_at":"1726572752",
"updated_at":"1726572882"
}
]
}
}
La aceptación y el rechazo de los leads entrantes se consideran equivalentes a su eliminación. Como resultado, estas acciones desencadenarán un webhook para la eliminación de un lead entrante. Puedes distinguirlas a través de dos parámetros: la acción mostrará rechazarsi un lead entrante fue rechazado y aceptar si fue aceptado. Además, el parámetro para los IDs de las entidades de los leads entrantes será diferente, pudiendo ser
decline_result
oaccept_result
.
{
"unsorted":{
"add":[
{
"uid":"4278accf80c59e99411d5c6e01e4054864ca958e594699484ba8c5f40bb1",
"category":"forms",
"source_data":{
"form_id":"1303311",
"form_type":"1",
"from":"Solicitud de sitio #1303311 del formulario «Formulario #1712844073»",
"form_name":"Formulario #1712844073",
"origin":{
"ip":"172.241.70.196",
"datetime":"1726573764",
"referer":"https://subdomain.kommo.com/"
},
"data":{
"name_2":{
"type":"text",
"id":"name_2",
"element_type":"2",
"name":"Nombre del lead",
"value":"Nombre del lead"
}
},
"date":"1726573764"
},
"date_create":"1726573764",
"data":{
"leads":[
{
"last_modified":"1726573765",
"name":"Nombre del lead",
"pipeline_id":"XXXXXXXX",
"modified_user_id":"0",
"date_create":"1726573764",
"custom_fields":[
{
"id":"XXXXXX",
"code":"REFERRER",
"values":[
{
"value":"https://subdomain.kommo.com/"
}
]
}
],
"visitor_uid":"XXXXXXXX-408f-46ef-8482-50e4950f78b1",
"source_id":"XXXXXX",
"gso_session_uid":"null",
"form_request_id":"AFyd4deuQF"
}
]
},
"pipeline_id":"XXXXXX",
"account_id":"XXXXXXX",
"request_id":"0",
"source_id":"XXXX",
"lead_id":"XXXXXX",
"created_at":"1726573764"
}
]
}
}
{
"unsorted": {
"update": [
{
"uid": "40789acb990dbb9754dc234e18d2325470612b2284880504d78f258d8f77",
"category": "forms",
"account_id": "1312313",
"user_id": "123123",
"source": "Solicitud de sitio web №441310 a través del formulario <<Formulario #1548921297>>",
"pipeline_id": "142141",
"source_data": {
"form_id": "243222",
"form_type": "1",
"date": "156232405",
"from": "Solicitud de sitio web №441310 a través del formulario <<Formulario #1548921297>>",
"form_name": "Sitio web",
"date": "1567619168",
"source_uid": "232323",
"source": "2423424",
"uid": "24242432",
"origin": {
"ip": "12.123.123.12",
"referer": "https://test.kommo.com/settings/pipeline/leads/1541752",
"visitor_uid": "202273f9-03cc-42b5-aa4d-71e2ead59ec4",
"datetime": "1567619168"
}
},
"data": {
"leads": [
{
"id": "24242432",
"status_id": "424232222",
"pipeline_id": "4353222",
"name": "Lead",
"created_user_id": "0",
"date_create": "156760055"
}
],
"pipeline_id": "4353222",
"source": "2423424",
"source_uid": "232323",
"created_at": "156760055"
}
}
]
},
"account": {
"subdomain": "test",
"id": "1312313",
"_links": {
"self": "https://test.kommo.com"
}
}
}
//lead aceptado
{
"unsorted":{
"delete":[
{
"action":"accept",
"uid":"f575b754b0d1eb1c380e53d6821ffd2820a6dfbe3822de0cfddaf266980f",
"accept_result":{
"leads":[
"15258873"
]
},
"category":"mail",
"created_at":"1726392264",
"modified_user_id":"11087123"
}
]
}
}
//lead rechazado
{
"unsorted":{
"delete":[
{
"action":"decline",
"decline_result":{
"leads":[
"15270337"
]
},
"uid":"f575b754b0d1eb1c380e457edeba88954891f3dce5d2fe1324fd3e2af58d",
"category":"mail",
"created_at":"1726426986",
"modified_user_id":"11087123"
}
]
}
}
Al crear o eliminar entidades de contacto o compañía, para evitar problemas de compatibilidad con versiones anteriores, hay una clave de tipo que indica de qué entidad provino el Webhook.
{
"contacts":{
"add":[
{
"id":"XXXXXXXX",
"name":"Nombre del Contacto",
"responsible_user_id":"XXXXXXX",
"date_create":"1726573127",
"last_modified":"1726573127",
"created_user_id":"XXXXXXX",
"modified_user_id":"XXXXXX",
"account_id":"XXXXXXX",
"custom_fields":[
{
"id":"XXXXXXX",
"name":"Teléfono",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Correo",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Cumpleaños",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Biografía",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"791730",
"name":"Cualquier botón de radio",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573127",
"type":"contact"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17611273",
"name":"Nombre del Contacto",
"responsible_user_id":"11087123",
"date_create":"1726573127",
"last_modified":"1726573130",
"created_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Teléfono",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Correo",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Cumpleaños",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Biografía",
"values":[
{
"value":"Texto"
}
]
},
{
"id":"791730",
"name":"Cualquier botón de radio",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573130",
"type":"contact"
}
]
}
}
{
"contacts":{
"delete":[
{
"id":"17611273",
"type":"contact"
}
]
}
}
{
"contacts":{
"restore":[
{
"id":"17611273",
"name":"Nombre del Contacto",
"responsible_user_id":"11087123",
"date_create":"1726573127",
"last_modified":"1726573264",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Teléfono",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Correo",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Cumpleaños",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Biografía",
"values":[
{
"value":"Text"
}
]
},
{
"id":"791730",
"name":"Cualquier botón de radio",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573264",
"type":"contact"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17611273",
"name":"Nombre del Contacto",
"responsible_user_id":"11940747",
"date_create":"1726573127",
"last_modified":"1726573326",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Teléfono",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Correo",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Cumpleaños",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Biografía",
"values":[
{
"value":"Text"
}
]
},
{
"id":"791730",
"name":"Cualquier botón de radio",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"old_responsible_user_id":"11087123",
"created_at":"1726573127",
"updated_at":"1726573326",
"type":"contact"
}
]
}
}
{
"contacts":{
"add":[
{
"id":"17612521",
"name":"Nombre de la compañía",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576534",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576534",
"type":"company"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17612521",
"name":"Nombre de la compañía no especificado",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576634",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Teléfono",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Correo",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576634",
"type":"company"
}
]
}
}
{
"contacts":{
"delete":[
{
"id":"17612521",
"type":"company"
}
]
}
}
{
"contacts":{
"restore":[
{
"id":"17612521",
"name":"Nombre de la compañía no especificado",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576937",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Teléfono",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Correo",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576937",
"type":"company"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17612521",
"name":"Nombre de la compañía no especificado",
"responsible_user_id":"11940747",
"date_create":"1726576533",
"last_modified":"1726576988",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Teléfono",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Correo",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"old_responsible_user_id":"11087123",
"created_at":"1726576533",
"updated_at":"1726576988",
"type":"company"
}
]
}
}
{
"task":{
"add":[
{
"id":"1564671",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:07:29",
"text":"texto de tarea",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:07:29",
"responsible_user_id":"11087123",
"complete_till":"2025-10-02 20:59:00",
"created_at":"1726578449",
"updated_at":"1726578449",
"complete_before":"1759438740"
}
]
}
}
//editar tarea
{
"task":{
"update":[
{
"id":"1502517",
"element_id":"14791277",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-04 16:00:13",
"text":"texto de tarea",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:11:20",
"responsible_user_id":"11087123",
"complete_till":"2025-09-04 20:59:00",
"action_close":"0",
"old_text":"texto de tarea",
"created_at":"1725465613",
"updated_at":"1726578680",
"complete_before":"1757019540"
}
]
}
}
//completar tarea
{
"task":{
"update":[
{
"id":"1564845",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:20:25",
"text":"texto",
"status":"1",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:21:09",
"responsible_user_id":"11087123",
"complete_till":"2024-10-23 20:59:00",
"action_close":"1",
"old_text":"texto",
"created_at":"1726579225",
"updated_at":"1726579269",
"complete_before":"1729717140"
}
]
}
}
//resultado agregado (cuando se completa desde el calendario)
{
"task":{
"update":[
{
"id":"1564835",
"element_id":"17612485",
"element_type":"3",
"task_type":"2",
"date_create":"2024-09-17 13:18:58",
"text":"prueba",
"status":"1",
"account_id":"32720107",
"created_user_id":"0",
"last_modified":"2024-09-17 13:29:18",
"responsible_user_id":"11087123",
"complete_till":"2024-09-17 13:18:57",
"action_close":"0",
"result":{
"id":"4600307",
"text":"cliente respondió"
},
"created_at":"1726579138",
"updated_at":"1726579758",
"complete_before":"1726579137"
}
]
}
}
{
"task":{
"delete":[
{
"id":"1564885"
}
]
}
}
{
"task":{
"update":[
{
"id":"1564917",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:27:53",
"text":"text",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:28:01",
"responsible_user_id":"11940747",
"complete_till":"2025-09-17 20:59:00",
"action_close":"0",
"old_text":"text",
"main_user":"11940747",
"modified_by":"11087123",
"old_responsible_user_id":"11087123",
"created_at":"1726579673",
"updated_at":"1726579681",
"complete_before":"1758142740"
}
]
}
}
Si hay un archivo multimedia en una nota, obtendrás 2 Webhooks: 1 para texto y 1 para archivo multimedia.
//nota de texto
{
"leads":{
"note":[
{
"note":{
"text":"nota de texto",
"attachement":"",
"date_create":"2024-09-17 16:38:11",
"note_type":"4",
"element_type":"2",
"element_id":"15320411",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:38:49",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":11087123,\"author_name\":\"Jean Pierre\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600471",
"created_at":"1726580291",
"updated_at":"1726580329"
}
}
]
}
}
//archivo multimedia
{
"leads":{
"note":[
{
"note":{
"text":"imagen.jpg",
"note_type":"5",
"date_create":"2024-09-17 16:39:32",
"element_type":"2",
"element_id":"15320411",
"catalog_id":"0",
"group_id":"0",
"attachement":"drive/528f59ad-6f5b-4738-b6d2-bb707aee9511/e433243c-e55e-4d16-b625-65a2bd8d3a44/Skrinshot_17-09-2024_153156.jpg",
"timestamp_x":"2024-09-17 16:40:09",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":11111111,\"author_name\":\"Danny Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600505",
"created_at":"1726580372",
"updated_at":"1726580409"
}
}
]
}
}
{
"contacts":{
"note":[
{
"note":{
"text":"nota de texto",
"attachement":"",
"date_create":"2024-09-17 16:43:34",
"note_type":"4",
"element_type":"1",
"element_id":"17614247",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:44:11",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":111111111,\"author_name\":\"Samantha Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600607",
"created_at":"1726580614",
"updated_at":"1726580651"
},
"type":"contact"
}
]
}
}
{
"contacts":{
"note":[
{
"note":{
"text":"nota de texto",
"attachement":"",
"date_create":"2024-09-17 16:44:13",
"note_type":"4",
"element_type":"3",
"element_id":"17614267",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:44:49",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":2222222,\"author_name\":\"Gloria Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600623",
"created_at":"1726580653",
"updated_at":"1726580689"
},
"type":"company"
}
]
}
}
{
"catalogs":{
"add":[
{
"id":"347577",
"date_create":"1726580883",
"date_modify":"1726580883",
"created_by":"11087123",
"modified_by":"11087123",
"catalog_id":"32908",
"name":"Item 1",
"deleted":"0",
"custom_fields":[
{
"id":"771934",
"name":"SKU",
"values":[
{
"value":"1234567534efgd"
}
],
"code":"SKU"
},
{
"id":"771938",
"name":"Precio",
"values":[
{
"value":"100"
}
],
"code":"PRICE"
},
{
"id":"771936",
"name":"Descripción",
"values":[
{
"value":"texto descriptivo"
}
],
"code":"DESCRIPTION"
},
{
"id":"771944",
"name":"Unidad",
"values":[
{
"value":"kg",
"enum":"552500"
}
],
"code":"UNIT"
},
{
"id":"771946",
"name":"Precio especial 1",
"values":[
{
"value":"80"
}
],
"code":"SPECIAL_PRICE_1"
},
{
"id":"771948",
"name":"Precio mayorista",
"values":[
{
"value":"50"
}
],
"code":"WHOLESALE_PRICE"
}
],
"created_at":"1726580883",
"updated_at":"1726580883",
"type":"catalog"
}
]
}
}
{
"catalogs":{
"update":[
{
"id":"347577",
"date_create":"1726580883",
"date_modify":"1726580962",
"created_by":"11087123",
"modified_by":"11087123",
"catalog_id":"32908",
"name":"Item 1",
"deleted":"0",
"custom_fields":[
{
"id":"771934",
"name":"SKU",
"values":[
{
"value":"1234567534efgd"
}
],
"code":"SKU"
},
{
"id":"771938",
"name":"Precio",
"values":[
{
"value":"1000"
}
],
"code":"PRICE"
},
{
"id":"771936",
"name":"Descripción",
"values":[
{
"value":"texto descriptivo editado"
}
],
"code":"DESCRIPTION"
},
{
"id":"771944",
"name":"Unidad",
"values":[
{
"value":"kg",
"enum":"552500"
}
],
"code":"UNIT"
},
{
"id":"771946",
"name":"Precio especial 1",
"values":[
{
"value":"800"
}
],
"code":"SPECIAL_PRICE_1"
},
{
"id":"771948",
"name":"Precio mayorista",
"values":[
{
"value":"500"
}
],
"code":"WHOLESALE_PRICE"
}
],
"created_at":"1726580883",
"updated_at":"1726580962",
"type":"catalog"
}
]
}
}
{
"catalogs":{
"delete":[
{
"id":"347577",
"catalog_id":"32908",
"type":"catalog"
}
]
}
}
{
"message":{
"add":[
{
"id":"660b5b93-4ead-ac38-3797c062146c",
"chat_id":"33b41601-443b-9108-6938ae6b7935",
"talk_id":"191",
"contact_id":"11018118",
"text":"¡Hola!",
"created_at":"1726581295",
"element_type":"2",
"entity_type":"lead",
"element_id":"9276114",
"entity_id":"9276114",
"type":"incoming",
"author":{
"id":"e1ec058c-7efb-4b59-24b1bcesdf3168f6",
"type":"external",
"name":"nombre_de_usuario",
"avatar_url":"https://amojo.kommo.com/attachments/profiles/a6c9-24b1bc7368f6/file-0_128x128.jpg"
},
"origin":"telegram"
}
]
}
}
{
"talk":{
"add":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581298",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-333ff2-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"1",
"is_read":"0",
"origin":"telegram"
}
]
}
}
//marcar como respondido
{
"talk":{
"update":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581487",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-443b-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"1",
"is_read":"1",
"origin":"telegram"
}
]
}
}
//conversacion cerrada
{
"talk":{
"update":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581548",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-443b-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"0",
"is_read":"1",
"origin":"telegram"
}
]
}
}
Nuestro servicio espera una respuesta del Webhook en un plazo de 2 segundos. Si no recibimos una respuesta dentro de este período de tiempo o el código de respuesta no es exitoso (el código HTTP no está entre 100 y 299), consideramos que el Webhook no fue entregado y que la respuesta no es válida.
Tu Webhook puede desactivarse en las siguientes situaciones:
- Si se han recibido más de 100 respuestas no válidas en las últimas 2 horas y el último Webhook al momento de la verificación también es no válido.
En caso de bloqueo de IP, el Webhook será desactivado por razones de seguridad. Puedes reactivarlo en la configuración haciendo clic en el botón Guardar y luego guardando los cambios. Los administradores de la cuenta también recibirán una notificación en el centro de notificaciones sobre la desactivación del Webhook.
Cuando envíes una solicitud, la información se considerará aceptada si el encabezado de la respuesta HTTP devuelve un código entre 100 y 299, según la tabla de códigos de estado de w3.org.
El primer intento se realiza inmediatamente después de que se lleva a cabo la acción seleccionada. Si el intento no es exitoso, se realizará un reintento según las reglas descritas en la tabla a continuación.
