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
  title: "Zentavos | Your CFO at the touch of a button.",
  description: "Zentavos is tool a Small Business Owner needs in one simple, easy to use, and powerful application that helps you manage your business finances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aeonik.variable} ${aeonik.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
