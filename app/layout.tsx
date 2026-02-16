import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: "Carlos Martínez",
  description:
    "Desarrollador web especializado en React y Next.js. Portfolio con proyectos, experiencia y contacto.",
  keywords: ["desarrollador web", "React", "Next.js", "portfolio"],
  authors: [{ name: "Carlos Martínez" }],
  openGraph: {
    title: "Carlos Martínez",
    description: "Desarrollador web especializado en React y Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable}`}
    >
      <body
        className={`${spaceGrotesk.className} relative flex min-h-screen flex-col m-0`}
      >
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
