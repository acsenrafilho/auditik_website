---
title: "Button on Site"
source: "https://developers.kommo.com/docs/button-on-site"
date: "2025-06-08"
---

To maintain consistency for users when working with OAuth 2.0, you can install a special button on the site.
When clicking on the button, the user will see a page with the details of your integration: icon, name, and permission scope. In this page, the user gets to choose between the accounts where they are a member, and agree to authorize the integration in that account.
If access is granted, the user will be redirected to the Redirect URL page with the GET parameters: code
, referer
, state
. Read more about this process in the Step-by-step Example guide.
To implement the button for an integration, you need to place a small JS code in the place where you want this button to be shown.
<script
class="kommo_oauth"
charset="utf-8"
data-client-id="xxxx"
data-title="Button"
data-compact="false"
data-class-name="className"
data-theme="light"
data-locale="en"
data-state="state"
data-error-callback="functionName"
data-mode="popup"
src="https://www.kommo.com/auth/button.js"
></script>
To make it possible to use the button without opening a modal window, or to change it, you can study the code:
window.onload = function () {
// Get all scripts with class "kommo_oauth" (our buttons)
var oauth_scripts = document.querySelectorAll(".kommo_oauth"),
// Define default button texts for different languages
default_langs = {
en: "Continue with Kommo",
es: "Continuar con Kommo",
pt: "Continuar com Kommo",
id: "Lanjutkan dengan Kommo",
},
// Define paths for OAuth for different languages
locale_paths = {
en: "/oauth/",
es: "/es/oauth/",
pt: "/br/oauth/",
id: "/id/oauth/",
};
// Listen for messages from OAuth popup
window.addEventListener("message", receiveOAuthMessage, false);
window.addEventListener("message", receiveNewLocation, false);
// Iterate over each "kommo_oauth" element
oauth_scripts.forEach(function (oauth_script) {
// Get data attributes from the script tag
var client_id = oauth_script.dataset.clientId,
state =
oauth_script.dataset.state || Math.random().toString(36).substring(2),
locale = oauth_script.dataset.locale || "en",
compact = oauth_script.dataset.compact === "true" || false,
title =
oauth_script.dataset.title || default_langs[locale] || default_langs.en,
mode = oauth_script.dataset.mode || "popup",
name = oauth_script.dataset.name || null,
description = oauth_script.dataset.description || null,
logo = oauth_script.dataset.logo || null,
redirect_uri = oauth_script.dataset.redirect_uri || null,
secrets_uri = oauth_script.dataset.secrets_uri || null,
scopes = oauth_script.dataset.scopes || null,
origin = window.location.href || null,
final_scopes,
// Define button themes and colors
themes = {
light: "light",
dark: "dark",
},
colors_map = {
light: "#ffffff",
dark: "#0e0142",
},
background_colors_map = {
light: "#0e0142",
dark: "#ffffff",
},
border_colors_map = {
light: "#0e0142",
dark: "#ffffff",
},
theme = themes[oauth_script.dataset.theme] || themes.light,
className = oauth_script.dataset.className || "kommo-oauth";
// Check if required data attributes are present
if (
(!client_id || !oauth_script) &&
!(name && description && redirect_uri && secrets_uri && scopes)
) {
console.error("No client_id or client_secret or script tag or metadata");
return;
}
//Custom button's appearance and behavior
// Create an anchor element to parse URLs
var url_parser = document.createElement("a");
// Create a div element for the button
var button = document.createElement("div");
// Define the HTML structure of the button
var button_html = [
'<div style="display: flex; justify-content: center; align-items: center; width: 38px; height: 38px; background: ' +
colors_map[theme] +
'; border-radius: 4px">',
'<svg width="20" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 22">',
'<path d="M19.6 21.8h-4a5 5 0 0 1-3.8-2L9.2 16l-2-2.9a.8.8 0 0 0-1.3.5v6.9a1.2 1.2 0 0 1-1.2 1.2H1.2A1.2 1.2 0 0 1 0 20.6v-5.2a4.6 4.6 0 0 1 4.6-4.6h1l.3-.2 3.3-4.8 2.5-3.6a5 5 0 0 1 3.8-2h4a.4.4 0 0 1 .3.6L14 9.3a3 3 0 0 0 0 3.2l6 8.7a.4.4 0 0 1-.3.6" fill="' +
background_colors_map[theme] +
'"/>',
"</svg>",
"</div>",
];
// Add text to the button if it's not in compact mode (just letter K)
if (!compact) {
var text_style = [
"display: inline-block",
"padding-left: 6px",
"padding-right: 8px",
"color: " + colors_map[theme],
"font-family: Roboto,Helvetica,Arial,sans-serif",
"font-weight: 700",
"font-size: 16px",
"line-height: 120%",
"text-align: center",
"letter-spacing: 0.5px",
"-webkit-font-smoothing: antialiased",
"text-rendering: optimizeLegibility",
].join(";");
button_html.push([
"<span style='" + text_style + "'>" + title + "</span>",
]);
}
// Set the button's class and inner HTML
button.className = className;
button.dataset.client_id = client_id;
button.innerHTML = button_html.join("");
// Set the button's styles
button.style = [
"box-sizing: border-box",
"display: inline-flex",
"align-items: center",
"background: " + background_colors_map[theme],
"color: " + colors_map[theme],
"border: 2px solid " + border_colors_map[theme],
"border-radius: 4px",
"cursor: pointer",
"height: 42px;",
].join(";");
// Insert the button before the script tag
oauth_script.parentNode.insertBefore(button, oauth_script);
// Handle button click
button.onclick = function () {
var url_array = [
"https://www.kommo.com",
locale_paths[locale] || locale_paths.en,
"?state=",
state,
"&mode=",
mode,
"&origin=",
origin,
];
// Add client_id or other data to the URL
if (client_id) {
url_array.push("&client_id=", client_id);
} else if (name && description && redirect_uri && secrets_uri && scopes) {
url_array.push("&name=", name);
url_array.push("&description=", description);
url_array.push("&redirect_uri=", redirect_uri);
url_array.push("&secrets_uri=", secrets_uri);
url_array.push("&logo=", logo);
final_scopes = scopes.split(",");
final_scopes.forEach(function (scope) {
url_array.push("&scopes[]=", scope);
});
}
// Open a new centered window for authentication
centerAuthWindow(url_array.join(""), "Grant access for integration");
};
// Function to open a new centered window
var centerAuthWindow = function (url, title) {
var w = 1024;
var h = 620;
var dual_screen_left =
window.screenLeft !== undefined ? window.screenLeft : screen.left;
var dual_screen_top =
window.screenTop !== undefined ? window.screenTop : screen.top;
var width = window.innerWidth
? window.innerWidth
: document.documentElement.clientWidth
? document.documentElement.clientWidth
: screen.width;
var height = window.innerHeight
? window.innerHeight
: document.documentElement.clientHeight
? document.documentElement.clientHeight
: screen.height;
var left = width / 2 - w / 2 + dual_screen_left;
var top = height / 2 - h / 2 + dual_screen_top;
var new_window = window.open(
url,
title,
"scrollbars, status, resizable, width=" +
w +
", height=" +
h +
", top=" +
top +
", left=" +
left
);
if (window.focus) {
new_window.focus();
}
};
});
};
// Handle messages from OAuth window
function receiveOAuthMessage(event) {
var oauth_scripts = document.querySelectorAll(".kommo_oauth");
oauth_scripts.forEach(function (oauth_script) {
if (
event.data.client_id &&
oauth_script.dataset.clientId &&
event.data.client_id === oauth_script.dataset.clientId
) {
oauth_script.dataset.error = event.data.error;
if (oauth_script.dataset.errorCallback) {
try {
var errorCallback = eval(oauth_script.dataset.errorCallback);
if (typeof errorCallback === "function") {
errorCallback(event.data);
}
} catch (e) {
// Empty block for error handling
}
}
}
});
}
// Handle changing the window location
function receiveNewLocation(event) {
if (event.data.url) {
window.location = event.data.url;
}
}
//Use:
//<script
// class="kommo_oauth"
// charset="utf-8"
// data-client-id="xxxx"
// data-title="Button"
// data-compact="false"
// data-class-name="className"
// data-theme="light"
// data-locale="es"
// data-state="state"
// data-error-callback="functionName"
// data-mode="popup"
// src="https://www.kommo.com/auth/button.js"
// ></script>
//
//<script
// class="kommo_oauth"
// charset="utf-8"
// data-name="Integration name"
// data-description="Integration description"
// data-redirect_uri="https://example.com"
// data-secrets_uri="https://example.com/secrets"
// data-logo="https://example.com/kommo_logo.png"
// data-scopes="crm,notifications"
// data-title="Button"
// data-compact="false"
// data-class-name="className"
// data-theme="light"
// data-locale="en"
// data-state="state"
// data-mode="post_message"
// src="https://www.kommo.com/auth/button.js"
// ></script>
