---
title: "Public integration checklist"
source: "https://developers.kommo.com/docs/getting-listed"
date: "2026-02-24"
---

Upon publishing an integration in our Marketplace, you will become Kommo technical partner. This is not the same as participating in our Partnership program since it’s not about selling Kommo licenses. This means that our cooperation becomes beneficial for both sides: we tell our clients about your integration, you get leads, while you help us expand the functionality of Kommo.
Here are the steps for getting your integration to go live:
- Use the checklist below to make sure your integration meets all requirements. Remember that the more attractive your integration looks and the more fully and clearly it is presented to the clients, the greater the chances of attracting attention to your integration and collecting more leads. You can always contact us regarding all development issues, including the external design of your integration. We will be glad to give you a helping hand before you send it for moderation so that chances to get approved are really strong.
- Once it’s ready, submit it using your technical account by going to Settings ➡ Integrations ➡ Create Integration .
- Our team will check your integration and give you feedback.
- Congrats! Once you pass moderation, your widget will be published.
Your integration doesn't mention or encourage buying Kommo subscriptions via Kommo Partners.
Kindly submit documentary evidence if you consider your integration with third-party services to be “official”.
- An integration must collect only the data required for its functioning.
- Integrators must implement appropriate security measures to ensure proper handling of user information and prevent its unauthorized application, disclosure or access by third-party entities.
In case of errors or incidents regarding your integration you must notify your clients of the reasons for the issue occured in a message as well as the Integrator’s contact data.
We wish to draw your attention to the importance of maintaining the proper level of user support. Frequent reports of problems with your integration, negative feedback, and requests for refund may indicate non-compliance with the regulations for Integrators.
- Refer clients out to the Kommo support team. You have to provide assistance with your integrations. If necessary, you can contact the Kommo support team from the technical account.
- Mislead users. You shouldn't create an impression with your clients that their issues should be resolved by the Kommo support team.
- Request account data (Kommo login and password) from the client to provide support.
- Introduce yourself as Kommo technical support.
We reserve the right to hide the integration from the Marketplace in case of non-compliance with the regulations.
The republishing of an integration that has already been published under another of your technical accounts is strictly prohibited. This restriction also applies to White Label integrations.
When creating an integration, you can upload a widget. A widget represents the UI integration. It might be used to display data in special areas, to interact with the user, or to adjust settings by administrators. Remember that your widget should tell the client whether the integration meets their needs.
The widget must not indicate Kommo as the developer of the integration. It should be obvious to the user that the developer of this integration is a third-party, i.e. the name of the integration, its logo or a short description must let the user know that the Kommo functionality declared in it has been modified or changed. Therefore it is prohibited to use the following in the name, logo of the integration and the name of the integrator company, as well as on the technical support website:
- the “Kommo” logo using the corporate style
- icons, and other Kommo-branded images
- the name “Kommo” or part of it in the name of the developer or integration
- Not longer than 30 characters
- When naming a widget, avoid using words that exceed 19 characters. Also, if you include symbols between words without spaces, they will be treated as a single word. To avoid this issue, make sure to add spaces before or after any symbols if you need to use them in the widget name.
- Followed by the widget creator’s name, using the word via or by:
- ✅ WhatsApp via Zenvia
- Isn't longer than 50 characters
- Explains why client should choose your integration
- On installation screen your integration has to include description of its benefits, functionality, be no longer than 400 characters and written in a friendly, non-technical way. Optionally it might contain the next information in the description or on the slides:
- Information about pricing (at least from ... and the trial period)
- Information about Kommo features which the integration works with
- Description and integration guidance after installation so that even non-technical users can understand how to:
- enable and disable it
- set it up
- work with it (Kommo interface elements and features)
- get support (contact data)
- find the currencies you support and prices (if your integration is not free to use)
- specifies which Kommo plan it requires (if it’s not available on all Kommo plans)
- Mentioning Kommo in the integration description is allowed only if it is correctly spelled. For example, kommo is not allowed. You can use HTML markup in the integration description, but you must follow these rules:
- All links must be formatted as an HTML tag
<a>
, for example:<a href="https://kommo.com" target="\_blank" referrerpolicy="no-referrer">Kommo</a>
- Do not practice upon text formatting too much since it leads to poor readability
- Do not use the
<script>
tag in the description
- All links must be formatted as an HTML tag
- The integration description before and after installation should be synchronized in both the modal window when creating a new version and in the
widget.zip/i18n
files.
- All text in your widget is user-friendly and understandable.
- You have provided messages for all potential errors, and they clearly explain the problem and what the user should do next.
The branding images you submit are shown in the Marketplace and throughout the system to represent your widget.
- You have provided branding images in PNG format in the following sizes:
- 400×272* px
- 240×84* px
- 130×100 px
- 108×108 px
- 84×84 px
- Does your integration feature another app? For example, a Telegram integration by your company AwesomeCode:
- Yes – Then the branding image sizes marked with an asterisk above must contain both your logo and the app’s logo.
- No – You are welcome to use your logo (optional), but the branding image should have its own identity.
- For a 400x272px image you need 10px margins from the image borders so that the image is not cropped in the Marketplace.
- Branding images of different integrations from one developer should be of a common style, though possess visual uniqueness.
Slideshow images are shown on the installation screen to demonstrate your integration in use. You have to provide 1-5 slideshow images that:
- Visually show the integration’s functionality, how the integration will be seen within Kommo, and its value to the user.
- You can optionally include a description of prices and plans, as well as the functionality of Kommo, which the integration works with.
- Images should be of high-resolution.
- Size - 1188×616 pixels each.
- Your icon must be original — don’t copy Kommo icons or icons from other integrations.
- Your icon must be provided in SVG format.
You can choose one of two approaches:
- One universal icon - works in both light and dark themes:
- Two versions - one for light theme and one for dark theme:
Tip: if your logo is black-and-white, please provide two versions (for light and dark themes). If your logo is in color, one version is enough, but make sure to check its contrast on both backgrounds.
- No third-party company logos can be used as your icon
- Use only a simplified symbol/pictogram of your brand (no text or taglines)
Contrast ratio should be 3.0 or higher for each background. In order to make sure your logo or icon is readable in both light and dark themes, follow the steps below:
- Go to https://imagecolorpicker.com/
- Upload your icon
- Click on the part of the logo that represents the main or dominant color you want to test
- Copy the HEX color value (e.g.,
#937AE9
)
We use two key background colors: #FFFFFF
(light theme) and #153043
(dark theme). How to test it:
- Go to https://colormagic.app/contrast-checker
- Paste your logo color (from step 1) into the Foreground field
-
Test it against the following backgrounds:
-
Light theme:
#FFFFFF
' -
Dark theme:
#153043
-
-
Check the Contrast Ratio value. It should be 3.0 or higher for each background.
If the contrast ratio is 3.0 or higher on both backgrounds, your logo will display correctly in the Kommo interface.
Make sure your widget meets the requirements of this checklist in every language you submit.
- Your widget is fully translated and contains no words in other languages.
- Your images don't contain words in other languages.
- Every link in your integration leads to a resource as well as all media content should be provided in the required language. It’s ok to have videos in English, but there should be subtitles in other languages as a part of localization. International domains are allowed and site names in tabs must also be translated.
- Provide a link to a privacy policy in the language of your integration. You can use Kommo privacy policy as an example: EN: https://www.kommo.com/privacy/ ES: https://www.kommo.com/es/privacidad/ PT: https://www.kommo.com/br/politica-de-privacidade/
- The Policy must necessarily indicate the details of the legal entity.
- You must offer human support in the language:
- If emailed, support must be in that language
- If called, support must be in that language
- Your widget takes local formatting into account, such as dates, time format, numbers, phone numbers, local holidays, taxes, etc.
- If your widget is not free you must offer payment methods that work in countries you consider your target audience.
- You can offer pricing in as many currencies as you want, but at least you must support USD or Euros.
The more readable and understandable your code is, the faster we will be able to check it.
- Your integration uses oAuth 2.0.
- You’ve deleted any files, pictures and scripts that are not used in the integration.
- Avoid minification and/or obfuscation of files because it complicates and slows down moderation process.
- All text files .js, .css, .json, .md, etc are in UTF-8 encoding without BOM, and also use Unix line feed (
\\ n
). - The archive you upload must not be identical to the archive of the integration that is already published in the Marketplace.
- Your widget.zip contains the following files:
- manifest.json
- i18n/*.json
- Images
- logo.png
- logo_main.png
- logo_medium.png
- logo_min.png
- logo_small.png
- All comments are relevant and explanatory:
✅
// get account id.
❌// var a = APP.constant(‘account’).id
- You’ve deleted all test data, debug, alerts, or other development traces that are not used in the integration.
- Using eval is not allowed because we can't trust the source of the code it executes.
- You do not use console.trace outside the following blocks:
catch
blockonRejected Promise
argument
- All other methods of the console object, as well as other uses of
console.trace
, can lead to console clutter. - All variables in the widget are declared before use and the syntax is correct.
- The widget shouldn't affect the data in the global variable APP, it can only read data from there. The list of acceptable accesses is described in the article Environment variables. We don't guarantee the work of undocumented environment variables in the future, so we strongly recommend that you do not use them.
- When working with the network, you shouldn't:
- use synchronous requests (
async: false
), as this slows down the loading of other scripts, which ultimately affects the loading speed of the service pages - send requests to the Kommo API in cycles
- use the
crm_post
and$authorizedAjax
methods in cycles
- use synchronous requests (
Your manifest.json file contains:
- widget
- name
- description
- short_description
- locale
- installation
- locations
- settings
No need to specify the scope in the manifest (in the “locations” parameter) that you don't use in the integration.
- Your localization files contain text in the appropriate language
- All links in en.json, es.json or pt.json files lead to sites in English, Spanish or Portuguese respectively.
- There must be no manipulation with global CSS selectors:
Not allowed:input { background: red; }
- Your widget doesn't use the classes of our system in CSS files. All styles are specified relative to the root widget selector:
Allowed:
#kommo_widget_code .control-select { color: green }
Not allowed:
.control-select { color: red }
- All comments are relevant and explanatory:
Allowed:
// our signature color
Not allowed:
// background: #fafafa;
- All style files required in documentation are included.
Make sure that the integration displays correctly in Kommo’s dark theme. All visual elements, text, buttons, and links must remain readable and maintain sufficient contrast. You can learn more about the dark theme in the article Dark Theme.
- The integration doesn't include external dependency files through
document.createElement
(script
) and doesn't insert this element directly into the head. - All external dependencies are connected via requireJS in the dependency block in
define
. - Additional plugins or other external connections to the widget are not loaded from external resources with the exception of public libraries.
Here is a list of external resources that is advisable to use when connecting libraries, as you can't load your own libraries there:
jQuery CDN
- https://developers.google.com/speed/libraries/
- https://docs.microsoft.com/en-us/aspnet/ajax/cdn/overview
And here’s a list of external resources that can be used when connecting libraries, but we will check each used library:
- The integration doesn't connect styles from an external CDN if the requested file contains at least one global selector. The integration uses only trusted CDS, if any.
- You can use an iframe in your code, but it has one limitation: you can't execute code received from an iframe.
The integration code is not based on and doesn't contain any switcher styles (switcher_on
, switcher_off
) - they will be removed from the system. The val()
value must be provided instead.
- Your integration can only be installed when a user clicks the Install button (you must not add any virtual clicks that automatically install the widget).
- The user is able to disable the integration at any time.
- Your integration makes changes only to interfaces included in this list.
- Changing the left menu is prohibited, except for cases described in the documentation .
- If the integration adds a page to the Settings section, then the page must:
- have a unique name that doesn't mislead users
- be located after Kommo pages
- The integration doesn't overlap Kommo controls or prevent users from interacting with Kommo.
- Your widget isn't placed at the bottom of the screen to extend the interface vertically.
- If your integration uses drag & drop, the drop area must not be located:
- in the Kommo left menu bar
- in the top right corner, where system controls such as settings, save, import, etc. are located
- When saving integration settings, the Save button must be at the bottom of the modal window.
- It is prohibited to add your own blocks to the trigger selection modal window.
- If the integration doesn't require settings, then a virtual click on the Save button is allowed. Virtual clicks on the Install and Uninstall buttons are prohibited.
