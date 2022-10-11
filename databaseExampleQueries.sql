-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create books table
CREATE TABLE books(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(100) NOT NULL,
  author varchar(50) NOT NULL,
  description varchar(1500) NOT NUll,
  genre varchar(100)[],
  price varchar(10) NOT NULL
);

-- Insert some books (C in CRUD - Create)
INSERT INTO books
  (name, author, description, genre, price)
VALUES
  ('When Nietzsche Wept', 'Irvin D. Yalom', E'In 19th-century Vienna, a drama of love, fate, and will is played out amid the intellectual ferment that defined the era.\n \nJosef Breuer, one of the founding fathers of psychoanalysis, is at the height of his career. Friedrich Nietzsche, Europe''s greatest philosopher, is on the brink of suicidal despair, unable to find a cure for the headaches and other ailments that plague him. When he agrees to treat Nietzsche with his experimental "talking cure", Breuer never expects that he, too, will find solace in their sessions. Only through facing his own inner demons can the gifted healer begin to help his patient. \n \nIn When Nietzsche Wept, Irvin Yalom blends fact and fiction, atmosphere and suspense to unfold an unforgettable story about the redemptive power of friendship.', '{"Psychology", "Fiction"}', '22.50');


  -- Read some books (R in CRUD -Read)
  SELECT * FROM books;

  /* ('Post Office', 'Charles Bukowski', `"It began as a mistake." By middle age, Henry Chinaski has lost more than twelve years of his life to the U.S. Postal Service. In a world where his three true, bitter pleasures are women, booze, and racetrack betting, he somehow drags his hangover out of bed every dawn to lug waterlogged mailbags up mud-soaked mountains, outsmart vicious guard dogs, and pray to survive the day-to-day trials of sadistic bosses and certifiable coworkers. \n\nThis classic 1971 novel--the one that catapulted its author to national fame--is the perfect introduction to the grimly hysterical world of legendary writer, poet, and Dirty Old Man Charles Bukowski and his fictional alter ego, Chinaski.`, {'Fiction'}, '18.50'); */