# Next.js E-commerce Store
 A mockup E-commerce Store build with Next.js as part of one of the projects for the Upleveled Bootcamp. 
 In this project you can buy books of different genres, add them to your cart, confirm que cart items and total, checkout your order with the shipping and cart details  and finish the process with a thank you page. 

## Technologies

- Next.js
- TypeScript
- Emotion
- PostgresSQL
- Ley
- Jest
- Playwright
- GitHub Workflows
- Fly.io 

## Main Requirements for the Project

- Design and develop an ecommerce store using Next.js.
- A Products page (where all the products are listed)
- A page for each single product (when you click on the product it goes to this page) with ability to add a quantity to the cart
- A Cart page (containing a list where products appear when you click on the "Add to cart" button on the single product page), which also shows the total price of all products
- A Checkout page which shows the total and asks for shipping and payment information (when you click on the "Checkout" button on the Cart page it navigates to the checkout page)
- A Thank You page after a checkout has been completed
- A header with a link to the Cart, showing the number of items in the cart
- Use a cookie called "cart" to store information about what the user has added to their cart
- Create a PostgreSQL database and table(s)
- Connect to and query information from this database
- Write at least 2 pages and 2 components in TypeScript or JSDoc
- E2E: Add to cart, change quantity and remove from cart
- E2E: Checkout flow, payment page, thank you page
- Unit: Test functions for adding and removing info from cookie
- Unit: Test function for updating quantity in item of cookie (eg. adding an item to the cart that already exists)
- Unit: Test cart sum function
- Set up GitHub Actions to automatically test your code
- Add titles to all pages (SEO)
- Add meta descriptions to all pages (SEO)
- Deploy to Fly.io
- Create a readme

## Setup instructions

Clone the repository and install all dependencies

```bash
git clone https://github.com/N2late/next-ecommerce-store.git
cd next-ecommerce-store
yarn
```

