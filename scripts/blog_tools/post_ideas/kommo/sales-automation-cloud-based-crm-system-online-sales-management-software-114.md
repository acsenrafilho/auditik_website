---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/es/recursos/crm/importacion-avanzada"
date: "2022-09-26"
---

Importación – Avanzada
Tipos de campos durante la importación
-
Campos de tipo fecha: Para importar cualquier campo de tipo fecha, deberá utilizar el siguiente formato de fecha: DD.MM.AAAA o MM.DD.AAAA. De lo contrario, no se importará. Si deseas importar cualquier fecha, el archivo debe estar en formato .csv. -
Fecha de creación: Si la fecha de creación no se indica en el archivo, será la fecha de la importación. -
Fecha de nacimiento: Si el formato de la fecha es incorrecto, el campo de cumpleaños contendrá la siguiente fecha: 01.01.1970 -
Campos de tipo de selección: Todas las opciones de selección distinguen entre mayúsculas y minúsculas y deben escribirse correctamente, de lo contrario, se creará una nueva opción. Para evitarlo, puedes desmarcar la patilla “Añadir automáticamente elementos a la lista“. -
Multiselección: Si necesita importar un par de opciones al mismo tiempo, sepárelas con comas: opción1, opción2, opción3. -
Botón de radio: Si la opción no está en el archivo, se elegirá por defecto la primera opción del campo. -
Casilla de verificación: Para que la casilla esté marcada, introduce el valor “Sí“ en la celda. Si no necesita que se marque la casilla, entonces deja esta celda vacía. -
Campo de tipo numérico: Para este tipo de campos (incluyendo Venta) el valor debe ser un número entero. -
Dirección: Sólo puede haber un campo de tipo dirección. Para importar este tipo de archivo, divide el valor en las siguientes columnas: País, Región, Ciudad, Código postal, Dirección.
Importación de datos en diferentes pipelines y etapas
Los nombres deben escribirse de forma idéntica al nombre del pipeline/etapa en Kommo. El nombre del “pipeline“ no distingue entre mayúsculas y minúsculas, pero si lo escribes mal, los leads subidos irán a la primera etapa del primer pipeline. El nombre del “estado del lead“ sólo acepta el formato de “primera palabra en mayúsculas“. Por ejemplo, “Oferta realizada“ o “Contacto inicial“. Si añades sólo las columnas de 'Estado del lead', los leads se importarán al primer pipeline.
¿Cómo trata Kommo los duplicados durante la importación?
Si dos líneas de tu archivo son absolutamente idénticas, Kommo sólo importará una línea. Si dos títulos de leads diferentes tienen el mismo contacto y nombre de empresa, se importarán dos leads distintos con el mismo contacto y empresa adjuntos. Los contactos con una empresa y un lead diferentes se cuentan como contactos diferentes. Si dos leads tienen el mismo nombre de contacto y ninguna empresa, se importarán dos leads diferentes con el mismo contacto: Si los contactos y los leads son los mismos y las empresas son diferentes, entonces no se fusionará nada.
