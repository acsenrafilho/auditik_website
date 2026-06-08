---
title: "Checkbox"
source: "https://developers.kommo.com/docs/checkbox"
date: "2025-06-19"
---

Parameters you can pass
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'checkbox',
class_name: 'checkbox-wrapper-classname',
input_class_name: 'checkbox-input-classname'
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'checkbox',
checked: true
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'checkbox',
disabled: true
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'checkbox',
checked: true,
disabled: true
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'checkbox',
text: 'Would you like to sign up for newsletters?',
text_class_name: 'checkbox-text-classname'
});
self.render({ ref: '/tmpl/controls/checkbox.twig' }, {
name: 'checkbox',
text: 'Would you like to sign up for newsletters?',
text_class_name: 'checkbox-text-classname',
small: true
});
