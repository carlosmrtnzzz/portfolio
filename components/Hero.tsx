"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameChars = nameRef.current?.querySelectorAll(".char");
      if (nameChars) {
        gsap.set(nameChars, { opacity: 0, y: 40, rotateX: -60 });
        gsap.to(nameChars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.025,
          delay: 0.1,
        });
      }

      gsap.fromTo(
        roleRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.7 },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char inline-block"
        style={{ perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={heroRef}
      className="flex h-full flex-col items-center justify-center overflow-hidden px-6"
    >
      <h1
        ref={nameRef}
        className="hero-name text-center text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-7xl lg:text-8xl"
        style={{ fontFamily: "var(--font-revalia)" }}
      >
        {splitText("CARLOS MARTÍNEZ")}
      </h1>

      <p
        ref={roleRef}
        className="mt-4 text-base font-light uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 sm:mt-6 sm:text-xl"
        style={{ opacity: 0 }}
      >
        Desarrollador web
      </p>

      <p
        ref={descRef}
        className="mt-3 max-w-lg text-center text-sm text-zinc-600 dark:text-zinc-400 sm:mt-4 sm:text-lg"
        style={{ opacity: 0 }}
      >
        En constante evolución, proyecto a proyecto. <br /> Claridad, fluidez
        y precisión.
      </p>

      <style jsx>{`
        .hero-name {
          cursor: default;
        }
      `}</style>
    </section>
  );
}