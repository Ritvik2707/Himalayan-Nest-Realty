import { Geist, Geist_Mono } from "next/font/google";
import Navbar, { MobileMenu } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import "./styles/globals.css";
import { AppProvider } from "@/app/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Himalayan Nest - Your Trusted Real Estate Partner",
  description: "Find your perfect property in Uttarakhand. Buy, rent, or list properties in Roorkee, Haridwar, Dehradun, Rishikesh and nearby areas.",
  keywords: "real estate, property, Uttarakhand, Roorkee, Haridwar, Dehradun, Rishikesh, buy property, rent property, property listing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <Navbar />
          <main className="pb-16 sm:pb-0">
            {children}
          </main>
          <MobileMenu />
          <Footer />
          <LoadingSpinner />
        </AppProvider>
      </body>
    </html>
  );
}
