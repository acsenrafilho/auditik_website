---
title: "Webhooks"
source: "https://developers.kommo.com/docs/webhooks-general"
date: "2024-09-17"
---

WebHooks are notifications to third-party applications by sending notifications about events that have occurred in Kommo. You can configure the HTTP addresses of your applications and the associated working rules in your account settings in the Kommo market section.
Working with WebHooks via API is possible with Advanced, Pro and Enterprise plans.
Example scenarios:
- After a successful transaction, you can send information about the transaction to your accounting application and automatically generate an invoice for payment.
- You can add e-mails of new contacts in the CRM system to the mailing list.
- You can set up SMS notifications about changes in your account.
List of supported entities:
- Leads
- Contacts
- Companies
- Tasks
- Lists elements
- Talks
- Notes
- Lead added
- Lead edited
- Lead deleted
- Lead restored
- Lead stage (status) changed
- Lead resp. user changed
- Contact added
- Contact edited
- Contact deleted
- Contact restored
- Contact resp. user changed
- Company added
- Company edited
- Company deleted
- Company restored
- Company resp. user changed
- Task added
- Task edited
- Task deleted
- Task resp. user changed
- Incoming lead added
- Incoming lead edited
- Incoming lead deleted
- Incoming message received
- Talk added
- Talk edited
- Note added to lead
- Note added to contact
- Note added to company
- Add element to Products
- Update element in Products
- Delete element from Products
Description of parameters in Settings:
Setting up WebHooks involves the following three steps:
Go to Settings -> Integrations and click Web hooks in the upper right corner.
Enter the WebHook URL.
Select the events that will send a notification. Then click Save.
- Perform the action selected when creating the WebHook
- In your application, check the data received from Kommo
- If the data has not arrived, check that the URL entered is correct and proceed to step 1
WebHook is sent in x-www-form-urlencoded
format to a third-party application, detailed information about the entity is described in GET requests of the current section.
POST In case of creating and updating an entity:
{
"entity":{
"add/update":[
{
"array of entity fields":"entity fields values"
}
]
}
}
In case for deleting of entity:
{
"entity":{
"delete":[
{
"id":"id"
}
]
}
}
{
"leads":{
"add":[
{
"id":"1111111",
"name":"New Lead",
"status_id":"2222222",
"price":"500",
"responsible_user_id":"3333333",
"last_modified":"1726566390",
"modified_user_id":"44444444",
"created_user_id":"44444444",
"date_create":"1726566390",
"pipeline_id":"5555555",
"account_id":"66666666",
"custom_fields":[
{
"id":"77777777",
"name":"Benefit",
"values":[
{
"value":"0"
}
]
},
{
"id":"88888888",
"name":"Text",
"values":[
{
"value":"Text"
}
]
},
{
"id":"9999999",
"name":"Numeric",
"values":[
{
"value":"123"
}
]
},
{
"id":"12345678",
"name":"Toggle switch",
"values":[
{
"value":"1"
}
]
},
{
"id":"87654321",
"name":"Date",
"values":[
"1729717200"
]
},
{
"id":"12312312",
"name":"Currency",
"values":[
{
"value":"200"
}
]
}
],
"created_at":"1726566390",
"updated_at":"1726566390"
}
]
}
{
"leads":{
"update":[
{
"id":"123456789",
"name":"",
"status_id":"67548615",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"11000000",
"last_modified":"1726567767",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"17265663a90",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benefit",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Text",
"values":[
{
"value":"Text"
}
]
},
{
"id":"1246485",
"name":"Numeric",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246487",
"name":"Toggle switch",
"values":[
{
"value":"1"
}
]
},
{
"id":"1246491",
"name":"Date",
"values":[
"1729717200"
]
},
{
"id":"1246493",
"name":"Currency",
"values":[
{
"value":"200"
}
]
}
],
"created_at":"1726566390",
"updated_at":"1726567767"
}
]
}
}
{
"leads":{
"delete":[
{
"id":"12345678",
"status_id":"67548607",
"pipeline_id":"8572511"
}
]
}
}
{
"leads":{
"restore":[
{
"id":"15317715",
"name":"123",
"status_id":"67548607",
"price":"80",
"responsible_user_id":"12345678",
"last_modified":"1726572650",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726571070",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benfit",
"values":[
{
"value":"1000"
}
]
}
],
"created_at":"1726571070",
"updated_at":"1726572650"
}
]
}
}
{
"leads":{
"status":[
{
"id":"15318175",
"name":"",
"status_id":"67548619",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"12345678",
"last_modified":"1726572758",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726572752",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benefit",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Text",
"values":[
{
"value":"Text"
}
]
},
{
"id":"1246485",
"name":"Numeric",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246489",
"name":"Select",
"values":[
{
"value":"2",
"enum":"908107"
}
]
},
{
"id":"1246491",
"name":"Date",
"values":[
"1725915600"
]
}
],
"created_at":"1726572752",
"updated_at":"1726572758"
}
]
}
}
{
"leads":{
"responsible":[
{
"id":"15318175",
"name":"",
"status_id":"67548619",
"old_status_id":"67548607",
"price":"1000",
"responsible_user_id":"1234567",
"last_modified":"1726572882",
"modified_user_id":"11087123",
"created_user_id":"11087123",
"date_create":"1726572752",
"pipeline_id":"8572511",
"account_id":"12345678",
"custom_fields":[
{
"id":"1118164",
"name":"Benefit",
"values":[
{
"value":"1000"
}
]
},
{
"id":"1246483",
"name":"Text",
"values":[
{
"value":"Text"
}
]
},
{
"id":"1246485",
"name":"Numeric",
"values":[
{
"value":"123"
}
]
},
{
"id":"1246489",
"name":"Select",
"values":[
{
"value":"2",
"enum":"908107"
}
]
},
{
"id":"1246491",
"name":"Date",
"values":[
"1725915600"
]
}
],
"old_responsible_user_id":"12345673",
"created_at":"1726572752",
"updated_at":"1726572882"
}
]
}
}
Acceptance and rejection of incoming leads are treated as equivalent to their deletion. As a result, these actions will trigger a webhook for incoming lead deleting. You can distinguish between them by two parameters: the action will show decline if an incoming lead was rejected and accept in case of acceptance. Additionally, the parameter for the entity IDs of the incoming leads will differ, being either
decline_result
oraccept_result
.
{
"unsorted":{
"add":[
{
"uid":"4278accf80c59e99411d5c6e01e4054864ca958e594699484ba8c5f40bb1",
"category":"forms",
"source_data":{
"form_id":"1303311",
"form_type":"1",
"from":"Site request #1303311 from form «Form #1712844073»",
"form_name":"Form #1712844073",
"origin":{
"ip":"172.241.70.196",
"datetime":"1726573764",
"referer":"https://subdomain.kommo.com/"
},
"data":{
"name_2":{
"type":"text",
"id":"name_2",
"element_type":"2",
"name":"Lead name",
"value":"Lead name"
}
},
"date":"1726573764"
},
"date_create":"1726573764",
"data":{
"leads":[
{
"last_modified":"1726573765",
"name":"Lead name",
"pipeline_id":"8572511",
"modified_user_id":"0",
"date_create":"1726573764",
"custom_fields":[
{
"id":"771926",
"code":"REFERRER",
"values":[
{
"value":"https://subdomain.kommo.com/"
}
]
}
],
"visitor_uid":"91148b80-408f-46ef-8482-50e4950f78b1",
"source_id":"36504",
"gso_session_uid":"null",
"form_request_id":"AFyd4gesQF"
}
]
},
"pipeline_id":"8572511",
"account_id":"32720107",
"request_id":"0",
"source_id":"36504",
"lead_id":"15318519",
"created_at":"1726573764"
}
]
}
}
{
"unsorted": {
"update": [
{
"uid": "40789acb990dbb9754dc234e18d2325470612b2284880504d78f258d8f77",
"category": "forms",
"account_id": "1312313",
"user_id": "123123",
"source": "Request from the website №441310 through form <<Form #1548921297>>",
"pipeline_id": "142141",
"source_data": {
"form_id": "243222",
"form_type": "1",
"date": "156232405",
"from": "Request from the website №441310 through form <<Форма #1548921297>>",
"form_name": "Website",
"date": "1567619168",
"source_uid": "232323",
"source": "2423424",
"uid": "24242432",
"origin": {
"ip": "12.123.123.12",
"referer": "https://test.kommo.com/settings/pipeline/leads/1541752",
"visitor_uid": "202273f9-03cc-42b5-aa4d-71e2ead59ec4",
"datetime": "1567619168"
}
},
"data": {
"leads": [
{
"id": "24242432",
"status_id": "424232222",
"pipeline_id": "4353222",
"name": "Lead",
"created_user_id": "0",
"date_create": "156760055"
}
],
"pipeline_id": "4353222",
"source": "2423424",
"source_uid": "232323",
"created_at": "156760055"
}
}
]
},
"account": {
"subdomain": "test",
"id": "1312313",
"_links": {
"self": "https://test.kommo.com"
}
}
}
//lead accepted
{
"unsorted":{
"delete":[
{
"action":"accept",
"uid":"f575b754b0d1eb1c380e53d6821ffd2820a6dfbe3822de0cfddaf266980f",
"accept_result":{
"leads":[
"15258873"
]
},
"category":"mail",
"created_at":"1726392264",
"modified_user_id":"11087123"
}
]
}
}
//lead declined
{
"unsorted":{
"delete":[
{
"action":"decline",
"decline_result":{
"leads":[
"15270337"
]
},
"uid":"f575b754b0d1eb1c380e457edeba88954891f3dce5d2fe1324fd3e2af58d",
"category":"mail",
"created_at":"1726426986",
"modified_user_id":"11087123"
}
]
}
}
When creating and deleting contact or company entities, to avoid problems with backward compatibility, there is a type key that gives an understanding of which entity the webhook came from.
{
"contacts":{
"add":[
{
"id":"17611273",
"name":"Contact Name",
"responsible_user_id":"11087123",
"date_create":"1726573127",
"last_modified":"1726573127",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Phone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Birthday",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Text"
}
]
},
{
"id":"791730",
"name":"Any radiobutton",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573127",
"type":"contact"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17611273",
"name":"Contact Name",
"responsible_user_id":"11087123",
"date_create":"1726573127",
"last_modified":"1726573130",
"created_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Phone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Birthday",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Text"
}
]
},
{
"id":"791730",
"name":"Any radiobutton",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573130",
"type":"contact"
}
]
}
}
{
"contacts":{
"delete":[
{
"id":"17611273",
"type":"contact"
}
]
}
}
{
"contacts":{
"restore":[
{
"id":"17611273",
"name":"Contact Name",
"responsible_user_id":"11087123",
"date_create":"1726573127",
"last_modified":"1726573264",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Phone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Birthday",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Text"
}
]
},
{
"id":"791730",
"name":"Any radiobutton",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"created_at":"1726573127",
"updated_at":"1726573264",
"type":"contact"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17611273",
"name":"Contact Name",
"responsible_user_id":"11940747",
"date_create":"1726573127",
"last_modified":"1726573326",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Phone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
},
{
"id":"782386",
"name":"Birthday",
"values":[
{
"value":"12.01.1980"
}
]
},
{
"id":"791668",
"name":"Bio",
"values":[
{
"value":"Text"
}
]
},
{
"id":"791730",
"name":"Any radiobutton",
"values":{
"value":"2",
"enum":"566642"
}
}
],
"old_responsible_user_id":"11087123",
"created_at":"1726573127",
"updated_at":"1726573326",
"type":"contact"
}
]
}
}
{
"contacts":{
"add":[
{
"id":"17612521",
"name":"Company name",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576534",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576534",
"type":"company"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17612521",
"name":"Company name not specified",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576634",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Phone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576634",
"type":"company"
}
]
}
}
{
"contacts":{
"delete":[
{
"id":"17612521",
"type":"company"
}
]
}
}
{
"contacts":{
"restore":[
{
"id":"17612521",
"name":"Company name not specified",
"responsible_user_id":"11087123",
"date_create":"1726576533",
"last_modified":"1726576937",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Phone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"created_at":"1726576533",
"updated_at":"1726576937",
"type":"company"
}
]
}
}
{
"contacts":{
"update":[
{
"id":"17612521",
"name":"Company name not specified",
"responsible_user_id":"11940747",
"date_create":"1726576533",
"last_modified":"1726576988",
"created_user_id":"11087123",
"modified_user_id":"11087123",
"account_id":"32720107",
"custom_fields":[
{
"id":"771906",
"name":"Phone",
"values":[
{
"value":"1234567890",
"enum":"552476"
}
],
"code":"PHONE"
},
{
"id":"771908",
"name":"Email",
"values":[
{
"value":"[email protected]",
"enum":"552488"
}
],
"code":"EMAIL"
}
],
"linked_leads_id":{
"15319601":{
"ID":"15319601"
}
},
"old_responsible_user_id":"11087123",
"created_at":"1726576533",
"updated_at":"1726576988",
"type":"company"
}
]
}
}
{
"task":{
"add":[
{
"id":"1564671",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:07:29",
"text":"Task text",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:07:29",
"responsible_user_id":"11087123",
"complete_till":"2025-10-02 20:59:00",
"created_at":"1726578449",
"updated_at":"1726578449",
"complete_before":"1759438740"
}
]
}
}
//edit task (text)
{
"task":{
"update":[
{
"id":"1502517",
"element_id":"14791277",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-04 16:00:13",
"text":"task text edited",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:11:20",
"responsible_user_id":"11087123",
"complete_till":"2025-09-04 20:59:00",
"action_close":"0",
"old_text":"task text",
"created_at":"1725465613",
"updated_at":"1726578680",
"complete_before":"1757019540"
}
]
}
}
//complete to do
{
"task":{
"update":[
{
"id":"1564845",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:20:25",
"text":"text",
"status":"1",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:21:09",
"responsible_user_id":"11087123",
"complete_till":"2024-10-23 20:59:00",
"action_close":"1",
"old_text":"text",
"created_at":"1726579225",
"updated_at":"1726579269",
"complete_before":"1729717140"
}
]
}
}
//result added (when completing from calendar)
{
"task":{
"update":[
{
"id":"1564835",
"element_id":"17612485",
"element_type":"3",
"task_type":"2",
"date_create":"2024-09-17 13:18:58",
"text":"test",
"status":"1",
"account_id":"32720107",
"created_user_id":"0",
"last_modified":"2024-09-17 13:29:18",
"responsible_user_id":"11087123",
"complete_till":"2024-09-17 13:18:57",
"action_close":"0",
"result":{
"id":"4600307",
"text":"client responded"
},
"created_at":"1726579138",
"updated_at":"1726579758",
"complete_before":"1726579137"
}
]
}
}
{
"task":{
"delete":[
{
"id":"1564885"
}
]
}
}
{
"task":{
"update":[
{
"id":"1564917",
"element_id":"15320411",
"element_type":"2",
"task_type":"1",
"date_create":"2024-09-17 13:27:53",
"text":"text",
"status":"0",
"account_id":"32720107",
"created_user_id":"11087123",
"last_modified":"2024-09-17 13:28:01",
"responsible_user_id":"11940747",
"complete_till":"2025-09-17 20:59:00",
"action_close":"0",
"old_text":"text",
"main_user":"11940747",
"modified_by":"11087123",
"old_responsible_user_id":"11087123",
"created_at":"1726579673",
"updated_at":"1726579681",
"complete_before":"1758142740"
}
]
}
}
If there is a media file in a note, you will get 2 webhooks: 1 for text and 1 for media file.
//text note
{
"leads":{
"note":[
{
"note":{
"text":"note text",
"attachement":"",
"date_create":"2024-09-17 16:38:11",
"note_type":"4",
"element_type":"2",
"element_id":"15320411",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:38:49",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":11087123,\"author_name\":\"Jean Pierre\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600471",
"created_at":"1726580291",
"updated_at":"1726580329"
}
}
]
}
}
//media file
{
"leads":{
"note":[
{
"note":{
"text":"picture.jpg",
"note_type":"5",
"date_create":"2024-09-17 16:39:32",
"element_type":"2",
"element_id":"15320411",
"catalog_id":"0",
"group_id":"0",
"attachement":"drive/528f59ad-6f5b-4738-b6d2-bb707aee9511/e433243c-e55e-4d16-b625-65a2bd8d3a44/Skrinshot_17-09-2024_153156.jpg",
"timestamp_x":"2024-09-17 16:40:09",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":11111111,\"author_name\":\"Danny Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600505",
"created_at":"1726580372",
"updated_at":"1726580409"
}
}
]
}
}
{
"contacts":{
"note":[
{
"note":{
"text":"text",
"attachement":"",
"date_create":"2024-09-17 16:43:34",
"note_type":"4",
"element_type":"1",
"element_id":"17614247",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:44:11",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":111111111,\"author_name\":\"Samantha Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600607",
"created_at":"1726580614",
"updated_at":"1726580651"
},
"type":"contact"
}
]
}
}
{
"contacts":{
"note":[
{
"note":{
"text":"text note",
"attachement":"",
"date_create":"2024-09-17 16:44:13",
"note_type":"4",
"element_type":"3",
"element_id":"17614267",
"catalog_id":"0",
"group_id":"0",
"timestamp_x":"2024-09-17 16:44:49",
"account_id":"32720107",
"metadata":"{\"event_source\":{\"id\":2222222,\"author_name\":\"Gloria Potter\",\"type\":1}}",
"created_by":"11087123",
"modified_by":"11087123",
"main_user_id":"11087123",
"id":"4600623",
"created_at":"1726580653",
"updated_at":"1726580689"
},
"type":"company"
}
]
}
}
{
"catalogs":{
"add":[
{
"id":"347577",
"date_create":"1726580883",
"date_modify":"1726580883",
"created_by":"11087123",
"modified_by":"11087123",
"catalog_id":"32908",
"name":"Item 1",
"deleted":"0",
"custom_fields":[
{
"id":"771934",
"name":"SKU",
"values":[
{
"value":"1234567534efgd"
}
],
"code":"SKU"
},
{
"id":"771938",
"name":"Price",
"values":[
{
"value":"100"
}
],
"code":"PRICE"
},
{
"id":"771936",
"name":"Description",
"values":[
{
"value":"description text"
}
],
"code":"DESCRIPTION"
},
{
"id":"771944",
"name":"Unit",
"values":[
{
"value":"kg",
"enum":"552500"
}
],
"code":"UNIT"
},
{
"id":"771946",
"name":"Special price 1",
"values":[
{
"value":"80"
}
],
"code":"SPECIAL_PRICE_1"
},
{
"id":"771948",
"name":"Wholesale price",
"values":[
{
"value":"50"
}
],
"code":"WHOLESALE_PRICE"
}
],
"created_at":"1726580883",
"updated_at":"1726580883",
"type":"catalog"
}
]
}
}
{
"catalogs":{
"update":[
{
"id":"347577",
"date_create":"1726580883",
"date_modify":"1726580962",
"created_by":"11087123",
"modified_by":"11087123",
"catalog_id":"32908",
"name":"Item 1",
"deleted":"0",
"custom_fields":[
{
"id":"771934",
"name":"SKU",
"values":[
{
"value":"1234567534efgd"
}
],
"code":"SKU"
},
{
"id":"771938",
"name":"Price",
"values":[
{
"value":"1000"
}
],
"code":"PRICE"
},
{
"id":"771936",
"name":"Description",
"values":[
{
"value":"description text edit"
}
],
"code":"DESCRIPTION"
},
{
"id":"771944",
"name":"Unit",
"values":[
{
"value":"kg",
"enum":"552500"
}
],
"code":"UNIT"
},
{
"id":"771946",
"name":"Special price 1",
"values":[
{
"value":"800"
}
],
"code":"SPECIAL_PRICE_1"
},
{
"id":"771948",
"name":"Wholesale price",
"values":[
{
"value":"500"
}
],
"code":"WHOLESALE_PRICE"
}
],
"created_at":"1726580883",
"updated_at":"1726580962",
"type":"catalog"
}
]
}
}
{
"catalogs":{
"delete":[
{
"id":"347577",
"catalog_id":"32908",
"type":"catalog"
}
]
}
}
{
"message":{
"add":[
{
"id":"660b5b93-4ead-ac38-3797c062146c",
"chat_id":"33b41601-443b-9108-6938ae6b7935",
"talk_id":"191",
"contact_id":"11018118",
"text":"Hello!",
"created_at":"1726581295",
"element_type":"2",
"entity_type":"lead",
"element_id":"9276114",
"entity_id":"9276114",
"type":"incoming",
"author":{
"id":"e1ec058c-7efb-4b59-24b1bcesdf3168f6",
"type":"external",
"name":"user name",
"avatar_url":"https://amojo.kommo.com/attachments/profiles/a6c9-24b1bc7368f6/file-0_128x128.jpg"
},
"origin":"telegram"
}
]
}
}
{
"talk":{
"add":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581298",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-333ff2-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"1",
"is_read":"0",
"origin":"telegram"
}
]
}
}
//mark answered
{
"talk":{
"update":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581487",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-443b-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"1",
"is_read":"1",
"origin":"telegram"
}
]
}
}
//close talk
{
"talk":{
"update":[
{
"talk_id":"191",
"created_at":"1726581298",
"updated_at":"1726581548",
"rate":"0",
"contact_id":"11018118",
"chat_id":"33b41601-7ed1-443b-9108-6938ae6b7935",
"entity_id":"9276114",
"entity_type":"lead",
"is_in_work":"0",
"is_read":"1",
"origin":"telegram"
}
]
}
}
Our service expects a response from the webhook within 2 seconds. If we don't receive a response within this time or the response code is not successful (HTTP code is not between 100 and 299), we consider the webhook undelivered and the response invalid.
Your webhook may be disabled under the following condition:
- If more than 100 invalid responses were received in the last 2 hours, and the last webhook at the time of the check is also invalid.
In case of IP block the webhook will be disabled for security reasons. You can re-activate it in the settings by clicking the Save button and then saving the changes. Account administrators will also receive a notification in the notification center about the webhook being disabled.
When sending a request, the information is considered accepted if the HTTP response header returns a code between 100 and 299, according to the status code table from w3.org.
The first attempt is made immediately after the selected action is performed. If the attempt is unsuccessful, a retry will occur according to the rules outlined in the table below.
