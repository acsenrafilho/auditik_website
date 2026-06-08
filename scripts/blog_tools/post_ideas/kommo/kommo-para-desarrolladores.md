---
title: "Kommo para desarrolladores"
source: "https://es-developers.kommo.com/docs/kommo-desarrolladores"
date: "2026-04-14"
---

Nuestro objetivo es ofrecer una amplia gama de posibilidades para la integración con diversos servicios y sistemas. Esto permite a clientes y socios ampliar la funcionalidad de Kommo tanto para ellos mismos como para los demás.
Desarrollar tus propios widgets e integraciones no es tan difícil como puede parecer a primera vista. Para facilitar la tarea a los desarrolladores, la Sección para Desarrolladores proporciona Documentación, Recetas y Definiciones de la API.
Una integración es una aplicación (con o sin un widget) que ayuda a los usuarios a gestionar su flujo de trabajo. Una persona o un equipo que trabaja en integraciones se llama integrador.
Para acceder a los datos de usuario de Kommo, los desarrolladores deben crear una integración (introducir el nombre y la descripción del servicio y otorgar los permisos necesarios). Al crearse, Kommo proporciona las claves necesarias para acceder a nuestra API.
Las integraciones pueden incluir:
- un token de larga duración que solo se puede utilizar para integraciones privadas
- un conjunto de claves secretas para la autorización OAuth2 (client_id, client_secret, authorization_code)
- metadatos como el nombre, el logo y la descripción. Esta información es necesaria para que los usuarios sepan qué servicio tiene acceso a su cuenta y datos.
- un archivo de widget que contiene el código JS ejecutado en la interfaz de Kommo, aunque no es obligatorio.
Hay dos tipos de integraciones que destacamos:
Este es el tipo de integración más simple: una integración que proporciona características adicionales dentro de una única cuenta de Kommo.
Por ejemplo, un desarrollador/socio puede crear una característica única que solo una compañía/cuenta necesita, como un formulario en un sitio web o una integración con un software de cliente específico. Las integraciones de este tipo no requieren moderación y no se publicarán en el Marketplace de Kommo.
Las integraciones privadas pueden incluir un widget que solo funciona en la cuenta donde se creó la integración.
Si estás desarrollando una integración que podría ser útil para todos los usuarios de Kommo, puedes publicarla en el Marketplace de Kommo. Sin embargo, las integraciones de este tipo deben pasar por un proceso de moderación. Esto implica probar y auditar el código JavaScript del widget para garantizar la seguridad y la calidad de la experiencia del usuario.
Dado que desarrollar tales integraciones es un proceso complejo, ofrecemos cuentas técnicas para integradores que trabajan con integraciones públicas, donde pueden comunicarse con nuestro equipo de soporte y pruebas. En la cuenta técnica, los integradores también pueden trabajar con una interfaz avanzada para integraciones personalizadas, que incluye funciones como el versionado de integraciones y el soporte para múltiples idiomas.
Las integraciones públicas pueden incluir widgets que funcionan dentro de la interfaz de Kommo. Estas integraciones pueden instalarse en un sitio web externo utilizando el Botón en el sitio.
- Mostrar tu diseño en ubicaciones permitidas del sistema, como tarjetas de leads o contactos, listas, pipelines, panel de control, etc. También puedes añadir una interfaz para que los usuarios interactúen con la integración.
- Afectar la visualización y el comportamiento de las interfaces estándar de Kommo.
- Intercambiar datos con sistemas externos mediante el envío de solicitudes o con Kommo a través de la API REST.
- Recibir datos del contexto de la página y objetos JS iniciados por Kommo.
Cualquier usuario con derechos de administrador puede crear integraciones privadas. La integración se asignará a la cuenta en la que se creó. Esto significa que cualquiera de los administradores de esta cuenta podrá gestionar la integración y tendrá acceso a las claves compartidas.
Si deseas construir una aplicación pública, debes solicitar una cuenta técnica.
Puedes:
- Cargar información desde tu sistema contable interno y mostrar información adicional sobre un contacto.
- Permitir que los empleados de tu compañía envíen solicitudes al departamento de contabilidad para generar un pago directamente desde la tarjeta del lead.
- Si eres el desarrollador de un servicio de terceros (como mensajería o VoIP), puedes ofrecer a los clientes de Kommo la oportunidad de utilizar tu servicio al publicar una integración en el Marketplace, haciéndola más transparente y accesible, etc.
Además de la capacidad de recibir, añadir y actualizar datos en Kommo utilizando la API REST, ofrecemos un conjunto adicional de herramientas para crear integraciones convenientes y fáciles de usar.
La API de CRM es una herramienta poderosa para los desarrolladores que buscan expandir las capacidades de Kommo y crear soluciones innovadoras que ayuden a las empresas a conectarse con sus clientes de formas nuevas y emocionantes. Con sus funcionalidades y una comunicación segura, la API de CRM ofrece una variedad de beneficios para los desarrolladores que desean llevar su desarrollo de software al siguiente nivel.
Es muy útil para cualquier integrador que tenga como objetivo conectar una nueva fuente de mensajes, como un nuevo servicio de mensajería. Por ejemplo, puedes desarrollar tu propia integración con WhatsApp utilizando la API de Chats y distribuirla según tus propias condiciones. En este caso, serás responsable de la transferencia de mensajes y del control de la API de WhatsApp. Para los usuarios finales, parecerá que envían mensajes directamente al servicio de mensajería y los reciben en Kommo. El Salesbot también es compatible con los mensajes entrantes de tu fuente.
La API de VoIP es un conjunto de métodos y librerias de JavaScript, como reproductores de grabación de llamadas, notificaciones push y otros, así como ejemplos específicos de API y su uso. Es útil para integradores que desarrollan integraciones con servicios de telefonía.
Los webhooks permiten a los usuarios suscribirse a ciertos eventos (como un cambio de contacto o una nueva tarea) en Kommo, ya sea manualmente o a través de la API. Cuando ocurre un evento de este tipo, se ejecuta el script correspondiente y el usuario recibe un contexto de entrada para el evento. Esta herramienta permite a los usuarios rastrear los cambios necesarios en los datos, sin depender de la sincronización recurrente y basándose en el modelo de eventos.
El WEB SDK te permite modificar la interfaz de Kommo introduciendo scripts y estilos personalizados o creando widgets.
Es una herramienta que puedes usar para crear escenarios personalizados para operaciones automatizadas con usuarios a través de mensajeros. Puedes programar el Salesbot para ejecutar diversas acciones con leads y contactos, responder automáticamente en los chats, utilizar procesamiento de lenguaje natural (NLP) para determinar la intención del usuario, y mucho más.
Ofrecemos un lenguaje personalizado del Salesbot y un editor visual para crear escenarios automatizados de comunicación con los usuarios. Además, los integradores tienen la opción de incorporar su integración en el flujo de trabajo del Bot.
Es una poderosa herramienta de automatización que incluye su propio constructor. El constructor te permite configurar reacciones automáticas del sistema para eventos como cambios en las etapas de leads y visitas a la página web. Kommo puede reaccionar con una amplia gama de acciones personalizables, como generar una tarea, agregar un contacto o enviar un correo electrónico. Además, los integradores pueden crear sus propios controladores de eventos y añadirlos a la lista de acciones automáticas disponibles.
