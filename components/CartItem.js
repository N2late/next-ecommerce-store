import { css } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';
import { totalNumberOfProducts } from '../pages/_app';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

const cartItemContainer = css`
  padding: 40px;
`;

const cardItemInnerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const bookImageContainer = css``;

const textContainer = css`
  width: 25%;
  flex-wrap: wrap;
  p {
    font-size: 0.8rem;
  }
`;

const removeProductBtn = css`
  text-align: start;
  button {
    background-color: white;
    border: none;
    cursor: pointer;
    color: lightcoral;
    padding-left: 0;
    padding-top: 10px;

    :hover {
      transform: scale(1.05);
    }
  }
`;

const quantityStyle = css``;

const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function CartItem({
  item,
  setNumberOfProducts,
  setListCartItems,
  listCartItems,
}) {
  const [qty, setQty] = useState(item.quantity);
  const total = (parseFloat(item.price).toFixed(2) * qty).toFixed(2);

  return (
    <div css={cartItemContainer}>
      <div css={cardItemInnerContainer}>
        <div css={bookImageContainer}>
          <Image src={`/images/${item.id}.jpg`} width="70" height="100" />
        </div>
        <div css={textContainer}>
          <h4>{item.name}</h4>
          <p>{item.author}</p>
          <div css={removeProductBtn}>
            <button
              onClick={() => {
                const currentCookieValue = getParsedCookie('cart');
                const index = currentCookieValue.findIndex(
                  (obj) => obj.id === item.id,
                );
                currentCookieValue.splice(index, 1);
                setStringifiedCookie('cart', currentCookieValue);

                const itemIndex = listCartItems.findIndex(
                  (obj) => obj.id === item.id,
                );
                const updatedItemsList = [...listCartItems];
                updatedItemsList.splice(itemIndex, 1);
                totalNumberOfProducts(setNumberOfProducts);
                setListCartItems(updatedItemsList);
              }}
            >
              remove product
            </button>
          </div>
        </div>
        <div css={quantityStyle}>
          <label htmlFor="quantity"> </label>
          <select
            data-test-id="product-quantity"
            name="quantity"
            id="quantity"
            value={qty}
            onChange={(e) => {
              const currentCookieValue = getParsedCookie('cart');

              const foundCookie = currentCookieValue.find(
                (cookieBookObj) => cookieBookObj.id === item.id,
              );
              foundCookie.quantity = e.currentTarget.value;
              setStringifiedCookie('cart', currentCookieValue);
              setQty(e.currentTarget.value);
              totalNumberOfProducts(setNumberOfProducts);

              const updatedItemsList = listCartItems.map((el) =>
                el.id === item.id
                  ? { ...el, quantity: e.currentTarget.value }
                  : el,
              );
              setListCartItems(updatedItemsList);
            }}
          >
            {' '}
            {quantities.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>€ {total}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
