import { css } from '@emotion/react';
import Head from 'next/head';
import Favicon from './Favicon';
import Footer from './Footer';
import Header from './Header';

const contentWrap = css`
  padding-bottom: 200px;
`;

function Layout(props) {
  return (
    <>
      <Head>
        <Favicon />
      </Head>
      <Header numberOfProducts={props.numberOfProducts} />
      <main css={contentWrap}>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
