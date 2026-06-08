---
title: "manifest.json"
source: "https://es-developers.kommo.com/docs/manifest-json"
date: "2026-02-17"
---

Es uno de los archivos **requeridos** cuando se crea un widget. Es un archivo en formato JSON que proporciona metadatos asociados al widget. Este archivo incluye el nombre del widget, la descripción, las imágenes, la versión, los archivos de idioma y diferentes tipos de ajustes.

# Ejemplo del archivo manifest.json

JSON

```
{
"widget": {
"name": "widget.name",
"description": "widget.description",
"short_description": "widget.short_description",
"version": "1.0.1",
"interface_version": 2,
"init_once": true,
"locale": [
"en",
"es"
],
"installation": true,
"support": {
"link": "https://www.kommo.com",
"email": "[email protected]"
}
},
"locations": [
"ccard-1",
"clist-0",
"lcard-1",
"llist-0",
"settings",
"digital_pipeline",
"advanced_settings",
"salesbot_designer",
"sms",
"mobile_card"
],
"tour": {
"is_tour": true,
"tour_images": {
"en": [
"/images/tour_1_en.png",
"/images/tour_2_en.png",
"/images/tour_3_en.png"
],
"es": [
"/images/tour_1_es.png",
"/images/tour_2_es.png",
"/images/tour_3_es.png"
]
},
"tour_description": "widget.tour_description"
},
"settings": {
"login": {
"name": "settings.login",
"type": "text",
"required": true
},
"api_key": {
"name": "settings.api_key",
"type": "text",
"required": true
},
"account": {
"name": "settings.account",
"type": "text",
"required": true
}
},
"dp": {
"settings": {
"message": {
"name": "dp.message",
"type": "text",
"required": true
}
},
"action_multiple": false,
"webhook_url": "https://example.com/webhook"
},
"advanced": {
"title": "advanced.title"
},
"salesbot_designer": {
"handler_code": {
"name": "salesbot.handler_name",
"settings": {
"button_title": {
"name": "salesbot.button_title",
"type": "text",
"default_value": "salesbot.button_title_default_value",
"manual": true
},
"button_caption": {
"name": "salesbot.button_caption",
"type": "text",
"default_value": "salesbot.button_caption_default_value",
"manual": true
},
"text": {
"name": "salesbot.text",
"type": "text"
},
"number": {
"name": "salesbot.number",
"type": "numeric"
},
"url": {
"name": "salesbot.url",
"type": "url"
}
}
}
},
"sms": {
"endpoint": "https://example.com/sms_endpoint"
},
"mobile": {
"frame_url": "https://example.com/",
"color": "#ffff00"
}
}
```

> 📘
>
> Si el widget se está desarrollando para usarse en varios idiomas, los archivos correspondientes en la carpeta [i18n](https://kommodesarrolladores.readme.io/docs/i18n) deben contener valores en el formato `"widget.name"`, `"widget.description"`, `"advanced.title"`, etc.

# Propiedades del archivo manifest.json

Las propiedades de este archivo se muestran en la tabla a continuación:

| Parámetro | ¿Requerido? | Tipo de dato | Descripción |
| --- | --- | --- | --- |
| widget | ✅ | obj | Este bloque incluye los ajustes básicos del widget. |
| widget/name | ✅ | string | El nombre del widget que se incluirá en la lista de widgets. El valor `"widget.name"`significa que será tomado del archivo correspondiente en la carpeta **i18n**, según la [localización](https://es-developers.kommo.com/docs/i18n).  *Si el widget se sube a una integración pública, se utilizará el nombre especificado en la integración, pero el campo seguirá siendo obligatorio.* |
| widget/description | ✅ | string | La descripción del widget se puede encontrar en la ventana de ajustes del widget. Debe contener la ruta hacia la traducción en los archivos de idioma. Puedes utilizar etiquetas HTML y etiquetas especiales cortas para crear una descripción personalizada. Por ejemplo, si necesitas mostrar el subdominio de la cuenta de Kommo en la que el usuario trabaja, puedes usar la etiqueta **#SUBDOMAIN#**.  Aquí hay una lista de etiquetas disponibles:   - \*#HOST#\*\* muestra el servidor actual; - \*#SUBDOMAIN#\*\* muestra el subdominio de la cuenta; - \*#LOGIN#\*\* muestra el inicio de sesión del usuario autorizado actual; - \*#ACCOUNT\_ID#\*\* muestra el ID de la cuenta actual en el sistema; - \*#USER\_ID#\*\* muestra el ID del usuario actual en el sistema; - \*#TOP*LEVEL\_DOMAIN#\*\* muestra el dominio de nivel superior (com).    \_Si el widget se sube a una integración pública, se utilizará la descripción especificada en la integración. Sin embargo, este campo sigue siendo obligatorio.* |
| widget/short\_description | ✅ | string | Se mostrará una breve descripción de la funcionalidad del widget en el lado izquierdo de la ventana modal. |
| widget/version | ❌ | string | El campo de versión del widget tiene fines informativos y debe actualizarse cada vez que se suba el archivo del widget, para asegurar que los archivos en el sistema estén actualizados. |
| widget/interface\_version | ✅ | int | El campo de versión de la interfaz especifica la versión cargada del widget en la interfaz del sistema, y debe configurarse en **2**. |
| widget/init\_once | ❌ | bool | El campo `widget/init_once` controla la capacidad de llamar a las funciones `init()` y `bind_actions()` una sola vez por sesión. Configurarlo como **verdadero** or **falso** depende de la funcionalidad del widget. Por ejemplo, los widgets VoIP mantienen la conexión constante con el WebSocket, por lo que `widget/init_once` debe configurarse como **verdadero**. Si no hay un contexto común para todas las páginas, es mejor configurar el valor como **falso**. |
| widget/locale | ✅ | array | Para permitir que el widget esté disponible en varios idiomas, se debe proporcionar un arreglo de códigos de idioma, y cada código de idioma debe corresponder a un archivo de traducción en la carpeta [i18n](https://kommodesarrolladores.readme.io/docs/i18n). Las opciones de idioma disponibles son Inglés (**`en`**), Español (**`es`**), Portugués (**`pt`**), Turco (**`tr`**) y Indonesio (**`id`**).  *Al publicar un widget en el marketplace de Kommo , los archivos de idioma deben coincidir con los idiomas que se completan en la integración. Además, se debe ofrecer soporte en los idiomas disponibles. Puedes utilizar temporalmente las versiones del archivo de idioma*\*`en`\*\* y contar con soporte en inglés para los nuevos idiomas **`id`**'y **`tr`**. Es importante que traduzcas tu integración y ofrezcas soporte en el idioma deseado dentro de un plazo de 6 meses.\* |
| widget/installation | ✅ | bool | La opción de "ajustes" del widget puede configurarse como **verdadero** or **falso**. Si se configura en **verdadero**, los ajustes aparecerán durante la instalación. Si se configuran como **falso**, el widget solo aparecerá en la lista de widgets sin solicitar ajustes ni instalaciones. Esto suele ocurrir cuando todos los ajustes son gestionados en otro sistema que interactúa con Kommo a través de la API. |
| widget/support | ❌ | obj | Un conjunto de información de soporte del widget. |
| support/link | ❌ | string | Debes proporcionar un enlace válido y funcional al sitio web de soporte de la integración. |
| support/email | ❌ | string | Si no está disponible un enlace al sitio web del soporte de la integración, debes proporcionar un correo electrónico de soporte técnico. |
| locations | ✅ | array | Se debe mostrar el widget en ciertas interfaces. Para utilizar la parte de JavaScript del widget, debes completar un arreglo con las [áreas](https://es-developers.kommo.com/docs/ubicaciones-del-widget)relevantes. |
| tour | ✅ | obj | Se encuentra disponible una colección de imágenes para demostrar la funcionalidad del widget. |
| tour/is\_tour | ✅ | bool | Indica si se incluye un recorrido para el widget. Toma solo el valor `true` |
| tour/tour\_images | ❌ | obj | Un conjunto que contiene las claves de localización para las imágenes del recorrido. |
| tour/tour\_images/{lang} | ❌ | array | Un arreglo que contiene la ruta a las imágenes relacionadas con el recorrido, dependiendo de la ubicación del widget. |
| tour/tour\_description | ❌ | string | Además, se mostrará un texto breve cuando se muestre el recorrido del widget. Si configuras este valor como `"widget.tour_description"`, se mostrará una descripción que corresponda con la localización. |
| [settings](https://kommodesarrolladores.readme.io/docs/settings-field-types) | ✅ | obj | El usuario puede acceder a una variedad de ajustes del widget. Estos campos de configuración aparecerán en la ventana de ajustes del widget y serán completados por el usuario. Esta sección solo es necesaria si `"installation"` es **verdadero**. Si `"installation"` es **falso**, entonces esta sección no es necesaria, porque la descripción del widget se mostrará en la ventana de ajustes. La clave en el arreglo es el código del campo (`"FIELD_CODE"`). |
| settings/{FIELD\_CODE}/name | ❌ | string | El nombre del campo será solo un enlace al elemento en el archivo de idioma. |
| settings/{FIELD\_CODE}/type | ❌ | string | [Tipo de campo](https://es-developers.kommo.com/docs/tipos-de-campos-de-configuraci%C3%B3n): Las opciones disponibles son`"text"`, `"pass"`, `"users"`, `"users_lp"`, y `"custom"`. |
| settings/{FIELD\_CODE}/required | ❌ | bool | Indica si el campo debe ser completado por el usuario |
| dp | ❌ | obj | Ajustes de widgets de bloque en el Pipeline Digital. Este bloque debe incluirse en el **manifest.json** solo si es aplicable `'digital_pipeline'`. |
| dp/settings | ❌ | obj | Similar al bloque de **Ajustes**, se muestra al ajustar el widget en el pipeline digital. |
| dp/settings/action\_multiple | ❌ (pero si añades dp, es requerido) | bool | Campo requerido en el bloque dp, con valores (**verdadero/falso**), determina si la acción del widget puede extenderse en varias etapas |
| advanced/title | ❌ | string | Si el widget proporciona una página de ajustes avanzados en la sección de **Ajustes** de la cuenta, este campo es el título de la página.  Si el valor del campo es `"advanced.title"` entonces el valor se toma de los archivos de [localización](https://es-developers.kommo.com/docs/i18n). |
| salesbot\_designer | ❌ | obj | Parámetros para agregar un widget al constructor de Salesbot. |
| sms/endpoint | ❌ | string | Para que el sistema tenga funcionalidad SMS, el widget debe incluir un objeto **sms** y especificar una ubicación adicional **sms**. El objeto debe contener una propiedad de tipo cadena **endpoint** que especifique la dirección a la que se enviará la solicitud **POST** con la información requerida para enviar el SMS. |
| mobile/frame\_url | ❌ | string | Para habilitar la funcionalidad de la aplicación móvil, el widget debe incluir un nuevo objeto móvil y definir una ubicación adicional`"mobile_card"`. El objeto móvil tiene dos propiedades: `"frame_url"` y `"color"`. El `"frame_url"`es la URL que se abre en un área designada dentro de la aplicación móvil. |
| mobile/color | ❌ | string | El color es el código**HEX** del color que se usará como fondo debajo de los encabezados del bloque con el widget. |

# Prevención de errores

- Muchos archivos, incluido **manifest.json**, están en formato **JSON**. Por lo tanto, es esencial asegurarse de que la sintaxis sea correcta antes de subirlos. Puedes utilizar herramientas en línea para verificar la sintaxis de los archivos **JSON**. Uno de los errores más comunes es subir un archivo con la sintaxis incorrecta.

Updated 4 months ago

---

- [i18n/](https://dash.readme.com/project/kommodesarrolladores/v1.0/docs/i18n)

Copy Page
