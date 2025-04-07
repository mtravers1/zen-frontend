import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const aeonik = localFont({
  src: [
    {
      path: './fonts/Aeonik-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Aeonik_OVERVIEW-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Aeonik-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Aeonik-Black.ttf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-aeonik'
})

export const metadata: Metadata = {
  title: {
    template: '%s | Zentavos',
    default: 'Zentavos | Your CFO at the touch of a button.',
  },
  description: 'Zentavos is the tool a Small Business Owner needs in one simple, easy-to-use, and powerful application that helps you manage your business finances.',
  keywords: ['finance', 'small business', 'CFO', 'business management'],
  applicationName: 'Zentavos',
  authors: [{ name: 'Zentavos Team', url: 'https://zentavos.com' }],
  creator: 'Zentavos',
  publisher: 'Zentavos',

  icons: {
    icon: '/favicon/favicon.png',
    apple: '/favicon/apple-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/favicon/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
  },

  openGraph: {
    title: 'Zentavos | Your CFO at the touch of a button.',
    description: 'Zentavos is the tool a Small Business Owner needs in one simple, easy-to-use, and powerful application that helps you manage your business finances.',
    url: 'https://zentavos.com',
    siteName: 'Zentavos',
    images: [
      {
        url: '/favicon/android-icon-192x192.png',
        width: 192,
        height: 192,
        alt: 'Zentavos Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Zentavos | Your CFO at the touch of a button.',
    description: 'Zentavos is the tool a Small Business Owner needs in one simple, easy-to-use, and powerful application that helps you manage your business finances.',
    images: ['/favicon/android-icon-192x192.png'],
  },

  metadataBase: new URL('https://zentavos.com'),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
  },
  manifest: '/favicon/manifest.json',
};

export const viewport = 'width=device-width, initial-scale=1';
export const themeColor = '#ffffff';
export const colorScheme = 'light dark';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aeonik.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
