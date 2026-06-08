---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/es/recursos/integraciones/paypal-como-crear-facturas"
date: "2022-10-27"
---

PayPal: Cómo crear facturas
Cómo crear facturas desde la tarjeta del Lead
Cómo crear facturas automáticas con el Salesbot
-
Dirígete a Configuración > Herramientas de comunicación > Salesbot y elige crear un nuevo Salesbot.
En la siguiente ventana de bots prefabricados, desplázate hacia abajo y selecciona la opción “Comenzar desde cero“. A continuación, se te aparecerá la ventana del editor visual, donde podrás ver una serie de pasos. Haz clic en 'Widgets' y elige agregar PayPal.
En la ventana de PayPal, puedes otorgar un descuento, elegir una plantilla de impuestos, cambiar tu entrada legal y/o establecer una fecha de vencimiento para plazos de pago más estrictos. Al activar la opción, puedes optar por calcular la factura por el valor de venta del lead. De lo contrario, el cálculo se realizará de acuerdo con los elementos adjuntos a la tarjeta del Lead.
-
Aquí puedes ver los escenarios de pago de éxito y error. Para el escenario de éxito, agrega un paso de mensaje y usa los marcadores de posición adecuados para enviar el enlace y el monto de la factura al cliente. Por ejemplo, puedes escribir '¡Hola! El monto adeudado [monto de la factura de PayPal] se puede pagar en [enlace de la factura de PayPal]”. Los marcadores de posición se pueden crear poniendo un corchete '[' dentro del texto. Estos extraen automáticamente los datos necesarios y lo ayudan a personalizar sus facturas.Si no agregas este paso, se creará y guardará una factura en la tarjeta del lead, pero el enlace no se enviará al cliente. Así que asegúrate de incluir este paso con el enlace de la factura.
-
Para el escenario de error, puedes agregar una nota eligiendo Añadir siguiente paso > Acción > Agregar nota y escribir, por ejemplo, “El pago no se realizó correctamente“. Esta nota se mostrará dentro de la tarjeta del lead y te advertirá sobre el estado del pago, para que puedas tomar las medidas necesarias. Por último, agrega el paso “Detener bot“ para ambos escenarios y guarda el bot. En la siguiente ventana, configura cuándo y en qué casos debe activarse tu Salebot.
Creación de facturas automáticas en el pipeline digital
Ve a Leads > Configuración y haz clic en el icono del signo más debajo de la etapa en la que quieres aplicar el activador. A continuación, desplázate hasta el widget de PayPal y haz clic en “Añadir“. -
En la ventana del widget, elige la entrada legal, establece la fecha de vencimiento y aplica los impuestos y descuentos si es necesario. La factura se calcula en función de los precios de los productos adjuntos al lead. Si quieres que se calcule en función del precio de venta del lead, activa el interruptor del centro. También puedes optar por enviar el lead a otra etapa del lead cuando el pago se haya completado. Para ello, activa el botón de la parte inferior y elige la línea de producción a la que el lead debe ser movido después del pago.
Cuando todo esté configurado, pulsa “Hecho“.
Para crear un bot, dirígete a Configuración > Herramientas de comunicación > Salesbot y elige crear un nuevo bot. En la siguiente ventana, desplázate hasta el final y elige “Empezar desde cero“. A continuación, elige el paso 'Mensaje' e introduce tu texto con el marcador de posición al enlace del pago. Por ejemplo, puedes escribir “¡Hola! Aquí está el enlace de pago de tu compra [enlace de factura de PayPal]“.
A continuación, añade el paso “Detener el bot“ y pulsa “Guardar“ en la esquina superior derecha. No es necesario que añadas un activador en este momento, así que simplemente haz clic en cancelar cuando aparezca la ventana de activadores de configuración. Vuelve al pipeline digital a través de Leads > Configuración y bajo el cuadro de activación del widget de PayPal, añade el activador de Salesbot haciendo clic en el icono del signo más y elige Salesbot. Para el campo Salesbot, elige el bot que acabas de crear
Por último, haz clic en el campo Ejecutar, ve a “Cuando se mueva a este activador de etapa“, haz clic en “Inmediatamente“ y elige “después de 5 minutos“ para el período de tiempo. Puedes poner cualquier intervalo de tiempo que quieras para esta parte. Esto envía el enlace al usuario después de esta cantidad de tiempo. Ahora haz clic en “Hecho“, guarda los cambios y podrás salir de la línea de producción digital.
