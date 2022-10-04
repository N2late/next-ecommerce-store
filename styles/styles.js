import { css } from '@emotion/react';

{
  /* ##########
    Home Page
  ########## */
}

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
