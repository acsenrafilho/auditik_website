---
title: "Structure of widget"
source: "https://developers.kommo.com/docs/structure-widget"
date: "2025-06-08"
---

A widget represents the UI integration and can be used to customize and extend the functionality of Kommo, like displaying data in special areas, interacting with the user, or adjusting settings by administrators.
By structure, a widget is an archive with JavaScript, CSS, and Twig template files that can be loaded into the system. When connecting the widget, its JS files and layout will be loaded into the browser along with the Kommo interface, enabling the integrator to interact with the user, interact with the Kommo API or the API of their service directly from the Kommo interface.
If you unpack the widget.zip, you will see in the following files:
- Encoding: All files must be in UTF-8 encoding without BOM.
- Before uploading the widget for the first time, you should update the code and key in the manifest.json file with the unique ones you have generated.
- Typically, in a packaged archive, there is a widget folder at the root level. However, the files should already be in the root level of the archive.
- If the wrong manifest.json was initially uploaded, you will need to generate a new code and key, as the previous one will no longer be valid.
