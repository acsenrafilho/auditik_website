---
title: "Kommo for developers"
source: "https://developers.kommo.com/docs/kommo-for-developers"
date: "2026-04-14"
---

We aim to offer a wide range of possibilities for integrating with various services and systems. It allows clients and partners to expand Kommo’s functionality for themselves and others.
Developing your own widgets and integrations is not as difficult as it may seem at first glance. To facilitate the task for developers, the Developer Section provides documentation, recipes, and API References.
An integration is an app (with or without a widget) that helps users manage their workflow. A person or a team working on integrations is called an integrator.
To access Kommo user data, developers must create an integration (enter the name and description of the service and give the necessary permissions). Upon creation, Kommo provides the keys required to access our API.
Integrations may include
- a long-lived token that can be used for private integrations only
- a set of secret keys for OAuth2 authorization (client_id, client_secret, authorization_code)
- metadata such as the name, logo, and description. This information is necessary for users to know which service has access to their account and data.
- a widget archive containing JS code executed in the Kommo interface is also included, but not required.
There are two types of integrations that we highlight:
This is the simplest type of integration: an integration provides additional features within a single Kommo account.
For instance, a developer/partner may create a unique feature that only one company/account needs, such as a webform on a website or an integration with unique client software. Integrations of this type do not require moderation and will not be published in the Kommo Marketplace.
Private integrations can include a widget that works only in the account where the integration was created.
If you are developing an integration that could be useful for all Kommo users, you can publish it in Kommo Marketplace. However, integrations of this type must pass the moderation process. It involves testing and auditing the JavaScript code of the widget to ensure the security and quality of the user experience.
As developing such integrations is a complex process, we provide technical accounts for integrators of public integrations where they can communicate with our support and testing team. In the technical account, the integrators can also work with an advanced interface for custom integrations, which includes features like integration versioning and support for multiple languages.
Public integrations can include widgets that work within the Kommo interface. These integrations can be installed on an external website using the Button on the Site.
- Display your layout in allowed system locations such as lead or contact cards, lists, pipelines, dashboard, etc. You can also add an interface for users to interact with the integration
- Affect the display and behavior of standard Kommo interfaces
- Exchange data with external systems by sending requests or with Kommo via the REST API
- Receive data from the page context and JS objects initiated by Kommo
Any user with administrator rights can create private integrations. The integration will be assigned to the account where it was created. This means that any of the administrators of this account will be able to manage the integration and will have access to its shared keys.
If you want to build a public app, you have to request a technical account.
You can:
- Upload from your internal accounting system and display additional information about a contact
- Allow your company’s employees to send a request to the accounting department to form a payment directly from the lead card
- If you are the developer of a third-party service (such as messengers or VoIP), you can give Kommo clients the opportunity to use your service by publishing a public integration and making it more transparent and easy, etc.
In addition to the ability to receive, add, and update data in Kommo using the REST API, we provide an additional set of instruments for creating convenient and easy-to-use integrations.
CRM API is a powerful tool for developers looking to expand the capabilities of Kommo and create innovative solutions that help businesses connect with clients in new and exciting ways. With its functionalities and secure communication, CRM API offers a range of benefits for developers looking to take their software development to the next level.
It is super useful for any integrator who sets a goal to connect a new message source, such as a new messenger. For instance, you can develop your own integration with WhatsApp using the Chats API and distribute it on your own terms. In this case, you will be responsible for transferring messages and controlling the WhatsApp API. To end-users, this will appear as if they send messages directly to the messenger and receive them in Kommo. SalesBot is also compatible with incoming messages from your source.
VoIP API is a set of JavaScript methods and libraries, like call record players, push notifications and others, as well as specific API and usage examples. It is useful for integrators developing integration with telephony services.
Webhooks allow users to subscribe to certain events (such as a contact change or a new task) in Kommo, either manually or via API. When such an event occurs, the corresponding script is launched, and the user receives an entry context for the event. This instrument enables users to track necessary data changes, without depending on recurring synchronization but being based the event model.
WEB SDK allows you to modify Kommo interface by introducing custom scripts and styles or creating widgets.
It is a tool you can use to create custom scenarios for automated operations with users via messengers. You can program Salesbot to execute various actions with leads and contacts, answer in chats automatically, use natural language processing (NLP) to determine user intent, and much more.
We provide a custom SalesBot language and visual editor to create automated scenarios for communicating with users. Additionally, Integrators have the option to embed their integration into the Bot workflow.
It is a powerful automation tool that comes with its own constructor. The constructor enables you to set up automatic system reactions for events such as lead stage changes and website visits. Kommo can react with a wide range of customizable actions, such as setting up a task, adding a contact or sending an email. Additionally, integrators can create their own event handlers and add them to the list of available automatic actions.
