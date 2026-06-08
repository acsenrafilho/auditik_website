---
title: "Radio button"
source: "https://es-developers.kommo.com/docs/radio-button"
date: "2025-06-19"
---

**Parámetros que puedes pasar**

| Parámetro | Tipo de dato | Descripción |
| --- | --- | --- |
| type | string | Tipo de campo (oculto, texto, etc.). |
| name | string | Nombre del campo que será utilizado en el formulario. |
| value | string | Valor del campo. |
| id | string | ID del campo. |
| label | string | Etiqueta de texto del radio button. |
| class\_name | string | Clase del contenedor (si se pasan varias clases, divídelas con Space). |
| text\_class\_name | string | Clase de la etiqueta de texto (si fue proporcionada). |
| disabled | bool | Muestra si está deshabilitado. |
| selected | bool | Muestra si está seleccionado. |

## Por defecto

Por defecto

```
self.render({ ref: '/tmpl/controls/radio.twig' }, {
name: 'radio',
id: 'mi-radio',
label: 'Valor 1'
});
```

## Seleccionado

Seleccionado

```
self.render({ ref: '/tmpl/controls/radio.twig' }, {
name: 'radio',
label: 'Valor 1',
selected: true
});
```

## Deshabilitado

Deshabilitado

```
self.render({ ref: '/tmpl/controls/radio.twig' }, {
name: 'radio',
label: 'Valor 1',
disabled: true
});
```

Updated 12 months ago

---

Copy Page
