import { sql } from './connect';

export type Book = {
  id: number;
  name: string;
  author: string;
  description: string;
  genre: string[] | null;
  price: string;
};

// Get all books

export async function getBooks() {
  const books = await sql<Book[]>`
  SELECT * FROM books;`;
  return books;
}

// Get a single book by id
export async function getBookById(id: number) {
  const [book] = await sql<Book[]>`
  SELECT
   *
  FROM
   books
  WHERE
   id = ${id}
  `;
  return book;
}

// Create a book

export async function createBook(
  name: string,
  author: string,
  description: string,
  genre: string[] | null,
  price: string,
) {
  const [book] = await sql<Book[]>`
  INSERT INTO books
    (name, author, description, genre, price)
  VALUES
    (${name}, ${author}, ${description}, ${genre}, ${price})
  RETURNING *
  `;
  return book;
}

// Update a book
export async function updateAnimalById(
  id: number,
  name: string,
  author: string,
  description: string,
  genre: string[] | null,
  price: string,
) {
  const [book] = await sql<Book[]>`
  UPDATE
    books
  SET
    name = ${name},
    author= ${author},
    description= ${description},
    genre= ${genre},
    price= ${price}
  WHERE
    id = ${id}
  RETURNING *
  `;
  return book;
}

// delete a book
export async function deleteBookById(id: number) {
  const [book] = await sql<Book[]>`
  DELETE FROM
    books
  WHERE
    id = ${id}
  RETURNING *
  `;
  return book;
}
