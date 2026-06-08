---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/support/integrations/make-formerly-integromat-how-to-use"
date: "2022-09-14"
---

Module is a general name for the steps of your scenario. Make has five types of modules:
- Actions
- Triggers
- Searches
- Aggregators
- Iterators
The last two are intended for advanced scenarios.
The scenario is made up of a number of modules that decide how the data is transferred or transformed between apps or services.
Actions – are the most common type of module.
- A typical action module returns just a single bundle which is then passed on to the next module for processing.
- Action modules can be placed at the beginning, middle or end of a scenario.
- Scenarios can contain an unlimited number of action modules.
For example, you have chosen the ‘Create a lead’ action in Kommo. When you make a scenario with, let’s say, Twitter, it will navigate possible leads according to your chosen events and make them into lead cards in your pipeline. Super handy, isn’t it?
Trigger modules – launch the process when there has been a change in a given service. The change can be a creation of a new record, deletion of a record, update of a record, etc.
- Every trigger can return zero, one or more bundles which are then passed on to the next module for processing.
- Triggers can be placed only at the beginning of a scenario.
- Each scenario can contain only one trigger.
As an example, I can choose the Watch events trigger and mark the ‘The responsible user changed for the Lead’. Once the responsible user is changed for a Lead, your scenario will be launched.
Searches – retrieve the data matching the parameters you specify.
- A typical search module returns zero, one or more bundles which are then passed on to the next module for processing.
- Search modules can be placed at the beginning, middle or end of a scenario.
- Scenarios can contain an unlimited number of search modules.
Aggregators – are modules that accumulate multiple bundles into one single bundle.
- Every aggregator returns only one bundle which is then passed on to the next module for further processing.
- Aggregators can be placed only in the middle of a scenario.
- Scenarios can contain an unlimited number of aggregators.
Iterators – are modules that split arrays into multiple, separate bundles.
- Every iterator returns one or more bundles which are then passed on to the next module for processing.
- Iterators can be placed only in the middle of a scenario.
- Scenarios can contain an unlimited number of iterators.
