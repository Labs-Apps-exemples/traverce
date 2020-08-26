/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import Iframe from 'components/Iframe';
import videos from 'config/videos.json';

const Home = (): JSX.Element => (
  <div tw="container mx-auto">
    <header tw="py-12">
      <h1 tw="sr-only">Traverce</h1>
      <img
        src="/images/logo.svg"
        alt="traverce logotype"
        tw="w-1/3 md:w-1/4 lg:w-1/6 mx-auto"
        aria-hidden
      />
      <h2 tw="mt-4 text-sm text-center text-gray-500 italic">
        COVID-19 compliant travel
      </h2>

      {videos.map((video, i) => (
        <Iframe key={`video-${i}`} src={video.src} />
      ))}
    </header>
  </div>
);

export default Home;
