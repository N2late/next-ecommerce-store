import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getBooks } from '../../database/books.ts';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';
import { totalNumberOfProducts } from '../_app';

const bookDetailsContainer = css`
  margin-top: 120px;
  width: 100%;
  height: auto;
`;
const bookDetailsInnerContainer = css`
  display: flex;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  text-align: center;
`;
const bookImageContainer = css`
  width: 50%;
`;
const bookTextContainer = css`
  width: 50%;
  text-align: start;
  line-height: 1.4;
`;

const lineStyle = css`
  width: 75px;
  background-color: #47b5ff;
  overflow: hidden;
  border: 3px solid #47b5ff;
  margin-bottom: 30px;
`;

const genresStyle = css`
  margin-top: 2px;
  font-size: 0.9rem;
  color: gray;
  opacity: 0.9;
`;

const priceStyle = css`
  font-size: 1.7rem;
  color: #18a53b;
  font-family: Merriweather, serif;
  font-weight: 700;
  margin: 20px 0 20px 0;
  opacity: 0.9;
`;

const descriptionStyle = css`
  text-align: justify;
  white-space: pre-wrap;
  font-size: 0.9rem;
`;

const quantityStyle = css`
  width: 120px;
  margin-top: 20px;
  font-size: 0.9rem;
  > select:hover {
    cursor: pointer;
  }
`;

export const cartBtn = css`
  width: 40%;
  height: 40px;
  margin-top: 20px;
  bottom: 0px;
  border-radius: 10px;
  border: none;
  background-color: rgb(3, 144, 227, 0.8);
  font-size: 1.15rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(180deg)
      brightness(100%) contrast(110%);
  }

  span {
    padding-left: 5px;
    color: white;
    font-weight: 550;
  }
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

function BookDetails({ book, setNumberOfProducts }) {
  const [qty, setQty] = useState(book.quantity);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // will need this after the review for the logic I would like to implement. This mimics the stock that ideally would come from the database.
  return (
    <>
      <Head>
        <title>Book: {book.name}</title>
        <meta name="description" content={book.description} />
      </Head>
      <div css={bookDetailsContainer}>
        <div css={bookDetailsInnerContainer}>
          <div css={bookImageContainer}>
            <Image
              src={`/images/${book.id}.jpg`}
              width="300"
              height="450"
              data-test-id="product-image"
            />
          </div>
          <div css={bookTextContainer}>
            <div>
              <div css={lineStyle}> </div>
              <h1>{book.name}</h1>
              <p>
                by <strong>{book.author}</strong>
              </p>
              <div css={genresStyle}>
                {book.genre.map((genre, index) =>
                  book.genre.length - 1 > index ? (
                    <span>{genre}, </span>
                  ) : (
                    <span>{genre}</span>
                  ),
                )}
              </div>
            </div>
            <div css={priceStyle}>
              <p>
                € <span data-test-id="product-price">{book.price}</span>
              </p>
            </div>
            <p css={descriptionStyle}>{book.description}</p>
            <div css={quantityStyle}>
              <label htmlFor="quantity">Quantity: </label>
              <select
                data-test-id="product-quantity"
                name="quantity"
                id="quantity"
                value={qty}
                onChange={(e) => setQty(e.currentTarget.value)}
              >
                {' '}
                {quantities.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <button
              data-test-id="product-add-to-cart"
              css={cartBtn}
              onClick={() => {
                const currentCookieValue = getParsedCookie('cart');
                if (!currentCookieValue) {
                  setStringifiedCookie('cart', [
                    {
                      id: book.id,
                      quantity: qty,
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
                    quantity: qty,
                  });
                } else {
                  foundCookie.quantity =
                    Number(foundCookie.quantity) + Number(qty);
                }

                setStringifiedCookie('cart', currentCookieValue);
                totalNumberOfProducts(setNumberOfProducts);
              }}
            >
              <Image
                src="/images/cart-icon.png"
                all="cart icon"
                width="30"
                height="30"
              />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;

export async function getServerSideProps(context) {
  // Getting the bookId from the URL
  const bookId = context.query.bookId;

  // Checking if there is a cookie with the name quantity. If there is, it is parsing it and if there
  // is not, it is setting it to an empty array.
  const parsedCookies = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];

  const books = await getBooks();
  // Finding the book with the id that matches the bookId in the URL
  const foundBook = books.find((book) =>
    book.id.toString() === bookId ? book : undefined,
  );

  if (!foundBook) {
    return {
      notFound: true,
    };
  }

  // Checking if the book is already in the in the cookies and if it is, it is getting the quantity of that book from the cookies. If it is not in the cookies, it is setting the quantity to 1.
  const quantity =
    parsedCookies.find((cookieBookObj) => foundBook.id === cookieBookObj.id)
      ?.quantity || 1;

  const bookInfo = { ...foundBook, quantity: quantity };

  return {
    props: {
      book: bookInfo,
    },
  };
}
