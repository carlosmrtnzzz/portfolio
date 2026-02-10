"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  href: string;
};

export default function ProjectCard({ title, image, href }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800"
    >
      <Link href={href} className="absolute inset-0 z-10" />

      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute bottom-0 z-20 p-5">
        <h2 className="text-lg font-medium text-white">{title}</h2>
      </div>
    </motion.div>
  );
}
