---
title: "Environment variables"
source: "https://developers.kommo.com/docs/environment-variables"
date: "2025-06-08"
---

If you need to interact with a client's account, you can access the global APP object which provides you with relevant data based on the user interface they are currently using.
To explore the capabilities of this tool, you can open the console and enter APP.
APP.getBaseEntity()
The method will return a string indicating the entity you are currently in (e.g., leads or contacts).
APP.isCard()
The method will return a Boolean value (true/false
) indicating whether you are currently in the card.
APP.getWidgetsArea()
The method will return the code of the current page.
APP.lang_id
The property stores the letter code of the language set in the user profile.
Available constants
The function is designed to retrieve the constant's value passed to the key.
APP.constant('user')
{
amojo_id: "1111111-2222-3333-4444-55555555555555",
api_key: "",
group_mates_ids: (5) [123456, 234567, 3456789, 4567890, 0987654],
id: 123456,
login: "[email protected]",
name: "Company name",
personal_mobile: "+1234567890",
photo: "/v3/users/some-photo/avatar/?1234567890",
settings:
{layout_width: {…}, feed_filter: null, notify_time_before_task: 300, default_task_preset: '', need_msec: false, …},
sso_auth: false,
theme: 1,
tour: false,
user_rank: "master",
uuid: "55555555-6666-7777-8888-999999999",
[[Prototype]]: Object
}
On the other hand, if a value is passed, it will set the constant's value to that value.
- Public integrations have specific guidelines that prohibit reassigning system constants.
- System constants that aren't included in the list above may change or disappear at all.
The main part of the system is implemented in the backbone.js framework. You can refer to the framework's documentation to work with environment variables.
If you are working with any system interface apart from cards, you can access the APP.data.current_view object
, which contains the root DOM element of the current interface where the user is working (APP.data.current_view.$el
).
If the user is currently working with any list interface, such as leads, contacts, companies or tasks, you can access the APP.data.current_list
property within the APP object. This property contains a collection of current list items with information retrieved from the displayed columns. This data includes the id
, name
(entity name), and checked
property (which determines whether the element in the list is selected or not).
In case the user is working with any card, you can access the APP.data.current_card
property. This property provides access to data on the current card where the user is working. While accessing this property, it is essential to check its presence, as it could be false if the user is not currently on any card. If you directly access any child value without checking the property's presence, it could result in an error.
Through APP.data.current_card
you can get the following data:
-
APP.data.current_card.id
: id of the current entity card. If the card is new created, its id is 0. -
APP.data.current_card.model
: the backbone model stores the current data at the time of entry, which means that even if the user has made changes to a field but has not yet saved it, the entered value will still be accessible through the model.
When Kommo is updated, the system automatically updates the page.
However, there may be instances where this behavior needs to be temporarily stopped, such as during a phone call, to prevent any interruptions for the user. In such cases, you can use a specific method to pause the updates until the call is over, so as not to disturb the user with unnecessary updates.
The method described allows you to easily retrieve information about the online status of users.The status can either be true (if the user is online) or false (if the user is offline).
APP.sdk.showUserStatus() // object with all user id and status
// Example response:
{
{
id: 123456,
online: true
},
{
id: 123456,
online: false
}, ...
}
Calling the method without any parameters will return an object containing IDs of all users and their online statuses.
APP.sdk.showUserStatus('online')// array of all id users online
// Example response:
[123456, 123457...]
Calling this method with the “online” flag will list the ids of all online users.
var id_user = 123456; // Unique account ID
var status_user = APP.sdk.showUserStatus(id_user) ; // online user status (true or false)
To retrieve the status of a specific user, you can call the method with the user's unique account identifier. The function will then return true if the user is online and false if they're not.
APP.sdk.showUserStatus(1111111) // object with all users id and status
It's important to note that if an incorrect user ID is entered or an error is made while writing the flag, the function will still work by returning the ID object with the online statuses of all users.
