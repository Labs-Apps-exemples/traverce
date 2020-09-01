import { css } from '@emotion/core';
import tw from 'twin.macro';

export const imageWraper = css`
  & > div:first-of-type {
    ${tw`relative overflow-hidden`}

    &:after {
      content: '';
      ${tw`
        absolute
        transform
        -translate-x-1/2
        -translate-y-1/2
        duration-300
        transition-shadow
      `}
      top: 50%;
      left: 50%;
      width: 120%;
      padding-bottom: 120%;
      box-shadow: inset 0px 0px 50px 60px rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
  }

  &:hover > div:first-of-type:after {
    box-shadow: inset 0px 0px 50px 60px rgba(0, 0, 0, 0);
  }
`;
