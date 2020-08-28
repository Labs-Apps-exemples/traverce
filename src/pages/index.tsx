/** @jsx jsx */
import React, { useContext, useEffect, useState } from 'react';
import { ExternalLink, Heart } from 'react-feather';
import { css, jsx } from '@emotion/core';
import { AnimatePresence, motion } from 'framer-motion';
import { sort, uniq } from 'ramda';
import tw from 'twin.macro';
import { Video } from 'types';

import DarkMode from 'components/DarkMode';
import { DarkModeContext } from 'components/DarkMode/DarkModeProvider';
import Iframe from 'components/Iframe';
import Modal from 'components/Modal';
import Select from 'components/Select';
import Teaser from 'components/Teaser';
import videos from 'config/videos.json';
import { knuth } from 'utils';

const Home = (): JSX.Element => {
  const [modal, toggleModal] = useState(false);
  const allCountries = 'All';
  const [country, setCountry] = useState(allCountries);
  const [items, setItems] = useState<Video[]>(videos);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(videos[0]);
  const { dark } = useContext(DarkModeContext);

  useEffect(() => {
    setItems(knuth(videos) as Video[]);
  }, []);

  return (
    <div tw="container relative mx-auto px-6">
      <DarkMode />

      <header tw="mt-20">
        <h1 tw="sr-only">Traverce</h1>
        <div tw="w-1/3 md:w-1/4 lg:w-1/6 relative pt-8">
          <AnimatePresence>
            {!dark && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src="/images/logo.svg"
                alt="traverce logotype"
                tw="absolute top-0 left-0"
                aria-hidden
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {dark && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src="/images/logo-white.svg"
                alt="traverce logotype"
                tw="absolute top-0 left-0"
                aria-hidden
              />
            )}
          </AnimatePresence>
        </div>
        <h2 tw="mt-4 text-sm text-gray-500 italic">
          COVID-19 compliant travel
        </h2>
      </header>

      <p tw="w-full md:w-1/2 text-lg mt-20">
        Thanks to a lot of amazing filmmakers on YouTube, it's still possible to
        travel right in front of your screen and be immersed in different places
        of the world. Enjoy and feel free to support their channels!
      </p>

      <div tw="flex md:justify-end items-center mt-12 duration-150 transition-colors">
        <span
          tw="pr-3 text-sm"
          css={dark ? tw`text-gray-300` : tw`text-gray-700`}
        >
          Filter by country
        </span>
        <Select
          items={[
            allCountries,
            ...uniq(
              sort(
                (a: string, b: string) => a.localeCompare(b),
                videos.map(i => i.country)
              )
            ),
          ]}
          onSelect={setCountry}
          initial={allCountries}
        />
      </div>

      <div tw="flex flex-wrap mt-12 -mx-4">
        {items
          .filter(i => i.country === country || country === allCountries)
          .map((video, i) => (
            <div tw="w-1/2 md:w-1/3 px-4 mb-12" key={`video-${i}`}>
              <Teaser
                video={video}
                onClick={v => {
                  setCurrentVideo(v);
                  toggleModal(true);
                }}
              />
            </div>
          ))}
      </div>

      <footer
        tw="border-t border-b my-8 pb-20"
        css={dark ? tw`border-gray-700` : tw`border-gray-300`}
      >
        <p tw="w-full md:w-1/2 text-lg my-20">
          <b>traverce</b> is a non-profit project that exists only to bring this
          sense of discovery to all of us that cannot enjoy the many pleasures
          of travelling right now.
        </p>

        <a
          href="https://airtable.com/shr6nqoxa5STC6ZVr"
          target="_blank"
          rel="noopener noreferrer"
          tw="
            inline-flex
            items-center
            text-white
            px-6
            py-4
            rounded
            bg-blue-500
            duration-200
            transition-colors
          "
          css={dark ? tw`hover:bg-white hover:text-black` : tw`hover:bg-black`}
        >
          Submit a new trip{' '}
          <span tw="pl-3">
            <ExternalLink size={16} />
          </span>
        </a>

        <br />

        <a
          href="https://airtable.com/shr94XRmUYx8NH89x"
          target="_blank"
          rel="noopener noreferrer"
          tw="
            inline-block
            mt-4
            italic
            text-sm
            underline
            underline-under
            duration-200
            transition-colors
          "
          css={
            dark
              ? tw`text-gray-500 hover:text-gray-200`
              : tw`text-gray-500 hover:text-gray-800`
          }
        >
          Don't want to appear on traverce?
        </a>
      </footer>

      <address
        tw="flex items-center justify-center not-italic text-center text-sm mb-12"
        css={dark ? tw`text-gray-300` : tw`text-gray-700`}
      >
        made with
        <span tw="px-1">
          <Heart size={14} color={dark ? '#fff' : '#0002BF'} />
        </span>
        by
        <a
          tw="underline underline-under pl-1 duration-150 transition-colors"
          css={dark ? tw`hover:text-blue-200` : tw`hover:text-blue-500`}
          href="https://yago.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yago
        </a>
      </address>

      <Modal open={modal} onClose={() => toggleModal(false)}>
        {currentVideo && <Iframe enabled={modal} src={currentVideo?.src} />}
        <p tw="mt-4">
          {currentVideo?.title}, {currentVideo?.country}
        </p>
        <a
          tw="mt-1 text-sm italic duration-150 transition-colors"
          css={dark ? tw`hover:text-blue-200` : tw`hover:text-blue-500`}
          href={currentVideo?.channel}
          target="_blank"
          rel="noopener noreferrer"
        >
          ©
          <span tw="underline underline-under pl-1">
            {currentVideo?.author}
          </span>
        </a>
      </Modal>
    </div>
  );
};

export default Home;
