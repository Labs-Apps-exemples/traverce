/** @jsx jsx */
import React from 'react';
import YouTube from 'react-youtube';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import { getYoutubeId } from 'utils';

interface Props {
  enabled?: boolean;
  hidden?: boolean;
  src: string;
  isYouTube?: boolean;
}

const Iframe = ({ enabled, hidden, src, isYouTube }: Props): JSX.Element => (
  <div
    tw="relative overflow-hidden bg-black mx-auto flex-initial rounded-md"
    style={{ width: '90vmin', height: '50.625vmin' }}
  >
    {enabled && !isYouTube && (
      <iframe
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="video"
        tw="
          absolute
          top-0
          left-0
          bottom-0
          right-0
          w-full
          h-full
          duration-200
          transition-opacity
        "
        css={hidden ? tw`opacity-0` : tw`opacity-100`}
      />
    )}
    {enabled && isYouTube && (
      <YouTube
        videoId={getYoutubeId(src)}
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
        tw="
          absolute
          top-0
          left-0
          bottom-0
          right-0
          w-full
          h-full
          duration-200
          transition-opacity
        "
      />
    )}
  </div>
);

Iframe.defaultProps = {
  enabled: true,
  isYouTube: true,
  hidden: false,
};

export default Iframe;
