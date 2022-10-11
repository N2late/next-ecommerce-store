const books = require('../database/books.cjs');

exports.up = async (sql) => {
  await sql`insert into books ${sql(books)}`;
};

exports.down = async (sql) => {
  for (const book of books) {
    await sql`
	DELETE FROM
	 books
	WHERE
		name=${book.name}`;
  }
};
