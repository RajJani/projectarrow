//my-app/src/authProvider.js
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// Msal Configurations
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: 'cb1a48df-9b0a-403c-b4d5-7fb2cba2e1ba', //This is from the relevant App Registration in Azure
    redirectUri: 'http://localhost:3000' //for local development
    //redirectUri: 'https://white-tree-088f9f30f.1.azurestaticapps.net' //for SBX web app deployments
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: [
    'user.read'
  ]
}
 
// Options
const options = {
  loginType: LoginType.Redirect, //Can do .Popup if we want the login to be a popup and not a redirect
  tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)