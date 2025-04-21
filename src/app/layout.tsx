// app/layout.tsx
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { CartProvider } from "@/lib/CartContext"; 

const inter = Inter({ subsets: ["latin"] });

// Global Metadata (unchanged)
export const metadata: Metadata = { /* ... your metadata ... */ };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSchema = { /* ... your schema ... */ };

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className={`bg-white text-black ${inter.className}`}>
        <CartProvider> {/* Wrap with CartProvider */}
          <ClientLayout>{children}</ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}