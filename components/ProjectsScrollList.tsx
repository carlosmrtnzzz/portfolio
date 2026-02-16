"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Equilibria",
    description:
      "Aplicación web de bienestar y meditación con interfaz minimalista.",
    image: "/projects/equilibria.png",
    href: "https://github.com/carlosmrtnzzz/equilibria",
  },
  {
    id: "02",
    title: "Ahorcado",
    description:
      "Juego clásico de adivinar palabras con diseño moderno y animaciones suaves.",
    image: "/projects/ahorcado.png",
    href: "https://ahorcadoreactcarlos.netlify.app",
  },
  {
    id: "03",
    title: "Rediseño web",
    description: "Rediseño completo de un sitio web.",
    image: "/projects/rousse.png",
    href: "https://roussefoodfusion.netlify.app",
  },
  {
    id: "04",
    title: "Proximo proyecto",
    description: "Something in the way.",
    image: "/projects/equilibria.png",
    href: "#",
  },
];

export default function ProjectsScrollList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const previewDescRef = useRef<HTMLParagraphElement>(null);
  const previewLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const container = containerRef.current;
    const listWrapper = listWrapperRef.current;
    const previewCard = previewCardRef.current;
    const previewImage = previewImageRef.current;
    const previewDesc = previewDescRef.current;
    const previewLink = previewLinkRef.current;
    const listItems = container?.querySelectorAll(".list-item");

    if (
      !container ||
      !listWrapper ||
      !previewCard ||
      !previewImage ||
      !previewDesc ||
      !previewLink ||
      !listItems
    )
      return;

    const handleCardMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return;

      const rect = previewCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      gsap.to(previewCard, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleCardMouseLeave = () => {
      gsap.to(previewCard, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    previewCard.addEventListener("mousemove", handleCardMouseMove);
    previewCard.addEventListener("mouseleave", handleCardMouseLeave);

    const navbarHeight = 64;
    const itemHeight = (listItems[0] as HTMLElement).offsetHeight + 0.5;
    const totalScroll = itemHeight * listItems.length;

    const handleItemClick = (index: number) => {
      const trigger = ScrollTrigger.getAll()[0];
      if (!trigger) return;
      const targetProgress = (index + 0.5) / listItems.length;
      const scrollTo =
        trigger.start + (trigger.end - trigger.start) * targetProgress;
      lenis.scrollTo(scrollTo, { duration: 1.2 });
    };

    listItems.forEach((item, i) => {
      (item as HTMLElement).addEventListener("click", () => handleItemClick(i));
    });

    gsap.to(listWrapper, {
      y: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: `top ${navbarHeight}px`,
        end: "+=" + totalScroll,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const rawIndex = Math.round(self.progress * listItems.length - 0.5);
          const activeIndex = Math.max(
            -1,
            Math.min(rawIndex, listItems.length - 1),
          );

          listItems.forEach((item, i) => {
            item.classList.toggle("active", i === activeIndex);
          });

          if (activeIndex >= 0 && activeIndex < listItems.length) {
            const proj = projects[activeIndex];
            if (previewImage.src !== proj.image) {
              previewImage.src = proj.image;
            }
            previewDesc.textContent = proj.description;
            previewLink.href = proj.href;
            gsap.to(previewCard, { opacity: 1, duration: 0.3 });
          } else {
            gsap.to(previewCard, { opacity: 0, duration: 0.3 });
          }
        },
        onLeave: () => {
          gsap.to(previewCard, { opacity: 0, duration: 0.3 });
          listItems.forEach((item) => {
            item.classList.remove("active");
          });
        },
        onLeaveBack: () => {
          gsap.to(previewCard, { opacity: 0, duration: 0.3 });
          listItems.forEach((item) => {
            item.classList.remove("active");
          });
        },
        onEnterBack: () => {},
      },
    });

    return () => {
      listItems.forEach((item, i) => {
        (item as HTMLElement).replaceWith(item.cloneNode(true));
      });
      previewCard.removeEventListener("mousemove", handleCardMouseMove);
      previewCard.removeEventListener("mouseleave", handleCardMouseLeave);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div ref={previewCardRef} className="preview-card" style={{ opacity: 0 }}>
        <a
          ref={previewLinkRef}
          href={projects[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="preview-card-image-container"
        >
          <img
            ref={previewImageRef}
            src={projects[0].image}
            alt="Project preview"
            className="preview-card-image"
          />
          <div className="preview-card-overlay">
            <span className="preview-card-arrow">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
              <span>Ver proyecto</span>
            </span>
          </div>
        </a>
        <div className="preview-card-body">
          <p ref={previewDescRef} className="preview-card-desc">
            {projects[0].description}
          </p>
        </div>
      </div>

      <div ref={containerRef} className="scroll-container">
        <div ref={listWrapperRef} className="list-wrapper">
          <div className="project-list">
            {projects.map((project) => (
              <div
                key={project.id}
                className="list-item"
                data-img={project.image}
              >
                <span className="project-index">{project.id}</span>
                <h3 className="project-heading">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-container {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
        }

        .project-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 500px;
          padding: 24px 0;
        }

        .list-item {
          display: flex;
          align-items: center;
          padding: 16px 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(128, 128, 128, 0.1);
        }

        :global(.dark) .list-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .list-item:last-child {
          border-bottom: none;
        }

        .project-index {
          font-size: 14px;
          font-weight: 400;
          color: rgba(128, 128, 128, 0.5);
          width: 40px;
          flex-shrink: 0;
          font-family: "Courier New", monospace;
          transition: color 0.4s ease;
        }

        :global(.dark) .project-index {
          color: rgba(255, 255, 255, 0.3);
        }

        .project-heading {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 400;
          font-style: italic;
          opacity: 0.4;
          color: rgba(0, 0, 0, 0.9);
          transition:
            opacity 0.4s ease,
            transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: translateX(0);
        }

        :global(.dark) .project-heading {
          color: rgba(255, 255, 255, 0.9);
        }

        .list-item.active .project-heading {
          opacity: 1;
          transform: translateX(24px);
        }

        .list-item.active .project-index {
          color: rgba(128, 128, 128, 0.9);
        }

        :global(.dark) .list-item.active .project-index {
          color: rgba(255, 255, 255, 0.8);
        }

        .preview-card {
          position: fixed;
          top: 50%;
          left: 55%;
          transform: translateY(-50%);
          transform-style: preserve-3d;
          perspective: 1000px;
          width: 500px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          overflow: hidden;
          pointer-events: auto;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.3s ease;
        }

        .preview-card:hover {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        :global(.dark) .preview-card {
          background: rgba(30, 30, 30, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        :global(.dark) .preview-card:hover {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .preview-card-image-container {
          position: relative;
          display: block;
          overflow: hidden;
        }

        .preview-card-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.4s ease;
        }

        .preview-card-image-container:hover .preview-card-image {
          transform: scale(1.05);
        }

        .preview-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .preview-card-image-container:hover .preview-card-overlay {
          opacity: 1;
        }

        .preview-card-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 14px;
          font-weight: 500;
        }

        .preview-card-body {
          padding: 24px;
        }

        .preview-card-desc {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.7);
          margin: 0;
        }

        :global(.dark) .preview-card-desc {
          color: rgba(255, 255, 255, 0.7);
        }

        @media (min-width: 2560px) {
          .preview-card {
            width: 700px;
            left: 60%;
          }

          .preview-card-image {
            height: 450px;
          }

          .preview-card-body {
            padding: 32px;
          }

          .preview-card-desc {
            font-size: 18px;
          }

          .project-heading {
            font-size: clamp(36px, 5vw, 64px);
          }
        }

        /* 2K screens (1440p) */
        @media (min-width: 1800px) and (max-width: 2559px) {
          .preview-card {
            width: 600px;
            left: 52%;
          }

          .preview-card-image {
            height: 400px;
          }

          .preview-card-body {
            padding: 28px;
          }

          .preview-card-desc {
            font-size: 16px;
          }

          .project-heading {
            font-size: clamp(32px, 5vw, 56px);
          }
        }

        /* Large screens 1400-1800 */
        @media (min-width: 1400px) and (max-width: 1799px) {
          .preview-card {
            width: 520px;
            left: 54%;
          }

          .preview-card-image {
            height: 340px;
          }
        }

        /* Medium screens */
        @media (max-width: 1399px) and (min-width: 1200px) {
          .preview-card {
            width: 460px;
            left: 52%;
          }

          .preview-card-image {
            height: 300px;
          }

          .preview-card-body {
            padding: 20px;
          }
        }

        /* Smaller desktop */
        @media (max-width: 1199px) and (min-width: 1024px) {
          .preview-card {
            width: 400px;
            left: auto;
            right: 40px;
          }

          .preview-card-image {
            height: 260px;
          }

          .preview-card-body {
            padding: 18px;
          }

          .preview-card-desc {
            font-size: 14px;
          }
        }

        /* Tablet */
        @media (max-width: 1023px) and (min-width: 769px) {
          .preview-card {
            width: 350px;
            left: auto;
            right: 30px;
          }

          .preview-card-image {
            height: 220px;
          }

          .preview-card-body {
            padding: 16px;
          }

          .preview-card-desc {
            font-size: 13px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .preview-card {
            position: fixed;
            top: auto;
            bottom: 30px;
            right: 16px;
            left: 16px;
            transform: none;
            width: auto;
            border-radius: 12px;
          }

          .preview-card-image {
            height: 220px;
            object-position: center center;
          }

          .preview-card-body {
            padding: 14px 16px;
          }

          .preview-card-desc {
            font-size: 13px;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .preview-card {
            bottom: 50px;
          }

          .preview-card-image {
            height: 200px;
          }
        }
      `}</style>
    </>
  );
}
