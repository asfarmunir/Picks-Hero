import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

import localFont from "next/font/local";

const degular = localFont({ src: "./font.otf" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PicksHero",
  description: " best picks for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={degular.className}>
        <NextTopLoader
          color="green"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing=" ease-in-out"
          speed={200}
          shadow="0 0 5px #2299DD,0 0 5px #2299DD"
        />
        {children}
        {/* <Toaster position="top-center" /> */}
      </body>
    </html>
  );
}
