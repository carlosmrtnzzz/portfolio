"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const wavesCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wavesCanvas = wavesCanvasRef.current;
    const particlesCanvas = particlesCanvasRef.current;
    if (!wavesCanvas || !particlesCanvas) return;

    const wavesCtx = wavesCanvas.getContext("2d");
    const particlesCtx = particlesCanvas.getContext("2d");
    if (!wavesCtx || !particlesCtx) return;

    const setCanvasSize = () => {
      wavesCanvas.width = particlesCanvas.width = window.innerWidth;
      wavesCanvas.height = particlesCanvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 40,
    };

    // Particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
      baseX: number;
      baseY: number;
    }> = [];

    let waveOffset = 0;

    const isDark = () => document.documentElement.classList.contains("dark");

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const createParticles = () => {
      particles.length = 0;

      for (let i = 0; i < 200; i++) {
        const x = Math.random() * particlesCanvas.width;

        const waveY =
          particlesCanvas.height / 2 +
          Math.sin(x * 0.003) * 30 +
          Math.cos(x * 0.002) * 15;

        const y = waveY + (Math.random() - 0.5) * 80;

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.08,
          speedY: (Math.random() - 0.5) * 0.04,
          opacity: Math.random() * 0.5,
          opacitySpeed: (Math.random() - 0.5) * 0.008,
        });
      }
    };

    createParticles();

    const animate = () => {
      if (!wavesCtx || !particlesCtx || !wavesCanvas || !particlesCanvas)
        return;

      wavesCtx.clearRect(0, 0, wavesCanvas.width, wavesCanvas.height);
      particlesCtx.clearRect(
        0,
        0,
        particlesCanvas.width,
        particlesCanvas.height,
      );

      const colors = isDark()
        ? {
            wave1: "rgba(100, 120, 140, 0.15)",
            wave2: "rgba(80, 100, 120, 0.1)",
            wave3: "rgba(60, 80, 100, 0.08)",
          }
        : {
            wave1: "rgba(220, 220, 220, 0.4)",
            wave2: "rgba(200, 200, 200, 0.3)",
            wave3: "rgba(180, 180, 180, 0.2)",
          };

      waveOffset += 0.003;

      // Wave 1
      wavesCtx.fillStyle = colors.wave1;
      wavesCtx.beginPath();
      for (let x = 0; x < wavesCanvas.width; x += 10) {
        const y =
          wavesCanvas.height / 2 +
          Math.sin(x * 0.003 + waveOffset) * 30 +
          Math.cos(x * 0.002 + waveOffset * 0.5) * 15;
        if (x === 0) wavesCtx.moveTo(x, y);
        else wavesCtx.lineTo(x, y);
      }
      wavesCtx.lineTo(wavesCanvas.width, wavesCanvas.height);
      wavesCtx.lineTo(0, wavesCanvas.height);
      wavesCtx.closePath();
      wavesCtx.fill();

      // Wave 2
      wavesCtx.fillStyle = colors.wave2;
      wavesCtx.beginPath();
      for (let x = 0; x < wavesCanvas.width; x += 10) {
        const y =
          wavesCanvas.height / 2 +
          Math.sin(x * 0.002 + waveOffset + 1) * 40 +
          Math.cos(x * 0.003 + waveOffset * 0.8) * 20;
        if (x === 0) wavesCtx.moveTo(x, y);
        else wavesCtx.lineTo(x, y);
      }
      wavesCtx.lineTo(wavesCanvas.width, wavesCanvas.height);
      wavesCtx.lineTo(0, wavesCanvas.height);
      wavesCtx.closePath();
      wavesCtx.fill();

      // Wave 3
      wavesCtx.fillStyle = colors.wave3;
      wavesCtx.beginPath();
      for (let x = 0; x < wavesCanvas.width; x += 10) {
        const y =
          wavesCanvas.height / 2 +
          Math.sin(x * 0.004 + waveOffset + 2) * 25 +
          Math.cos(x * 0.0015 + waveOffset * 1.2) * 12;
        if (x === 0) wavesCtx.moveTo(x, y);
        else wavesCtx.lineTo(x, y);
      }
      wavesCtx.lineTo(wavesCanvas.width, wavesCanvas.height);
      wavesCtx.lineTo(0, wavesCanvas.height);
      wavesCtx.closePath();
      wavesCtx.fill();

      particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * force * 5;
          particle.y -= Math.sin(angle) * force * 5;
        } else {
          particle.x += (particle.baseX - particle.x) * 0.05;
          particle.y += (particle.baseY - particle.y) * 0.05;
        }

        const gradient = particlesCtx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3,
        );

        const particleColor = isDark() ? "255, 255, 255" : "200, 200, 200";

        gradient.addColorStop(0, `rgba(${particleColor}, ${particle.opacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(${particleColor}, ${particle.opacity * 0.3})`,
        );
        gradient.addColorStop(1, `rgba(${particleColor}, 0)`);

        particlesCtx.fillStyle = gradient;
        particlesCtx.beginPath();
        particlesCtx.arc(
          particle.x,
          particle.y,
          particle.size * 3,
          0,
          Math.PI * 2,
        );
        particlesCtx.fill();

        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        particle.opacity += particle.opacitySpeed;
        if (particle.opacity <= 0 || particle.opacity >= 0.5) {
          particle.opacitySpeed *= -1;
        }

        if (particle.baseX < 0) particle.baseX = particlesCanvas.width;
        if (particle.baseX > particlesCanvas.width) particle.baseX = 0;
        if (particle.baseY < particlesCanvas.height / 2 - 100)
          particle.baseY = particlesCanvas.height / 2 + 100;
        if (particle.baseY > particlesCanvas.height / 2 + 100)
          particle.baseY = particlesCanvas.height / 2 - 100;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      createParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={wavesCanvasRef} className="fixed inset-0 -z-10" />
      <canvas ref={particlesCanvasRef} className="fixed inset-0 -z-10" />
    </>
  );
}
