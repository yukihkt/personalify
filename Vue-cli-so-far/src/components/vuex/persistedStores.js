// various storage methods for vuex-persistedstate
import SecureLS from "secure-ls";
import Cookies from "js-cookie";

// SecureLS: encrypted local storage
export const lsStore = () => {
  // encodingType: 'aes' or don't have it on
  const ls = new SecureLS({ isCompression: false });
  return {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  };
};

// JS-Cookie: using cookies to store information, with an expiry date on the cookie
export const cookieStore = () => {
  return {
    getItem: (key) => Cookies.get(key),
    setItem: (key, value) =>
      Cookies.set(key, value, { expires: 7, secure: true }),
    removeItem: (key) => Cookies.remove(key),
  };
};

// sessionStore: storage via the session storage, non-encrypted, cleared when browser is closed
export const sessionStore = () => window.sessionStorage;
