import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import { books } from '../database/books';

const heroContainerStyles = css`
  margin-top: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 500px;
`;

const innerHeroStyles = css`
  border-radius: 5px;
  background-image: url('/images/hero.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  width: 80%;
  text-align: end;
  h1 {
    padding-right: 100px;
  }
  p {
    padding-inline-end: 75px;
    font-size: 3rem;
    color: green;
  }
`;
const titleStyles = css`
  font-size: 5rem;
  color: #47b5ff;
  font-family: cursive;
  font-weight: bold;
  text-align: start;
  margin-left: 160px;
`;

export const booksContainer = css`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

export const innerBooksContainer = css`
  margin: 0 auto;
  padding: 40px;
  padding-left: 8%;
  width: 75%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 40px;
`;

const seeMoreBtn = css`
  width: 10%;
  height: 40px;
  margin: 0 auto;
  color: white;
  background-color: #47b5ff;
  opacity: 0.9;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 550;

  :hover {
    transform: scale(1.05);
    opacity: 1;
    cursor: pointer;
  }
`;

export default function Home({ listOfBooks, setNumberOfProducts }) {
  return (
    <>
      <Head>
        <title>The books you want to buy and read</title>
        <meta
          name="description"
          content="Buy the most fantastic and incredible books. We have all kinds of genres"
        />
      </Head>
      <div css={heroContainerStyles}>
        <div css={innerHeroStyles}>
          <h1 css={titleStyles}>Pages</h1>
          <p>Where you can find your next story</p>
        </div>
      </div>
      <section>
        <div css={booksContainer}>
          <div css={innerBooksContainer}>
            {listOfBooks.map((book) =>
              book.id < 7 ? (
                <BookCard
                  key={book.id}
                  book={book}
                  setNumberOfProducts={setNumberOfProducts}
                />
              ) : null,
            )}
          </div>
          <Link href="/books">
            <button css={seeMoreBtn}>See more</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: {
      listOfBooks: books,
    },
  };
}
