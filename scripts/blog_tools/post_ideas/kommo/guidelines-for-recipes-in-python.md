---
title: "Guidelines for recipes in Python"
source: "https://developers.kommo.com/docs/guidelines-recipes"
date: "2025-06-08"
---

First, it is great news that you would like to share your knowledge with the community of developers!
There are several rules you should follow to get your recipe posted. Let's start!
- Ensure that the code is easy to read and understand. Use clear variable and function names.
✅ contact_custom_fields_response
❌ c_cf_resp - Ensure that the snippet addresses a specific problem or demonstrates particular functionality in Python. This could be something useful to the community, such as working with APIs or data processing.
- If possible, avoid complex external dependencies. This will simplify running the code for users.
- If a dependency is necessary, provide installation instructions (e.g., using pip).
- Test the code before publishing it. Make sure it works and does not contain errors.
- Follow standard code formatting guidelines (PEP 8 for Python). This will enhance readability.
- Consider the performance of your code and avoid overly resource-intensive solutions unless necessary.
- Provide a possible response to your code if applicable.
- Provide a description of each step as comments above the code section.
An example:
import requests
import csv
#1. Define subdomain and api_key
#Write your account subdomain and long-lived or access token here.
SUBDOMAIN = ''
API_KEY = ''
#2. Define a template URL
#Paste the URL that you will use to upload the data.
CREATE_TEMPLATE_URL = f'https://{SUBDOMAIN}.kommo.com/api/v4/chats/templates'
#3. Get a csv file
#Get a csv file with the pre-approved templates you want to import.
with open('templates.csv') as csvData:
templates = csv.DictReader(csvData)
#4. Parse csv file
#The csv document should contain two columns: 'name' and 'content'.
#The FOR loop will add a name and content of each template
#and send a POST request to add a template with this data.
for template in templates:
name = template['name']
body = {
'name' : name,
"content": template['content'],
}
headers = {
'Authorization' : f'Bearer {API_KEY}',
'Content-Type': 'application/json'
}
response = requests.post(CREATE_TEMPLATE_URL, json=body, headers=headers)
print(response.text)
Please make sure to include the following information when submitting your recipe snippet:
- Title and a brief description of the recipe, along with the chosen category. If your snippet doesn't fit the provided categories, choose "Other" and specify the category in the notes.
- Share a link to your Google Colab or GitHub repository where the snippet is stored.
- Provide your GitHub/Discord nickname or your company name if you wish to be credited in the recipe description.
- Share your phone number and preferred messaging app (WhatsApp/Telegram) or email. We will only contact you if we have questions about your snippet or description.
▶︎Recipe Form◀︎
Your form will be reviewed by a moderator and a backend developer within 10 days after submission.
If they have questions about your code or your comments, you will get a message in a chosen messenger or an email. That's why we recommend to provide such information.
When your recipe is posted, we will announce it in our Discord channel and tag you if you leave your Discord nickname.
If you wish to create a recipe in a programming language other than Python, text us in Discord.
