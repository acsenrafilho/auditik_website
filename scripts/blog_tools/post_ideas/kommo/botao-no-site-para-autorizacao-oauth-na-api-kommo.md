---
title: "Botão no Site para Autorização OAuth na API Kommo"
source: "https://pt-developers.kommo.com/docs/bot%C3%A3o-no-site"
date: "2026-02-19"
---

Para manter a consistência para os usuários ao trabalhar com OAuth 2.0, você pode instalar um botão especial no site.
Ao clicar no botão, o usuário verá uma página com os detalhes da sua integração: ícone, nome e escopo de permissões. Nessa página, o usuário poderá escolher entre as contas nas quais é membro e concordar em autorizar a integração nessa conta.
Se o acesso for concedido, o usuário será redirecionado para a página da URL de Redirecionamento com os parâmetros GET : code
, referer
, state
. Leia mais sobre esse processo no Exemplo Passo a Passo.
Para implementar o botão para uma integração, é necessário colocar um pequeno código JS no local onde você deseja que o botão seja exibido.
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
Para possibilitar o uso do botão sem abrir uma janela modal ou para alterá-lo, você pode estudar o código a seguir:
window.onload = function () {
// Obter todos os scripts com a classe “kommo_oauth” (nossos botões)
var oauth_scripts = document.querySelectorAll(".kommo_oauth"),
// Defina os textos padrão dos botões para diferentes idiomas
default_langs = {
en: "Continue with Kommo",
es: "Continuar con Kommo",
pt: "Continuar com Kommo",
id: "Lanjutkan dengan Kommo",
},
// Defina caminhos para OAuth em diferentes idiomas
locale_paths = {
en: "/oauth/",
es: "/es/oauth/",
pt: "/br/oauth/",
id: "/id/oauth/",
};
// Escutar mensagens do popup de OAuth
window.addEventListener("message", receiveOAuthMessage, false);
window.addEventListener("message", receiveNewLocation, false);
// Itere sobre cada elemento “kommo_oauth”
oauth_scripts.forEach(function (oauth_script) {
// Obtenha os atributos de dados da tag de script
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
// Defina temas e cores do botão
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
// Verifique se os atributos de dados necessários estão presentes
if (
(!client_id || !oauth_script) &&
!(name && description && redirect_uri && secrets_uri && scopes)
) {
console.error("Sem client_id ou client_secret ou tag de script ou metadados");
return;
}
// Aparência e comportamento do botão personalizado
// Criar um elemento de âncora para analisar URLs
var url_parser = document.createElement("a");
// Criar um elemento div para o botão
var button = document.createElement("div");
// Defina a estrutura HTML do botão
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
// Adicione texto ao botão se não estiver no modo compacto (apenas a letra K)
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
// Defina a classe do botão e o HTML interno
button.className = className;
button.dataset.client_id = client_id;
button.innerHTML = button_html.join("");
// Defina os estilos do botão
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
// Insira o botão antes da tag de script
oauth_script.parentNode.insertBefore(button, oauth_script);
// Trate o clique do botão
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
// Adicione o client_id ou outros dados à URL
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
// Abra uma nova janela centralizada para autenticação
centerAuthWindow(url_array.join(""), "Conceder acesso para a integração");
};
// Função para abrir uma nova janela centralizada
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
// Lidar com mensagens da janela OAuth
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
// Bloco vazio para tratamento de erros
}
}
}
});
}
// Tratar a alteração da localização da janela
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
