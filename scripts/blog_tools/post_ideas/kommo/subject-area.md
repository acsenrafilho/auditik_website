---
title: "Subject area"
source: "https://developers.kommo.com/docs/subject-area"
date: "2025-12-16"
---

For the developer, the Kommo system is a relational database. The system has basic and auxiliary entities, essentially data tables, which can be linked to each other. Access to them is available through the API.
To access system data, whether through interfaces or the API, authorization is required. All API interactions are based on the access rights of the authorized user associated with the account. API methods can only be invoked after successful authorization.
You can retrieve essential details about the account via the API, including:
- Account name
- Subscription period
- Account users and their permissions
- Custom field directories for contacts and leads
- Lead stage directory
- Note type directory
- Task type reference
Contacts consists of a predefined set of fields, along with custom fields that can be created by an account administrator.
Each contact can be linked to zero, one, or multiple leads.
A contact can only be associated with a single company.
The contact’s email and phone number serve as unique identifiers, used in conjunction with other systems. For instance, the contact’s phone number and email address are used to track call history and email correspondence.
Additionally, each contact can be assigned a responsible user, which helps manage access rights for different account users.
A lead consists of a predefined set of fields, along with custom fields that can be created by the account administrator either through the interface or via the API.
Each lead can be:
- Linked to zero, one, or multiple contacts
- Linked to only one company
- Assigned a responsible user to manage access rights between account users
The lead has a stage, which indicates the position of the lead in the pipeline. Each lead must be assigned a stage.
The list of stages can be customized within the account, with the exception of the three system stages:Incoming leads, Closed – Won, and Closed – Lost. The only customization available for system stages is the ability to rename them.
An Incoming Lead has additional functionality and can originate from various sources. It may not have a responsible user assigned and contains additional metadata (such as the type of Incoming Lead and other properties).
Leads in the Incoming Leads stage typically come from integrations such as email, telephony, or website forms. These leads are initially unprocessed and not yet associated with a contact or company. The user can either accept an incoming lead, in which case the lead, contact, and company (if relevant data is available) will be created, or reject the lead.
A сompany is similar to a сontact and consists of a predefined set of fields, along with custom fields that can be created by the account administrator.
Each company may:
- Be linked to zero, one, or multiple leads
- Have a responsible user to manage access rights for account users
Both email and phone number are used as identifiers.
A task is one of the core entities of the system because it helps users keep track of clients and ensures nothing is forgotten.
A task must be assigned a responsible user and have a deadline (which includes a date and exact time). A task can be associated with a lead, contact, or exist independently without being linked to any object.
When a task is completed, you can set the result using notes.
Notes provide the ability to add additional structured or unstructured information to a contact, company, or a lead.
Notes can be either system-generated (e.g., calls, SMS messages, etc.) or user-created (e.g., comments, files). They are displayed alongside tasks in the entity’s record.
Notes can trigger events, and events can also be created as a result of user actions or automation (such as a change in the responsible user of an entity).
Often, events and notes are created by integrations to add extra information to an entity or when data changes.
Custom fields allow you to add additional information to entities and can be created or deleted individually.
Calls allow you to add information to a contact or company. Call events are displayed in the entity’s record alongside tasks. If the call event includes a link to the call recording, a player will be embedded in the note, allowing users to play the recording directly.
In Kommo, each account can set up notifications to an external web server for various events. Webhooks can be used to update lead information in your store, send SMS notifications, or automate lead processing. Each webhook can be configured to trigger specific actions based on particular events. The account administrator can set up and manage webhooks from theSettings → Integrations page.
Sales stages represent the sequence of steps a lead goes through in the sales pipeline before making a purchase.
In Kommo, you can create up to 10 pipelines per account, each with custom stages to track the lead's progress. Each pipeline can contain up to 100 stages (including both Won and Lost stages). Only the account administrator can configure sales pipelines and stages by navigating to Leads→Setup.
A Digital Pipeline allows you to automate actions and move leads through different stages based on specific events. The account administrator can configure theDigital Pipeline by navigating to Leads → Setup.
A widget is a collection of files that can be connected to any account that has enabled the widget. The widget provides several features:
- Display additional data in the Kommo interfaces.
- Interact with users and the data they enter. JavaScript can be integrated into almost any part of the system interface. For example, you could show a pop-up when a call is received.
- Custom settings for your service. Administrators can enter unique configuration details, such as API keys, to customize the widget.
Widgets can be set up by account administrators via the Settings → Integrations page.
Lists refer to collections of contacts and companies. This section allows you to create custom lists and directories, which can then be used within lead profiles.
In Kommo, a source refers to an integration or service that can add leads within an account.
The source is displayed in the lead’s Statistics section, can be used for filtering, and appears in the widget on the dashboard. It helps determine which pipeline the lead will be created in and is also used for chat functionality.
A source can be either an integration or an Kommo service, such as forms.
Sources have a hierarchy and can be multiple. For example, there may be several connected files from Google Sheets or multiple WhatsApp numbers.
Sources with which the user can interact are displayed on the left side of the Digital Pipeline section.
