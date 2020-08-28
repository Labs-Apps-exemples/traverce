/** @jsx jsx */
import React, { useContext } from 'react';
import { Moon, Sun } from 'react-feather';
import { Global, jsx } from '@emotion/core';
import tw from 'twin.macro';

import { body, darkBody } from './DarkMode.styles';
import { DarkModeContext } from './DarkModeProvider';

const DarkMode = (): JSX.Element => {
  const { dark, setDark } = useContext(DarkModeContext);

  return (
    <React.Fragment>
      <Global styles={[body, dark && darkBody]} />
      <button
        type="button"
        aria-hidden
        onClick={() => setDark(!dark)}
        tw="
          absolute
          top-0
          right-0
          -mt-4
          p-4
          focus:outline-none
        "
      >
        {!dark && <Moon />}
        {dark && <Sun />}
      </button>
    </React.Fragment>
  );
};

DarkMode.defaultProps = {};

export default DarkMode;
