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
    image: "/projects/foto.jpg",
    href: "https://equilibria.com",
  },
  {
    id: "02",
    title: "Landing Page",
    description:
      "Landing page corporativa con animaciones y diseño responsive.",
    image: "/projects/foto2.jpg",
    href: "https://ejemplo.com",
  },
  {
    id: "03",
    title: "Dashboard UI",
    description:
      "Panel de control con gráficos interactivos y gestión de datos en tiempo real.",
    image: "/projects/foto3.jpg",
    href: "https://ejemplo.com",
  },
  {
    id: "04",
    title: "E-commerce Concept",
    description:
      "Concepto de tienda online con carrito, filtros y pasarela de pago.",
    image: "/projects/foto4.jpg",
    href: "https://ejemplo.com",
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
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div ref={previewCardRef} className="preview-card" style={{ opacity: 0 }}>
        <img
          ref={previewImageRef}
          src={projects[0].image}
          alt="Project preview"
          className="preview-card-image"
        />
        <div className="preview-card-body">
          <p ref={previewDescRef} className="preview-card-desc">
            {projects[0].description}
          </p>

          <a
            ref={previewLinkRef}
            href={projects[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="preview-card-link"
          >
            Ver proyecto →
          </a>
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
          right: 60px;
          transform: translateY(-50%);
          width: 440px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          overflow: hidden;
          pointer-events: auto;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        :global(.dark) .preview-card {
          background: rgba(30, 30, 30, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .preview-card-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
          object-position: center top;
        }

        .preview-card-body {
          padding: 20px;
        }

        .preview-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.7);
          margin: 0 0 16px 0;
        }

        :global(.dark) .preview-card-desc {
          color: rgba(255, 255, 255, 0.7);
        }

        .preview-card-link {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          font-weight: 600;
          color: black;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .preview-card-link:hover {
          opacity: 0.6;
        }

        :global(.dark) .preview-card-link {
          color: white;
        }

        @media (max-width: 1024px) {
          .preview-card {
            width: 340px;
            right: 30px;
          }

          .preview-card-image {
            height: 190px;
          }
        }

        @media (max-width: 768px) {
          .preview-card {
            position: fixed;
            top: auto;
            bottom: 16px;
            right: 16px;
            left: 16px;
            transform: none;
            width: auto;
          }

          .preview-card-image {
            height: 140px;
          }

          .preview-card-body {
            padding: 12px 16px;
          }

          .preview-card-desc {
            font-size: 12px;
            margin: 0 0 8px 0;
          }
        }
      `}</style>
    </>
  );
}
