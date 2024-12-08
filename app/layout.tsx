import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { Toaster } from "sonner";

const fontSans = Plus_Jakarta_Sans ({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: "HealthFlex Online",
  description: "Management system for HealthFlex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ cn('min-h-screen b-dark-300 font-sans antialiased', fontSans.variable) }>{children}
      <Toaster position="top-right" /> {/* Place it in your app's layout */}
      {children}

      </body>
    </html>
    
  );
}

