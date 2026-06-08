---
title: "OAuth 2.0 en Kommo – autorización segura y tokens para integraciones API"
source: "https://es-developers.kommo.com/docs/oauth-20"
date: "2026-02-17"
---

OAuth es un reconocido marco de autorización que permite a las aplicaciones obtener acceso limitado a las cuentas de los usuarios. OAuth define cuatro roles:
- El dueño del recurso es quien autoriza a una aplicación para que acceda a su cuenta, estableciendo un límite en el alcance de la autorización que puede otorgar.
- El servidor de recursos es el servidor que aloja los recursos protegidos.
- El cliente es la aplicación que desea acceder a la cuenta del usuario.
- El servidor de autorización verifica la identidad del usuario y emite tokens de acceso a la aplicación.
Cuando un cliente necesita acceder a un recurso protegido, verifica su identidad con el servidor de autorización. Una vez que se obtiene la aprobación del dueño del recurso, el servidor de autorización emite un token de acceso.
Este token representa un alcance específico, una duración y otros atributos de acceso que son diferentes de las credenciales del dueño del recurso. Este token puede ser utilizado por el cliente para acceder a los recursos protegidos hospedados por el servidor de recursos.
A continuación, se presenta un diagrama de cómo los roles de OAuth suelen interactuar entre sí.
Una cuenta de usuario en Kommo es el equivalente al propietario del recurso en términos de OAuth. En este contexto, tu integración actúa como el cliente y accederá y utilizará los datos de las cuentas de los usuarios en el servidor de Kommo (servidor de recursos) según los permisos solicitados y otorgados. La cuenta de Kommo donde se crean las integraciones se conoce como la cuenta de desarrollador. Una vez que la obtengas, recibirás las credenciales de aplicación de OAuth.
Estas son nuestras razones para utilizar OAuth:
- Mayor seguridad:
Necesitamos OAuth para permitir que una integración tenga acceso granular a los datos del usuario de la cuenta Kommo, sin revelar las credenciales del usuario a la integración. Es una gran ventaja que tiene el método OAuth sobre las claves API. - Gestión de permisos:
Cuando un usuario interactúa con una integración que utiliza OAuth para la autenticación, será redirigido a una página donde podrá elegir si desea autorizar a la integración para que acceda a su cuenta. Cuando se realiza una solicitud, verán los datos específicos a los que la integración podrá acceder. El rol de OAuth es asegurarse de que estos permisos se manejen de forma segura y correcta.
- Instalación de integraciones:
Los usuarios de Kommo no tienen que ingresar a sus cuentas de Kommo para encontrar e instalar tu integración (aplicación). Como desarrollador, puedes ofrecer un botón en el sitio o una URL de webhook para instalar un widget y así otorgar acceso de la integración a las cuentas.
- Soporte para desarrolladores:
Cuando desarrollas una integración (aplicación) y necesitas probarla, no tienes que pasar por todo el proceso de autorización de OAuth. En cambio, puedes utilizar tu cuenta de desarrollador con derechos de administrador, copiar las claves desde la ventana modal de la integración instalada y acceder a los datos de la cuenta sin redirección.
Para que la integración tenga acceso a los datos de la cuenta de usuario, necesita ser instalada/habilitada en la cuenta. Una instalación es la conexión entre una integración y la cuenta específica de un usuario.
Cuando un usuario instala una integración en una cuenta, recibirá un identificador temporal llamado código de autorización.
- La integración puede instalarse en más de una cuenta por usuario, y diferentes usuarios pueden instalarla en la misma cuenta utilizando el método del botón en el sitio. En este caso, la integración aparece solo una vez en las integraciones instaladas y se generará un código de autorización diferente.
- Si tu integración tiene su propia autorización (por ejemplo, una clave de API), y deberías monitorear cuidadosamente las instalaciones con los mismos datos de autorización para prevenir duplicaciones o robos de información. El usuario puede encontrar las integraciones instaladas en la sección Ajustes ➡sección de Integración ➡Instalado.
- Los usuarios sin derechos de administrador no pueden instalar una integración, pero pueden autorizar una integración que ya esté instalada.
Para obtener inicialmente un par de tokens de acceso y actualización, necesitas un código de autorización. Este código se puede encontrar en la interfaz o a través de una URI de redirección si la autorización fue iniciada desde una ventana modal de permisos. Este código expira después de 20 minutos. Es importante tener en cuenta que el código no está oculto y puede ser visto en las peticiones al servidor por los usuarios. Por lo tanto, dentro del protocolo OAuth 2.0, debe ser intercambiado por tokens de actualización y acceso utilizando las claves de las aplicaciones que solo tú conoces.
Cuando la integración se instala en una cuenta por diferentes usuarios, habrá múltiples códigos de autorización y tokens de acceso/actualización.
El administrador de la cuenta puede ver una lista de usuarios a quienes se les ha otorgado acceso a la integración en la sección de autorización de la ventana modal del widget. Desde esta sección, el administrador también puede revocar el acceso. Para manejar el evento de desactivación (desinstalación), el desarrollador de la integración puede suscribirse al evento de revocación de acceso en la sección de ajustes de la integración utilizando un webhook.
Este es un string en el estándar JSON Web Token, que se utiliza para que los usuarios identificados puedan acceder a los servicios de Kommo. Es algo así como el equivalente a un ID de sesión. Cada token de acceso tiene:
- ID de usuario: el ID del usuario con el que está vinculado el token.
- ID de la integración: el ID de la integración al que está vinculado el token.
- Conjunto de acciones disponibles en la aplicación.
- ID de cuenta: el ID de la cuenta a la que está vinculado el token.
El token de acceso tiene un tiempo de vida limitado (24 horas) y se puede obtener utilizando un código de autorización o un token de actualización.
Es un string adicional que se emite junto con el token de acceso. Se utiliza para renovar y actualizar el token de acceso cuyo tiempo de vida útil está a punto de expirar. El token de actualización tiene un tiempo de vida útil de 3 meses, y cada vez que se actualiza el token de acceso se genera un nuevo token de actualización. Cada vez que una sesión expira, necesitarás actualizar ambos tokens y no podrás usar la clave anterior.
Si la integración no ha sido utilizada durante tres meses, el token de actualización será revocado. Esto significa que el usuario que había recibido acceso deberá ser autorizado nuevamente.
Echemos un vistazo al proceso completo para obtener acceso a los datos, comenzando con el registro de una nueva integración. Consideraremos trabajar directamente con la API de autorización, pero puedes utilizar bibliotecas predefinidas para simplificar el desarrollo.
Hemos desarrollado la autorización sobre la base del protocolo OAuth 2.0, por lo que puedes encontrar en código abierto muchos ejemplos y documentación que describen la lógica para realizar solicitudes.
Las integraciones se utilizan para permitir que tu aplicación o servicio envíe solicitudes a la API de Kommo.
El primer paso es ir a Ajustes ➡ Integración ➡ Crear Integración
- Para crear una integración, necesitas tener derechos de administrador de cuenta.
- La integración se asignará a esta cuenta. Esto significa que cualquiera de los administradores de esta cuenta podrá gestionar la integración y tendrá acceso a sus claves compartidas. Consideraremos esta cuenta como una cuenta de desarrollador.
- Si estás desarrollando una integración pública, necesitas familiarizarte con los requisitos.
Luego de hacer clic en el botón Crear Integración, aparecerá un formulario que contiene las propiedades de la integración.
Luego de completar el formulario, guarda la integración. Kommo generará y mostrará las claves necesarias en la pestaña de claves y ámbitos. Utilizarás el código de autorización en el proceso de autorización. La Clave secreta y el ID de la integración se utilizarán independientemente de la cuenta en la que se instalarán.
La clave secreta se muestra solo una vez después de ser generada y está oculta por defecto, así que asegúrate de guardarla en tu sistema. Al presionar el botón Generar clave secreta, aparecerá una ventana de advertencia indicando que estás a punto de generar una nueva clave secreta.
Puedes regenerarla en cualquier momento que lo necesites, pero ten en cuenta que se revocará todo acceso que esté utilizando la clave anterior en esa integración.
Una vez que se haya generado la clave secreta, puedes copiarla y guardarla para utilizarla más adelante.
Si estás trabajando con una integración pública, existe la posibilidad de mantener todos los accesos. Al regenerar tu clave secreta, puedes elegir si deseas eliminar las autorizaciones anteriores o no, marcando la casilla correspondiente
Puedes obtener el código de autorización de tres maneras:
- Cópialo desde la ventana modal de la integración instalada. Esto funcionará si solo necesitas integrar una cuenta de Kommo.
- Si tu integración tiene un widget, después de instalarlo se enviará un webhook a la URL de redirección.
- Obtén el código después de que el usuario sea redirigido a la URL de redirección.
Puedes simplificar el desarrollo al obtener una clave a través de parámetros GET con el botón en el sitio de Kommo.
- Genera un enlace para que los usuarios accedan. Necesitas enviar a un usuario a la URL.
-
Ya conoces el
https://www.kommo.com/oauth?client_id={Integration_ID} &state={parameter_of_the_state_that_will_be_sent_to_you_to_Redirect_URl} &mode={popup_or_post_message}
Integration_ID
de la ventana modal en la integración instalada.
El parámetrostate
lo genera tu parámetro string, que podría ser un hash. El parámetrostate
se necesita para que cuando recibas una respuesta de Kommo, puedas verificar su validez comparando el token enviado con el token resultante para asegurarte de que no se produzca una sustitución CSRF.
El parámetromode
es el encargado de procesar las solicitudes a la URL de redirección. En el métodopopup
, la ventana de autorización se cerrará, y la transición a la URI de redirección se realizará en la ventana principal. Si se pasa el valorpost_message
, la redirección ocurrirá en la ventana que fue abierta. Luego de procesar el código de autorización, cierra la ventana.
También puedes mostrar información sobre el estado de la acción en la ventana principal utilizando el método[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
.
Es fundamental que todo el proceso sea transparente para el usuario. Cuando los usuarios hagan clic en el enlace, deben tener en cuenta que la solicitud de permisos se llevará a cabo en su cuenta de Kommo. Además, deben tener en claro qué integración intentan instalar.
- Cuando el usuario haga clic en el enlace, verá el nombre de tu integración y la lista de permisos que requiere.
- Si el usuario no está autorizado, se le pedirá que se autorice en Kommo. De lo contrario, podrán elegir entre las cuentas en las que son administradores. Para integraciones privadas, la lista se limitará a una sola cuenta.
- Luego de seleccionar una cuenta y hacer clic en el botón Permitir, la integración será instalada en la cuenta seleccionada y el usuario será redirigido a una ventana modal o a la ventana principal, dependiendo del parámetro mode. Serán redirigidos a la URL de redirección que indicaste en la etapa de configuración de la integración, con los parámetros GET:
code
,referrer
,state
,from_widget
.
El parámetrocode
contiene el código de autorización, el parámetroreferer
representa la dirección de la cuenta del usuario, y el parámetrostate
es la cadena que pasaste al abrir la ventana. Si no se pasó ninguna cadena, este parámetro no será retornado. Si enviamos un webhook después de instalar el widget, entonces recibirás adicionalmente el parámetro GETfrom_widget
.
{Redirect URl}?code=XXX&state={state}&referer={subdomain}.kommo.com&client_id={Integration Id}
- En caso de que el usuario haga clic en el botón Rechazar, será redirigido a la URL de redirección con el parámetro GET
error=access_denied
, y con el parámetro GETstate
, si se envió anteriormente.
{Redirect URl}?error=access_denied&client_id={Integration Id}&state={state}
Ejemplo de procesamiento de autorización, si se envió el parámetropost_message
Cuando se envíe el parámetro GET con el valorpost_message
ien la ventana para permitir el acceso, la redirección se llevará a cabo en la misma ventana. A continuación, discutiremos ejemplos de interacción entre la ventana modal para permitir el acceso y la ventana principal utilizando la función postMessage.
El código a continuación es de la ventana principal:
var popup;
auth();
// 1. Abre la ventana para otorgar acceso
function auth() {
popup = window.open('https://www.kommo.com/oauth?client_id=XXX&state=XXX&mode=post_message', 'Allow Access', 'scrollbars, status, resizable, width=750, height=580');
}
// 2. Registra un manejador de mensajes de la ventana emergente
window.addEventListener('mensaje', updateAuthInfo);
// 3. La función manejadora registrada arriba
function updateAuthInfo(e) {
if (e.data.error !== undefined) {
console.log('Error - ' + e.data.error)
} else {
console.log('Autorización completada')
}
// 4. Cierra la ventana modal
popup.close();
}
El código a continuación será enviado a la ventana modal desde tu servidor backend cuando el usuario llegue a la URL de redirección.:
<!doctype html>
<html lang="en">
<head>
<title>Postback de OAuth</title>
<script>
//Al pasar datos a la ventana principal, el conjunto de datos es definido por ti
if(window.opener){
window.opener.postMessage({'error': undefined, 'status': 'ok'}, "*");
}
</script>
</head>
</html>
Luego de procesar el código de arriba, la ventana principal indicará el resultado
Recomendamos cerrar la ventana modal automáticamente, como se hizo en el ejemplo, para que los usuarios no se confundan.
Luego de obtener el código de autorización, necesitarás realizar una solicitud a un método POST especial/oauth2/access_token
, como se explica a continuación. Como respuesta, obtendrás un par de tokens de acceso y de actualización, y el tiempo en segundos hasta que los tokens expiren.
El token de acceso es similar a la clave de sesión. Puede ser guardado en la integración y utilizado para solicitudes de API hasta que su tiempo de vida útil expire. El token debe ser accesible solo para tu integración, por eso recomendamos no guardarlo en las cookies del navegador, ni en archivos de configuración abiertos, etc.
Desde la sección anterior, habrás notado que obtenemos un token de actualización junto con un token de acceso. Este es necesario para continuar trabajando con la API, después de que expire el token de acceso.
Un token de actualización tiene dos limitaciones de duración:
- El tiempo de vida útil del token de actualización es de 3 meses. Si una integración no se utiliza en 3 meses y no se realiza una solicitud para actualizar el token, la integración perderá el acceso a los datos y será necesario pedir el permiso del usuario nuevamente.
- Una vez que se utilice el token de actualización para obtener un nuevo par de tokens de acceso y actualización, el token de actualización anterior se vuelve obsoleto. Una vez que obtengas un nuevo token de actualización, necesitarás guardarlo; de lo contrario, tendrás que volver a solicitar acceso al usuario.
Una vez que la fecha de expiración ha pasado, ya no es posible obtener un token de acceso a través del token de actualización. Necesitarás solicitar un método utilizando un token de actualización válido para intercambiarlo. Como resultado, recibirás nuevos tokens de acceso y de actualización.
Al enviar un token de actualización, obtendrás un nuevo par de tokens: de acceso y de actualización, pero el token de actualización anterior aún será funcional y podrás utilizarlo hasta que uses el nuevo.
Consideremos el siguiente escenario:
- Cuando un token de acceso expira, la integración envía el token de actualización para obtener un nuevo token de acceso, y como siempre, Kommo devuelve un nuevo token de actualización junto con él.
- Ocurre un error de red y la integración no obtiene los nuevos tokens de acceso y actualización.
- En este caso, la integración debe enviar el token de actualización antiguo, que aún es válido, para obtener nuevos tokens de acceso y actualización.
Con la ayuda del token de acceso recibido, puedes hacer solicitudes a todos los métodos de la API, para los cuales el token tiene suficientes permisos. El token tiene los derechos del usuario que otorgó el acceso
Tienes la opción de especificar la dirección a la que se enviará la solicitud cuando la integración se desactive.
Una vez que se reciba el hook, podrás desactivar la integración y restringir las solicitudes de la cuenta en la que se llevó a cabo la desactivación.
Sugerimos proporcionar este enlace, ya que te ayudará a evitar solicitudes innecesarias a la API y a hacer un seguimiento de cuándo se desactivó la integración..
Cuando trabajes con la lógica mencionada anteriormente, pueden surgir algunas excepciones que deben ser manejadas. Echemos un vistazo a todas ellas::
- Si el usuario no ha otorgado permiso para acceder a la cuenta, y se utilizó el botónde Kommo, se ejecutará una función que se haya pasado como uno de los parámetros. Si se abrió la página sin haber hecho clic en el botón y el usuario selecciona 'rechazar', se redireccionará a la URL de redirección con el parámetro GET 'error=access_denied'.
- Si el administrador de la cuenta desactiva la instalación de la integración, el token de acceso otorgado será revocado. Cuando realices una solicitud a la API, recibirás un código HTTP 401. Para continuar con el trabajo de la integración, el integrador debe obtener nuevamente la autorización del usuario para su integración.
- Si no guardaste el token de actualización vigente, lo perdiste o han pasado más de 3 meses, para continuar con el trabajo de la integración, necesitarás pasar nuevamente por el proceso de autorización.
- Si perdiste las claves principales de la integración o las publicaste accidentalmente, puedes actualizar la clave secreta en la ventana modal de la integración donde fue creada. Luego de actualizar la clave secreta de la integración, necesitas actualizar la clave secreta en la configuración de tu integración.
- Si ocurrió un error de red durante la recepción de los nuevos tokens de acceso y de actualización, el token de actualización antiguo seguirá funcionando con normalidad. En este caso, la integración debería enviar el token de actualización antiguo, que aún es válido, para obtener nuevos tokens de acceso y de actualización.
