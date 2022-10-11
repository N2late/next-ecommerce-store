import { css } from '@emotion/react';
import Image from 'next/image';

const footerContainer = css`
  width: 100%;
  margin-top: 50px;
  border-radius: 3px;
  position: absolute;
  bottom: 0;
`;
const footerInnerContainer = css`
  background: rgb(250, 235, 215, 0.6);
  text-align: center;
`;
const footerContent = css`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 2rem;
    color: green;
    font-weight: 400;
  }
`;

const imageContainer = css`
  width: 120px;
  height: 100px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const socialsStyles = css`
  list-style-type: none;
  display: flex;
  justify-content: center;
  li {
    margin-right: 50px;
  }
`;
const companyName = css``;
const copyrightStyle = css`
  text-align: start;
  color: gray;
  font-weight: bold;
`;

function Footer() {
  return (
    <div css={footerContainer}>
      <div css={footerInnerContainer}>
        <div css={footerContent}>
          <div css={imageContainer}>
            <Image
              src="/images/logo.png"
              alt="Pages logo"
              width="70"
              height="70"
            />
          </div>
          <h2>Where you can find your next story</h2>
        </div>
        <div>
          <ul css={socialsStyles}>
            <li>
              <a href="#abc">
                <Image
                  src="/images/facebook_icon.png"
                  alt="facebook logo"
                  width="35px"
                  height="35px"
                />
              </a>
            </li>
            <li>
              <a href="#abc">
                <Image
                  src="/images/instagram_logo.png"
                  alt="facebook logo"
                  width="35px"
                  height="35px"
                />
              </a>
            </li>
            <li>
              <a href="#abc">
                <Image
                  src="/images/twitter_icon.png"
                  alt="facebook logo"
                  width="35px"
                  height="35px"
                />
              </a>
            </li>
          </ul>
        </div>
        <div css={copyrightStyle}>
          <p>
            Copyright © <span css={companyName}>Pages</span> 2022
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
