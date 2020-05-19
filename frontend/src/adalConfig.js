import { AuthenticationContext, AdalConfig } from 'react-adal';
import {adalFetch} from "react-adal/lib/react-adal";

const adalConfig = {
    tenant: '8adf30d5-020e-4f24-861d-ed4f95e712a5',
    clientId: 'ae109ae2-1dae-406e-ae47-158b6bb6c69c',
    redirectUri: 'http://localhost:3000',
    endpoints: {
        api: 'ae109ae2-1dae-406e-ae47-158b6bb6c69c'
    },
    cacheLocation: 'sessionStorage',
    postLogoutRedirectUri: window.location.origin
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) => {
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options)
}
export const getToken = () => authContext.getCachedToken(adalConfig.clientId);