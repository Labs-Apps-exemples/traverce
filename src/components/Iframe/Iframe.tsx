/** @jsx jsx */
import React from 'react';
import YouTube from 'react-youtube';
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import { getYoutubeId } from 'utils';

const youtubeOptions = {
  playerVars: {
    disablekb: 1,
    loop: 1,
    fs: 0,
    enablejsapi: 1,
    autoplay: 0,
    controls: 0,
    showinfo: 0,
    modestbranding: 1,
    frameborder: 0,
    rel: 0,
    mute: 1,
    autohide: 1,
    vq: 'large',
    version: '3',
    theme: 'light',
  },
};

interface Props {
  enabled?: boolean;
  hidden?: boolean;
  src: string;
  ratio?: string;
  isYouTube?: boolean;
}

const Iframe = ({
  enabled,
  hidden,
  src,
  ratio,
  isYouTube,
}: Props): JSX.Element => (
  <div tw="relative overflow-hidden bg-black" style={{ paddingTop: ratio }}>
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
        {...youtubeOptions}
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
  ratio: '56.25%',
  enabled: true,
  isYouTube: true,
  hidden: false,
};

export default Iframe;
