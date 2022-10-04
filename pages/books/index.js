import Head from 'next/head';
import { booksContainer, innerBooksContainer } from '../';
import BookCard from '../../components/BookCard';
import { books } from '../../database/books';

function AllBooks({ listOfBooks, setNumberOfProducts }) {
  return (
    <>
      <Head>
        <title>Our Books</title>
        <meta name="description" content="List page of all books for sell" />
      </Head>
      <section>
        <div css={booksContainer}>
          <div css={innerBooksContainer}>
            {listOfBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                setNumberOfProducts={setNumberOfProducts}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AllBooks;

export function getServerSideProps() {
  return {
    props: {
      listOfBooks: books,
    },
  };
}
