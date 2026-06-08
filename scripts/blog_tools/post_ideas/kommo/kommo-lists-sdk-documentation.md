---
title: "Kommo Lists SDK Documentation"
source: "https://developers.kommo.com/docs/lists-sdk"
date: "2026-01-26"
---

Widgets can work in lead, contact and company lists interfaces to perform some mass actions on the items of these lists. Possible values of the locations property in manifest.json :
llist - list of leads
clist - list of contacts/companies
tlist - list of tasks
The list_selected
method is available for these scopes:
this.callbacks = {
...
render: function () {
var selected_data = self.list_selected();
this.render_template({
body: '<div class="widget-body-unique-class-name">' +
'Lead quantity: ' + selected_data.summary.items
'</div>'
});
},
...
}
Selected_data
will store the elements selected by the user, which will contain ID, type of entity the user is in and phone and email data of selected contacts or contacts related to selected leads in the corresponding sections.
NB: the method returns the number of list elements currently visible on the page UI, based on the Show rows setting in the bottom-right corner
The render_template
method is used to render the widget, the parameters of which are described on the Card SDK page. An example of the result of the list_selected
method execution:
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
The system has the ability to replace the standard list item editing card. To do this, you must set the connection area of the widget catalogs in the manifest.json, and then specify the directory id where the custom card will be used instead of the usual one.
In order to specify the directory id, it is necessary to call the widget method setSdkCatalogId
, passing the directory id to the argument until the widget’s settings are saved. You can do this, for example, in the callback onSave
.
Example:
onSave: _.bind(function () {
this.setSdkCatalogId(this.params.catalog_id);
return true;
}, self),
After setting up the settings, when you try to edit the directory element, the callback of the widget loadCatalogElement
will be called. In this case, the standard edit card of the list element won't open, displaying the card must be implemented independently, for example, through the basic modal window component lib/components/base/modal
:
loadCatalogElement: function (catalog_element) {
console.log('Editing a catalog item #' + catalog_element.id);
},
