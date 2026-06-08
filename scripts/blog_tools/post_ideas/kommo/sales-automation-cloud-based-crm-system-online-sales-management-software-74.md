---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/developers/content/integrations/sdk_card"
date: "2026-01-01"
---

Card SDK
SDK card allows developers of widgets to connect their own data source to the card (lead, contact, company, buyer). At the moment, developers can display products on the card. Bind and untie them, search for them, and change their number.
What do I need to use the SDK?
- In the manifest.json file, you need to specify the following areas in the locations object: “lcard-0”, “ccard-0”, “comcard-0”, “settings”, “card_sdk”;
- Create a new widget or update an existing one through Settings -> API;
- Enable widget.
How to connect an SDK to a card
- After the widget is turned on, it will be displayed in the interface, in the control window of the attached tabs of the card (the ellipsis next to the tabs on the left side of the card)(available only from the Account Administrator)
- After the widget is connected to the card and selected, it will be initialized.
What is necessary for correct work on cards
In the script.js file of the widget, you must create 4 methods in the callbacks object
- loadPreloadedData
- loadElements
- linkCard
- searchDataInCard
Description of methods and examples
The loadPreloadedData () method
The method is called when the tab associated with the widget is initialized.
Responsible for displaying the proposed to add to the card data when opening the search field.
The method must return a Promise-type object that, upon execution of your query, will return an array [Obj1, Obj2, … ObjN], where Obj is an object describing the element in the format:
{
id: {number},
sku: {string},
name: {string},
price: {string}
}
An example of a method implementation:
loadPreloadedData: function () {
return new Promise(_.bind(function (resolve, reject) {
// Let's make a request to a remote server
self.crm_post(
'http://my.sdk.api.com',
{},
function (msg) {
// Let's bring the elements to the desired format and resolve
resolve(msg);
},
'json'
);
}), this);
}
The loadElements (type, id) method
The method is called when the tab associated with the widget is initialized.
It is responsible for displaying the elements attached to the card.
The method must return a Promise-type object that, upon execution of your query, will return an array [Obj1, Obj2, … ObjN], where Obj is an object describing the element in the format:
{
id: {number},
sku: {string},
name: {string},
price: {string},
quantity: {number}
}
Parameters of the method:
Example of method implementation
loadElements: function (type, id) {
return new Promise(_.bind(function (resolve, reject) {
// Let's make a request to a remote server
self.crm_post(
'http://my.sdk.api.com',
{},
function (msg) {
// Let's bring the elements to the desired format and resolve
resolve(msg);
},
'json'
);
}), this);
}
The linkcard method (links)
The method is called when the attached items are stored in the cards, with the change in the number and their unbinding.
It is responsible for linking / unlinking elements to the card.
Parameters of the method :
An example of a method implementation:
linkCard: function (links) {
return new Promise(_.bind(function (resolve, reject) {
// Let's make a request to a remote server
self.crm_post(
'http://my.sdk.api.com/sdk_back/link.php',
links,
function () {
// We do not process errors that could occur on your side, in this block you can execute
Your code
},
'json'
);
resolve();
}), this);
}
The searchDataInCard method (query, type, id)
The method is called when searching for items.
It is responsible for displaying the found elements in the elements card.
The method must return a Promise-type object that, after executing your query, returns an array [Obj1, Obj2, … ObjN], where Obj is an object describing the element in the format:
{
id: {number},
sku: {string},
name: {string},
price: {string}
}
Method parameters
Example of method implementation:
searchDataInCard: function (query, type, id) {
return new Promise(_.bind(function (resolve, reject) {
self.crm_post(
'http://my.sdk.api.com/sdk_back/search.php',
{
query: query,
type: type,
id: id
},
function (msg) {
resolve(msg);
},
'json'
);
}), this);
}
Description of the PHP application for working with the SDK
Installation on the server
You must download the archive to your server to install the test application.
Then you need to change the data to connect to the database in the header.php file, then go to the script page with the GET parameter transfer: install.php? Install = y.
At this point, two tables and test data are created in the database specified in the previous step.
At this point, two tables and test data are created in the database specified in the previous step.
At this point, two tables and test data are created in the database specified in the previous step.
Creating a new product
To create new products, you can refer to the script by passing the necessary GET parameters, create.php? New_product = true & sku = {article} & name = {product name} & price = {price}
index.php
The script index.php returns a list of products. In the example widget, this script is prompted when loading the typed types to the card and opening the search.
When you open the card, you will be prompted for this script with the parameters passed:? Products = true & type = {entity type} & entity_id = {id of the entity}.
When you open the search, it’s just a request for this script, it returns all the elements.
search.php
The search.php script accepts the query parameter, which searches the database and returns the found items.
link.php
The script link.php is responsible for binding and unbinding of data to the card. Gets the link or unlink array, depending on the action (bind / unlink).
