"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const projects = [
  {
    id: "01",
    title: "Equilibria",
    description:
      "Aplicación web de bienestar y meditación con interfaz minimalista.",
    image: "/projects/equilibria.webp",
    href: "https://github.com/carlosmrtnzzz/equilibria",
  },
  {
    id: "02",
    title: "Ahorcado",
    description:
      "Juego clásico de adivinar palabras con diseño moderno y animaciones suaves.",
    image: "/projects/ahorcado.webp",
    href: "https://ahorcadoreactcarlos.netlify.app",
  },
  {
    id: "03",
    title: "Rediseño web",
    description: "Rediseño completo de un sitio web.",
    image: "/projects/rousse.webp",
    href: "https://roussefoodfusion.netlify.app",
  },
  {
    id: "04",
    title: "Proximo proyecto",
    description: "Something in the way.",
    image: "/projects/equilibria.webp",
    href: "#",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        borderRadius: 16,
        overflow: "hidden",
        border: "1.5px solid var(--card-border)",
        background: "var(--card-bg)",
        backdropFilter: "blur(12px)",
        boxShadow: hovered ? "var(--card-shadow-hover)" : "var(--card-shadow)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "var(--card-img-h, 280px)",
              objectFit: "cover",
              objectPosition: "center top",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              display: "block",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>

        <div style={{ padding: "var(--card-body-p, 24px)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: "var(--card-index-color)",
                fontFamily: '"Courier New", monospace',
              }}
            >
              {project.id}
            </span>
            <h3
              style={{
                fontSize: "var(--card-title-size, 24px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--card-text)",
                margin: 0,
              }}
            >
              {project.title}
            </h3>
          </div>
          <p
            style={{
              fontSize: "var(--card-desc-size, 15px)",
              lineHeight: 1.6,
              color: "var(--card-desc-color)",
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>
      </a>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <style jsx global>{`
        :root {
          --card-border: rgba(0, 0, 0, 0.25);
          --card-bg: rgba(255, 255, 255, 0.9);
          --card-shadow:
            0 4px 20px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.06);
          --card-shadow-hover:
            0 20px 60px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08);
          --card-text: rgba(0, 0, 0, 0.9);
          --card-desc-color: rgba(0, 0, 0, 0.7);
          --card-index-color: rgba(128, 128, 128, 0.5);
        }

        .dark {
          --card-border: rgba(255, 255, 255, 0.25);
          --card-bg: rgba(30, 30, 30, 0.9);
          --card-shadow:
            0 4px 20px rgba(0, 0, 0, 0.35), 0 1px 4px rgba(0, 0, 0, 0.2);
          --card-shadow-hover:
            0 20px 60px rgba(0, 0, 0, 0.55), 0 4px 12px rgba(0, 0, 0, 0.3);
          --card-text: rgba(255, 255, 255, 0.9);
          --card-desc-color: rgba(255, 255, 255, 0.7);
          --card-index-color: rgba(255, 255, 255, 0.3);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          padding-bottom: 64px;
        }

        @media (min-width: 2560px) {
          :root {
            --card-img-h: 400px;
            --card-title-size: 32px;
            --card-desc-size: 18px;
            --card-body-p: 32px;
          }
        }

        @media (min-width: 1800px) and (max-width: 2559px) {
          :root {
            --card-img-h: 340px;
            --card-title-size: 28px;
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          :root {
            --card-img-h: 220px;
            --card-title-size: 20px;
            --card-desc-size: 13px;
            --card-body-p: 16px;
          }
        }
      `}</style>
    </>
  );
}
