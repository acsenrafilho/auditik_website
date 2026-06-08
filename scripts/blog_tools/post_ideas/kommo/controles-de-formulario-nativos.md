---
title: "Controles de formulário nativos"
source: "https://pt-developers.kommo.com/docs/controles-de-formul%C3%A1rio-nativos"
date: "2025-06-19"
---

Lembre-se de que cada controle listado aqui é auto-inicializável. Isso significa que, para que o controle funcione, é suficiente desenhá-lo e inseri-lo na árvore DOM.
Os controles operam com base no mecanismo padrão de formulários. Cada controle possui entradas (algumas das quais são ocultas) onde armazenam os valores selecionados. Portanto, para fazê-los funcionar, você deve configurar os parâmetros de nome a partir das tabelas de Parâmetros Possíveis de cada controle e, em seguida, recuperar os valores do formulário serializando$('form').serialize()
.
Para monitorar mudanças em JavaScript, você deve escutar os eventos padrão do navegador (change, input, blur, click) nos inputs com valores, a menos que especificado de outra forma na documentação do controle.
