import { css } from '@emotion/react';
import Image from 'next/image';
import { useState } from 'react';
import { totalNumberOfProducts } from '../pages/_app';
// import { updateCartCookieQtyValue } from '../utils/cartItems'; // will need this after the review for the logic I would like to have on the cart page.
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

// Will use this on my selector quantity after the review
// const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function CartItem({
  item,
  setNumberOfProducts,
  setListCartItems,
  listCartItems,
}) {
  // const [qty, setQty] = useState(item.quantity); // Will need the the setQty with the logic I want to use after the review.
  const total = (parseFloat(item.price).toFixed(2) * item.quantity).toFixed(2); // will need to replace the item.quantity for the qty state after the review.

  return (
    <div css={cartItemContainer} data-test-id={`cart-product-${item.id}`}>
      <div css={cardItemInnerContainer}>
        <div css={bookImageContainer}>
          <Image src={`/images/${item.id}.jpg`} width="70" height="100" />
        </div>
        <div css={textContainer}>
          <h4>{item.name}</h4>
          <p>{item.author}</p>
          <div css={removeProductBtn}>
            <button
              data-test-id={`cart-product-remove-${item.id}`}
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
          <p>Quantity</p>
          <p
            data-test-id={`cart-product-quantity-${item.id}`}
            style={{ textAlign: 'center' }}
          >
            {item.quantity}
          </p>
          {/* Will change to a selector after the review from the teachers. Personal choice considering UX and stock management.

          <label htmlFor="quantity"> </label>
          <select
            name="quantity"
            id="quantity"
            value={qty}
            onChange={(e) => {
              updateCartCookieQtyValue(item, e.currentTarget.value);
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
          </select> */}
        </div>
        <div>
          <p>
            € <span>{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
