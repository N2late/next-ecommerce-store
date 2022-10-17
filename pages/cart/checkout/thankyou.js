import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { styles } from '../../../styles/styles';

const cartInnerContainer = css`
  width: 50%;
  margin: 0 auto;
  text-align: center;
  div {
    font-size: 24px;
    color: rgb(3, 144, 227);
    font-weight: 700;
    padding: 20px;
  }
`;
function OrderSubmitted() {
  return (
    <>
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="thank you for buying with us" />
      </Head>
      <div css={styles.checkoutContainer}>
        <div css={cartInnerContainer}>
          <div>The books are on your way!</div>
          <div>Thank you for buying with us!</div>
          <div>
            <Image src="/images/deliver_car.jpg" width="600" height="300" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSubmitted;
