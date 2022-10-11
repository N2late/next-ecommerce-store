import { updateCartCookieQtyValue } from '../cartItems';
import {
  deleteAllCookies,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies';

describe('set, gets and delete a cookie', () => {
  // setup
  const item = { id: 3 };
  const cookieKey = 'cart';
  const cookieValue = [{ id: 3, quantity: 7 }];
  test('set a cookie', () => {
    // exercise and assert
    // check if value of cookie starts as undefined (empty value)
    expect(getParsedCookie(cookieKey)).toBe(undefined);
  });
  test('set cookie value', () => {
    expect(() => setStringifiedCookie(cookieKey, cookieValue)).not.toThrow();
  });
  test('cookie value is present with the same structure and type', () => {
    expect(getParsedCookie(cookieKey)).toStrictEqual(cookieValue);
  });
  test('updates the quantity value in a key of a cookie', () => {
    // setup
    const qty = 10;
    const expectedValue = [{ id: 3, quantity: 10 }];
    // exercise
    setStringifiedCookie(cookieKey, cookieValue);
    updateCartCookieQtyValue(item, qty);
    // assert
    expect(getParsedCookie(cookieKey)).toStrictEqual(expectedValue);
  });
  test('deletes a given cookie', () => {
    expect(deleteAllCookies(cookieKey)).toBe(undefined);
    expect(getParsedCookie(cookieKey)).toBe(undefined);
  });
});
