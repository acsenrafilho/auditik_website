---
title: "Checkboxes desplegables"
source: "https://es-developers.kommo.com/docs/checkboxes-desplegables"
date: "2025-06-19"
---

**Parámetros que puedes pasar**

| Parámetros | Tipo de dato | Descripción |
| --- | --- | --- |
| class\_name | string | Clase contenedora (puedes pasar varias clases separadas por espacios). |
| items | array of objects | Arreglo de elementos de checkbox. |
| disabled | boolean | Se muestra si está deshabilitado. |

**Parámetros de`items`**

| Parámetros | Tipo de dato | Descripción |
| --- | --- | --- |
| id | string | ID de la casilla de verificación que se pasará a `value`. |
| option | string | Texto de checkbox. |
| name | string | Nombre del campo de checkbox. |
| is\_checked | boolean | Se muestra si está verificado. |

## Por defecto

Por defecto

```
self.render({ ref: '/tmpl/controls/checkboxes_dropdown.twig' }, {
items: [
{ id: 1, option: 'Gatos' },
{ id: 2, option: 'Perros' }
]
});
```

## Deshabilitado

Deshabilitado

```
self.render({ ref: '/tmpl/controls/checkboxes_dropdown.twig' }, {
items: [
{ id: 1, option: 'Gatos' },
{ id: 2, option: 'Perros' }
],
disabled: true
});
```

Updated 12 months ago

---

Copy Page
