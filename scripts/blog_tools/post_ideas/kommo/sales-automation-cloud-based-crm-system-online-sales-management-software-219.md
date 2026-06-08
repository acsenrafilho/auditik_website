---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/support/crm/salesbot-triggers"
date: "2023-04-26"
---

A Salesbot trigger is a tool that allows you to customize how Salesbots are activated and respond to specific events. In this article, we'll explore the various types of triggers, their advantages, and practical tips for using them effectively with Kommo. Whether you want to improve lead management, engage customers better, or ensure consistent workflows, mastering Salesbot triggers can significantly boost your sales strategy.
Benefits of Salesbot triggers
Salesbot triggers play a crucial role in enhancing the overall functionality and effectiveness of Kommo. Here are some of their key benefits:
-
Efficiency: Automates repetitive and time-consuming tasks, freeing up valuable time for sales teams.
-
Consistency: Ensures that actions are performed consistently across all leads and deals, following predefined workflows.
-
Timeliness: Enables timely responses to critical events such as new lead creation or customer inquiries.
-
Customization: Allows tailoring of workflows to fit specific business needs and sales strategies, ensuring Kommo supports unique goals effectively.
How to work with Salesbot triggers
To learn how you can set up Salesbot triggers, read the How to set up Salesbot triggers article.
Choosing a trigger
Once you access the triggers set up modal, you can choose the triggers you want to add to the Salesbot. This is done in the When this happens field. By default, it is set to When a conversation is started by an incoming message in any channel trigger.
For more information on the different types of triggers, see the Types of triggers section below.
Adding conditions
You can further customize your Salesbot by adding conditions. Here are the available options:
- Tags
Trigger the bot only for leads with specific tags. To set this up, click on the tags condition. A list of available tags will appear; choose any that apply.
You can set it to work with all selected tags (using “and”) or at least one of the selected tags (using “or”). To change “or” to “and”, simply click on or.
Note: If you select this condition but do not add any tags, then when you try to save the Salesbot, the following notification will appear, prompting you to try again. The Salesbot will not be saved until you finish configuring this condition.
- Lead stage
Choose specific lead stages for the trigger to operate within. Simply click on the field and then mark every stage you need.
Note: It is not necessary to choose any lead stage. If you decide not to, the Salesbot will work for leads in all stages.
- Responsible user
Trigger the bot only for leads managed by a selected Kommo user.
- Sale
Set up triggers based on specific sales criteria, like offering a discount when a sale reaches a certain stage within a specified price range.
For example, if you want to offer a 10 percent discount to clients who have made purchases between $10,000 and $100,000, you can set up the trigger to activate when the sale reaches the Won stage within this price range. This ensures that your Salesbot offers the discount automatically to eligible clients upon successful purchase.
To set up the condition, simply click on it and enter the price range needed.
- Source
Trigger the bot for leads coming from different sources like Instagram or Facebook. Once you click on the condition, a list of available sources will appear. If you have not connected any leads yet, the list will be empty. To learn how to add sources, check out our How to get started article.
- Does not have tags
Exclude leads with specific tags from triggering the bot. To configure it, click on the condition and select the tags you want to exclude. Leads with these tags will not trigger the Salesbot. Similar to the tags condition, you can also choose between (and) and (or) settings:
- and: The trigger will exclude leads that have all the selected tags.
- or: The trigger will exclude leads that have any of the selected tags.
- UTM conditions
Trigger the bot based on UTM parameters, allowing for precise tracking and targeting. You track the source, medium, campaign, term, and content of the traffic coming to your site. Each lead can be assigned unique UTM parameters.
By adding an UTM condition, you can trigger the bot for leads with specific UTM parameters assigned to them. All UTM parameters are available on the list with conditions, simply click on one to add it as a condition.
Once you choose an UTM parameter, you have several options of setting them further. You can set it to either match, does not match, contain, does not contain, empty, not empty.
-
Match triggers the Salesbot when the selected UTM parameter exactly matches a specified value. For example, if you set the UTM source to match “Google”, the trigger will activate only for leads that have “Google” as their UTM source.
-
Does not match triggers the Salesbot when the selected UTM parameter does not exactly match a specified value. Let's assume you set the UTM medium to does not match “CPC”. Now, the trigger will activate for leads whose UTM medium is anything other than “CPC”.
-
Contain triggers the Salesbot when the selected UTM parameter contains a specified substring. If you set the UTM campaign to contain “summer”, the trigger will activate for leads with campaigns like “summer_sale” or “summer2024”.
-
Does not contain triggers the Salesbot when the selected UTM parameter does not contain a specified substring. Let's say you set the UTM content to does not contain “banner”. The trigger will activate for leads whose UTM content does not include the word “banner”.
-
Empty triggers the Salesbot when the selected UTM parameter is empty or not assigned. For example, if you set the UTM term to empty, the trigger will activate for leads that do not have any value assigned to the UTM term parameter.
-
Not empty triggers the Salesbot when the selected UTM parameter is not empty or is assigned any value. If you set the UTM medium to not empty, the trigger will activate for leads that have any value assigned to the UTM medium parameter.
Note: Once you set up any actions, the Salesbot will check for both the requirements from set up triggers and the added conditions. For example, if you set up the Immediately moved to a pipeline stage “Initial contact” trigger, as well as add the tag condition for leads with, say, the New tag (or any other tag you want to add), the Salesbot will only activate for leads with the New tag that have been moved to the Initial contact pipeline stage.
Triggers’ active hours
In the next field you can set a time during which your bot will be active. For example, If you want your bot to be active when you are off work, just enter your schedule and the bot will do the job perfectly well.
Message status
Finally, you can choose Salesbot’s responses to stay marked as unanswered for you in order to easily catch up with the conversation - just keep the toggle on.
Types of triggers
Now, let’s explore the 4 main types of Salesbot triggers:
1. Pipeline triggers
Pipeline triggers activate bots based on the lead stage in your Pipeline. Options include:
-
Immediately (now / after 5 min / after 10 min / after one day / select interval) when created in a pipeline stage – Trigger a bot as soon as a new lead is created in a specific stage or after a specified time interval. For example, you can send a welcome email immediately after a lead is created in the Incoming leads stage.
-
Immediately (now / after 5 min / after 10 min / after one day / select interval) when lead moved to a pipeline stage – Trigger a bot when an existing lead is moved to a different stage, either immediately or after a specified time interval. For example, you can trigger a follow-up task 10 minutes after a lead is moved to the “Qualified” stage.
-
Immediately (now / after 5 min / after 10 min / after one day / select interval) when lead moved or created in a pipeline stage – This versatile trigger activates a bot when a lead is either created in or moved to a specific pipeline stage, with an option to delay the trigger. For example, you can send a pricing guide one day after a lead is either newly created in or moved to the Discussions stage.
Note: These triggers are similar but have key differences in when they activate:
- Immediately when created in a pipeline stage: This trigger activates only when a new lead is created directly in a specific pipeline stage. It does not activate if an existing lead is moved into that stage.
- Immediately moved to a pipeline stage: This trigger activates when an existing lead is moved from one stage to another specific pipeline stage. It does not activate for newly created leads in that stage.
- Immediately moved or created in a pipeline stage: This is a combination of the first two triggers. It activates in both scenarios: when a new lead is created in the specified stage OR when an existing lead is moved into that stage.
-
When the responsible user is changed – Trigger a bot when the responsible user for a lead is changed to a different user. For example, you could use this trigger to send an automated notification to the new responsible user or create a task for the new user to review the lead's information
For more information on creating Salesbots, refer to our article on Creating Salesbots.
Tag triggers
Tag triggers activate bots based on tag actions:
- When a user adds a tag: Trigger the bot when a specific tag is added to an entity (e.g., lead, contact, company).
- When a user removes a tag: Trigger the bot when a specific tag is removed from an entity.
Note: Tag triggers are only available for Enterprise accounts
Here's how they work:
-
First, select the desired tag from the list by clicking on the tag – it will expand a list of tags that you have created before. To learn how to do that, read our Tags article.
- Now, add the tag Y (Offer in the image) to object X (lead in the image), click on object X to reveal a list of potential objects.
Note: Object X can be any entity from Kommo's system, including leads, contacts, and companies. By default, it is set to the first available entity with tags. If an object, for example, a lead card, does not have any tags, the trigger related to tags will not appear in the trigger settings.
The trigger will work as soon as the tag is added to the object. For example, you can add a VIP tag to a lead and trigger the Salesbot to send a personalized welcome message to the lead, offering special privileges or discounts.
Note: Tag triggers only work if users add/remove tags manually, without any automations or APIs.
The installation process for the “When a user removes the tag Y from object X trigger” follows the same steps as above. The trigger will work as soon as the tag is removed from the object.
Limitations
If you perform many tag actions (like adding or deleting), it may overload the system. Here's what you need to know:
- You can only perform up to 25,000 tag actions per hour. If you exceed this limit, all tag triggers will temporarily stop and you will receive a warning.
- Actions will still be saved even if triggers stop.
- Triggers will start working again after about an hour, though it might take a little longer depending on the system.
Field trigger
Field triggers activate bots when specific fields within an entity are updated:
When the entity field is updated: Trigger the bot whenever a specified field’s value is changed, added, or cleared.
Note: This trigger is only available for Enterprise accounts.
Note: By default, entities and fields are set to the first available setting, such as products and price in the image.
This trigger is designed to activate when a specified field's value is modified, enabling you to streamline workflows that rely on real-time data changes. It will work whenever any changes with fields occur, including adding data, changing it, and clearing it.
Note: This trigger will activate whether users set it up manually or use automations and APIs.
For example, if your sales team needs to monitor leads' locations, you can set up this trigger to activate Salesbot whenever the Location field is updated. The Salesbot then can send an internal message to the relevant sales team member, notifying them of the change. This ensures that the sales team member can quickly follow up with the lead, providing timely and region-specific support.
Location field is a custom field that you can set up on your own. To learn more about working with custom fields, check out our guide on Salesbot steps.
Note: This trigger doesn’t work with fields Name and Budget.
To set up the trigger, follow these steps:
- Click on entity. A list of entities will appear.
- Select the type of entity you need.
- Click on the field. A list of available fields will be displayed.
- Choose the required field from the list.
Limitations
If you make any changes to fields (by adding data, editing it, or clearing it), it may overload the system. Here's what you need to know:
- You can only make up to 25,000 changes per hour. If you try to make more than that, your access to field triggers will be restricted for the next hour.
- You will be able to continue making changes to the Salesbot. However, all triggers that use fields will be disabled.
2. Scheduled triggers
Scheduled triggers activate bots at predefined times:
-
0 (select amount of hours) hours before (or after) select field: The trigger activates the Salesbot at a specified time relative to a time set in the custom field (X hours before or after it). For instance, it can be configured to trigger 2 hours before a “Meeting Time” field. If a lead's “Meeting Time” is set to June 1st, 3:00 PM, the trigger will activate on June 1st at 1:00 PM. The Salesbot then will perform the configured action, let's say, sending a reminder message to the responsible user. If the trigger time has passed, the task is still executed if it's within half of the specified trigger time window. This ensures tasks are completed even if slightly delayed.
-
On ‘date’ at ‘time’: This trigger activates the Salesbot on a specific date and time that you set. For example, you could schedule a bot to send out a promotional message on December 31st at 9:00 AM.
-
Daily (Once a week / Once a month / Once a year) at ‘time’: This trigger activates the Salesbot on a recurring basis at a specified time. You can set it to run daily, weekly, monthly, or yearly. For instance, you might set up a bot to send a monthly newsletter on the 1st of each month at 10:00 AM.
Behavior-based triggers
Behavior-based triggers activate bots based on specific actions:
These include:
-
When a form is submitted: Triggers the bot after a form submission.
-
When an email is received: Triggers the bot when an email is received in a specified inbox. For this trigger to work, you must connect an email address. To learn how to do that, read our Mail article.
-
When a call is received: Triggers the bot when an incoming call is detected.
-
Immediately (now / after 5 min / after 10 min / after 1 day / select interval) when selected website visited: Triggers the bot when a user visits a specific webpage, with the option to delay the activation by a set time interval.
Let's imagine you want your clients to get the catalog of your products as soon as they call you. You can choose when a call is received and when someone calls you, they will automatically receive the message with the catalog.
Conversational triggers
Conversational triggers activate bots based on specific chat actions:
-
When a conversation is started by an incoming (outgoing / any) message in any channel (or the channels you select): This trigger activates when a new conversation begins in specified or all channels. You can set it to respond to incoming messages (from customers), outgoing messages (from your team), or any message type. It allows you to automate initial responses or actions as soon as a conversation starts, helping to ensure prompt engagement with customers. Imagine a customer sends a message to your business via Facebook Messenger. The moment the message is received, the Salesbot automatically replies with a personalized greeting, provides information about your services, and asks how it can assist further.
-
On an incoming (outgoing) message in any channel (or the channels you select) (one day (10 min. / 5 min. / Select interval HH.MM) launch cooldown): This trigger activates a Salesbot based on new messages within specified channels. You can set a cooldown period to control how often the Salesbot can be triggered after the initial message. This trigger is particularly useful for managing customer interactions in real-time and ensuring that the bot doesn't overwhelm the customer with too frequent responses. Suppose a customer sends a series of messages in a short span of time on WhatsApp. The Salesbot can be set to respond with a confirmation message but only does so once every 10 minutes, ensuring that the customer doesn’t feel bombarded by automated replies.
-
When any channel (or the channels you select) mentioned in an Instagram story: When a user mentions your business in their Instagram story, the trigger activates, and the Salesbot can perform a predefined action. For example, the bot could automatically send a thank-you message to the person who mentioned you.
-
When an outgoing message is seen in any channel (or the channels you select) 24 h. (10 min / 5 min / Select interval HH.MM): This trigger activates when an outgoing message is viewed by the recipient after a specified time period in chosen channels. You can set the delay to 24 hours, 10 minutes, 5 minutes, or a custom interval. This trigger is valuable for timing follow-up actions based on when a customer has actually seen your message, rather than just when it was sent. For example, twenty-four hours after an important news update is viewed, the Salesbot can send a follow-up message asking if the client has any questions or would like to discuss further.
-
Immediately (5 min / 10 min / One day / Select interval HH.MM) after a conversation is closed any channel (or the channels you select): This trigger activates when a conversation is closed in specified channels. You can set it to trigger immediately upon closure or after a delay (5 minutes, 10 minutes, one day, or a custom interval). It's useful for sending post-conversation surveys, thank you messages, or initiating internal processes after a customer interaction has ended.
-
X hours (enter the time needed) after the last incoming message in any channels (or the channels you select): Once set up, the trigger will activate X hours after the last incoming message in the selected channel(s). This means if a lead sends a message but doesn’t get a reply, Kommo will react automatically after the specified delay. The timer resets every time a new message comes in, so the delay is always counted from the latest message.
Note: You'll only see this trigger in the list once you’ve connected at least one messaging source in the conversational triggers section.
This trigger is great for keeping leads engaged, following up automatically, and making sure no conversations go cold.
Need more help setting up or troubleshooting? Contact us by sending an email to support@kommo.com or write to us via WhatsApp. You can also hire a Kommo partner to do all the hard work for you.
Not a user yet? Sign up for our free 14-day trial or book a free live demo to see it in action!
