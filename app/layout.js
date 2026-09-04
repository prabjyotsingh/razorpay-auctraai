import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Auctra AI — Autonomous Procurement. Intelligent Settlement.",
  description: "Autonomous Enterprise Procurement Platform. Natural language RFQs, verified supplier discovery, real-time auctions, enforceable digital contracts, and automated Razorpay escrow settlement.",
  keywords: ["autonomous procurement", "reverse auction", "enterprise SaaS", "Stripe for procurement", "Razorpay Route", "escrow", "Auctra AI"],
  authors: [{ name: "Prabjyot Singh" }, { name: "Auctra AI Technologies" }]
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFAFA] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
