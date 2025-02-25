import { Localstorage } from "../enums/localstorage.enum";
import { decryptToken, encryptToken } from "./token.helper";

export const saveClientID = (clientID: string) => localStorage.setItem(Localstorage.CLIENT_ID, encryptToken(clientID));

export const getClientID = () => {
    const clientID = localStorage.getItem(Localstorage.CLIENT_ID);
    return clientID ? clientID : null
};

export const logOut = () => {
    localStorage.removeItem(Localstorage.CLIENT_ID);
    localStorage.removeItem(Localstorage.SESSION_TOKEN);

}

export const saveSessionToken = (token: string) => localStorage.setItem(Localstorage.SESSION_TOKEN, encryptToken(token));

export const getSessionToken = () => {
    const session = localStorage.getItem(Localstorage.SESSION_TOKEN);
    return session ? decryptToken(session) : null;
};
