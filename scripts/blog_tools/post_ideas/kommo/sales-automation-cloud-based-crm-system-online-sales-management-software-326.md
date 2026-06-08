---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/support/crm/import-advanced"
date: "2022-09-26"
---

Manage advanced import options
Field types during import
-
Date type fields: To import any date type field, you will need to use the following date format: DD.MM.YYYY or MM.DD.YYYY. Otherwise, it will not be imported. If you plan to import any dates, the file should be in the .csv format. -
Creation date: If the creation date is not stated in the file, it will be the date of your import. -
Birthday: If the date format is incorrect, the birthday field will contain the following date: 01.01.1970 -
Select type fields: All the select options are case-sensitive and need to be spelled correctly, otherwise, a new option gets created. You can uncheck the “Automatically add items to list” pin to avoid that. -
Multiselect: If you need to import a couple of options at the same time, separate them by commas: option1, option2, option3. -
Radio button: If the option is missing in the file, the first option in the field will be chosen by default. -
Checkbox: In order for the box to be checked, enter the value “Yes” in the cell. If you don’t need the box to be checked, then leave this cell empty. -
Numeric type field: For these types of fields (including Sale) the value should be an integer. -
Address: There can only be one address type field. To import this type of file, split the value into the following columns: Country, Region, City, Zip-code, Address.
Importing data into different pipelines and stages
The names should be spelled identically to the pipeline/stage name in Kommo. The ‘pipeline’ name is not case-sensitive but if you misspell it, the uploaded leads go to the first stage of the first pipeline. The ‘lead status’ name only accepts the ‘first word upper-case’ format. For example, ‘Offer made’ or ‘Initial contact’. If you add just the ‘Lead status’ columns, the leads will be imported into the first pipeline.
How does Kommo deal with duplicates when importing?
If two lines in your file are absolutely identical, Kommo will only import one line. If two different lead titles have the same contact and company name, two separate leads will be imported with the same contact and company attached to them. Contacts with a different company and lead are counted as different contacts. If two leads have the same contact name and no company, then two different leads with the same contact are imported: If contacts and leads are the same and the companies are different, then nothing will be merged.
