import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { cartCheckoutBtn, checkoutBtnContainer } from '../';
import { getBooks } from '../../../database/books.ts';
import { styles } from '../../../styles/styles';
import { cartTotalCost, getCardItems } from '../../../utils/cartItems';

const containerStyles = css`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  margin-top: 120px;
  text-align: center;
`;

const formStyles = css`
  padding: 20px;
  text-align: left;
  label {
    margin-right: 8px;
  }
  input {
    margin-right: 16px;
    padding: 5px;
    margin-bottom: 12px;
  }
`;

export function Checkout({ items, setNumberOfProducts, setTotalCost }) {
  const [checkoutDetails, setCheckoutDetails] = useState({});

  const router = useRouter();

  const totalCost = cartTotalCost(items, () => {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckoutDetails({ checkoutDetails });
    setNumberOfProducts(0);
    Cookies.set('cart', '[]');
    setTotalCost(0);
    await router.push('/cart/checkout/thankyou');
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="Shipping details and payment method"
        />
      </Head>
      <div css={styles.checkoutContainer}>
        <div css={styles.cartInnerContainer}>
          <div>
            <h1>Checkout Details</h1>
          </div>
          <form onSubmit={handleSubmit} css={styles.formContainer}>
            <div css={styles.shippingDetails}>
              <div>
                <label htmlFor="firstName">First name</label>
                <input
                  data-test-id="checkout-first-name"
                  id="firstName"
                  name="firstName"
                  required
                  minLength="4"
                  maxLength="25"
                  size="25"
                  placeholder="firstName"
                  value={checkoutDetails.firstName}
                  onChange={(e) =>
                    setCheckoutDetails({
                      ...checkoutDetails,
                      firstName: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  data-test-id="checkout-last-name"
                  id="lastName"
                  required
                  minLength="4"
                  maxLength="15"
                  size="25"
                  value={checkoutDetails.lastName}
                  onChange={(e) =>
                    setCheckoutDetails({
                      ...checkoutDetails,
                      lastName: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  data-test-id="checkout-email"
                  id="email"
                  type="email"
                  minLength="4"
                  maxLength="40"
                  size="25"
                  required
                  value={checkoutDetails.email}
                  onChange={(e) =>
                    setCheckoutDetails({
                      ...checkoutDetails,
                      email: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  data-test-id="checkout-address"
                  id="address"
                  required
                  minLength="10"
                  maxLength="100"
                  size="50"
                  value={checkoutDetails.address}
                  onChange={(e) =>
                    setCheckoutDetails({
                      ...checkoutDetails,
                      address: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  data-test-id="checkout-city"
                  id="city"
                  minLength="2"
                  maxLength="40"
                  size="25"
                  required
                  value={checkoutDetails.city}
                  onChange={(e) =>
                    setCheckoutDetails({
                      ...checkoutDetails,
                      city: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="postal">Postal Code</label>
                <input
                  data-test-id="checkout-postal-code"
                  id="postal"
                  required
                  size="25"
                  value={checkoutDetails.postalCode}
                  onChange={(e) =>
                    setCheckoutDetails({
                      ...checkoutDetails,
                      postalCode: e.currentTarget.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input
                  data-test-id="checkout-country"
                  id="country"
                  required
                  value={checkoutDetails.country}
                  onChange={(e) =>
                    setCheckoutDetails({
                      ...checkoutDetails,
                      country: e.currentTarget.value,
                    })
                  }
                />
              </div>
            </div>
            <div css={styles.paymentDetails}>
              <h4>Your order</h4>
              <div css={styles.itemsContainer}>
                {items.map((item) => (
                  <div css={styles.itemInnerContainer} key={item.id}>
                    <div>
                      <Image
                        src={`/images/${item.id}.jpg`}
                        width="25"
                        height="42"
                      />
                    </div>
                    <div>
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                      <p>{item.author}</p>
                    </div>
                    <div>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div css={styles.costContainer}>
                <p>
                  Total: <strong>€{totalCost}</strong>
                </p>
              </div>
              <div css={styles.creditCardContainer}>
                <div css={styles.paymentOptionsStyle}>
                  <input type="checkbox" checked readOnly />
                  <p>Credit card</p>
                  <Image
                    src="/images/icon-visa-48.png"
                    width="20"
                    height="20"
                  />
                  <Image
                    src="/images/icon-mastercard-logo-48.png"
                    width="20"
                    height="20"
                  />
                </div>
                <div>
                  <div css={styles.cardNumberStyle}>
                    <label htmlFor="cardNumber">Card number</label>
                    <input
                      data-test-id="checkout-credit-card"
                      id="cardNumber"
                      required
                      type="number"
                      value={checkoutDetails.cardNumber}
                      onChange={(e) =>
                        setCheckoutDetails({
                          ...checkoutDetails,
                          cardNumber: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                  <div css={styles.expirationAndCvvStyle}>
                    <div>
                      <label htmlFor="ExpirationDate">Expiration Date</label>
                      <input
                        data-test-id="checkout-expiration-date"
                        id="ExpirationDate"
                        required
                        type="month"
                        value={checkoutDetails.ExpirationDate}
                        onChange={(e) =>
                          setCheckoutDetails({
                            ...checkoutDetails,
                            ExpirationDate: e.currentTarget.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="securityCode">CVV</label>
                      <input
                        data-test-id="checkout-security-code"
                        id="securityCode"
                        required
                        minLength="3"
                        maxLength="3"
                        type="number"
                        value={checkoutDetails.securityCode}
                        onChange={(e) =>
                          setCheckoutDetails({
                            ...checkoutDetails,
                            securityCode: e.currentTarget.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div css={checkoutBtnContainer}>
                <button
                  css={cartCheckoutBtn}
                  data-test-id="checkout-confirm-order"
                >
                  Submit your order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;

export async function getServerSideProps(context) {
  const items = await getCardItems(context, getBooks);

  return {
    props: {
      items: items,
    },
  };
}
