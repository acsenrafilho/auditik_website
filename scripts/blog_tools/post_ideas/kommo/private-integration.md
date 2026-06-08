---
title: "Private integration"
source: "https://developers.kommo.com/docs/private-integration"
date: "2025-06-08"
---

Private integrations are used to make an improvement for only one account or to add a feature that only one company/account needs (for example, a form for a website, integration with the client's unique software, etc.).
☝️
To create an integration, you need to have account administrator rights
Integration will be assigned to this account. This means that any of the administrators of this account will be able to manage the integration and will have access to its shared keys.
The client must understand that integrations have access to account data and to what extent.
Any integration must be registered in an account in order to receive keys for authorization, as there can be no anonymous API calls.
Kommo account
To develop a private integration it will be enough to register an account on our website Kommo.com. You can use a trial account or your own business account.
Now, when you have an account, let’s look at how an integration can affect it!
Instruments
Private integrations can work with the following instruments:
Create a private integration
This integration type can be developed under any kind of account. Feel free to use your business account or a technical account for development (or even a trial one).
👍
Private integrations don’t have to pass moderation!
To create an integration, follow these steps:
Log in as an account administrator.
Go to Settings → Integrations, click the Create integration button and submit the simple form.
If you use a technical account, you should choose Private in order to create a private integration.
Once you've clicked the Create Integration button, you see a form, containing the integration properties.
🚧
If you are going to use a long-lived token, don't type anything in Redirect URL field.
Integration properties
As you noticed, you can upload a widget to the integration. An integration without a widget can be used just to get the keys needed for accessing the API, but the widget is the part that holds the programming details.
Now save the integration. Kommo will generate and show the necessary keys in the Keys and scopes tab. You can use the long-lived token or/and authorization code in the authorization process, Secret key and Integration ID will be used independently of the account in which it will be installed. If you upload a widget, a Widget code will be generated as well.
What’s Next
You can read about Authorization in START BUILDING section.
