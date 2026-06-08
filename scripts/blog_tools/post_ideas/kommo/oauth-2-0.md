---
title: "OAuth 2.0"
source: "https://developers.kommo.com/docs/oauth-20"
date: "2025-06-08"
---

OAuth is a well known authorization framework that enables applications to obtain limited access to user accounts. OAuth defines four roles:
- Resource owner is the user who authorizes the application to access their account, with a limit to the scope of the authorization that can be granted.
- Resource server is the server that hosts the protected resources.
- Client is the application that wants to access the user’s account.
- Authorization Server verifies the identity of the user then issues access tokens to the application.
When a client needs access to a protected resource, they verify their identity with the authorization server. Upon approval from the resource owner, the authorization server issues an access token.
This token represents a specific scope, lifetime, and other access attributes that are different from the credentials of the resource owner. This token can be used by the client to access the protected resources hosted by the resource server.
Below is a diagram of how OAuth roles generally interact with each other.
A user account in Kommo refers to the resource owner in OAuth terms. In this context, your integration acts as the client and will access and utilize data in user accounts on the Kommo server (the resource server) based on the permissions requested and granted. The Kommo account where integrations are created is referred to as the developer account. Upon obtaining it, you will receive OAuth application credentials.
Here’s our reasons to use to OAuth:
- More secure:
We need OAuth to allow an integration to have granular access to Kommo account user’s data, without revealing the user’s credentials to the integration. It is a big advantage of the OAuth method over the API-keys one. - Manage permissions:
When a user interacts with an integration that uses OAuth for authentication, they will be directed to a page where they can choose whether to grant the integration access to their account. When making the request, they will see the specific data that the integration will be able to access. OAuth's role is to ensure that these permissions are handled securely and correctly.
- Installing integrations:
Kommo users don’t have to go to their Kommo accounts to find your integration (application) and install it. As a developer, you can provide a button on your site, or a webhook URL to install a widget in order to grant integration access to the accounts.
- Support developer:
When developing an integration (application) and needing to test it, you don’t have to go through the entire OAuth authorization process. Instead, you can use your developer account with administrator rights, copy keys from the installed integration's modal window, and access account data without redirection.
In order for an integration to gain access to the user account data, it needs to be installed/enabled in the account. An installation is the connection between an integration and the specific user account.
When a user installs an integration in an account, they will receive a temporary identifier called authorization code.
- The Integration can be installed in more than one account by one user, and different users can install it in the same account using the button on the site method. In this case the integration appears just once in the installed integrations and a different authorization code will be produced.
- If your integration has its own authorization (for example, an API key), you should carefully monitor installations with the same authorization data to prevent duplication/theft of information. The user can find the installed integrations in the Settings ➡Integrations section ➡Installed
- Users without administrator rights can't install an integration, but they can authorize an installed integration.
To initially obtain a pair of access and refresh tokens, you will need an authorization code. This code can be found in the interface or through a Redirect URI if the authorization was initiated from a modal window for permissions. The code expires after 20 minutes. It is important to note that the code is not hidden and can be seen in server requests by users. Therefore, within the OAuth 2.0 protocol, it must be exchanged for refresh and access tokens using the keys of the apps that are only known to you.
When integration is installed in one account by different users, there will be multiple authorization codes and access/refresh tokens.
The account administrator can view a list of users who have been granted integration access in the authorization section of the widget modal window. From this section, the administrator can also revoke access. To handle the deactivation event (uninstall), the integration developer can subscribe to the revoke access event in the integration settings section using a webhook.
This is a string in JSON Web Token standard, which is used to access Kommo services from identified users. It’s kind of an equivalent to the session ID. Each access token has:
- User ID: the ID of the user that the token is linked to
- Integration ID: the ID of the integration that the token is linked to
- Set of actions available in the application
- Account ID: the id of the account that the token is linked to
The access token has a limited lifespan (24 hours) and can be obtained using an authorization code or refresh token.
It is an additional string that is issued with the access token. It is used to refresh and update the access token whose lifespan is about to expire. The refresh token has a lifespan of 3 months, and on each update of the access token a new refresh token is generated. Each time a session expires, you will need to update both tokens, and you cannot use the old key.
If after three months the integration has not been used, the refresh token will then be revoked. This means that the user who was granted access will need to be granted access again.
Let’s take a look at the full process of getting access to data, starting from the registration of a new integration. We will consider working directly with the authorization API, but you can use pre-made libraries to simplify development.
We developed the authorization on the base of the OAuth 2.0 protocol, that’s why you can find in open source a lot of examples and documentation, that describes the logic of making requests.
Integrations are used to enable your application/service to send requests to the API of Kommo.
The first step is to go to Settings ➡ Integrations ➡ Create Integration
- To create an integration, you need to have account administrator rights.
- Integration will be assigned to this account. This means that any of the administrators of this account will be able to manage the integration and will have access to its shared keys. Such an account will be treated by us as a developer account.
- If you are developing a public integration, you need to familiarize yourself with the requirements.
After clicking on the Create Integration button, a form appears containing the integration properties.
After filling out the form, save the integration. Kommo will generate and will show necessary keys in the keys and scopes tab. You will use the authorization code in the authorization process. Secret key and Integration ID will be used independently from the account, in which it will be installed.
Secret key is displayed only once after issue and is hidden by default so be sure you've saved it on your side. Upon pressing Generate secret key button you will get a warning tab saying that you are about to generate your new secret key.
You can regenerate it anytime you need, but note that all the previous access to the integration linked to the old key will be revoked.
After a Secret key is issued you can copy it and save for further usage.
There is a possibility to remain all the access to the integration if you are working with a public one. When regenerating your Secret key you can choose whether to delete old authorizations or not by checking the appropriate box
You can get the Authorization code in three ways:
- Copy it from the modal window of the installed integration. This will work if you need to integrate only one account of Kommo.
- If your integration has a widget, then after installing it you will have a webhook sent to the Redirect URl.
- Get the code after the user gets redirected to the Redirect URl.
You can simplify development when getting a key via GET-parameters with Kommo button on the site.
- Generate the link for users to go to. You need to send a user to URL .
-
https://www.kommo.com/oauth?client_id={Integration_ID} &state={parameter_of_the_state_that_will_be_sent_to_you_to_Redirect_URl} &mode={popup_or_post_message}
Integration_ID
is already known to you from the modal window of the installed integration.
Thestate
parameter is generated by your string parameter, maybe your hash.state
is needed so that when you receive a response from Kommo, you can verify its validity by comparing the sent token and the resulting one to make sure there is no CSRF substitution.
Themode
parameter is responsible for processing the request to the Redirect URI. In thepopup
method, the authorization window will be closed, and the transition to the Redirect URI will be performed in the main window. If thepost_message
value is passed, the redirection will occur in the window that was opened. After processing the authorization code, you need to close the window.
Also, you can display information about the status of the action in the main window using the method[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
.
It's crucial that the entire process is transparent to the user. When users click on the link, they should be aware that the request for permissions will take place within their Kommo account. Additionally, they need to be clear on which integration they are attempting to install.
- When the user clicks on the link, they will see the name of your integration along and the list of permissions that the integration requires.
- If the user is not authorized, they will be asked to authorize in Kommo. Otherwise, they will be able to choose from accounts where they are the administrator. For private integrations, the list will be limited to one account.
- After selecting an account and clicking on the button Allow, the integration will be installed in the selected account and the user will be redirected in modal or in the main window, depending on the parameter mode. They will be redirected to the Redirect URl that you indicated on the setup stage of the integration, with GET-parameters:
code
,referrer
,state
,from_widget
.
Parametercode
has Authorization code, parameterreferer
represents the address of the account user, parameterstate
is the string that you passed when opening the window. If no string was passed, this parameter will not be returned. If we send a webhook after installing the widget, then you will additionally receive the GET parameterfrom_widget
.
{Redirect URl}?code=XXX&state={state}&referer={subdomain}.kommo.com&client_id={Integration Id}
- In case if the user clicks on the button Decline, he will be redirected to the Redirect URl with GET-parameter
error=access_denied
, and with GET-parameterstate
, if it was sent before.
{Redirect URl}?error=access_denied&client_id={Integration Id}&state={state}
Example of processing authorization, if a parameterpost_message
was sent
When passing the GET-parameter mode with value post_message
in the window to allow access, the redirect will happen in the same window. Below we will discuss examples of interaction between the modal window to allow access and the main window using the postMessage function.
The code below is from the main window:
var popup;
auth();
// 1. Opens window to grant access
function auth() {
popup = window.open('https://www.kommo.com/oauth?client_id=XXX&state=XXX&mode=post_message', 'Allow Access', 'scrollbars, status, resizable, width=750, height=580');
}
// 2. Registering a message handler from the popup window
window.addEventListener('message', updateAuthInfo);
// 3. The handler function registered above
function updateAuthInfo(e) {
if (e.data.error !== undefined) {
console.log('Error - ' + e.data.error)
} else {
console.log('Authorization completed')
}
// 4. Closing the modal window
popup.close();
}
The code below will be sent to the modal window from your backend server when the user gets to Redirect URl:
<!doctype html>
<html lang="en">
<head>
<title>OAuth Postback</title>
<script>
//Passing data to the main window, the data set is defined by you
if(window.opener){
window.opener.postMessage({'error': undefined, 'status': 'ok'}, "*");
}
</script>
</head>
</html>
After processing the code above, the main window will indicate the result.
We recommend closing the modal window automatically, as is done in the example, so that users don’t get confused.
After getting the authorization code, you need to make a request to a special POST method /oauth2/access_token
, as explained below. As a response, you’ll get a pair of access and refresh tokens and the time in seconds until the tokens will expire.
The access token is similar to a session key. It can be saved in the integration and used for API requests until its lifetime expires. The token must be accessible only to your integration, that’s why we recommend not saving it in browser cookies, or open configuration files, etc.
From the previous section you may have noticed that we get a Refresh token with an access token. It is required to continue working with API, after the expiration of the access token.
A refresh token has two duration limitations:
- The refresh token lifespan is 3 months. If an integration is not used in 3 months, no request was made to actualize the token, then the integration will lose access to data and it’s required to ask for permission from the user again.
- Once a refresh token is used to get a new pair of access & refresh tokens, the old refresh token becomes outdated. Once you get a new refresh token you need to save it, otherwise, you’ll need to re-request access from the user.
Once the expiration date has passed, it is no longer possible to obtain an access token from the refresh token. You will need to request a method using a valid refresh token in order to exchange it. As a result, you will receive new access and refresh tokens in response.
When sending the refresh token, you get a new pair of tokens: access and refresh, but the old refresh token will still be functional and you can use it until you use the new one.
Let’s consider the following scenario:
- When an access token expires, the integration sends the refresh token to get a new access token, and as usual Kommo returns a new refresh token with it.
- A network error happens and the integration didn’t get the new access and refresh tokens.
- The integration in this case should send the old refresh token, which is still valid, to get new access and refresh tokens.
With the help of the received access token, you can make requests to all methods of API, for which a token has enough permissions. The token has the rights of the user who granted access.
You have the option to specify the address to which the request will be sent when the integration is disabled.
Once the hook is received, you will be able to disable the integration and restrict requests to the account in which the disconnection occurred.
We suggest providing this link as it will assist you in avoiding unnecessary API requests and keeping track of when the integration was disabled.
Hook example
curl -X 'GET' 'https://mywebhook/dswdw223-4f19-das23-578cc313a887?client_uuid=01d01160-d7a0-4087-b4af-6a1bb83fcd1d&account_id=32720107&signature=353c0e2d55e79b2f49d5a2409b7dd786cf4376444159d41760fbe247fc17f3e3' -H 'user-agent: amoService-oAuth-Code-Sender/1.0' -H 'host: webhook.site'
Hook authentication
To make sure that the hook really came from Kommo and not from malicious users, it is recommended to check the signature
of the hook passed in the GET-parameter signature
, as well as the ID of the oauth-client
of the integration passed in the GET-parameter client_uuid
.
HMAC is passed as the hook signature
. This one is the concatenation of the integration client id
with the account_id
for which the token is revoked, the key is the secret key
of the integration, the encryption algorithm is sha256
.
<?php
// id of oauth client integration
$clientId = 'xxx';
// oauth-client integration secret key
$clientSecret = 'xxx';
if (empty($_GET['client_uuid']) || empty($_GET['signature']) || empty($_GET['account_id'])) {
throw new \HttpInvalidParamException('Wrong hook format');
}
$hookClientId = $_GET['client_uuid'];
$hookSignature = $_GET['signature'];
$hookAccountId = (int) $_GET['account_id'];
if ($clientId !== $hookClientId) {
throw new \Exception('Invalid hook signature');
}
if (!hash_equals(
hash_hmac('sha256', sprintf('%s|%s', $clientId, $hookAccountId), $clientSecret),
$hookSignature
)) {
throw new \Exception('Invalid hook signature');
}
// authentication passed, you can call your hook processing logic.
When working with the logic above, some exceptions that need to be handled may appear. Let’s take a look at all of them:
- If the user has not granted permission to access the account, and the Kommo button was used, a function passed as one of the parameters will be executed. If the page was opened without a button, and the user declines, a redirect will occur to the Redirect URI with the GET-parameter 'error=access_denied'.
- If the administrator of the account deactivated the installation of the integration, then the access token given to it will be revoked. When requesting API you will get HTTP code 401. To continue the work of the integration, the integrator must again obtain authorization for their integration from the user.
- If you didn’t save the actual refresh token, or it was lost or more than 3 months have passed, to continue the work of the integration, you need to go through the authorization process once again.
- If you lost the main keys of an integration, or you published them accidentally, then you can refresh the Secret key in the integration modal window of the account, where it was created. After refreshing the Secret key of the integration, you need to refresh the Secret key in the configurations of your integration.
- If a network error happened during the receiving of the new access and refresh tokens, the old refresh token would still work normally. The integration in this case should send the old refresh token, which is still valid, to get new access and refresh tokens.
