---
title: "Checkbox"
source: "https://es-developers.kommo.com/docs/checkbox"
date: "2025-06-19"
---

Parámetros que puedes pasar
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'casilla de verificación',
class_name: 'checkbox-wrapper-classname',
input_class_name: 'checkbox-input-classname'
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'casilla de verificación',
checked: true
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'casilla de verificación',
disabled: true
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'casilla de verificación',
checked: true,
disabled: true
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'casilla de verificación',
text: '¿Te gustaría registrarte para recibir noticias?',
text_class_name: 'checkbox-text-classname'
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'casilla de verificación',
text: '¿Te gustaría registrarte para recibir noticias?',
text_class_name: 'checkbox-text-classname',
small: true
});
