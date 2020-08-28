/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { ExternalLink, Heart } from 'react-feather';
import { css, jsx } from '@emotion/core';
import { sort, uniq } from 'ramda';
import tw from 'twin.macro';
import { Video } from 'types';

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
  const [items, setItems] = useState([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(videos[0]);

  useEffect(() => {
    setItems(knuth(videos));
  }, []);

  return (
    <div tw="container mx-auto px-6">
      <header tw="mt-20">
        <h1 tw="sr-only">Traverce</h1>
        <img
          src="/images/logo.svg"
          alt="traverce logotype"
          tw="w-1/3 md:w-1/4 lg:w-1/6"
          aria-hidden
        />
        <h2 tw="mt-4 text-sm text-gray-500 italic">
          COVID-19 compliant travel
        </h2>
      </header>

      <p tw="w-full md:w-1/2 text-lg mt-20">
        Thanks to a lot of amazing filmmakers on YouTube, it's still possible to
        travel right in front of your screen and be immersed in different places
        of the world. Enjoy and feel free to support their channels!
      </p>

      <div tw="flex md:justify-end items-center mt-12">
        <span tw="pr-3 text-sm text-gray-700">Filter by country</span>
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

      <footer tw="border-t border-b border-gray-300 my-8 pb-20">
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
            hover:bg-black
            duration-200
            transition-colors
          "
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
            text-gray-500
            hover:text-gray-800
            text-sm
            underline
            underline-under
            duration-200
            transition-colors
          "
        >
          Don't want to appear on traverce?
        </a>
      </footer>

      <address tw="flex items-center justify-center not-italic text-center text-sm text-gray-700 mb-12">
        made with
        <span tw="px-1">
          <Heart size={14} color="#0002BF" />
        </span>
        by
        <a
          tw="hover:text-blue-500 underline underline-under pl-1"
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
          tw="mt-1 text-sm italic hover:text-blue-500"
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
