/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import styles from './Blank.styles';

interface Props {
  something: string;
}

const Blank = ({ something }: Props): JSX.Element => {
  const title = 'Hello world';

  return (
    <div css={styles}>
      {title} {something}
    </div>
  );
};

Blank.defaultProps = {};

export default Blank;
