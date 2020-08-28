/** @jsx jsx */
import React, { useEffect } from 'react';
import { ExternalLink } from 'react-feather';
import { useInView } from 'react-intersection-observer';
import LazyLoad from 'react-lazyload';
import { jsx } from '@emotion/core';
import { motion, useAnimation } from 'framer-motion';
import tw from 'twin.macro';
import { Video } from 'types';

import { getYoutubeId } from 'utils';

import { imageWraper } from './Teaser.styles';

interface Props {
  video: Video;
  onClick(video: Video): void;
}

const Teaser = ({ video, onClick }: Props): JSX.Element => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      <button
        type="button"
        tw="cursor-pointer text-left focus:outline-none"
        css={imageWraper}
        onClick={() => onClick(video)}
      >
        <div tw="rounded-md overflow-hidden">
          <LazyLoad>
            <img
              src={`/thumbnails/${getYoutubeId(video.src)}.jpg`}
              alt={video.title}
            />
          </LazyLoad>
        </div>
        <h3 tw="mt-3">
          {video.title}, {video.country}
        </h3>
        <p tw="text-sm italic mt-1">by {video.author}</p>
      </button>
    </motion.div>
  );
};

Teaser.defaultProps = {};

export default Teaser;
