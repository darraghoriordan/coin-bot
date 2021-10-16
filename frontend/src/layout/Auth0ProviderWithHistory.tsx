import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory: FunctionComponent = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
  const audience = import.meta.env.VITE_AUTH0_API_AUDIENCE as string;
  const apiScopes = import.meta.env.VITE_AUTH0_API_SCOPE as string;
  const history = useHistory();

  const onRedirectCallback = (appState: any) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
      scope={apiScopes}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
