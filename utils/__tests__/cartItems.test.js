import { cartTotalCost } from '../cartItems';

test('Function returns the total cost of the products in the cart', () => {
  // setup
  const items = [
    {
      id: 1,
      name: 'Book 1',
      author: 'Author 1',
      price: '22.50',
      quantity: '7',
    },
    {
      id: 5,
      name: 'Book 5',
      author: 'Author 5',
      price: '17.90',
      quantity: '2',
    },
  ];
  const totalExpected = '193.30';

  // exercise
  const totalReceived = cartTotalCost(items);

  // assert
  expect(totalReceived).toBe(totalExpected);
});
