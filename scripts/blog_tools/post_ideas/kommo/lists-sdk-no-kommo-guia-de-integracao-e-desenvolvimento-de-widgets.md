---
title: "Lists SDK no Kommo — Guia de Integração e Desenvolvimento de Widgets"
source: "https://pt-developers.kommo.com/docs/lists-sdk"
date: "2026-02-17"
---

Widgets podem funcionar em interfaces de listas de leads, contatos e empresas para executar algumas ações em massa nos itens dessas listas. Valores possíveis da propriedade locations em manifest.json :
llist - lista de leads
clist - lista de contatos/empresas
tlist - lista de tarefas
O método list_selected
está disponível para estes escopos:
this.callbacks = {
...
render: function () {
var selected_data = self.list_selected();
this.render_template({
body: '<div class="widget-body-unique-class-name">' +
'Quantidade de leads: ' + selected_data.summary.items
'</div>'
});
},
...
}
selected_data
armazenará os elementos selecionados pelo utilizador, que conterão o ID, o tipo de entidade à qual o utilizador pertence e os dados de telefone e e-mail dos contactos selecionados ou contactos relacionados com os leads selecionados nas secções correspondentes.
Observação: o método retorna o número de elementos da lista atualmente visíveis na interface do usuário da página, com base na configuração Mostrar linhas no canto inferior direito.
O método render_template
é utilizado para renderizar o widget, cujos parâmetros estão descritos na página do SDK do Cartão. Um exemplo do resultado da execução do método list_selected
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
"phones": ["+140000000"]
}],
"summary": {
"items": 3,
"emails": 0,
"phones": 1
}
}
O sistema tem a capacidade de substituir o cartão de edição padrão do item da lista. Para fazer isso, você deve definir a área de conexão do widget catalogs no manifest.json, e então especificar o id do diretório onde o cartão personalizado será usado no lugar do usual.
Para especificar o id do diretório, é necessário chamar o método do widget setSdkCatalogId
, passando o id do diretório como argumento até que as configurações do widget sejam salvas. Você pode fazer isso, por exemplo, no callback onSave
.
Exemplo:
onSave: _.bind(function () {
this.setSdkCatalogId(this.params.catalog_id);
return true;
}, self),
Após configurar as configurações, quando você tentar editar o elemento do diretório, o callback do widget loadCatalogElement
será chamado. Neste caso, o cartão de edição padrão do elemento da lista não será aberto; a apresentação do cartão deve ser implementada de forma independente, por exemplo, através do componente básico de janela modal lib/components/base/modal
:
loadCatalogElement: function (catalog_element) {
console.log('editando o item de catálogo #' + catalog_element.id);
},
