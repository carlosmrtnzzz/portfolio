import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Providers } from "./providers";

export const metadata = {
  title: "Carlos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col m-0">
        <AnimatedBackground />
        <Providers>
          <Navbar />
          <div className="flex-1 relative z-10">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
