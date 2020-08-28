/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import Head from 'next/head';
import tw from 'twin.macro';

const SEO = (): JSX.Element => (
  <Head>
    <title>traverce - COVID compliant travel</title>
    <meta property="og:title" content="traverce - COVID compliant travel" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://traverce.net" />
    <meta
      property="description"
      content="Thanks to a lot of amazing filmmakers on YouTube, it's still possible to travel right in front of your screen and be immersed in different places of the world. Enjoy and feel free to support their channels!"
    />
    <meta
      property="og:description"
      content="Thanks to a lot of amazing filmmakers on YouTube, it's still possible to travel right in front of your screen and be immersed in different places of the world. Enjoy and feel free to support their channels!"
    />
    <meta
      property="og:image"
      content="https://traverce.net/images/og-image.jpg"
    />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#000000" />
    <meta name="theme-color" content="#ffffff" />

    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-43627117-7"
    />
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-43627117-7');
          `,
      }}
    />
  </Head>
);

SEO.defaultProps = {};

export default SEO;
