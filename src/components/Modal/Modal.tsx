/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/core';
import { motion } from 'framer-motion';
import tw from 'twin.macro';

import { DarkModeContext } from 'components/DarkMode/DarkModeProvider';

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose(): void;
}

const Modal = ({ open, children, onClose }: Props): JSX.Element => {
  const { dark } = useContext(DarkModeContext);

  return (
    <motion.div
      variants={{
        in: { opacity: 1 },
        out: { opacity: 0 },
      }}
      initial="out"
      animate={open ? 'in' : 'out'}
      tw="
      fixed
      top-0
      bottom-0
      left-0
      right-0
      flex
      justify-center
      items-center
      flex-col
    "
      css={[
        { zIndex: 99999999 },
        !open && tw`pointer-events-none`,
        dark ? tw`bg-black` : tw`bg-white`,
      ]}
      role="dialog"
      aria-label="Video modal"
      aria-hidden={!open}
      tabIndex={-1}
    >
      <motion.div
        variants={{
          in: { y: 0, scale: 1 },
          out: { y: 50, scale: 0.95 },
        }}
        initial="out"
        animate={open ? 'in' : 'out'}
      >
        {children}
      </motion.div>

      <button
        type="button"
        tw="
          absolute
          top-0
          right-0
          text-4xl
          px-4
          focus:outline-none
          duration-200
          transition
          transform
          hover:rotate-180
          active:text-blue-500
        "
        css={dark ? tw`text-white` : tw`text-black`}
        onClick={onClose}
      >
        &times;
      </button>
    </motion.div>
  );
};

Modal.defaultProps = {};

export default Modal;
