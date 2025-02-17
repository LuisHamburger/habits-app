import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_TOKEN_SECRET_KEY!;

export const encryptToken = (token: string) => CryptoJS.AES.encrypt(token, secretKey).toString();

export const decryptToken = (token: string) => CryptoJS.AES.decrypt(token, secretKey).toString(CryptoJS.enc.Utf8);
