import { css } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem';
import { books } from '../../database/books';
import { deleteAllCookies } from '../../utils/cookies';

const cartContainer = css`
  margin-top: 120px;
  width: 100%;
  height: auto;
`;
const cartInnerContainer = css`
  width: 50%;
  margin: 0 auto;
  h2 {
    color: rgb(3, 144, 227, 0.8);
  }
`;

const removeAllBtn = css`
  text-align: end;
  button {
    background-color: white;
    border: none;
    cursor: pointer;
    color: lightcoral;
    :hover {
      transform: scale(1.05);
    }
  }
`;

const itemContainer = css`
  width: 100%;
  margin: 0 auto;
`;

const totalSumContainer = css`
  text-align: end;
  margin-right: 30px;
  font-size: 1.2rem;
  border-top: 1px solid grey;
  h3 {
    padding: 10px;
  }
`;

const checkoutBtnContainer = css`
  text-align: center;
  a {
    color: blue;
  }
`;

const cartCheckoutBtn = css`
  width: 40%;
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  bottom: 0px;
  border-radius: 10px;
  border: none;
  background-color: rgb(3, 144, 227, 0.8);
  font-size: 1.15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  :active {
    border-radius: 10px;
    transform: scale(0.95);
    cursor: pointer;
  }
`;

export function cartTotalCost(items, setTotalCost) {
  const totalCost = items.reduce(
    (prev, curr) => prev + parseInt(curr.quantity) * parseFloat(curr.price),
    0,
  );
  setTotalCost(totalCost.toFixed(2));
}

function Cart({ items, setNumberOfProducts }) {
  const [listCartItems, setListCartItems] = useState(items);
  const [totalCost, setTotalCost] = useState('');
  useEffect(() => cartTotalCost(listCartItems, setTotalCost), [listCartItems]);

  return (
    <div css={cartContainer}>
      {listCartItems.length === 0 ? (
        <div css={cartInnerContainer}>
          <div>
            <h2>There are no items in your cart</h2>
          </div>
          <br />
          <Link href="/books">Continue Shopping</Link>
        </div>
      ) : (
        <div css={cartInnerContainer}>
          <div>
            <h2>Items in your cart</h2>
          </div>
          <div css={removeAllBtn}>
            <button
              onClick={() => {
                deleteAllCookies('cart');
                setNumberOfProducts('');
                setListCartItems([]);
              }}
            >
              {' '}
              Remove All
            </button>
          </div>
          <div css={itemContainer}>
            {listCartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                setNumberOfProducts={setNumberOfProducts}
                setListCartItems={setListCartItems}
                listCartItems={listCartItems}
              />
            ))}
          </div>
          <div css={totalSumContainer}>
            <h3>
              Total <span>€ {totalCost}</span>
            </h3>
          </div>
          <div css={checkoutBtnContainer}>
            <button css={cartCheckoutBtn}>Proceed to Checkout</button>
            <Link href="/books">Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

export function getServerSideProps(context) {
  const parsedCookies = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];
  if (parsedCookies.length === 0) {
    return {
      props: {
        items: [],
      },
    };
  }
  const filteredCardList = [];
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

  return {
    props: {
      items: filteredCardList,
    },
  };
}
