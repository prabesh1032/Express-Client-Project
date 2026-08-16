import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Nepali Store | Shop local, shop better",
  description: "A modern marketplace for products from Nepal.",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="min-h-screen antialiased">
      <body className="min-h-screen tracking-wider">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
