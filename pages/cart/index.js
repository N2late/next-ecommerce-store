import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem';
import { getBooks } from '../../database/books.ts';
import { cartTotalCost, getCardItems } from '../../utils/cartItems';
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

export const checkoutBtnContainer = css`
  text-align: center;
  a {
    color: blue;
  }
`;

export const cartCheckoutBtn = css`
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

function Cart({
  items,
  setNumberOfProducts,
  setOrder,
  totalCost,
  setTotalCost,
}) {
  const [listCartItems, setListCartItems] = useState(items);
  console.log(listCartItems);
  useEffect(() => {
    cartTotalCost(listCartItems, setTotalCost);
  }, [listCartItems, setTotalCost]);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Your cart</title>
        <meta
          name="description"
          content="Cart with all the items, quantities and price"
        />
      </Head>
      <div css={cartContainer}>
        {listCartItems.length === 0 ? (
          <div css={cartInnerContainer}>
            <div>
              <h2>There are no items in your cart</h2>
            </div>
            <h3>
              Total €
              <span data-test-id="cart-total">
                {totalCost > 0 ? totalCost : 0}
                {console.log(typeof totalCost)}
              </span>
            </h3>
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
                Total €
                <span data-test-id="cart-total">
                  {totalCost > 0 ? totalCost : 0}
                </span>
              </h3>
            </div>
            <div css={checkoutBtnContainer}>
              <button
                data-test-id="cart-checkout"
                css={cartCheckoutBtn}
                onClick={() => {
                  setOrder({ ...items, cost: totalCost });
                  router
                    .push('/cart/checkout')
                    .catch((error) => console.log(error));
                }}
              >
                Checkout
              </button>
              <Link href="/books">Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;

export async function getServerSideProps(context) {
  const items = await getCardItems(context, getBooks);

  return {
    props: {
      items: items,
    },
  };
}
