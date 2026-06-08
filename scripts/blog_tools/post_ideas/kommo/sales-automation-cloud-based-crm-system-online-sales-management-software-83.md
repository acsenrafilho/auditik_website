---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/es/recursos/crm/pasos-y-acciones-del-ventabot"
date: "2020-08-27"
---

¡Crea un Salesbot poderoso y eficiente con Kommo! Nuestro editor visual hace que la automatización sea fluida y personalizada para cualquier negocio. Ya sea que seas nuevo en el mundo de los bots o todo un experto, esta guía te acompañará en cada paso.
¿Nunca has construido un bot antes? Aprende cómo crear uno.
En esta guía, aprenderás sobre:
¿Cuáles son los pasos del Salesbot?
Los pasos son los bloques de construcción de tu Salesbot. Estos guían las conversaciones con los leads y automatizan los procesos internos. Cada paso tiene un propósito específico.
Abre el Constructor visual para ver los pasos disponibles:
Mensaje
El paso Mensaje es tu principal herramienta para comunicarte con los clientes. Utilízala para enviar mensajes de texto o plantillas de mensajes.
Cómo utilizarla:
-
Haz clic en Mensaje en el constructor visual.
- Aparecerá un bloque de mensaje. Haz clic en el campo de texto para editar el contenido.
- Para agregar una plantilla de mensaje, haz clic en plantilla y selecciona una de la lista de plantillas de respuesta disponibles.
Nota: para obtener más detalles sobre las plantillas de mensajes, consulta nuestro artículo sobre Plantillas de respuesta.
También puedes mejorar la comunicación con los clientes añadiendo botones de respuesta rápida. Estos permiten a los clientes elegir entre las opciones que has configurado, guiándolos a través de tu flujo. Para agregar uno, haz clic en + Botón de acción.
Por ejemplo, puedes listar varias opciones que tu cliente podría elegir, y el bot seguirá el camino adecuado según su elección.
Nota: Puedes añadir hasta 13 botones, pero recomendamos añadir no más de tres botones para evitar que los mensajes se dividan en algunas plataformas.
También puedes añadir palabras clave sinónimas como alternativas a los botones, lo que ayudará al bot a entender la intención del cliente, incluso si escribe en lugar de hacer clic. Solo una de esas palabras clave será suficiente para que el Salesbot identifique la opción correcta.
En el paso Mensaje, también puedes incluir un botón de URL que redirecciona a los clientes a una página web. Por ejemplo, etiqueta el botón como Kommo, añade el enlace a tu sitio web y, cuando se haga clic, los redireccionará directamente a tu página de inicio.
Una vez que añadas al menos un botón a tu mensaje, el sistema sugerirá agregar dos ramas adicionales:
-
Otra respuesta: Si el usuario responde a un mensaje con botones proporcionando una entrada diferente (que no sea hacer clic en un botón ni ingresar un sinónimo), se puede configurar una rama alternativa.
-
Sin respuesta: Haz clic en Agrega el siguiente paso. Se añadirá un temporizador como primera etapa después de este. Si el Salesbot no recibe una respuesta dentro del tiempo especificado, se puede configurar una rama alternativa:
También puedes anexar archivos a tus mensajes haciendo clic en el ícono de adjuntar — perfecto para compartir documentos como listas de precios o menús.
Los tipos de archivo compatibles incluyen:
- Documentos
- Imágenes
- Videos
- Archivos de audio
Puedes enviar archivos de audio a través de los siguientes métodos:
-Como un enlace de audio en los formatos .mp3 y .wav a través de la integración de Instagram.
-Como un archivo de audio en formato .mp3 a través de la integración de WACA.
Puedes enviar mensajes de voz con el Salesbot utilizando el formato .ogg a través del sistema Android. Al enviar un mensaje en formato .ogg a través de iOS, el archivo se entregará como un archivo adjunto de audio.
Es posible enviar mensajes de voz a través de las siguientes integraciones: Instagram, Facebook y WACA.
A continuación, elige el destinatario del mensaje si hay múltiples contactos en una tarjeta de lead:
-
Todos los contactos – canales seleccionados (por defecto) – Envía el mensaje a todos los contactos utilizando solo los canales que has seleccionado.
-
Todos los contactos – canales primarios – Envía el mensaje a todos los contactos, pero solo a través de uno de los canales.
-
Contacto principal – canal seleccionado – Envía el mensaje solo al contacto principal, a través de los canales que has escogido.
-
Contacto principal – canal primario – Envía el mensaje al contacto principal a través de uno de los canales.
Nota: El contacto principal se refiere al contacto primario dentro de un lead cuando se encuentran asociados varios contactos. Si un lead tiene solo un contacto, se considera equivalente al contacto principal. Todos los contactos se refiere a todos los contactos vinculados a un lead cuando hay múltiples.
Selecciona el canal que utilizará el Salesbot haciendo clic en Canal en la parte superior. Por defecto, está configurado en Todos. Abre el menú desplegable para ver todos los canales conectado y elige uno o dos de ellos
Estas opciones te brindan flexibilidad para gestionar la comunicación, permitiéndote adaptarla a la estructura de tus leads y preferencias de canal. ¿La mejor parte? No necesitas crear bots separados para cada canal — ¡puedes gestionarlos todos con un solo bot!
Nota: Cuando se envía un mensaje, primero pasa al estado Enviado. Si ocurre un error y el mensaje no se entrega, el bot seguirá la rama Error al enviar.
Si el mensaje llega correctamente al estado Entregado, el bot continuará por la rama principal.
List Message (WhatsApp)
Esta funcionalidad te permite enviar hasta 10 opciones en una lista estructurada. Los clientes pueden navegar fácilmente y elegir entre las opciones. También puedes añadir descripciones a cada opción para brindar información más detallada.
Cómo configurarla:
-
Selecciona List Message (Whatsapp) en el constructor visual.
- Completa los siguientes campos:
- Título del mensaje (opcional)
- Mensaje (requerido)
- Pie de página (opcional)
- Nombre del botón (requerido)
- Título de sección (requerido)
- Título de opción (requerido)
- Descripción (opcional)
-
Añade más opciones y secciones haciendo clic en Añadir opción o + Añadir sección:
Al hacer clic en el botón Añadir sección se creará una nueva sección que deberá completarse.
Al hacer clic en el botón Añadir opción se creará una nueva opción que necesita ser completada.
Condición
Este paso sirve como un filtro entre las acciones del Salesbot. Puedes establecer múltiples condiciones que un mensaje de chat o los campos de contacto deben cumplir antes de pasar al siguiente paso. Esta función es útil cuando necesitas filtrar tipos específicos de contactos o guiar al Salesbot según el contenido del mensaje.
Puedes establecer diferentes condiciones dentro de un solo paso o crear múltiples condiciones para distintos caminos de la conversación.
Esto te ayuda a personalizar las respuestas del bot según lo que diga el cliente. Por ejemplo, si un cliente escribe “Hola”, el bot puede responder con “Te damos la bienvenida a nuestra empresa”. Si piden un “catálogo”, el bot puede enviar el catálogo y decir “Aquí tienes nuestro catálogo”.
Puedes personalizar este paso de muchas maneras. En lugar de utilizar solo el mensaje del cliente, puedes basar la condición en cosas como el Código de chat activo, Fuente del lead u otros campos personalizados.
Comentario
Este paso se puede utilizar para configurar la automatización de los comentarios de Instagram. Para comenzar, asegúrate de instalar nuestra integración de Instagram.
Para obtener más información sobre la integración, lee nuestro artículo Instagram: Como conectar Instagram a Kommo.
Cómo configurarlo:
-
Utiliza un paso Condición para disparar una respuesta basada en palabras clave específicas en los comentarios. Configúralo en Si el mensaje del cliente es igual a: y luego escribe la palabra clave elegida como disparador.
-
Añade un paso de Comentario para crear respuesta pública que será publicada cuando se detecte la palabra clave en un comentario.
-
Cuando estés listo, haz clic en Guardar & Continuar para finalizar con la configuración.
Para obtener más información sobre la automatización de Instagram, lee nuestro artículo Automatización de comentarios Instagram: Cómo configurarla.
Pausa
La etapa Pausa permite que el bot espere acciones específicas antes de continuar.
Como configurarla:
-
Escoge Pausa en la lista de pasos.
Por defecto, el bot esperará hasta recibir el mensaje. Haz clic en él para editar este paso.
El bot puede esperar hasta:
-
Recibir mensaje: el bot pausará sus acciones hasta recibir una respuesta del cliente.
-
El temporizador se agotó: el bot esperará por un período de tiempo especificado antes de continuar al siguiente paso. El tiempo máximo que puedes establecer es de 8760 horas, 60 minutos y 60 segundos.
-
Excepto horas laborales: el bot se pausará si la hora actual está fuera de tus horas laborales preestablecidas.
-
Se abre el video o se cierra el video: el bot esperará hasta que un cliente abra o cierre un video que se le haya enviado antes de continuar. Esto puede utilizarse para garantizar que el cliente haya interactuado con el contenido del video antes de proceder. Por favor, ten en cuenta que las funciones de Se abre el video y Se cierra el video solo están disponibles en el canal de chat en vivo.
Puedes añadir múltiples condiciones haciendo clic en + Agregar siguiente condición. Para eliminar una condición, pasa el cursor sobre ella, haz clic en los tres puntos y selecciona Borrar.
Nota: En el escenario mostrado en la captura de pantalla (con dos condiciones: Hasta recibir mensaje y Temporizador), el bot solo seguirá una de las condiciones. Si el Salesbot recibe un mensaje antes de que se agote el temporizador, continuará con el paso posterior a la condición Hasta recibir mensaje. Si el temporizador se agota primero, seguirá el paso posterior a la condición de temporizador.
Validación
El paso de validación analiza los mensajes de los clientes y dirige al bot según corresponda.
Valida los mensajes en función de diversas variables, como:
- es igual a
- no es igual
- contiene
- no contiene
- tiene una longitud de
- expresión regular
Nota: Cuando seleccionas la opción contiene, deberás especificar si el contenido debe incluir números, letras, teléfono, email o rango de números.
Supongamos que el bot le pide al cliente su número de teléfono. Para asegurarte de que el cliente proporcione un número de teléfono y no un texto aleatorio, puedes configurar una condición de validación como si el mensaje del cliente contiene un teléfono. Si se detecta un número de teléfono, el bot puede continuar con los siguientes pasos. También puedes añadir otra condición, como si el mensaje del cliente no contiene un teléfono para que el bot solicite un teléfono correcto.
Enviar mensaje interno
Los mensajes internos son excelentes para compartir información dentro de tu compañía. Estos son solo visibles para la persona seleccionada o el equipo seleccionado al que están dirigidos.
Por ejemplo, si tienes un negocio de catering y un cliente quiere discutir opciones por teléfono, el bot puede enviar un mensaje a un asistente responsable de manejar esos asuntos.
Cómo configurarlo:
-
Selecciona el paso de Mensaje interno en el constructor visual.
- Ingresa el texto y elige el usuario o los usuarios responsables a quienes deseas enviar este mensaje una vez que se encuentre activado.
Suscribirse (Meta)
La ventana de conversación de 24 horas de Meta limita el envío de mensajes a los clientes a 24 horas después de su último mensaje. Esto se hace para evitar el spam. Los mensajes de suscripción abordan este problema permitiendo que los clientes se suscriban a boletines informativos regulares sobre el tema que elijan, lo que ayuda a mantener la conversación activa. Puedes configurarlos utilizando el paso Suscribirse (Meta).
Se deben completar dos campos para que se active el paso #agregar etiquetas y Título del mensaje.
Todas las acciones disponibles
El Salesbot ofrece una variedad de acciones para automatizar flujos de trabajo y mejorar la comunicación. Simplemente haz clic en Acción mientras configuras un paso, y verás un menú desplegable con las siguientes opciones. Aquí tienes un desglose de cada acción:
-
Agregar nota: Añadir notas directamente en la tarjeta de un lead para un mejor seguimiento.
Para agregar una nota, primero selecciona el tipo de entidad para la nota (por defecto: contacto principal).
Luego, ingresa el texto de la nota. Una vez activado, la nota aparecerá en el chat del lead.
Puedes editar la nota en la tarjeta de lead cuando hagas clic en ella. Puedes adjuntar archivos o eliminarla al pasar el cursor sobre el lado derecho de la nota y hacer clic en Eliminar.
-
Agregar tarea: Asigna tareas a los miembros del equipo. Puedes establecer una fecha límite, escoger a los usuarios responsables, cambiar el tipo de tarea o dejar comentarios.
Por ejemplo, cuando un lead llega a la etapa de Toma de decisiones, puedes utilizar esta acción para agilizar las tareas de seguimiento y la coordinación del equipo. Asigna automáticamente una tarea al miembro responsable para hacer el seguimiento con el lead. Para obtener más información sobre cómo trabajar con tareas, lee nuestro artículo de Tareas.
-
Cambiar el estado de la conversación: Actualiza automáticamente el estado de la conversación a cerrada o respondida según disparadores específicos.
-
Cambiar la etapa del lead: Mueve automáticamente los leads a través de tu pipeline de ventas dependiendo de la acción que configures. Todo lo que necesitas hacer es elegir un pipeline y una etapa (por ejemplo, Toma de decisiones), haciendo clic en el botón Pipeline.
Por ejemplo, puedes configurarlo para que cuando los clientes seleccionen un servicio desde los botones de respuesta rápida, el bot los mueva a la etapa de Toma de decisiones.
-
Cambiar el usuario responsable: Dirige a los clientes al gerente adecuado según sus necesidades. Los usuarios pueden ser cambiados en las siguientes entidades: contacto principal, todos los contactos, contacto de chat, lead y compañía:
Para seleccionar al usuario responsable de manejar el lead, haz clic en … :
-
Completar tareas: Marca automáticamente las tareas como completadas y actualiza el calendario. Puedes escoger todas las tareas o una en específica y establecer la fecha límite. Una vez que se ejecute este paso, la tarea se marcará como completada. Una nota aparecerá en los chats con los leads para los cuales se crearon las tareas.
La tarea se moverá de la columna de tareas por hacer en el calendario de Kommo a la columna de tareas completadas.
-
Generar formulario: Crea un formulario para recopilar más información de los leads. Todos los datos se guardarán en la tarjeta del lead. Además, puedes optar por crear un nuevo lead basado en la información del formulario. También puedes establecer la etapa del pipeline o agregar etiquetas a la tarjeta del lead.
Para crear un formulario, haz clic en el botón Crear un formulario, escoge el diseño del formulario, edita los campos y diseñalo como desees.
Puedes aprender más sobre cómo editar formularios en nuestro artículo Formularios web de Kommo.
-
Crear lead: Crea automáticamente nuevos leads con detalles importantes.
Puedes escoger qué información incluir (como Venta, Etiquetas, Contactos y Compañía) y asignarla a cualquier usuario. También puedes establecer la etapa del pipeline en la que se encontrará. Cuando el usuario selecciona una opción de la lista, esta información específica será copiada directamente desde la tarjeta de lead que el bot está manejando actualmente.
Por ejemplo, el Salesbot puede crear automáticamente leads para los participantes del webinar que soliciten una consulta. Puede agregar detalles como su nombre, información de contacto y compañía desde el formulario de registro, etiquetarlos como “Asistente al Webinar” y asignar el lead a la etapa correcta del pipeline y al representante de ventas adecuado. Esto ahorra tiempo y garantiza que no se pierda ningún cliente potencial.
-
Gestionar suscriptores: Agrega o elimina suscriptores (por ejemplo, miembros del equipo) en los chats para mantenerlos notificados sobre las actualizaciones en las tarjetas de leads.
-
Administrar etiquetas: Añade o elimina fácilmente etiquetas para una mejor organización. Puedes añadir/eliminar etiquetas y cambiar la entidad a la que se asignarán o de la que se eliminarán. Al hacer clic en #agregar etiquetas ,aparecerá una lista de etiquetas disponibles. Elige la que necesites de la lista o crea una nueva etiqueta.
-
Meta Conversions API: Rastrea fácilmente las acciones de los clientes en Kommo (como leads y compras) desde tus Anuncios de clic para enviar mensajes en Instagram, Facebook Messenger o WhatsApp sincronizándolos directamente con el Administrador de eventos de Meta. Esta integración te ayuda a monitorear el rendimiento de los anuncios, evaluar las campañas publicitarias y perfeccionar estrategias, brindando una comprensión integral del recorrido de tus clientes.
Para aprender cómo configurar Meta Conversions API a través de un Salesbot, lee nuestro artículo Meta Conversions API: Cómo configurar.
-
Enviar correo: Automatiza el envío de correos electrónicos utilizando plantillas.
Primero, necesitarás conectar una dirección de correo electrónico haciendo clic en conectar.
Nota: Para enviar correos, debes crear plantillas de correos dirigiéndote al menú Correo > Ajustes > Plantillas.
Los correos electrónicos se envían desde el correo del gerente responsable conectado. Si no está disponible, se utilizará un correo corporativo compartido.
Para más detalles, consulta nuestro artículo sobre Correos electrónicos accionados.
-
Enviar un webhook: Envía datos a aplicaciones de terceros usando webhooks. Por ejemplo, puedes utilizar webhooks para cambiar el estado de un pedido de Realizado a Cancelado en el sistema ERP. Todo lo que necesitas hacer es ingresar la URL del webhook.
-
Establecer campo: Actualiza campos personalizados en los perfiles de los leads automáticamente. Por ejemplo, el bot puede completar automáticamente un campo personalizado cuando un cliente proporciona su correo electrónico o número de teléfono en el chat.
Para seleccionar el campo que deseas solicitar que el usuario del chat complete, haz clic en … :
Selecciona el tipo de entidad para la que se establecerá el campo haciendo clic en Contacto de chat:
A continuación, escoge qué campo deseas actualizar y el tipo de datos que necesitas. Dependiendo de la entidad seleccionada, el Salesbot puede completar diferentes campos. Estos son los más populares:
- Mensaje del cliente - Recibe el último mensaje del chat que el usuario envió antes de que se activará esta acción.
- Entrada manual - El Salesbot se pondrá en contacto con el usuario responsable en Kommo y le pedirá que ingrese los datos manualmente.
Ir a otro paso
La funcionalidad Ir a otro paso permite que el bot salte directamente a otro paso en tu secuencia. Está diseñado para hacer que los flujos complejos sean más fáciles al vincular pasos sin duplicarlos. Simplemente selecciona un paso de la lista, y el bot los conectará por ti.
Nota: Esta opción solo estará disponible después de que hayas configurado al menos un paso adicional en el flujo de tu bot.
Utiliza Ir a otro paso para mezclar varias acciones en un único camino o etapa, disminuyendo así la redundancia.
También permite conectar múltiples acciones en un solo paso para evitar recrear el mismo proceso de forma repetida. Por ejemplo, si un cliente no ha proporcionado un número de teléfono requerido, pídele que lo ingrese y redirige el bot de vuelta a una etapa de validación.
Consejo: Si el flujo de tu Salesbot se vuelve complejo, utiliza la herramienta de mapa en la parte inferior de la pantalla para navegar fácilmente entre los pasos. Haz clic en cualquier sección del mapa para saltar directamente a esa parte de la secuencia de tu bot.
Para una navegación aún más fluida, cuando saltes entre los pasos, aparecerá un botón sobre el mapa durante unos segundos, lo que te permitirá regresar rápidamente al paso anterior.
Si dos pasos se encuentran demasiado lejos como para que las flechas automáticas los conecten, el paso aparecerá como un botón en el que se puede hacer clic.
Al hacer clic en este botón, también se mostrará el botón Volver a... sobre el mapa para facilitar la navegación.
Iniciar Salesbot
El paso Inicializar Salesbot te permite vincular un bot existente a tu flujo de trabajo actual.
Haz clic en Iniciar Salesbot y luego escoge el bot que deseas incluir en el proceso.
Puedes utilizar estos tipos de bots para crear flujos de trabajo de ventas completos, automatizando tareas de principio a fin
Por ejemplo, antes de enviar un pedido, es posible que desees verificar la información de contacto del cliente. Si la información es incorrecta, puedes activar un bot de bienvenida para recopilar los detalles de contacto actualizados. Una vez que el bot de bienvenida haya completado su tarea, el bot de confirmación de datos puede retomar el flujo donde lo dejó, continuando el proceso sin interrupciones.
Paso personalizado (Código)
En este paso, puedes ingresar tu propio código para funcionalidades avanzadas.
Nota: Los manejadores de código “” deben contener al menos un carácter para que el paso se active. Para tener una mejor idea de cómo crear comandos para el Salesbot mediante la codificación, consulta el artículo sobre el Salesbot en nuestra base de conocimiento para desarrolladores.
Widget
Este paso incluye widgets de terceros que se pueden utilizar dentro del Salesbot. Puedes añadir varias integraciones a través de este paso, como Stripe, Mailer, y muchas otras, para incorporar funciones adicionales a tu flujo. Estas añadirán funcionalidades extras a tu bot. Para agregar un widget, haz clic en el paso Widget.
Aparecerá una lista de widgets disponibles. Los widgets que ya has instalado se mostrarán primero. Si quieres utilizar otro widget, solo necesitas hacer clic en Instalar.
Por ejemplo, con el widget de Stripe, puedes enviar facturas de pago personalizadas. Al seleccionar un widget, aparecerá un paso con la información requerida para completar.
Pueden añadirse manualmente o automáticamente. Para obtener instrucciones detalladas sobre cómo usar Stripe con tu bot, consulta nuestro artículo sobre la integración con Stripe.
Round Robin
La funcionalidad Round Robin te permite ejecutar pasos en una secuencia circular, facilitando la distribución equitativa de acciones entre tus prospectos. Puedes elegir hasta 100 opciones diferentes, cada una con una acción única.
Cómo configurarla:
-
Selecciona Round Robin en el menú del Salesbot.
-
Añade pasos para cada opción haciendo clic en Agregar el siguiente paso.
-
Escoge una opción para cada paso, como Mensaje, Tarea o cualquier otra acción disponible.
Otro beneficio de este paso es que permite realizar pruebas A/B para determinar cuáles son los mensajes más efectivos.
Por ejemplo, si agregas tres opciones, el bot las alternará de la siguiente manera:
-
El primer lead recibe Mensaje 1.
-
El segundo lead recibe Mensaje 2.
-
El tercer lead recibe Mensaje 3.
-
El cuarto lead vuelve al Mensaje 1.
Este patrón continúa, asegurando que los mensajes se distribuyan de manera uniforme entre tus leads.
Aunque Round Robin es flexible, ten en cuenta algunas limitaciones y condiciones de reinicio:
-
Acciones máximas: Puedes tener hasta 100 acciones, pero se requieren al menos dos. El bloque comienza con dos opciones, y no puedes eliminar una hasta que agregues una tercera.2
-
Reinicio de distribución: La secuencia se restablecerá si agregas, editas o eliminas una nueva acción.
Nota: Recuerda siempre guardar la configuración de tu Salesbot después de haber terminado de configurarlo.
¿Necesitas más ayuda para configurar o solucionar problemas? Contáctanos por el chat de soporte o vía WhatsApp. También puedes contratar a un socio de Kommo para que haga todo el trabajo por ti.
¿Aún no eres usuario? Regístrate para una prueba de 14 días gratis o reserva una demo gratuita para verlo en acción.
