---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/support/crm/configuring-the-salesbot-settings"
date: "2022-03-18"
---

If you have not created a Salesbot yet, you should! Check our instructions on how to make one here.
Once your Salesbot is set up, you can further refine it using Salesbot triggers. This article will guide you through the process of setting up Salesbot triggers in Kommo, helping you make the most of this powerful feature.
In this article, you will learn:
What are Salesbot triggers?
Triggers automate actions in Salesbot based on set conditions. Kommo provides many triggers for various actions and events to help automate sales processes.
These triggers are specific conditions or events that activate automated workflows or actions within the CRM system. They help:
- Streamline processes
- Improve efficiency
- Ensure important tasks are carried out automatically
How to access and set triggers
Salesbot is available in all plans. However, the Base plan has a certain limitation: While you can set triggers and configure a Salesbot within the Salesbot Constructor, you cannot launch the bot.
Learn more about Kommo plans.
In Kommo, there are three ways you can access triggers:
-
Navigate to Leads → Automate.
Select the stage for which you want to set up a trigger. Hovering over an empty field in the chosen stage reveals the option + Add trigger. Let's say we chose the initial contact type.
A window will appear where you can choose an automation. Select + Salesbot.
Another window will appear. Click Execute and choose triggers you want set for your Salesbot.
Note: When accessing the Salesbot constructor from Leads, you will see a disabled triggers block, with a hint to return to Automations if you want to manage triggers.
You can learn more about workflow automations in the Digital Pipeline section of our Knowledge base.
-
Open Chats, then click on the Settings icon.
Find the Salesbots section → Click Create a new bot.
-
Triggers are also available directly in the Salesbot visual builder. Open Settings → Communication tools → Find the Salesbots section → Click Create a new bot.
If you've already created a Salesbot and want to edit its triggers without using the Visual Builder, you can hover over the triggers field next to the desired Salesbot. Then, click on the + button that appears, as shown in the following image:
If there are already triggers available in the Salesbot, the + button will appear next to the already existing triggers.
Note: The default position is on the left side of the constructor, but you can change the position of the Trigger block by dragging and dropping it.
This setup enhances usability by allowing you to add new triggers before the bot is built and saved, streamlining the bot creation process. It simplifies bot management by enabling all changes to be made within the bot constructor.
You can easily monitor bot performance and make adjustments without leaving the constructor. This setup also provides a clear view of which triggers have been set up and allows easy access to trigger settings, improving workflow optimization.
-
If you did not set any triggers inside the visual builder, you will see triggers settings window pop up after clicking Save & Continue.
Choose triggers
The next step is to set the triggers you would like in the Execution condition window. There is a number of triggers available, including:
- Pipeline triggers
- Scheduled triggers
- Behavior based triggers
- Conversational triggers
To learn more about each trigger in detail, checkout our Salesbot triggers article.
How to work with triggers
To use triggers effectively, there are a few key points you need to understand.
1. Reaccessing triggers
If you save the bot, close the Salesbot constructor, and then reopen it, you will see a block with triggers which you set earlier.
2. How to save triggers
Once you finish adding triggers, you must click Save & Continue (This button is intended for new bots only. For existing bots, it will be labeled as Save) in the upper right corner of the window to save triggers properly; otherwise, a modal will appear indicating there are unsaved changes.
If multiple triggers are added and one or more fail after you click Done to save changes made to triggers, the rest will not be saved either. To resolve the problem, view triggers, fix the trigger that hasn't been saved, and try saving again. Please note that you will not be able to save the whole bot and exit the Visual builder until all failed triggers are fixed.
3. How to delete a trigger
To delete a trigger, open the trigger needed. Next, click the Delete trigger in the bottom right corner.
This setup makes it easier to add triggers before saving the bot, making the creation process smoother. It allows you to manage everything within the bot constructor, so you can monitor performance and make adjustments without leaving the page. It also gives a clear view of the triggers, improving workflow.
Triggers limitations
There are a few limitations you need to remember in order for work with Salesbot triggers to always go as smoothly as possible.
General limitations
Deactivated Salesbots can still be opened to view triggers, but triggers cannot be added, deleted, or edited. If no triggers are added, the trigger's block will be disabled.
Some bots have pre-set triggers that cannot be modified and are listed in the Triggers block. For example, an NPS-bot has a pre-set trigger labeled Conversation closed.
There is also a pre-set trigger for Salesbots connected to Live Chat. It is called Created in pipeline stage.
You can still experiment with the bot by adding, setting, or deleting triggers after your plan expires, but the system will prevent any changes from saving.
Viewing triggers
If more than 20 triggers are configured, a +n button appears, indicating additional triggers.
Clicking this button opens a dropdown to view all triggers.
Action limitations
A maximum of 500 actions (adding, editing, deleting triggers) can be performed in a single session. Exceeding this limit triggers a notification.
You can save the most recent 500 events, but changes are not permanently saved until the bot is explicitly saved. Reopening the bot starts a new session with a fresh 500-event limit. The 500-event limit is per session, not per bot, and unsaved changes exceeding this limit will be discarded.
If you add a tag trigger but do not specify how it is supposed to work, the trigger will not be configured. If you try to save the bot without finishing configuring, an error will appear.
Need more help setting up or troubleshooting? Contact us by sending an email to support@kommo.com or write to us via WhatsApp. You can also hire a Kommo partner to do all the hard work for you.
Not a user yet? Sign up for our free 14-day trial or book a free live demo to see it in action!
