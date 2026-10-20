import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/Header/Header";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/manrope/latin-400.css";
import "./globals.css";

const SITE_URL = "https://travel-trucks-tawny-nine.vercel.app";
const DESCRIPTION =
  "Rent a camper for your next road trip. Browse campers across Ukraine, filter by location, body type, engine and transmission, and send a booking request in a minute.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TravelTrucks — Camper Rental",
    template: "%s | TravelTrucks",
  },
  description: DESCRIPTION,
  applicationName: "TravelTrucks",
  keywords: ["camper rental", "campervan", "motorhome", "road trip", "Ukraine"],
  authors: [{ name: "Viktor Tar", url: "https://github.com/viktor-tar" }],
  openGraph: {
    type: "website",
    siteName: "TravelTrucks",
    title: "TravelTrucks — Camper Rental",
    description: DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelTrucks — Camper Rental",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
