---
title: "Textarea"
source: "https://developers.kommo.com/docs/textarea"
date: "2025-06-19"
---

Parameters you can pass
self.render({ ref: '/tmpl/controls/textarea.twig' }, {
name: 'text',
class_name: 'my-custom-textarea',
placeholder: 'Enter text...'
});
self.render({ ref: '/tmpl/controls/textarea.twig' }, {
name: 'text',
class_name: 'my-custom-textarea',
disabled: true,
value: 'Can\'t type'
});
self.render({ ref: '/tmpl/controls/textarea.twig' }, {
name: 'text',
class_name: 'my-custom-textarea',
readonly: true,
value: 'You can only read it...'
});
