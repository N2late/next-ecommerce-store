exports.up = async (sql) => {
  await sql`CREATE TABLE books(
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(100) NOT NULL,
		author varchar(50) NOT NULL,
		description varchar(1500) NOT NUll,
		genre varchar(100)[],
		price varchar(10) NOT NULL
	)`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE books`;
};
