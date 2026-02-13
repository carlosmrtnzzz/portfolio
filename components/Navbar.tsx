"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80"
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <span className="font-semibold tracking-tight text-black dark:text-white">
          Carlos
        </span>

        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-black dark:hover:text-white">
              Inicio
            </Link>
            <Link
              href="/projects"
              className="hover:text-black dark:hover:text-white"
            >
              Proyectos
            </Link>
            <Link
              href="/contact"
              className="hover:text-black dark:hover:text-white"
            >
              Contacto
            </Link>
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
