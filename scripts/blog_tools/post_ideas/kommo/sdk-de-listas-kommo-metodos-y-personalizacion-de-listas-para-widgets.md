---
title: "SDK de listas Kommo – métodos y personalización de listas para widgets"
source: "https://es-developers.kommo.com/docs/listas-sdk"
date: "2026-02-10"
---

Los widgets pueden funcionar en las interfaces de listas de leads, contactos y compañías para realizar acciones masivas sobre los elementos de estas listas. Valores posibles de la propiedad locations en manifest.json :
llist - lista de leads
clist - lista de contactos/compañías
tlist - lista de tareas
El método list_selected
está disponible para estos ámbitos:
this.callbacks = {
// ...
render: function () {
const selected_data = self.list_selected();
this.render_template({
body: `
<div class="widget-body-unique-class-name">
Leads quantity: ${selected_data.summary.items}
</div>
`
});
},
// ...
};
this.callbacks = {
...
render: function () {
var selected_data = self.list_selected();
this.render_template({
body: '<div class="widget-body-unique-class-name">' +
'Cantidad de leads: ' + selected_data.summary.items
'</div>'
});
},
...
}
Selected_data
almacenará los elementos seleccionados por el usuario, que incluirán el ID, el tipo de entidad en la que se encuentra el usuario y los datos de teléfono y correo de los contactos seleccionados o de los contactos relacionados con los leads seleccionados en las secciones correspondientes.
Nota: el método devuelve la cantidad de elementos de lista actualmente visibles en la interfaz de usuario de la página, según la configuración Mostrar filas en la esquina inferior derecha
El método render_template
se utiliza para renderizar el widget, cuyos parámetros están descritos en la página del SDK de tarjetas. Ejemplo del resultado de la ejecución del método list_selected
:
{
"selected": [{
"id": 33378970,
"type": "lead",
"emails": [],
"phones": []
}, {
"id": 33363766,
"type": "lead",
"emails": [],
"phones": []
}, {
"id": 33363366,
"type": "lead",
"emails": [],
"phones": ["+9963 715-34-37"]
}],
"summary": {
"items": 3,
"emails": 0,
"phones": 1
}
}
El sistema es capaz de reemplazar la tarjeta estándar de edición de elementos de lista. Para hacerlo, debes configurar el área de conexión del catálogo del widget en el archivo manifest.json y luego especificar el ID del directorio donde se utilizará la tarjeta personalizada en lugar de la habitual.
Para especificar el ID del directorio, es necesario llamar al método del widget setSdkCatalogId
, pasando el ID del directorio como argumento hasta que se guarden las configuraciones del widget. Puedes hacer esto, por ejemplo, en el callback onSave
.
Por ejemplo:
onSave: _.bind(function () {
this.setSdkCatalogId(this.params.catalog_id);
return true;
}, self),
Después de configurar los ajustes, cuando intentes editar el elemento del directorio, se llamará al callback del widget loadCatalogElement
. En este caso, la tarjeta de edición estándar del elemento de lista no se abrirá, la visualización de la tarjeta debe implementarse de forma independiente, por ejemplo, a través del componente de ventana modal básico lib/components/base/modal
:
loadCatalogElement: function (catalog_element) {
console.log('Edición de un elemento del catálogo' + catalog_element.id);
},
