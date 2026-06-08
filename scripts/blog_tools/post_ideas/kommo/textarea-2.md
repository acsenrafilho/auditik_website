---
title: "Textarea"
source: "https://es-developers.kommo.com/docs/textarea"
date: "2025-06-19"
---

Parámetros que puedes pasar
self.render({ ref: '/tmpl/controls/textarea.twig' }, {
name: 'texto',
class_name: 'my-custom-textarea',
placeholder: 'Ingresar texto...'
});
self.render({ ref: '/tmpl/controls/textarea.twig' }, {
name: 'texto',
class_name: 'my-custom-textarea',
disabled: true,
value: 'Deshabilitado'
});
self.render({ ref: '/tmpl/controls/textarea.twig' }, {
name: 'texto',
class_name: 'my-custom-textarea',
readonly: true,
value: 'Solo puedes leerlo...'
});
