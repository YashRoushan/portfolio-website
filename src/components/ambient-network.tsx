"use client";

import { useEffect, useRef } from "react";

type NetworkNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

type Point = {
  x: number;
  y: number;
};

function createRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 16_807) % 2_147_483_647;
    return (value - 1) / 2_147_483_646;
  };
}

function readColor(variable: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

export function AmbientNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const random = createRandom(29_041);
    const pointer: Point = { x: -1_000, y: -1_000 };
    const pointerTarget: Point = { x: -1_000, y: -1_000 };

    let width = 0;
    let height = 0;
    let nodes: NetworkNode[] = [];
    let frameId = 0;
    let previousTime = performance.now();
    let primary = "#1d4ed8";
    let secondary = "#0f766e";

    const updatePalette = () => {
      primary = readColor("--primary") || primary;
      secondary = readColor("--secondary") || secondary;
    };

    const buildNodes = () => {
      const area = width * height;
      const count = Math.min(56, Math.max(28, Math.round(area / 28_000)));

      nodes = Array.from({ length: count }, () => {
        const angle = random() * Math.PI * 2;
        const speed = 3.5 + random() * 7;

        return {
          x: random() * width,
          y: random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.35 + random() * 1.8,
          phase: random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      buildNodes();

      if (reducedMotion.matches) draw(performance.now(), false);
    };

    const draw = (time: number, shouldMove: boolean) => {
      const delta = Math.min((time - previousTime) / 1_000, 0.05);
      previousTime = time;
      context.clearRect(0, 0, width, height);

      if (finePointer.matches) {
        pointer.x += (pointerTarget.x - pointer.x) * 0.08;
        pointer.y += (pointerTarget.y - pointer.y) * 0.08;
      }

      if (shouldMove) {
        for (const node of nodes) {
          node.x += node.vx * delta;
          node.y += node.vy * delta;

          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      }

      const connectionDistance = width < 640 ? 145 : 205;

      for (let index = 0; index < nodes.length; index += 1) {
        const first = nodes[index];

        for (let next = index + 1; next < nodes.length; next += 1) {
          const second = nodes[next];
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const distance = Math.hypot(dx, dy);
          if (distance > connectionDistance) continue;

          const midpointX = (first.x + second.x) / 2;
          const midpointY = (first.y + second.y) / 2;
          const pointerDistance = Math.hypot(
            midpointX - pointer.x,
            midpointY - pointer.y,
          );
          const proximity = Math.max(0, 1 - pointerDistance / 230);
          const strength = 1 - distance / connectionDistance;

          context.globalAlpha = 0.16 + strength * 0.34 + proximity * 0.24;
          context.strokeStyle = proximity > 0.2 ? secondary : primary;
          context.lineWidth = 0.9 + strength * 0.3 + proximity * 0.65;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();

          if ((index + next) % 9 === 0) {
            const progress = (time * 0.000075 + first.phase) % 1;
            context.globalAlpha = 0.58 + proximity * 0.35;
            context.fillStyle = secondary;
            context.beginPath();
            context.arc(
              first.x + dx * progress,
              first.y + dy * progress,
              1.35 + proximity,
              0,
              Math.PI * 2,
            );
            context.fill();
          }
        }
      }

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        const pointerDistance = Math.hypot(
          node.x - pointer.x,
          node.y - pointer.y,
        );
        const proximity = Math.max(0, 1 - pointerDistance / 190);
        const pulse = shouldMove
          ? (Math.sin(time * 0.0012 + node.phase) + 1) / 2
          : 0.45;

        if (proximity > 0.04) {
          context.globalAlpha = proximity * 0.18;
          context.fillStyle = secondary;
          context.beginPath();
          context.arc(node.x, node.y, 8 + proximity * 9, 0, Math.PI * 2);
          context.fill();
        }

        if (index % 7 === 0) {
          context.globalAlpha = 0.18 + pulse * 0.1 + proximity * 0.14;
          context.strokeStyle = proximity > 0.14 ? secondary : primary;
          context.lineWidth = 0.8;
          context.beginPath();
          context.arc(node.x, node.y, 5 + pulse * 2, 0, Math.PI * 2);
          context.stroke();
        }

        context.globalAlpha = 0.64 + pulse * 0.26 + proximity * 0.1;
        context.fillStyle = proximity > 0.14 ? secondary : primary;
        context.beginPath();
        context.arc(
          node.x,
          node.y,
          node.radius + pulse * 0.45 + proximity * 0.7,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const animate = (time: number) => {
      if (time - previousTime >= 1_000 / 24) {
        draw(time, true);
      }
      frameId = window.requestAnimationFrame(animate);
    };

    const restartAnimation = () => {
      window.cancelAnimationFrame(frameId);
      previousTime = performance.now();

      if (reducedMotion.matches) {
        draw(previousTime, false);
      } else if (!document.hidden) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.x = event.clientX;
      pointerTarget.y = event.clientY;
    };

    const handlePointerLeave = () => {
      pointerTarget.x = -1_000;
      pointerTarget.y = -1_000;
    };

    const handleVisibilityChange = () => restartAnimation();
    const handleThemeChange = () => {
      updatePalette();
      if (reducedMotion.matches) draw(performance.now(), false);
    };
    const themeObserver = new MutationObserver(handleThemeChange);

    updatePalette();
    resize();
    restartAnimation();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", restartAnimation);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", restartAnimation);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="ambient-network" aria-hidden="true">
      <div className="ambient-network__aurora" />
      <div className="ambient-network__grid" />
      <canvas ref={canvasRef} className="ambient-network__canvas" />
      <div className="ambient-network__vignette" />
    </div>
  );
}
