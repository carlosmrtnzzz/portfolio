"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/projects", label: "Proyectos" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80"
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <span className="font-semibold tracking-tight text-black dark:text-white">
          <Link href="/" onClick={(e) => handleNavClick(e, "/")}>
            <Image src="/logo.png" alt="Logo" width={32} height={32} priority />
          </Link>
        </span>

        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors hover:text-black dark:hover:text-white ${
                    isActive ? "font-semibold text-black dark:text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
