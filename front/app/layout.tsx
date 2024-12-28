import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getTokne } from "../auth/csrf";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "try_next_server_components",
  description: "try_next_server_components",
};

const  RootLayout = async ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) => {
  const token = await getTokne();
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <input id="CSRF_TOKEN" type="hidden" value={token.token} />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
