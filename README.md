# Next.js E-commerce Store
 A mockup E-commerce Store build with Next.js as part of one of the projects for the Upleveled Bootcamp. 
 In this project you can buy books of different genres, add them to your cart, confirm que cart items and total, checkout your order with the shipping and cart details  and finish the process with a thank you page. 
 
 ![Screenshot](https://raw.githubusercontent.com/N2late/next-ecommerce-store/main/public/images/store_screenshot.png?raw=true)

![Screenshot](https://github.com/N2late/next-ecommerce-store/blob/main/public/images/store_screenshot_2.png?raw=true)

![Screenshot](https://github.com/N2late/next-ecommerce-store/blob/main/public/images/store_screenshot_3.png?raw=true)
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

## Setup

Clone the repository and install all dependencies

```bash
git clone https://github.com/N2late/next-ecommerce-store.git
cd next-ecommerce-store
yarn
```

Setup a database with postgres on your computer:

```bash
psql <login>
CREATE DATABASE <database name>;
CREATE USER <username> WITH ENCRYPTED PASSWORD '<pw>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Create a .env file with the environmental variables mentioned in the .env.example file.

Use migrations:

To add books table and insert books:

```bash
yarn migrate up 
```

To remove books and table:

```bash
yarn migrate down
```

# Deployment

1. Sign up on [Fly.io](https://fly.io/)
2. On the Fly.io Tokens page, generate a new Fly.io access token named GitHub Actions Deploy Token and copy it from the text box that appears - it will only be shown once
3. In your GitHub repo under Settings → Secrets → Actions, click the New repository secret button at the top right of the page and create a new token with the name FLY_API_TOKEN and the token you copied as the secret.
4. On the command line, log in to Fly.io using the following command and enter your credentials in the browser window that appears:
```bash
flyctl auth login
```
5. Create an app, specifying the name using only lowercase letters and dashes:
```bash
flyctl apps create --name <app name>
```
6. The confi files needed to deploy to Fly are already part of this repo. In the fly.toml change the name of the app to the same name you gave in fly.io.
7. Add database credentials using Fly.io secrets (the credentials will be randomly generated for security):
```bash
flyctl secrets set PGHOST=localhost PGDATABASE=$(openssl rand -hex 16) PGUSERNAME=upleveled$(openssl rand -hex 16) PGPASSWORD=$(openssl rand -base64 32)
```
8. Create a 1GB volume for the PostgreSQL database in the Frankfurt region:
```bash
flyctl volumes create postgres --size 1 --region fra
```
9. Deploy the first version of the app:
```bash
flyctl deploy
```
