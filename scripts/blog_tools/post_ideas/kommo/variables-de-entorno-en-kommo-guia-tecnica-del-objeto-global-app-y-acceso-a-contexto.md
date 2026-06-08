---
title: "Variables de entorno en Kommo – guía técnica del objeto global APP y acceso a contexto"
source: "https://es-developers.kommo.com/docs/variables-de-entorno"
date: "2026-02-17"
---

Si necesitas interactuar con la cuenta de un cliente, puedes acceder al objeto global APP, el cual proporciona datos relevantes basados en la interfaz de usuario que están utilizando actualmente.
Para explorar las funcionalidades de esta herramienta, puedes abrir la consola e ingresar APP.
APP.getBaseEntity()
El método devolverá un string indicando la entidad en la que te encuentras actualmente (por ej.: leads o contactos).
APP.isCard()
Este método devolverá un valor booleano (true/false
) indicando si te encuentras actualmente en la tarjeta.
APP.getWidgetsArea()
El método devolverá el código de la página actual.
APP.lang_id
La propiedad guarda el código de letras del idioma configurado en el perfil del usuario.
Constantes disponibles
La función está diseñada para recuperar el valor de la constante pasado a la clave.
APP.constant('user')
{
amojo_id: "1111111-2222-3333-4444-55555555555555",
api_key: "",
group_mates_ids: (5) [123456, 234567, 3456789, 4567890, 0987654],
id: 123456,
login: "[email protected]",
name: "Nombre de la compañía",
personal_mobile: "+1234567890",
photo: "/v3/users/some-photo/avatar/?1234567890",
settings:
{layout_width: {…}, feed_filter: null, notify_time_before_task: 300, default_task_preset: '', need_msec: false, …},
sso_auth: false,
theme: 1,
tour: false,
user_rank: "master",
uuid: "55555555-6666-7777-8888-999999999",
[[Prototype]]: Object
}
Por otro lado, si se pasa un valor, establecerá el valor de la constante a ese valor.
- Las integraciones públicas tienen reglas específicas que prohíben reasignar las constantes del sistema.
- Las constantes del sistema que no están incluidas en la lista anterior pueden cambiar o desaparecer.
La parte principal del sistema está implementada en el framework backbone.js . Puedes consultar la documentación del framework para trabajar con variables de entorno.
Si estás trabajando con alguna interfaz del sistema aparte de las tarjetas, puedes acceder al objeto APP.data.current_view object
, que contiene el elemento raíz del DOM de la interfaz actual en la que el usuario está trabajando (APP.data.current_view.$el
).
Si el usuario se encuentra trabajando actualmente con cualquier interfaz de lista, como leads, contactos, empresas o tareas, puedes acceder a la propiedad APP.data.current_list
dentro del objeto APP. Esta propiedad contiene una colección de los elementos actuales de la lista con la información recuperada desde las columnas visibles. Estos datos incluyen las propiedades id
, name
(nombre de la entidad), y checked
(que determina si el elemento en la lista está seleccionado o no).
En caso de que el usuario esté trabajando con alguna tarjeta, puedes acceder a la propiedad APP.data.current_card
. Esta propiedad proporciona acceso a los datos de la tarjeta actual en la que el usuario está trabajando. Al acceder a esta propiedad, es fundamental verificar su existencia, ya que podría ser falsa si el usuario no se encuentra actualmente en ninguna tarjeta. Si accedes directamente a cualquier valor hijo sin verificar la existencia de la propiedad, se podría producir un error.
A través deAPP.data.current_card
puedes obtener los siguientes datos:
-
APP.data.current_card.id
**id** de la tarjeta actual, si la tarjeta es nueva (está siendo creada), su id es 0.
-
APP.data.current_card.model
El modelo [ backbone](https://www.npmjs.com/package/backbone) guarda los datos actuales en el momento de la entrada, lo que significa que, incluso si el usuario ha realizado cambios en un campo pero aún no lo ha guardado, el valor ingresado seguirá siendo accesible a través del modelo.
Cuando Kommo se actualiza, el sistema actualiza automáticamente la página.
Sin embargo, podrían existir situaciones en las que sea necesario detener temporalmente este comportamiento, como durante una llamada telefónica, para evitar interrupciones al usuario. En esos casos, puedes utilizar un método específico para pausar las actualizaciones hasta que la llamada termine, para no molestar al usuario con actualizaciones innecesarias.
El método descrito te permite obtener fácilmente información sobre el estado en línea de los usuarios. El estado puede ser true (si el usuario está en línea) o false (si el usuario está fuera de línea).
APP.sdk.showUserStatus() // objeto con todos los ID de los usuarios y sus estados
// Ejemplo de respuesta:
{
{
id: 123456,
online: true
},
{
id: 123456,
online: false
}, ...
}
Llamar al método sin parámetros devolverá un objeto que contiene los ID de todos los usuarios y sus estados en línea.
APP.sdk.showUserStatus('online')// arreglo con los ID de todos los usuarios en línea
// Ejemplo de respuesta:
[123456, 123457...]
Llamar a este método con el flag "online" mostrará los ID de todos los usuarios en línea.
var id_user = 123456; // ID único de cuenta
var status_user = APP.sdk.showUserStatus(id_user) ; // estado del usuario en línea (true o false)
Para obtener el estado de un usuario específico, puedes llamar al método con el identificador único de la cuenta del usuario. La función devolverá true si el usuario está en línea y false si no lo está.
APP.sdk.showUserStatus(1111111) // objeto con todos los IDs de usuarios y su estado
Es importante tener en cuenta que si se ingresa un ID de usuario incorrecto o se comete un error al escribir la bandera, la función seguirá funcionando y devolverá el objeto con los IDs y los estados en línea de todos los usuarios.
