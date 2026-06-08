---
title: "Tema oscuro en Kommo – guía técnica de variables CSS y compatibilidad de UI"
source: "https://es-developers.kommo.com/docs/tema-oscuro"
date: "2026-02-17"
---

Si haces clic en el avatar de tu perfil ubicado en la esquina superior izquierda de la pantalla, aparecerá una opción en la esquina derecha para elegir el tema de la interfaz: claro o oscuro. Puedes seleccionar manualmente un tema o configurar el cambio automático para activar el tema oscuro según la configuración de tu sistema operativo.
El tema oscuro en Kommo permite a los usuarios personalizar la interfaz según sus preferencias. Para asegurar una correcta compatibilidad con el tema oscuro, es esencial utilizar las variables CSS predefinidas y seguir reglas específicas para garantizar la consistencia del diseño.
El tema oscuro en Kommo se basa en el uso de variables declaradas en CSS. Estas variables permiten personalizar los colores y los parámetros de estilo de la interfaz. Para acceder a estas variables, es necesario consultar el diseño en Figma, donde se describirán y demostrarán en detalle.
Aquí utilizamos un campo de entrada como ejemplo.
.input {
color: var(--palette-text-secondary-dark);
border: 1px solid var(--palette-border-default);
background-color: var(--palette-background-primary);
}
Al desarrollar integraciones con el tema oscuro de Kommo, recomendamos seguir las siguientes reglas:
- Utiliza las variables proporcionadas para garantizar la coherencia y evitar conflictos, pero si tienes colores corporativos, puedes utilizar variables personalizadas.
- No sobreescribas las variables predefinidas. Esto ayuda a mantener la coherencia del estilo y evitar incompatibilidades con las actualizaciones del sistema.
- Utiliza las variables solo para los elementos correspondientes (por ej.: las variables de texto deben aplicarse solo a los elementos de texto).
El soporte para los temas oscuro y claro se implementa mediante el atributo data
en la etiqueta HTML [data-color-scheme="dark"]
. El sistema utiliza las variables de color declaradas a través de :root
. Debes crear variables únicas incorporando el código de tu widget en el nombre de la variable.
:root {
--example-code-widget-color-white: #ffffff;
--example-code-widget-color-anti-flash-white: #f2f2f2;
--example-code-widget-color-cultured: #f5f5f5;
--example-code-widget-color-onyx: #363b44;
--example-code-widget-color-dark-gunmetal: #0f2231;
--example-code-widget-color-spanish-gray: #92989b;
--example-code-widget-color-dark-silver: #6b6d72;
}
Al definir variables para el fondo y el texto, utiliza las variables de color existentes. En casos especiales, se acepta utilizar colores sin variables.
:root {
--example-code-widget-text-primary: var( --example-code-widget-color-onyx); /* texto */
--example-code-widget-background-default: var(--example-code-widget-color-cultured); /* fondo */
--example-code-widget-overlay-background-primary-600: rgba(255, 255, 255, 0.6); /* caso especial de fondo */
}
En un tema oscuro, necesitas utilizar el atributo data
.
:root[data-color-scheme="dark"] {
--example-code-widget-text-primary: var(--example-code-widget-color-anti-flash-white); /* texto */
--example-code-widget-background-default: var(--example-code-widget-color-dark-gunmetal); /* fondo */
--example-code-widget-overlay-background-primary-600: rgba(0, 0, 0, 0.6); /* caso especial de fondo */
}
