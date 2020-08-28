import { css } from '@emotion/core';
import tw from 'twin.macro';

export const body = css`
  body {
    ${tw`transition-colors duration-200`}
  }
`;

export const darkBody = css`
  body {
    ${tw`bg-black text-white`}
  }
`;
