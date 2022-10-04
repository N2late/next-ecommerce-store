import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  width: 100%;
  box-shadow: 0px 1px 0.5px 1px lightgray;
  position: fixed;
  z-index: 1;
  background-color: rgb(250, 235, 215, 0.9);
  top: 0;
`;

const innerHeaderStyles = css`
  padding: 0 15% 0 15%;
  display: flex;
  justify-content: space-between;
`;

const logoStyle = css`
  cursor: pointer;
  border-radius: 50px;
`;

const navContainerStyles = css`
  width: 50%;
`;

const navStyles = css`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    font-size: 1.5rem;
    text-decoration: none;
    color: grey;
    font-weight: bold;
  }
`;

const cartContainerStyles = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    width: 20px;
    background-color: lightcoral;
    border-radius: 50px;
    color: white;
    text-align: center;
    position: relative;
  }

  img {
    filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)
      brightness(95%) contrast(80%);
  }
`;

function Header({ numberOfProducts }) {
  return (
    <header css={headerStyles} data-test-id="products-link">
      <div css={innerHeaderStyles}>
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Pages logo"
              width="75"
              height="70"
              css={logoStyle}
            />
          </Link>
        </div>
        <div css={navContainerStyles}>
          <nav css={navStyles}>
            <Link href="/">Home</Link>
            <Link href="/books" data-test-id="products-link">
              All Books
            </Link>
          </nav>
        </div>
        <div css={cartContainerStyles}>
          <Link href="/books/cart" data-test-id="cart-link">
            <Image
              src="/images/cart-icon.png"
              all="cart icon"
              width="35"
              height="35"
            />
          </Link>{' '}
          <span data-test-id="cart-count">{numberOfProducts}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
