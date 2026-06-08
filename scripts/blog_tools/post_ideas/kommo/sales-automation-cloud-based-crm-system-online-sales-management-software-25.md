---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/support/crm/salesbot-step-and-action-types"
date: "2020-02-20"
---

Create a powerful, efficient Salesbot with Kommo! Our visual editor makes automation seamless and tailored for any business. Whether you're new to bots or experienced, this guide will walk you through every step.
Never built a bot before? Learn how to create one.
In this guide, you will learn about:
What are Salesbot steps?
Steps are the building blocks of your Salesbot. They guide conversations with leads and automate internal processes. Each step has a specific purpose.
Open the Visual Builder to see the available steps:
Message
The Message step is your main tool for communicating with customers. Use it to send text messages or message templates.
How to use it:
-
Click on Message in the visual builder.
- A message block will appear. Click on the text field to edit the content.
- To add a message template, click on template, and select one from the list of available chat templates.
You can also improve client communication by adding quick reply buttons. These let clients choose from options you set, guiding them through your flow. To add one, click + Quick Reply.
For instance, you can list several options your client might choose from, and the bot will follow the appropriate path based on their choice.
Note: You can add up to 13 buttons, but we recommend adding no more than three buttons to avoid message splitting on some platforms.
You can also add synonym keywords as alternatives to buttons, helping the bot understand client intent even if they type instead of clicking. Just one of those keywords will be enough for the Salesbot to identify the right option.
In the Message step, you can also include a URL button that redirects clients to a webpage. For example, label the button as Visit our website, add the link to your website and when clicked, it will redirect them directly to your homepage.
Once you add at least one button to your message, the system will suggest to add two additional branches:
-
Another answer: If the user replies to a message with buttons by providing a different input (neither clicks a button nor enters a synonym), an alternative branch can be set up.
-
No answer: Click Add next step. A timer will be added as the first step following this one. If the Salesbot does not receive a response within the specified timeframe, an alternative branch can be configured:
You can also attach files to your messages by clicking the attachment icon — perfect for sharing documents like price lists or menus.
Supported file types include:
- Documents
- Images
- Videos
- Audio files
You can send audio files via the following methods:
- As an audio link in the .mp3, .wav formats via the Instagram integration.
- As an audio file in the .mp3 format via the WACA integration.
You can send voice messages with Salesbot using the .ogg format via the Android system. When sending a message in .ogg format via iOS, the file will be delivered as an audio file attachment.
It is possible to send voice messages via the following integrations: Instagram, Facebook, and WACA.
Next, choose the message recipient if there are multiple contacts in a lead card:
-
All contacts - selected channels (default) – Sends the message to all contacts using only the channels you’ve selected.
-
All contacts - primary channel – Sends the message to all contacts, but only via one of the channels.
-
Main contact - selected channel – Sends the message to just the main contact, through the channels you’ve chosen.
-
Main contact - primary channel – Sends the message to the main contact via just one of the channels.
Note: The main contact refers to the primary contact within a lead when multiple contacts are associated. If a lead has only one contact, it is considered equivalent to the main contact. All contacts refers to all contacts linked to a lead when there are multiple.
Select the channel the Salesbot will use by clicking on Channel at the top. By default, it is set to All. Open the dropdown to view all connected channels and choose either all or some of them.
These options give you flexibility in managing communication, allowing you to tailor it to your lead structure and channel preferences. The best part? You don’t need to create separate bots for each channel — you can manage them all with a single bot!
Note: When a message is sent, it first moves to the Sent status. If the message is not delivered, the bot will follow the Failed to send message branch.
If the message successfully reaches the Delivered status, the bot continues along the main branch.
List message (Whatsapp)
This feature allows you to send up to 10 options in a structured list. Clients can easily navigate and choose from the options.You can also add descriptions to each option to provide more detailed information.
How to set it up:
-
Select List Message (WhatsApp) from the visual builder.
- Fill in the following fields:
- Message title (optional)
- Message (required)
- Footer (optional)
- Button name (required)
- Section title (required)
- Option title (required)
- Option description (optional)
-
Add more options and sections by clicking Add option or + Add section: Clicking the Add section button will create a new section that needs to be completed.
Clicking the Add option button will create a new option that needs to be completed.
Condition
This step serves as a filter between Salesbot actions. You can set multiple conditions that a chat message or contact fields must meet before progressing to the next step. This feature is useful when you need to filter out specific types of contacts or guide the Salesbot based on the content of the message.
You can set different conditions within a single step or create multiple conditions for different conversation paths.
This helps you customize the bot’s responses based on what the client says. For example, if a client types “Hello,” the bot can reply with “Welcome to our company.” If they ask for a “catalog,” the bot can send the catalog and say “Here is our catalog.”
You can personalize this step in many ways. Instead of just using the client's message, you can base the condition on things like the Active chat code, Lead source, or other custom fields.
Comment
This step can be used to set up automation for Instagram comments. To get started, make sure to install our Instagram integration.
To learn more about the integration, read our Instagram: How to connect Instagram with Kommo article.
How to set it up:
-
Use a Condition step to trigger a response based on specific keywords in comments. Set it to If Client comment Equals: then type your chosen keyword as the trigger.
-
Add a Comment step to create a public reply that will be posted when the keyword is detected in a comment.
-
When you're ready, hit Save & Continue to finalize the setup.
To learn more about Instagram automation, read our Instagram comments automation: How to set up article.
Pause
The Pause step allows the bot to wait for specific actions before continuing.
How to set it up:
-
Choose Pause from the step list.
By default, the bot will wait until message received. Click on it to edit this step.
The bot can wait until:
-
Message received: the bot will pause its actions until it receives a response from the client.
-
Timer is out: the bot will wait for a specified amount of time before moving on to the next step. The max amount of time you can set it for is 8760 hours, 60 minutes, 60 seconds.
-
Except for duty hours: the bot will pause if the current time is outside of your pre-set working hours.
-
Video is opened or video is closed: the bot will wait until a client opens or closes a video that has been sent to them before continuing. This can be used to ensure that the client has interacted with the video content before proceeding. Please note that both Video is opened or video is closed features are only available in the Live Chat channel.
You can add multiple conditions by clicking + Add next condition. To delete a condition, hover over it and click the three dots, then Delete.
Note: In the scenario shown in the screenshot (with two conditions: Until message received and Timer), the bot will only follow one condition. If Salesbot receives a message before the timer expires, it will proceed with the step after the Until message received condition. If the timer expires first, it will follow the step after the timer condition.
Validation
The validation step checks client messages and directs the bot accordingly.
It validates messages based on various variables, such as:
- equals
- does not equal
- contains
- does not contain
- has a length of; or
- regular expression
Note: When you select the contains option, you'll need to specify whether the content should contain numbers, letters, a phone number, an email, or a numeric range.
Suppose the bot asks a client for their phone number. To make sure the client provides a phone number and not a random text, you can set a validation condition like if client message contains phone number. If a phone number is detected, the bot can proceed with the next steps. You can also add another condition, such as if client message does not include phone number prompting the bot to ask for a correct phone number.
Send internal message
Internal messages are great for sharing information within your company. They are visible only to the selected person or team that it is directed to.
For example, if you are running a catering business and a client wants to discuss options on a call, the bot can send a message to an assistant responsible for handling such matters.
How to set it up:
- Select the Internal message step in the visual builder.
- Enter the text and choose the responsible user or users you want to send this message to once triggered:
Subscribe (Meta)
Meta's 24-hour conversation window limits messaging customers to 24 hours after their last message. This is done to prevent spamming. Opt-in messages address this issue by allowing clients to subscribe to regular newsletters on their chosen topic, helping to keep the conversation going.You can set them up using the Subscribe (Meta) step.
Two fields must be filled in in order for the step to be launched is #add tags and Enter a message title.
All available actions
Salesbot offers a variety of actions to automate workflows and enhance communication. Simply click Action while setting up a step, and you'll see a dropdown menu with the following options. Here's a breakdown of each action:
-
Add note: Add notes directly to a lead's card for better tracking.
To add a note, first, select the type of entity for the note (default: main contact).
Then, enter the note text. Once triggered, the note will appear in the lead's chat.
You can edit the note in the lead card when you click on it. You can attach files or delete it by hovering over the right side of it and clicking Delete.
-
Add task: Assigns tasks to team members. You can set a deadline, choose responsible users, change the task type or leave comments.
For example, when a lead reaches the Decision making stage, you can use this action to streamline follow-up tasks and team coordination. Automatically assign a task to the responsible team member to follow up with the lead. To learn more about working with tasks, read our Tasks article.
-
Change conversation status: Automatically update conversation statuses to closed or answered based on specific triggers.
-
Change lead status: Move leads through your sales pipeline automatically depending on the action you set. All you need to do is choose a pipeline and stage (e.g., Decision-Making), by clicking on the Pipeline button.
For instance, you can set it up so that when clients select a service from quick reply buttons, the bot moves them to the Decision making stage.
-
Change responsible user: Rout clients to the right manager based on their needs. Users can be changed in the following entities: main contact, all contacts, chat contact, lead, and company:
To select the user responsible for handling the lead, click … :
-
Complete task: Automatically mark tasks as completed and update the calendar. You can choose all tasks or a specific one and specify the deadline. Once this step is executed, the task will be finished. A note will appear in the chats with the leads that the tasks were created for.
The task will move from the to-dos column in the Kommo calendar to the completed to-dos one.
-
Generate form: Create a form to collect more information from leads. All data goes into the lead card. Or, you can choose to create a new Lead based on the information from the form. You can also set the pipeline stage or add tags to a leadcard.
To create a form, click on the Create form button, choose form layout, edit fields and design as you want.
You can learn more about editing forms in our Webform by Kommo article.
-
Create Lead: Automatically create new leads with key details.
You can choose what information to include (such as Sale, Tags, Contacts, and Company) and assign it to any user. You can also set the pipeline stage that it will be in. When the user selects an option from the list, this specific information will be copied directly from the lead card the bot is currently handling.
For example, Salesbot can automatically create leads for webinar attendees who request a consultation. It can add details like their name, contact info, and company from the registration form, tag them as “Webinar Attendee,” and assign the lead to the right pipeline stage and sales rep. This saves time and ensures no potential client is missed.
-
Manage subscribers: Add or remove subscribers (e.g., team members) in chats to keep them notified about updates in lead cards.
-
Manage tags: Easily add or delete tags for better organization. You can add/delete tags, and change what entity they will be assigned to/deleted from. When you click #add tags, a list of available tags will appear. Choose the one you need from the list, or create a new tag.
-
Meta Conversions API: Easily track customer actions in Kommo (such as leads and purchases) from your Click-to-Message ads on Instagram, Facebook Messenger, or WhatsApp by syncing them directly with Meta's Events Manager. This integration helps you monitor ad performance, assess campaigns, and refine strategies, providing a comprehensive understanding of your customer journey.
To learn how to set up Meta Conversions API via a Salesbot, read our Meta Conversions API: How to set it up article.
-
Send email: Automate email sending using templates.
First, you will need to connect an email address by clicking connect.
Note: To send emails, you have to create mail templates by going to Mail > Settings > Templates menu.
Emails are sent from the responsible manager's connected email. If unavailable, a shared corporate email will be used.
For more details, see our Triggered emails article.
-
Send webhook: Send data to third-party apps using webhooks. For example, you can use webhooks to change order status from Placed to Canceled in the ERP system. All you need is to enter the webhook URL.
-
Set field: Update custom fields in lead profiles automatically. For example, the bot can automatically fill a custom field when a client provides their email or phone number in the chat.
In order to pick the field you’d like to request the chat user to fill, click … :
Select the type of entity the field will be set for by clicking Chat contact:
Next, choose which field you want to update and the kind of data you require. Depending on your choice of the entity, Salesbot can fill different fields. These are the most popular ones:
- Client message - Receive the last chat message the user sent before this action was triggered.
- Manual input - The Salesbot will reach out to the responsible user in Kommo and ask them to input data manually
Go to another step
The Go to Another Step feature allows the bot to jump directly to a different step in your sequence. It’s designed to make complex flows easier by linking steps together without duplicating them. Just select a step from the list, and the bot will connect them for you.
Note: This option becomes available only after you’ve set up at least one other step in your bot flow.
Use Go to another step to merge several actions into a single path or step, reducing redundancy:
It also allows connecting multiple actions to one step to avoid re-creating the same process repeatedly. For example, if a client hasn’t provided a required phone number, prompt them to enter it and redirect the bot back to a validation step.
Tip: If your Salesbot flow becomes complex, use the map tool at the bottom of the screen to easily navigate between steps. Click any section on the map to jump directly to that part of your bot sequence.
For even smoother navigation, when you jump between steps, a button will appear above the map for a few seconds, allowing you to quickly return to the previous step.
If two steps are too far apart for automatic arrows to connect them, the step will appear as a clickable button:
Clicking this button will also display the Back to... button above the map for easy navigation.
Start bot
Start bot step allows you link an existing bot to your current workflow.
Click Start bot, then choose the bot that you want to include in the process.
You can use these types of bots to build complete sales workflows, automating tasks from start to finish.
For example, before sending out an order, you might want to verify the client’s contact information. If the information is incorrect, you can activate a welcome bot to gather the updated contact details. Once the welcome bot completes its task, the data confirmation bot can pick up where it left off, continuing the workflow seamlessly.
Custom step (Code)
In this step, you can enter your own code for advanced functionality.
Note: The code handlers “” must contain at least one character for the step to be activated. To get a better idea of how to create commands for the Salesbot via coding, please see the Salesbot article in our knowledge base for developers.
Widget
This step has third-party widgets that can be used within the Salesbot. You can add various integrations via this step, such as Stripe, Mailer, and many many others to your flow. They will add extra features to your bot. To add a widget, click the Widget step.
A list of available widgets will appear. Widgets you’ve already installed will show up first. If you want to use another widget, simply click Install.
For example, with the Stripe widget, you can send personalized payment invoices. When you select a widget, a step will appear with the required information to fill in.
They can be added manually or automatically. For detailed instructions on using Stripe with your bot, refer to our Stripe integration article.
Every widget step is unique. To explore what integrations Kommo offers, check out our Apps and integrations page.
Round Robin
The Round Robin feature lets you run steps in a circular sequence, making it easy to distribute actions evenly among your leads. You can choose up to 100 different options, each performing a unique action.
How to set it up:
-
Select Round Robin from the Salesbot menu.
-
Add steps for each option by clicking Add Next Step.
-
Pick an action for each step, such as Message, Task, or any other available action.
Another benefit of this step is that it enables you to conduct A/B testing to determine which messages are the most effective.
For example, if you add three options, the bot will rotate through them like this:
-
The first lead gets Message 1.
-
The second lead gets Message 2.
-
The third lead gets Message 3.
-
The fourth lead circles back to Message 1.
This pattern continues, ensuring messages are distributed evenly among your leads.
While Round Robin is flexible, keep in mind a few limitations and restart conditions:
-
Maximum actions: You can have up to 100 actions, but at least two are required. The block starts with two options, and you cannot delete one until you add a third.
-
Distribution restart: The sequence will reset if you add/edit/delete a new action.
Note: Always remember to save your Salesbot settings after you are done configuring them.
Need more help setting up or troubleshooting? Contact us by sending an email to support@kommo.com or write to us via WhatsApp. You can also hire a Kommo partner to do all the hard work for you.
Not a user yet? Sign up for our free 14-day trial or book a free live demo to see it in action!
