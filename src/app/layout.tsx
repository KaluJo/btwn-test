import '@mantine/core/styles.css';
import "./globals.css";
import '@mantine/dropzone/styles.css';

import { Analytics } from '@vercel/analytics/react';

import { MantineProvider, ColorSchemeScript, Flex } from '@mantine/core';

import { ModalsProvider } from "@mantine/modals";
import { gaegu } from './_fonts/fonts';
import { Viewport } from 'next';
import Navbar from './_components/Navbar';

export const dynamic = "force-dynamic";

export const metadata = {
  title: "btwn.ai",
  description: "find your product market-fit",
};

export const viewport: Viewport = {
  themeColor: "#FFFCF9",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  return (
    <html lang={props.params.locale} className={`${gaegu.variable}`}>
      <head>
        <ColorSchemeScript />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <MantineProvider
          defaultColorScheme="light"
          theme={{
            fontFamily: gaegu.style.fontFamily,
            headings: { fontFamily: gaegu.style.fontFamily },
          }}
        >
          <ModalsProvider>
            <Flex direction='column' maw={"100vw"} style={{ overflowX: 'hidden' }}>
              <Navbar />
              {props.children}
            </Flex>
          </ModalsProvider>
        </MantineProvider>
        <Analytics />
      </body>
    </html >
  );
}