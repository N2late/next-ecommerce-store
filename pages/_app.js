import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie } from '../utils/cookies';

export function totalNumberOfProducts(setNumberOfProducts) {
  const currentCookieValue = getParsedCookie('cart');

  if (!currentCookieValue) {
    setNumberOfProducts('');
    return;
  }

  const totalQuantity = currentCookieValue.reduce(
    (prev, curr) => prev + parseInt(curr.quantity),
    0,
  );
  setNumberOfProducts(totalQuantity);
}

function MyApp({ Component, pageProps }) {
  const [numberOfProducts, setNumberOfProducts] = useState('');

  useEffect(() => totalNumberOfProducts(setNumberOfProducts), []);

  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
            margin: 0;
          }

          body {
            font-family: sans-serif;
            font-size: 16px;
            position: relative;
            min-height: 100vh;
          }
        `}
      />
      <Layout numberOfProducts={numberOfProducts}>
        <Component
          {...pageProps}
          numberOfProducts={numberOfProducts}
          setNumberOfProducts={setNumberOfProducts}
        />
      </Layout>
    </>
  );
}

export default MyApp;
