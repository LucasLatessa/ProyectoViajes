import React from "react";
import ReactDOM from "react-dom"; // Cambia esta línea
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

ReactDOM.render( // Cambia esta línea
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      audience: audience,
      redirect_uri: redirectUri,
    }}
    cacheLocation="localstorage"
    useRefreshTokens={true}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root") // Asegúrate de que esta línea esté al final
);
