---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/es/recursos/integraciones/make-antes-integromat-como-se-utiliza"
date: "2022-09-14"
---

Módulo es un nombre general para los pasos de tu escenario. Make tiene cinco tipos de módulos:
- Acciones
- Modulos Disparadores
- Búsquedas
- Agregadores
- Iteradores
Los dos últimos están pensados para escenarios avanzados.
El escenario se compone de una serie de módulos que deciden cómo se transfieren o transforman los datos entre aplicaciones o servicios.
Acciones - son el tipo más común de módulo.
- Un módulo de acción típico devuelve un único paquete que se pasa al siguiente módulo para su procesamiento.
- Los módulos de acción pueden colocarse al principio, en medio o al final de un escenario.
- Los escenarios pueden contener un número ilimitado de módulos de acción.
Por ejemplo, has elegido la acción "Crear un leads" en Kommo. Cuando se crea un escenario con, digamos, Twitter, éste navegará por los posibles leads de acuerdo con los eventos elegidos y los convertirá en leads cards en tu pipeline. Super práctico, ¿no?
Módulos disparadores - inician el proceso cuando se ha producido un cambio en un servicio determinado. El cambio puede ser la creación de un nuevo registro, la eliminación de un registro, la actualización de un registro, etc.
- Cada disparador puede devolver cero, uno o varios paquetes que se pasan al siguiente módulo para su procesamiento.
- Los disparadores sólo pueden colocarse al principio de un escenario.
- Cada escenario sólo puede contener un disparador.
Por ejemplo, puedo elegir el disparador Eventos de vigilancia y marcar "El usuario responsable ha cambiado para el Lead". Una vez cambiado el usuario responsable para un Lead, se lanzará su escenario.
Búsquedas - recupera los datos que coinciden con los parámetros especificados.
- Un módulo de búsqueda típico devuelve cero, uno o más paquetes que se pasan al siguiente módulo para su procesamiento.
- Los módulos de búsqueda pueden colocarse al principio, en medio o al final de un escenario.
- Los escenarios pueden contener un número ilimitado de módulos de búsqueda.
Agregadores - son módulos que acumulan varios paquetes en uno solo.
- Cada agregador devuelve un solo paquete, que pasa al módulo siguiente para su procesamiento.
- Los agregadores sólo pueden colocarse en medio de un escenario.
- Los escenarios pueden contener un número ilimitado de agregadores.
Iteradores - son módulos que dividen matrices en múltiples paquetes separados.
- Cada iterador devuelve uno o más paquetes que se pasan al siguiente módulo para su procesamiento.
- Los iteradores sólo pueden colocarse en medio de un escenario.
- Los escenarios pueden contener un número ilimitado de iteradores.
