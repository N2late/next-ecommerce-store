import { css } from '@emotion/react';

/* ##########
    Home Page
  ########## */

export const bookCard = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

/* ##########
    Checkout page
  ########## */
export const styles = {
  checkoutContainer: css`
    margin-top: 120px;
    width: 100%;
  `,
  cartInnerContainer: css`
    width: 80%;
    margin: 0 auto;
  `,

  formContainer: css`
    margin-top: 24px;
    display: flex;
    align-items: flex-start;
  `,
  shippingDetails: css`
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    div {
      margin-right: 12px;
      margin-bottom: 24px;

      label {
        margin-right: 8px;
        padding-bottom: 8px;
        display: block;
      }
    }
  `,
  paymentDetails: css`
    width: 50%;
    padding: 12px;
    background-color: rgb(211, 211, 211, 0.4);
    border-radius: 12px;
  `,
  itemsContainer: css``,
  itemInnerContainer: css`
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      width: 33%;
      text-align: center;
    }
    div:nth-child(2) {
      text-align: start;
    }
    p {
      font-size: 0.8rem;
    }
  `,
  costContainer: css`
    border-top: 1px solid lightgray;
    p {
      text-align: right;
      padding: 16px;
      line-height: 1.4;
    }
  `,

  creditCardContainer: css`
    padding: 16px;
    padding-bottom: 0;
    div {
      margin-bottom: 12px;
    }
    div > div > label {
      display: block;
      padding-bottom: 8px;
    }
  `,

  paymentOptionsStyle: css`
    display: flex;
    align-items: center;
    p {
      font-size: 0.9rem;
      padding-left: 4px;
      padding-right: 8px;
    }
  `,

  cardNumberStyle: css`
    padding-top: 12px;
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    label {
      padding-right: 8px;
    }
  `,

  expirationAndCvvStyle: css`
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    label {
      padding-right: 8px;
    }
  `,
};
