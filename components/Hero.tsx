"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
          Hola, soy Carlos
        </h1>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          Next.js · Tailwind · Animations
        </p>
      </motion.div>
    </section>
  )
}
