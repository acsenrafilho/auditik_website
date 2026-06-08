---
title: "Adding notifications"
source: "https://developers.kommo.com/docs/add-notifications"
date: "2025-11-06"
---

To publish notifications, a public API is implemented, accessed through calling the corresponding methods of the global Kommo object APP. When you call the method, you need to transfer an object with a description of the notification.
The method is designed to trigger a pop-up notification, which will only appear in the interface and will not be duplicated on other delivery channels.
show_message()
Example:
var message_params = {
header: "Warning",
text: "Connection established",
date: 1714566795,
icon: "https://www.example.com/images/telephone.png"
};
APP.notifications.show_message(message_params);
Result:
The method will show an error notification in the account interface, and the message will not be sent through other delivery channels.
show_message_error()
var error_params = {
header: "Warning",
text: "Connection to the server is lost"
};
APP.notifications.show_message_error(error_params);
The method enables you to show a pop-up notification for a call or an error. If you utilize this feature, it will only appear in the interface and will not be sent through other channels.
show_notification()
var notification = {
text: {
header: "Outgoing call",
text: "Dialing the number +19872345678"
},
type: "call"
};
APP.notifications.show_notification(notification);
var notification = {
text: {
header: "Error",
text: "Error working with the widget"
},
type: "error"
};
APP.notifications.show_notification(notification);
The method enables you to add an error notification to the notification center, and the message will be sent to all active channels in the user’s account.
add_error()
var error_params = {
header: "Error",
text: "Failed to set the task! Contact not found!",
date: 1714566795,
link: "/contacts/list/?term=4951234567"
};
APP.notifications.add_error(error_params);
An email notification about the error:
Notification that has come to the mobile application:
The Notification Center API allows you to display an incoming call message. The notification will be transmitted over all active delivery channels.
add_call()
var call_params = {
text: "Call from +1 (415) 523-7743",
date: 1714566795,
from: "Jeremy Watts",
to: "Jason Nash",
element: { id: 18221265, type: "contact" },
duration: 250,
link: 'https://example.com/dialog.mp3'
};
APP.notifications.add_call(call_params);
