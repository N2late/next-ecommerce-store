import Head from 'next/head';
import { booksContainer, innerBooksContainer } from '../';
import BookCard from '../../components/BookCard';
import { Book, getBooks } from '../../database/books';

type Props = {
  listOfBooks: Book[];
  setNumberOfProducts: (totalQuantity: number) => void;
};

function AllBooks({ listOfBooks, setNumberOfProducts }: Props) {
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

export async function getServerSideProps() {
  const books = await getBooks();
  return {
    props: {
      listOfBooks: books,
    },
  };
}
