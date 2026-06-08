---
title: "Native form controls"
source: "https://developers.kommo.com/docs/native-control"
date: "2025-06-19"
---

Remember that each control listed here is self-initializing. This means that for the control to function, it is sufficient to draw it and insert it into the DOM tree.
The controls operate based on the standard form mechanism. Each control has inputs (some of which are hidden) where they store the selected values. Therefore, to make it work, you should set the name parameters from the Possible Parameters tables of each control and then retrieve the form values by serializing $('form').serialize()
.
To monitor changes in JavaScript, you should listen to standard browser events (change, input, blur, click) on inputs with values, unless otherwise specified in the control documentation.
