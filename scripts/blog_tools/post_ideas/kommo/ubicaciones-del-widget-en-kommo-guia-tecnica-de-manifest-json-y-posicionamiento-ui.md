---
title: "Ubicaciones del widget en Kommo – guía técnica de manifest.json y posicionamiento UI"
source: "https://es-developers.kommo.com/docs/ubicaciones-del-widget"
date: "2026-02-17"
---

El proceso de conectar widgets implica habilitar los scripts de JavaScript del widget en páginas específicas (interfaces) de Kommo. Por defecto, los widgets no se conectan en todas las interfaces, sino solo en las áreas solicitadas.
Para habilitar la funcionalidad del widget, nuestro sistema necesita ser informado sobre las áreas donde operará el widget y dónde se utilizará el panel del widget en el lado derecho de la pantalla.
Para lograr esto, necesitas listar las áreas requeridas en el bloque locations
del archivo manifest.json e indicar el uso del panel del widget configurando 1 o 0 como parámetro. Configurar el indicador en 1 mostrará el widget en el panel derecho de la tarjeta. Por otro lado, configurarlo en 0 inicializará el widget en la tarjeta, pero no lo mostrará en el panel derecho.
El área
everywhere
no acepta el parámetro 1/0 siempre está configurada en 0 para esta área.
Por ejemplo, este widget será inicializado en la página de configuración, en los ajustes del pipeline digital, en las fuentes de leads, en la página de configuraciones avanzadas y en las tarjetas y listas de contactos y leads, pero el panel derecho solo se utilizará en las tarjetas especificadas:
"locations":[
"lcard-1",
"llist-0",
"ccard-1",
"clist-0",
"comcard-0",
"card_sdk",
"settings",
"digital_pipeline",
"lead_sources",
"catalogs",
"advanced_settings",
"ai_agent"
]
Cuando conectas un widget a cualquier interfaz, el script JS se cargará y la función callback render()
será ejecutada, seguida de init()
y bind_actions()
.
Puedes controlar la capacidad de llamar a las funciones init()
y bind_actions()
cada vez que el usuario se mueve de un área a otra al especificar true o false en el bloque init_once
del archivo manifest.json. Por ejemplo, los widgets VoIP deben mantener constantemente una conexión WebSocket y no deben ser interrumpidos, por lo que init_once
debería configurarse en true. Si no hay un contexto común para todas las páginas, es mejor configurarlo en false.
Cuando estés trabajando con las áreas de lista, ten en cuenta que el widget no se añadirá automáticamente a la interfaz. Primero, aparecerá la lista, y una vez que selecciones al menos una fila de la lista utilizando las casillas de verificación, aparecerá el menú contextual. Entonces, elige la acción del widget desde el botón más. El panel del widget en el extremo derecho de la interfaz de la lista con tu widget será añadido a la página por el evento seleccionado, lo que disparará la función callback correspondiente en script.js.
Para asegurarte de que el widget funcione en el pipeline digital, necesitas especificar digital_pipeline
en las ubicaciones. También se requiere la parte en Python del widget con el endpoint digital_pipeline
, así como el logo logo_dp.png con una resolución de 174×109.
Si tu widget tiene un scopelead_sources
, entonces puedes verificar a qué pipeline de la cuenta está vinculado utilizando una solicitud HTTP.
GET https://subdomain.kommo.com/api/v4/widgets/{widget_code}
La respuesta a tal solicitud muestra el pipeline_id
, o se muestra en el script.js de tu widget.
Para trabajar con el SDK de listas, necesitas especificar un scope especial "catalogs"
, el ID de la lista con la cual funcionará el widget, y también implementar un callback especial loadCatalogElement
.
Los widgets de Kommo pueden crear su página en la sección de Ajustes , y para hacerlo, necesitas especificar el scope advanced_settings en la lista "location"
, añadir el bloque “advanced” al manifest.json, e implementar un callback especial advancedSettings
.
El widget tendrá el control completo de esta página y deberá formar las páginas del DOM en su estructura. El bloque "advanced"
en el manifest.json deberá contener el título de la página de ajustes.
Si tu widget está diseñado para funcionar con el agente de IA de Kommo, ahora puedes mostrarlo en el bloque de configuración del agente de IA. Esto requiere realizar pequeños cambios en el archivo manifest.json, así como añadir la descripción correspondiente en los archivos de localización.
Actualizar manifest.json
Para conectar el widget con la interfaz del agente de IA, necesitas especificar una nueva ubicación ai_agent
en el archivo manifest.json
:
"locations": [ "ai_agent" ]
Especificar la ubicación ai_agent
te permite mostrar el widget dentro del bloque de configuración del agente de IA. Allí los usuarios podrán ver la funcionalidad de la integración y activarla si es necesario.
Puedes especificar
ai_agent
junto con otros valores enlocations
si el widget admite múltiples zonas de conexión.
Actualizar los archivos de idioma
Para mostrar correctamente la descripción del widget, debes añadir la clave widget.ai_agent_description
a cada archivo de localización ubicado en la carpeta i18n. Ejemplo en inglés: (i18n/en.json
); los demás se configuran de manera similar:
"widget": {
"name": "Mi integración con IA",
"description": "Descripción completa para la información general del widget",
"ai_agent_description": "Descripción breve del recuadro para la configuración del agente de IA"
}
La descripción de la clave widget.ai_agent_description
se mostrará directamente en la pestaña del widget dentro de la sección del agente de IA y debe ser breve y concisa. El contenido que no entre en el recuadro será truncado con puntos suspensivos. La longitud recomendada para widget.ai_agent_description
es de 100 caracteres.
Importante: si utilizas la ubicación
ai_agent
, debes añadir la clavewidget.ai_agent_description
en todos los archivosi18n
. El valor de la clave no puede estar vacío.
Ejemplo
{ ...
"locations": [
"ai_agent",
"settings"
], ...
}
{
"widget": {
"name": "Mi widget de IA",
"ai_agent_description": "Integración con un servicio de IA externo"
}
}
Ahora puedes adaptar fácilmente tus integraciones a la interfaz del agente de IA de Kommo. Esto permitirá que los usuarios encuentren y conecten rápidamente las soluciones necesarias, directamente en el contexto de la automatización y la lógica basada en IA.
