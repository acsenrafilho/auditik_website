---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/support/integrations/goto-connect"
date: "2022-07-26"
---

GoTo Connect is a cloud phone system that allows online communication for your team and clients. Integrating it with Kommo means you can make calls with a click from lead cards. Calls will be recorded inside cards so you can easily listen to or download conversations. You can also call customers by clicking numbers in cards.
In this article, you will be learning:
How to set up GoTo Connect integration
Note: Only Super Admins of GoTo account can authorize the integration settings. You need to have full access to a GoTo Connect system, including permissions, reporting, billing, and Contact Center.
Installing the widget can be a little tricky. Make sure to have both your Kommo and GoTo Connect accounts open.
-
First, head over to the Settings > Integrations inside your Kommo account and choose the GoTo Connect widget in the Calling section.
-
Accept the privacy policy and click install.
- Next, follow the instructions in the widget to open GoTo Connect and sign in to your account.
-
Follow this link to create a new client by clicking on the Create a new client button. This will help you make a new connection with Kommo.
- On the next page in GoTo Connect, pick a client name and paste the URL that Kommo gave you in the GoTo Connect widget.
-
Then, you can click Next in both Kommo and GoTo Connect accounts.
-
In the Scopes step at GoTo Connect, select the ‘Admin center’ and ‘GoTo Connect’ boxes from the options provided.
-
Finally, when you hit save, you will go to the Credentials step and GoTo Connect will provide you a ‘Client ID’ and ‘Client secret’. Client secret is a sort of a password that helps keep your connection secure. Write them down, because you won’t be able to access it again later, check the “I have stored the client secret” box, then click Done. With this, a new client in GoTo Connect is created.
Note: Your ‘Client secret’ will only be generated once. If you don’t manage to copy it, you’ll have to start over.
-
You have to paste the codes you just copied into corresponding fields of the widget in Kommo. When you are done pasting the codes, click Next.
-
Now, you will have to grant permission to your Kommo account by following the link in the widget and clicking Allow. After that, go back to your Kommo account.
How to set up call recordings
Now that you successfully connected your GoTo Connect account with Kommo, it’s time to ensure that your call recordings will be properly received through the integration in call logs, so you can always listen to them again when you need. Note: Only super admins can allow phone recordings.
On your GoTo account settings page, you need to enable three specific settings for call recordings:
-
Record incoming calls: that allows you to record calls you receive.
-
Record outgoing calls: that allows you to record calls you make.
-
API access: necessary to enable call recordings in APIs.
The first two settings will automatically apply to all created phone extensions, so there’s no need to enable them individually for each extension—they will be enabled globally.
Note: Phone extensions are like direct lines within a larger phone system. In GoTo Connect, you can use extensions to help with call management. This includes adding dial plans, lines, ring groups, virtual faxes, shared voicemail boxes, conference bridges, and more. This makes it easier to manage and organize calls within your organization.
-
To set up your call recording settings, first head to your GoTo Connect account and go to Admin Center.
-
Go to Settings > Phones > Recording > and enable Record incoming calls and Record outgoing calls.
Note: Recordings saved on the GoTo side before enabling the “API Access” setting will remain unavailable in the integration for listening and downloading, even after synchronizing such calls.
Phone number settings
Make sure that the call recording settings are also enabled in the specific phone number settings.To do this:
-
Navigate to Phone system > Phone numbers > Settings > Recording > and enable Recording incoming calls and Recording outgoing calls.
Extension settings
If global call recording settings are disabled and users need to configure call recordings for specific extensions, make sure to turn it on in the settings for each phone line that needs it.
Note: If the settings for call recordings are turned off, you won’t get “call-report-event” messages from GoTo. This means call logs won’t show up right after the calls end. Instead, they will only appear after the system updates them, and there won’t be any recordings saved. Also, if call recording is turned off, the call will show up as a note in the lead card after the system updates. This note will just say that a call happened, but it won’t have a recording, just a message saying there was a call.
How to grant recording permissions
To make sure your calls are recorded in Kommo, enable recording calls in your GoTo Connect account.
Note: Recording calls feature is not available for trial accounts. If you are using the trial version of GoTo Connect, you won’t be able to record your calls in Kommo either.
To grant permission to record calls, go to your GoTo Connect account, and click Go to the Admin Center.
In the Admin center, head over to Phone system > Phone numbers and choose the number that you are planning to use.
Next, select the Settings > Recording. There, you will be able to enable recording for incoming and/or outgoing calls.
How to add GoTo Connect users to Kommo
Once you finish connecting your GoTo Connect and Kommo accounts together, you will find the last stage where you need to match your Kommo and GoTo Connect users so they can make and receive calls using their assigned phone numbers.
Adding multiple GoTo Connect users to your integration is simple. But before you begin, ensure you meet the following requirements:
- You must have access to the Kommo account with permissions to create and view leads, contacts, and companies.
- You must be an ‘admin’ or ‘super admin’ in the GoTo Connect account.
- You need enough paid GoTo Connect licenses for the users you want to connect to Kommo.
Note: If you have several paid users in Kommo, you don’t need the same number of GoTo licenses. This means you only need enough GoTo licenses for the users you connect with. For example, if you have 7 users in Kommo, you can connect 3 of them with just 3 GoTo licenses.
Steps on how to connect GoTo Connect users:
-
In your GoTo connect account, navigate to the Admin Center.
-
Go to the People tab > Users > Add user.
-
Enter the users’ names and emails. You can also use the Import users button and select a CSV file to import multiple users at once.
-
Then, go to the Phone System tab → click on the Phone numbers → select the phone number you wish to edit → Settings → Permissions → Add user and assign the appropriate permissions to the new users.
-
In the same tab, navigate to Direct extensions under the Call routes section. Assign a super admin as the primary contact for the extension by clicking below Assigned as primaryto: and select the user. If needed, add another super admin as the secondary contact, by clicking below “Assigned as secondary to:” and select a user.
Note: GoTo Connect super admins have full user permissions, and it’s essential to assign a primary super admin to manage the phone number. Adding a secondary super admin is optional but can provide additional support as they will receive the call simultaneously. That means, in case the primary super admin is occupied, the secondary one can answer the call.
The last step is to match GoTo Connect users in Kommo. To do this:
-
Go to the GoTo Connect widget and click on Add another user.
- Match GoTo Connect users with Kommo users by selecting their names from the dropdown menus.
When you match the users, click Done and you are ready to go!
How to use GoTo Connect
Once you have installed the widget and configured all the settings, you can make and receive calls inside Kommo. To make a call, just click on the phone number in the Lead profile and choose GoTo Connect. You will be automatically directed to the dialer.
Note: If there is no existing lead and an incoming call is received, a lead will not be automatically created. This call will only be visible in GoTo, not in Kommo.
At times, your browser can request your permission to use your microphones. If a pop-up appears as shown below, simply click Allow.
When the call is finished, you will find information about the date and status of the call in the Lead card. You can also listen to the records or download them if needed.
Note: If a lead has an associated contact and a call from this contact is missed, a note about the missed call will be attached to this contact, as long as it is linked to at least one lead card.
In your GoTo Connect account, you can see all of your call activity in the Phone system > Call reports.
Use cases for call management
Handling calls in your Kommo account helps keep your communication clear and organized. Now that you know how to connect and use GoTo Connect integration, we’ll guide you through various scenarios where you can make or receive calls using Kommo and GoTo Connect. We’ll explain each step you need to follow and what to expect, so you can manage your calls easily and maintain accurate records.
1. Outgoing call to a contact in the Lead card
-
Create a Lead in Kommo, fill in the name, and click Save. If you are not sure how to create a lead, read our article.
-
Add a Contact to the Lead with their name and work phone number, then click Save.
-
Click on the phone number in the Lead card, then click GoTo Connect to start the call.
- The call connects, and you can talk to the contact. The call duration is tracked.
- After hanging up, a note with call details (status, duration, contact) is created in Kommo.
- You can listen to or download the call recording from the note.
2. Outgoing call from Kommo dialer
- Open the dialer, enter the number, and click the call button.
- The call connects regardless of whether the number has a + sign, brackets, or is just digits.
3. Incoming call from contact in the Lead card
-
Create a Lead in Kommo, fill in the name, and click Save. If you are not sure how to create a lead, read our article.
-
Add a Contact to the Lead with their name and work phone number, then click Save.
- When your contact calls you, the call is received in Kommo.
- Answer the call, and the call duration is tracked.
- After hanging up, a note with call details (status, duration, contact) is created in Kommo.
- You can listen to or download the call recording from the note.
If you need more help with setup or troubleshooting, feel free to reach out to our support chat or contact us via WhatsApp. You can also hire a Kommo partner to do all the hard work for you.
Not a user yet? Sign up for our 14-day free trial or book a free live demo.
