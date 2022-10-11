import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { totalNumberOfProducts } from '../pages/_app';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

const bookCardContainer = css`
  padding-top: 2%;
  width: 200px;
  height: 410px;
  box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  &:hover {
    border: 1px solid aquamarine;
    transform: scale(1.02);
  }

  button {
    width: 100%;
    height: 8%;
    position: absolute;
    bottom: 0px;
    border-radius: 0 0 10px 10px;
    border: none;
    background-color: aquamarine;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(1.02);

    img {
      filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)
        brightness(95%) contrast(80%);
    }

    span {
      padding-left: 5px;
      color: #0390e3;
      opacity: 0.6;
      font-weight: 550;
    }
  }

  button:hover {
    font-size: 1.05rem;
    cursor: pointer;
  }
  button:active {
    border-radius: 10px;
    transform: scale(0.95);
    cursor: pointer;
  }
`;

const bookDetailsStyle = css`
  padding: 10px;

  h4 {
    padding-bottom: 7px;
    height: 39px;
    overflow: hidden;
  }
  p {
    padding-top: 4px;
  }
`;

const priceStyle = css`
  color: grey;
  font-size: 1.2rem;
  position: absolute;
  bottom: 40px;
  width: 100%;
`;

function BookCard({ book, setNumberOfProducts }) {
  return (
    <div css={bookCardContainer}>
      <div>
        <Link href={`/books/${book.id}`} data-test-id={`product-${book.id}`}>
          <Image src={`/images/${book.id}.jpg`} width="160" height="238" />
        </Link>
      </div>
      <Link href={`/books/${book.id}`}>
        <div css={bookDetailsStyle}>
          <h4>{book.name}</h4>
          <p>{book.author}</p>
        </div>
      </Link>
      <Link href={`/books/${book.id}`}>
        <div css={priceStyle}>
          <p>
            € <span>{book.price}</span>
          </p>
        </div>
      </Link>
      <button
        data-test-id={`bookCard-${book.id}`}
        onClick={() => {
          const currentCookieValue = getParsedCookie('cart');
          if (!currentCookieValue) {
            setStringifiedCookie('cart', [
              {
                id: book.id,
                quantity: 1,
              },
            ]);
            totalNumberOfProducts(setNumberOfProducts);
            return;
          }

          const foundCookie = currentCookieValue.find(
            (cookieBookObj) => cookieBookObj.id === book.id,
          );

          if (!foundCookie) {
            currentCookieValue.push({
              id: book.id,
              quantity: 1,
            });
          } else if (
            (foundCookie.quantity === 10) |
            (foundCookie.quantity === '10')
          ) {
            return foundCookie.quantity;
          } else {
            foundCookie.quantity++;
          }

          setStringifiedCookie('cart', currentCookieValue);
          totalNumberOfProducts(setNumberOfProducts);
        }}
      >
        <Image
          src="/images/cart-icon.png"
          all="cart icon"
          width="25"
          height="25"
        />
        <span>Add to cart</span>
      </button>
    </div>
  );
}

export default BookCard;
