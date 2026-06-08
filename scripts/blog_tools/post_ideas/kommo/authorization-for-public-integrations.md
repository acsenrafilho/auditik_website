---
title: "Authorization for Public Integrations"
source: "https://developers.kommo.com/docs/authorization-public"
date: "2025-06-08"
---

When developing a public integration, with or without a widget, first thing you do is creating an integration. After creating the integration, you need to submit it for moderation so that, if successful, it will be shown in the Marketplace.
Your integration can be authorized in a Kommo account either via a webhook or by using the button on the site, depending on whether a widget is available.
The maximum time allowed for sending a webhook from our side is 3 seconds. We don't check the response code, and resending the webhook is not possible. Please note that virtual clicks on the installation button are not permitted in widgets.
Public integrations with widgets work with Kommo via both API and web SDK. They are displayed in the Marketplace and available for installation directly there.
When installing the widget through the Kommo interface, the user will receive a webhook at the Redirect URI specified in the integration settings, with GET parameters: code
, referer
, and from_widget
.
code
: Represents the Authorization code.referer
: Indicates the address of the user account.from_widget
: Specifies that the request was triggered by widget installation.
Public integrations without widgets work with Kommo only via API. They are displayed in the Marketplace, but in a view-only format.
When the user clicks on the integration icon, they will see a description of the integration, including how it works and how to install it. The user will be instructed to visit an external website provided by the integration and the installation is handled via a button on the site. Clicking the button will open a new page where the user can select their account and provide consent to authorize the integration.
After granting access, the user will be redirected to the Redirect URI with the following GET parameters: code
, referer
, and state
. You can then exchange the received code for an Access token, and the integration will appear in the list of installed integrations.
To pass moderation for such integrations, ensure that the description specifies where users need to go to complete the installation.
If you are developing a public integration without a widget, then before passing moderation, you can use the button on the site method, but in limited mode. In the generated window for granting access, only one account will be available, the one in which the integration was created. After selecting the account, the same user redirection mechanics will work as in public integration.
If you are developing an integration that has both a widget and a backend part that works with our API, you will be able to get a webhook when installing the widget.
