---
title: "Áreas del sistema Kommo – guía técnica de entidades y estructura CRM para desarrolladores"
source: "https://es-developers.kommo.com/docs/areas-del-sistema"
date: "2026-02-17"
---

Para el desarrollador, el sistema de Kommo es una base de datos relacional. El sistema tiene entidades básicas y auxiliares, principalmente tablas de datos, que pueden estar vinculadas entre sí. El acceso a estas entidades está disponible a través de la API.
Para acceder a los datos del sistema, tanto a través de las interfaces como de la API, se requiere autorización. Todo el trabajo a través de la API se basa en los derechos de acceso del usuario autorizado en la cuenta. Todos los métodos solo pueden ser utilizados después de la autorización.
Puedes obtener la información necesaria sobre la cuenta (nombre, período de pago, usuarios de la cuenta y sus derechos, directorios de campos adicionales de contactos y leads, un directorio de etapas de leads, un directorio de tipos de notas, una referencia de tipos de tareas y otros parámetros de la cuenta) a través de la API.
Una de las entidades principales del sistema. Consiste en un conjunto predefinido de campos y campos personalizados (adicionales que pueden ser creados por un administrador de la cuenta).
Cada contacto puede estar vinculado con ninguno/uno/varios leads.
Cada contacto puede estar vinculado con una sola compañía.
El correo electrónico y el número de teléfono del contacto se utilizan como identificadores únicos en conjunto con otros sistemas. Por ejemplo, mediante el número de teléfono y el correo electrónico, el contacto recibe información sobre llamadas y correspondencia por correo electrónico.
Cada contacto puede tener un usuario responsable para diferenciar los derechos de acceso de los usuarios de la cuenta.
Es una de las entidades principales del sistema. Consiste en un conjunto predefinido de campos y campos personalizados (campos adicionales que pueden ser creados por el administrador de la cuenta en la interfaz o mediante la API).
Cada lead puede ser:
- vinculada con ningún/uno/muchos contactos.
- vinculada con solo una compañía.
- asignada a un usuario responsable para diferenciar los derechos de acceso entre los usuarios de la cuenta.
El lead tiene una etapa, que indica la posición del lead en el pipeline (proceso de ventas). Cada lead debe tener asignada una etapa.
La lista de etapas puede modificarse dentro de la cuenta, excepto por las tres etapas del sistema: Leads entrantes, Cerrado – Ganado and Cerrado – Perdido . La única configuración que se puede modificar para las etapas del sistema es el nombre.
Lead entrante tiene funcionalidades adicionales y diferentes fuentes, puede no tener una persona responsable y contiene metadatos (tipo de Lead entrante y otras propiedades).
Es similar a la entidad de "contacto". Consiste en un conjunto predefinido de campos y campos personalizados (adicionales que pueden ser creados por el administrador de la cuenta).
Cada compañía puede:
- puede estar asignado a ningún/uno/varios leads.
- tener un usuario responsable para diferenciar los derechos de acceso de los usuarios de la cuenta.
El correo electrónico y el teléfono se utilizan como identificadores en conjunto con otros sistemas.
Las tareas se consideran una entidad fundamental del sistema.
Una tarea debe tener un usuario responsable y una fecha límite (fecha y hora exacta). Una tarea puede estar asociada a un lead o contacto, o no estar asociada a ningún objeto.
Puedes establecer el resultado de una tarea cerrada utilizando notas.
Los notas representan la capacidad de añadir información adicional a un contacto o lead. Los eventos pueden ser creados por el sistema (llamadas, mensajes SMS, etc.) o por el usuario (notas, archivos). Los eventos en las tarjetas se muestran junto a las tareas porque no tienen un usuario responsable ni una fecha límite.
Generalmente, los eventos son utilizados por los widgets para añadir información adicional a la tarjeta de un lead o contacto cuando no es muy conveniente utilizar campos personalizados_ Los eventos son muy útiles para ser utilizados como un registro _ya que siempre se muestran en orden cronológico en el feed. Si tu información está vinculada al tiempo, te recomendamos usar eventos.
Los campos personalizados permiten insertar información adicional en las entidades y pueden ser creados y eliminados uno por uno. Los usuarios no podrán cambiar estos valores desde la interfaz, pero sí podrán filtrarlos y visualizarlos. La creación y eliminación de un campo también es posible desde la interfaz.
Las llamadas representan la capacidad de agregar información a un contacto o una compañía. Los eventos en las tarjetas se muestran junto con las tareas porque no tienen un usuario responsable y no están asociados a una fecha. Si el evento de la llamada tiene un enlace al archivo de la grabación de la llamada, se añadirá un reproductor a la nota para reproducir esta grabación.
En la etapa de Leads entrantes, todas las llamadas provenientes de integraciones como correo, telefonía o formularios del sitio, que aún no han sido procesadas por el usuario (es decir, no se ha creado un lead o contacto), se ubican en este estado. El usuario puede aceptar los leads entrantes, en cuyo caso se creará un lead, así como el contacto y la compañía si la información relevante está presente en la aplicación, o puede rechazarlo.
Cada cuenta en Kommo tiene la capacidad de notificar a un servidor web externo sobre diversos eventos. Los Webhooks se pueden utilizar para actualizar información sobre los leads en tu tienda, enviar notificaciones SMS o automatizar leads. Cada Webhook puede configurarse para una operación y eventos específicos. El administrador de la cuenta puede configurar los Webhooks en la página de Ajustes → Integración.
Las etapas de ventas son la secuencia de pasos por los que un lead pasa a través del pipeline de ventas antes de realizar una compra. En Kommo, puedes crear hasta 10 pipelines de ventas en una cuenta y establecer tus propios objetivos para realizar un seguimiento del progreso del lead en cada pipeline. Cada pipeline puede contener hasta 100 etapas (incluyendo las exitosas y las no exitosas). Solo el administrador de la cuenta puede configurar los pipelines y las etapas de ventas accediendo a Leads→Configurar.
Un Pipeline digital digital permite configurar la ejecución de diversas acciones y cambiar automáticamente las etapas de los leads cuando ocurren ciertos eventos.
El administrador de la cuenta puede configurar el pipeline digital haciendo clic en Leads → botón de Configurar.
Un widget es un paquete de archivos que se pueden conectar a todas las cuentas que hayan habilitado el widget. El widget permite:
- Mostrar datos adicionales en las interfaces de Kommo. Se proporcionan áreas especiales donde se pueden mostrar widgets. Por ejemplo, mostrar las estadísticas de interacciones con el contacto desde el sistema interno;
- Interactuar con los usuarios y los datos ingresados por ellos. Puedes conectar scripts en JS en prácticamente cualquier parte de la interfaz del sistema. Por ejemplo, puedes mostrar una ventana emergente cuando recibas una llamada;
- Que el administrador de la cuenta de Kommo ingrese los ajustes individuales de tu servicio. Por ejemplo, la clave en tu API.
Puedes configurar widgets con los derechos de administrador de la cuenta en Ajustes → Integración.
Listas es una nueva sección que contiene listas de contactos y compañías. Permite crear listas y directorios que pueden ser utilizados en las tarjetas de leads y clientes.
