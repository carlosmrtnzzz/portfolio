"use client";

import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Minimal Portfolio",
    image: "/projects/foto.jpg",
    href: "#",
  },
  {
    title: "Landing Page",
    image: "/projects/foto.jpg",
    href: "#",
  },
  {
    title: "Dashboard UI",
    image: "/projects/foto.jpg",
    href: "#",
  },
  {
    title: "E-commerce Concept",
    image: "/projects/foto.jpg",
    href: "#",
  },
  {
    title: "E-commerce Concept 2",
    image: "/projects/foto.jpg",
    href: "#",
  },
  {
    title: "E-commerce Concept 3",
    image: "/projects/foto.jpg",
    href: "#", 
  },
];

export default function ProjectsGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr max-h-800px">
      {" "}
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProjectCard {...project} />
        </motion.div>
      ))}
    </div>
  );
}
