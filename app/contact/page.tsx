"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const contactMethods = [
  {
    id: "email",
    label: "Email",
    value: "carlosmartinej@gmail.com",
    href: "mailto:carlosmartinej@gmail.com",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
  {
    id: "github",
    label: "GitHub",
    value: "@carlosmrtnzzz",
    href: "https://github.com/carlosmrtnzzz",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Carlos Martínez Jiménez",
    href: "https://www.linkedin.com/in/carlos-mart%C3%ADnez-jim%C3%A9nez-web/",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.1,
        },
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.3,
        },
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.45,
        },
      );

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: "power3.out",
              delay: 0.55 + index * 0.1,
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-zinc-50 pt-24 pb-12 dark:bg-black"
    >
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center justify-center px-4 sm:px-6">
        <div
          ref={cardRef}
          className="contact-card w-full max-w-md"
          style={{ opacity: 0 }}
        >
          <div className="card-content">
            <h1
              ref={titleRef}
              className="text-4xl font-normal sm:text-5xl md:text-6xl"
              style={{ opacity: 0 }}
            >
              Contacto
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 sm:mt-8 sm:text-base"
              style={{ opacity: 0 }}
            >
              Abierto a nuevas oportunidades y retos profesionales.
              <br />
              Encantado de formar parte de equipos con visión y ambición.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10">
              {contactMethods.map((method, index) => (
                <a
                  key={method.id}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  href={method.href}
                  target={method.id !== "email" ? "_blank" : undefined}
                  rel={
                    method.id !== "email" ? "noopener noreferrer" : undefined
                  }
                  className="contact-item group"
                  style={{ opacity: 0 }}
                >
                  <div className="contact-icon-wrapper">
                    <div
                      className="contact-icon"
                      dangerouslySetInnerHTML={{ __html: method.icon }}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="contact-label">{method.label}</span>
                    <span className="contact-value">{method.value}</span>
                  </div>
                  <svg
                    className="arrow-icon flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 sm:mt-10">
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Málaga, España
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          transition: box-shadow 0.3s ease;
        }

        :global(.dark) .contact-card {
          background: rgba(30, 30, 30, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        }

        .card-content {
          padding: 24px;
        }

        @media (min-width: 640px) {
          .contact-card {
            border-radius: 24px;
          }

          .card-content {
            padding: 40px;
          }
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .contact-item {
            gap: 16px;
            padding: 16px 20px;
            border-radius: 16px;
          }
        }

        :global(.dark) .contact-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .contact-item:hover {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.08);
          transform: translateX(4px);
        }

        :global(.dark) .contact-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .contact-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .contact-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 12px;
          }
        }

        :global(.dark) .contact-icon-wrapper {
          background: rgba(255, 255, 255, 0.08);
        }

        .contact-item:hover .contact-icon-wrapper {
          background: black;
        }

        :global(.dark) .contact-item:hover .contact-icon-wrapper {
          background: white;
        }

        .contact-icon {
          color: rgba(0, 0, 0, 0.7);
          transition: color 0.3s ease;
        }

        .contact-icon :global(svg) {
          width: 20px;
          height: 20px;
        }

        @media (min-width: 640px) {
          .contact-icon :global(svg) {
            width: 24px;
            height: 24px;
          }
        }

        :global(.dark) .contact-icon {
          color: rgba(255, 255, 255, 0.7);
        }

        .contact-item:hover .contact-icon {
          color: white;
        }

        :global(.dark) .contact-item:hover .contact-icon {
          color: black;
        }

        .contact-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(0, 0, 0, 0.4);
        }

        @media (min-width: 640px) {
          .contact-label {
            font-size: 12px;
          }
        }

        :global(.dark) .contact-label {
          color: rgba(255, 255, 255, 0.4);
        }

        .contact-value {
          font-size: 13px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.9);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (min-width: 640px) {
          .contact-value {
            font-size: 15px;
          }
        }

        :global(.dark) .contact-value {
          color: rgba(255, 255, 255, 0.9);
        }

        .arrow-icon {
          color: rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          transform: translateX(0);
          width: 18px;
          height: 18px;
        }

        @media (min-width: 640px) {
          .arrow-icon {
            width: 20px;
            height: 20px;
          }
        }

        :global(.dark) .arrow-icon {
          color: rgba(255, 255, 255, 0.2);
        }

        .contact-item:hover .arrow-icon {
          color: rgba(0, 0, 0, 0.6);
          transform: translateX(4px);
        }

        :global(.dark) .contact-item:hover .arrow-icon {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </main>
  );
}
