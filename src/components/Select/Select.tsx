/** @jsx jsx */
import React, { useContext, useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { jsx } from '@emotion/core';
import { motion } from 'framer-motion';
import tw from 'twin.macro';

import { DarkModeContext } from 'components/DarkMode/DarkModeProvider';

interface Props {
  items: string[];
  initial?: string;
  onSelect(item: string): void;
}

const Select = ({ items, initial, onSelect }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(initial);
  const { dark } = useContext(DarkModeContext);

  useEffect(() => {
    if (current) onSelect(current);
  }, [current, onSelect]);

  return (
    <div tw="relative inline-block text-left">
      <button
        type="button"
        tw="inline-flex justify-between w-full rounded-md border border-gray-300 px-4 py-2 text-sm leading-5 font-medium focus:outline-none transition ease-in-out duration-150"
        css={
          dark
            ? tw`bg-black active:bg-gray-900 hover:border-blue-300`
            : tw`bg-white active:bg-gray-100 hover:border-blue-700`
        }
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setOpen(o => !o)}
      >
        {current}
        <motion.span
          tw="-mr-1 ml-2"
          variants={{
            open: { rotate: 180, y: 1 },
            closed: { rotate: 0, y: 1 },
          }}
          initial="closed"
          animate={open ? 'open' : 'closed'}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <motion.div
        variants={{
          open: { opacity: 1, scale: 1 },
          closed: { opacity: 0, scale: 0.95 },
        }}
        initial="closed"
        animate={open ? 'open' : 'closed'}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        tw="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50"
        css={!open && tw`pointer-events-none`}
      >
        <div
          tw="rounded-md shadow-xs overflow-y-auto"
          css={[{ maxHeight: '45vh' }, dark ? tw`bg-black` : tw`bg-white`]}
        >
          <div
            tw="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item, i) => (
              <button
                type="button"
                tw="w-full text-left block px-4 py-2 text-sm leading-5  focus:outline-none"
                css={
                  dark
                    ? tw`text-gray-300 hover:bg-gray-900 hover:text-gray-100 focus:bg-gray-900 focus:text-gray-100`
                    : tw`text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900`
                }
                onClick={() => {
                  setCurrent(item);
                  setOpen(false);
                }}
                key={`item-${i}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

Select.initialProps = {
  initial: 'All',
};

export default Select;
