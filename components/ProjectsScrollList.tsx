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
    image: "/projects/foto.jpg",
    href: "#",
  },
  {
    id: "02",
    title: "Landing Page",
    image: "/projects/foto2.jpg",
    href: "#",
  },
  {
    id: "03",
    title: "Dashboard UI",
    image: "/projects/foto3.jpg",
    href: "#",
  },
  {
    id: "04",
    title: "E-commerce Concept",
    image: "/projects/foto4.jpg",
    href: "#",
  },
];

export default function ProjectsScrollList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);

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
    const previewImage = previewImageRef.current;
    const listItems = container?.querySelectorAll(".list-item");

    if (!container || !listWrapper || !previewImage || !listItems) return;

    const navbarHeight = 64;
    const itemHeight = (listItems[0] as HTMLElement).offsetHeight + 8;
    const totalScroll = itemHeight * listItems.length;

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
          // Con length+1 el primer tramo de scroll no activa ningún proyecto
          const rawIndex = Math.round(
            self.progress * listItems.length - 0.5
          );
          const activeIndex = Math.max(-1, Math.min(rawIndex, listItems.length - 1));

          listItems.forEach((item, i) => {
            item.classList.toggle("active", i === activeIndex);
          });

          if (activeIndex >= 0 && activeIndex < listItems.length) {
            const activeItem = listItems[activeIndex] as HTMLElement;
            const newImage = activeItem.dataset.img;
            if (newImage && previewImage.src !== newImage) {
              previewImage.src = newImage;
            }
            gsap.to(previewImage, { opacity: 1, duration: 0.3 });
          } else {
            gsap.to(previewImage, { opacity: 0, duration: 0.3 });
          }
        },
        onLeave: () => {
          gsap.to(previewImage, { opacity: 0, duration: 0.3 });
          listItems.forEach((item) => {
            item.classList.remove("active");
          });
        },
        onEnterBack: () => {
          // No forzamos opacity aquí, el onUpdate se encarga
        },
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <img
        ref={previewImageRef}
        src={projects[0].image}
        alt="Project preview"
        className="preview-image"
        style={{ opacity: 0 }}
      />

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

        .preview-image {
          position: fixed;
          top: 50%;
          right: 80px;
          transform: translateY(-50%);
          width: 420px;
          height: 560px;
          object-fit: cover;
          object-position: center top;
          border-radius: 6px;
          filter: grayscale(20%);
          pointer-events: none;
          z-index: 100;
        }

        @media (max-width: 1024px) {
          .preview-image {
            width: 320px;
            height: 420px;
            right: 40px;
          }
        }

        @media (max-width: 768px) {
          .preview-image {
            top: auto;
            bottom: 20px;
            right: 16px;
            transform: none;
            width: 140px;
            height: 180px;
            border-radius: 4px;
          }

          .project-heading {
            font-size: 24px;
          }

          .list-item.active .project-heading {
            transform: translateX(12px);
          }
        }
      `}</style>
    </>
  );
}