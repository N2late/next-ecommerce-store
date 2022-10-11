import Cookies from 'js-cookie';

type CartCookie = {
  id: string;
  quantity: number;
};

export function getParsedCookie(key: string): CartCookie[] | undefined {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}

export function setStringifiedCookie(key: string, value: CartCookie[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function deleteAllCookies(key: string) {
  Cookies.remove(key);
}
