---
title: "Controles de formulario nativos"
source: "https://es-developers.kommo.com/docs/controles-de-formulario-nativos"
date: "2025-06-19"
---

Recuerda que cada control listado aquí es auto-inicializado. Esto significa que para que el control funcione, es suficiente con renderizarlo e insertarlo en el árbol DOM.
Los controles operan según el mecanismo estándar de formularios. Cada control tiene campos de entrada (algunos de los cuales están ocultos) donde almacenan los valores seleccionados. Entonces, para que funcione, debes configurar los parámetros de nombre desde las tablas de Possible Parameters de cada control y luego obtener los valores del formulario serializando $('form').serialize()
.
Para monitorear cambios en JavaScript, debes observar los eventos estándar del navegador (change, input, blur, click) en los inputs con valores, a menos que se especifique lo contrario en la documentación del control.
