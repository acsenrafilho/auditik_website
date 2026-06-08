---
title: "Permissions"
source: "https://developers.kommo.com/docs/permissions"
date: "2026-06-03"
---

Scope (List of permissions) is a set of actions on behalf of the user that is available for an integration via OAuth protocol.
Permissions are categorized into two groups:
- Access to account data based on user rights. All API methods are accessible, except for methods that interact with the Notification Center.
- Notification Center
The integration can only be installed by administrators and authorized by different users. Due to this, there are limitations on access rights to data based on the authorizer's permissions and rights.
Access granted by the account administrator is full. If the account user is deactivated or removed from the account, Access and Refresh token will continue to work.
If access was granted by the account administrator, then in this case the X-Context-User-ID header can be added to the API requests, where the value will indicate the ID of the user whose rights will be used when executing the request. If a non-existent or free account user is passed, authorization will be denied.
The account administrator has the ability to revoke access from any installed integration for any user. This can be done in the integration section within the modal integration window. Users are only able to revoke the access they have granted in their own profile. If access needs to be restored, permission must be requested from the account administrators and the users once more.
Notification about revoking access will be sent to the webhook (Access revoked notification webhook) specified when creating the integration.
If you changed the permissions for which your integration asks, you should ask users who already enabled it to grant access again.
Example:
When creating an integration, you didn’t choose access to the Notification center, and users already gave your integration limited scope access. After that, you edited the scope in the integration settings to make it full rights. This means users that had limited scope will continue to work in a limited scope. To obtain the new scope from the same users, you will need to ask for their permission again.
