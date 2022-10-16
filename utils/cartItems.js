import { getParsedCookie, setStringifiedCookie } from './cookies';

export async function getCardItems(context, getBooks) {
  const filteredCardList = [];
  const parsedCookies = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];
  if (parsedCookies.length === 0) {
    return filteredCardList;
  }

  const books = await getBooks();
  parsedCookies.map((cookie) => {
    books.find((book) =>
      book.id === cookie.id
        ? filteredCardList.push({
            id: book.id,
            name: book.name,
            author: book.author,
            price: book.price,
            quantity: cookie.quantity,
          })
        : null,
    );
    return 1;
  });
  return filteredCardList;
}

export function updateCartCookieQtyValue(item, qty) {
  const currentCookieValue = getParsedCookie('cart');

  const foundCookie = currentCookieValue.find(
    (cookieBookObj) => cookieBookObj.id === item.id,
  );
  foundCookie.quantity = qty;
  setStringifiedCookie('cart', currentCookieValue);
}

export function cartTotalCost(items = 0, setTotalCost = () => {}) {
  if (items === 0) {
    return 0;
  }
  const totalCost = items.reduce(
    (prev, curr) => prev + parseInt(curr.quantity) * parseFloat(curr.price),
    0,
  );
  setTotalCost(totalCost.toFixed(2));
  console.log(typeof totalCost);
  return totalCost.toFixed(2);
}
