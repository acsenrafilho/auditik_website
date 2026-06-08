---
title: "Estructura del widget Kommo – guía técnica de manifest.json, ubicaciones y arquitectura"
source: "https://es-developers.kommo.com/docs/estructura-del-widget"
date: "2026-02-17"
---

Un widget representa la UI de la integración y puede utilizarse para personalizar y ampliar la funcionalidad de Kommo, como mostrar datos en áreas específicas, interactuar con el usuario o modificar los ajustes por parte de los administradores.
Por su estructura, un widget es un archivo de un conjunto de plantillas de JavaScript, CSS y Twig que se pueden cargar al sistema. Cuando conectamos el widget, sus archivos JS y su diseño se cargarán en el navegador junto con la interfaz de Kommo, permitiendo que el integrador interactúe con el usuario, interactuando con la API de Kommo o la API de su servicio directamente desde la interfaz de Kommo.
Si descomprimes el archivo widget.zip, verás los siguientes archivos:
- Codificación: Todos los archivos deben estar en codificación UTF-8 sin BOM.
- Antes de subir el widget por primera vez, debes actualizar el código y la clave en el archivo manifest.json con los únicos que has generado.
- Generalmente, en un archivo empaquetado, hay una carpeta de widget en el nivel raíz. Sin embargo, los documentos deberían estar directamente en el nivel raíz del documento.
- Si se subió el archivo manifest.json incorrecto, necesitarás generar un código y una clave nuevos, ya que los anteriores dejarán de ser válidos.
