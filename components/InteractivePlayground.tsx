import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type SimulationMode = 'constellation' | 'vortex' | 'matrix';
export type ForceMode = 'repel' | 'attract';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  angle?: number;
  speed?: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

// Gear Icon SVG
function GearIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// Fullscreen Icon SVG
function FullscreenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

// Fullscreen Exit Icon SVG
function FullscreenExitIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

// Close Icon SVG
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function InteractivePlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Settings
  const [mode, setMode] = useState<SimulationMode>('constellation');
  const [force, setForce] = useState<ForceMode>('repel');
  const [density, setDensity] = useState<number>(60);
  const [showLines, setShowLines] = useState<boolean>(true);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Modal and fullscreen states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for live animation loop
  const settingsRef = useRef({ mode, force, density, showLines });
  useEffect(() => {
    settingsRef.current = { mode, force, density, showLines };
  }, [mode, force, density, showLines]);

  const triggerShockwaveRef = useRef<((x?: number, y?: number) => void) | null>(null);
  const triggerImpulseRef = useRef<((type: 'disperse' | 'gather' | 'reset') => void) | null>(null);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (typeof el.requestFullscreen === 'function') {
        el.requestFullscreen().catch(() => {
          setIsFullscreen((prev) => !prev);
        });
      } else {
        setIsFullscreen((prev) => !prev);
      }
    } else {
      if (typeof document.exitFullscreen === 'function') {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (!isSettingsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSettingsOpen]);

  // Main canvas simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId: number;
    let isVisible = true;

    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;

    const ripples: Ripple[] = [];
    let nodes: Node[] = [];

    const initNodes = (w: number, h: number, count: number) => {
      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9,
          baseRadius: Math.random() * 1.5 + 2,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01,
        };
      });
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = isFullscreen ? window.innerHeight : Math.max(380, Math.min(620, rect.height || 520));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initNodes(width, height, settingsRef.current.density);
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !shouldReduceMotion) {
          loop();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const getAccentColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--blue').trim() || '#1749c6';
    };

    triggerShockwaveRef.current = (originX, originY) => {
      const x = originX !== undefined ? originX : width / 2;
      const y = originY !== undefined ? originY : height / 2;
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.75,
        alpha: 1,
      });
      setPulseCount((c) => c + 1);
    };

    triggerImpulseRef.current = (type) => {
      const cx = width / 2;
      const cy = height / 2;
      if (type === 'reset') {
        initNodes(width, height, settingsRef.current.density);
        return;
      }
      for (const node of nodes) {
        if (type === 'disperse') {
          const angle = Math.random() * Math.PI * 2;
          const forceMag = Math.random() * 8 + 4;
          node.vx = Math.cos(angle) * forceMag;
          node.vy = Math.sin(angle) * forceMag;
        } else if (type === 'gather') {
          const dx = cx - node.x;
          const dy = cy - node.y;
          const dist = Math.hypot(dx, dy) || 1;
          node.vx = (dx / dist) * 6;
          node.vy = (dy / dist) * 6;
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const accent = getAccentColor();
      const currentMode = settingsRef.current.mode;
      const currentForce = settingsRef.current.force;
      const enableLines = settingsRef.current.showLines;

      // Draw and advance ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 4.5;
        ripple.alpha = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = ripple.alpha * 0.35;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (ripple.radius >= ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Update nodes physics
      const maxDistance = 110;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!shouldReduceMotion) {
          if (currentMode === 'vortex') {
            const pivotX = isHovering ? mouseX : width / 2;
            const pivotY = isHovering ? mouseY : height / 2;
            const dx = node.x - pivotX;
            const dy = node.y - pivotY;
            const dist = Math.hypot(dx, dy) || 1;

            const angle = Math.atan2(dy, dx) + (node.speed || 0.02);
            const radius = Math.max(30, dist - 0.4);
            node.x = pivotX + Math.cos(angle) * radius + node.vx * 0.4;
            node.y = pivotY + Math.sin(angle) * radius + node.vy * 0.4;
          } else if (currentMode === 'matrix') {
            node.y += Math.abs(node.vy) * 2 + 1.2;
            node.x += node.vx * 0.2;
            if (node.y > height) {
              node.y = 0;
              node.x = Math.random() * width;
            }
          } else {
            // Constellation drift
            node.x += node.vx;
            node.y += node.vy;

            node.vx *= 0.99;
            node.vy *= 0.99;

            if (node.x <= 0 || node.x >= width) node.vx *= -1;
            if (node.y <= 0 || node.y >= height) node.vy *= -1;
          }

          node.x = Math.max(0, Math.min(width, node.x));
          node.y = Math.max(0, Math.min(height, node.y));

          // Pointer interaction field
          if (isHovering) {
            const dx = node.x - mouseX;
            const dy = node.y - mouseY;
            const dist = Math.hypot(dx, dy);
            const influenceRadius = 160;

            if (dist < influenceRadius && dist > 0) {
              const strength = (1 - dist / influenceRadius) * 2.8;
              const dir = currentForce === 'repel' ? 1 : -1;
              node.x += (dx / dist) * strength * dir;
              node.y += (dy / dist) * strength * dir;
            }
          }

          // Ripple shockwave influence
          for (const ripple of ripples) {
            const rdx = node.x - ripple.x;
            const rdy = node.y - ripple.y;
            const rdist = Math.hypot(rdx, rdy);
            const waveFront = Math.abs(rdist - ripple.radius);
            if (waveFront < 28 && rdist > 0) {
              const push = (1 - waveFront / 28) * 3.5 * ripple.alpha;
              node.x += (rdx / rdist) * push;
              node.y += (rdy / rdist) * push;
            }
          }
        }

        // Draw connections
        if (enableLines) {
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = accent;
              ctx.globalAlpha = (1 - dist / maxDistance) * 0.2;
              ctx.lineWidth = 1;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => {
      if (!isVisible) return;
      render();
      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    if (shouldReduceMotion) {
      render();
    } else {
      loop();
    }

    const onPointerMove = (e: globalThis.PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const onPointerLeave = () => {
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    const onPointerDown = (e: globalThis.PointerEvent) => {
      // Avoid firing shockwave if clicked on header controls
      const target = e.target as HTMLElement;
      if (target.closest('button')) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      triggerShockwaveRef.current?.(x, y);
    };

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, [shouldReduceMotion, isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`playground-frame ${isFullscreen ? 'is-fullscreen' : ''}`}
      aria-label="Interactive physics simulation sandbox"
      role="region"
    >
      {/* Top Floating Action Bar */}
      <div className="playground-toolbar">
        <div className="playground-status">
          <span className="playground-status-badge">
            {mode.toUpperCase()} · {force.toUpperCase()}
          </span>
          <span className="playground-hint">
            {shouldReduceMotion
              ? 'Static view (reduced motion)'
              : 'Move to steer · Click to pulse shockwave'}
          </span>
        </div>

        <div className="playground-actions-bar">
          <button
            type="button"
            className="canvas-action-btn"
            aria-label="Trigger pulse shockwave"
            title="Trigger pulse wave"
            onClick={() => triggerShockwaveRef.current?.()}
          >
            <span>⚡ Pulse</span>
            {pulseCount > 0 && <span className="pulse-badge">{pulseCount}</span>}
          </button>

          <button
            type="button"
            className="canvas-action-btn"
            aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
            title={isFullscreen ? 'Exit full screen' : 'Full screen'}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </button>

          <button
            type="button"
            className="canvas-action-btn"
            aria-label="Open simulation controls"
            title="Settings & controls"
            aria-expanded={isSettingsOpen}
            onClick={() => setIsSettingsOpen(true)}
          >
            <GearIcon />
          </button>
        </div>
      </div>

      <canvas className="playground-canvas" ref={canvasRef} />

      {/* Settings Modal Dialog */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div
            className="playground-modal-backdrop"
            onClick={() => setIsSettingsOpen(false)}
          >
            <motion.div
              className="playground-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="playground-settings-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="playground-modal-header">
                <div>
                  <h2 id="playground-settings-title" className="playground-modal-title">
                    Sandbox Controls
                  </h2>
                  <p className="playground-modal-desc">
                    Customize physics dynamics, pointer interaction, and particle density.
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  aria-label="Close controls"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="playground-modal-content">
                {/* 1. Simulation Mode */}
                <div className="control-item">
                  <div className="control-header">
                    <span className="control-name">Simulation Mode</span>
                    <span className="control-desc">
                      {mode === 'constellation' && 'Nodes freely drift and connect via proximity springs.'}
                      {mode === 'vortex' && 'Particles spiral in a gravitational orbital vortex.'}
                      {mode === 'matrix' && 'Continuous downward cascading kinetic streams.'}
                    </span>
                  </div>
                  <div className="segmented-toggle" role="group" aria-label="Simulation Mode">
                    {(['constellation', 'vortex', 'matrix'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`segmented-opt ${mode === m ? 'is-active' : ''}`}
                        onClick={() => setMode(m)}
                      >
                        {mode === m && (
                          <motion.span
                            className="segmented-active-pill"
                            layoutId="mode-pill"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="segmented-text">
                          {m.charAt(0).toUpperCase() + m.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Interaction Force */}
                <div className="control-item">
                  <div className="control-header">
                    <span className="control-name">Pointer Force</span>
                    <span className="control-desc">
                      {force === 'repel'
                        ? 'Magnetic deflection: particles flee the cursor radius.'
                        : 'Gravitational attraction: particles are drawn toward the cursor.'}
                    </span>
                  </div>
                  <div className="segmented-toggle" role="group" aria-label="Pointer Force">
                    {(['repel', 'attract'] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        className={`segmented-opt ${force === f ? 'is-active' : ''}`}
                        onClick={() => setForce(f)}
                      >
                        {force === f && (
                          <motion.span
                            className="segmented-active-pill"
                            layoutId="force-pill"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="segmented-text">
                          {f === 'repel' ? 'Repel (Deflect)' : 'Attract (Gravity)'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Particle Density */}
                <div className="control-item">
                  <div className="control-header">
                    <span className="control-name">Particle Density</span>
                    <span className="control-desc">
                      Adjust active node count ({density} particles simulated).
                    </span>
                  </div>
                  <div className="segmented-toggle" role="group" aria-label="Particle Density">
                    {[30, 60, 90].map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`segmented-opt ${density === d ? 'is-active' : ''}`}
                        onClick={() => setDensity(d)}
                      >
                        {density === d && (
                          <motion.span
                            className="segmented-active-pill"
                            layoutId="density-pill"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="segmented-text">
                          {d === 30 ? 'Low (30)' : d === 60 ? 'Medium (60)' : 'High (90)'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Connection Lines */}
                <div className="control-item">
                  <div className="control-header">
                    <span className="control-name">Proximity Web</span>
                    <span className="control-desc">
                      Render faint spring lines between nearby nodes.
                    </span>
                  </div>
                  <div className="segmented-toggle" role="group" aria-label="Connection Web">
                    {[true, false].map((v) => (
                      <button
                        key={String(v)}
                        type="button"
                        className={`segmented-opt ${showLines === v ? 'is-active' : ''}`}
                        onClick={() => setShowLines(v)}
                      >
                        {showLines === v && (
                          <motion.span
                            className="segmented-active-pill"
                            layoutId="lines-pill"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="segmented-text">
                          {v ? 'Connected Lines' : 'Points Only'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Impulses */}
                <div className="control-item">
                  <div className="control-header">
                    <span className="control-name">Impulses & Actions</span>
                    <span className="control-desc">Trigger instant physics waves or reset state.</span>
                  </div>
                  <div className="modal-actions-row">
                    <button
                      type="button"
                      className="modal-action-btn"
                      onClick={() => {
                        triggerShockwaveRef.current?.();
                        setIsSettingsOpen(false);
                      }}
                    >
                      ⚡ Pulse Wave
                    </button>
                    <button
                      type="button"
                      className="modal-action-btn"
                      onClick={() => triggerImpulseRef.current?.('disperse')}
                    >
                      💥 Disperse
                    </button>
                    <button
                      type="button"
                      className="modal-action-btn"
                      onClick={() => triggerImpulseRef.current?.('gather')}
                    >
                      🧲 Gather
                    </button>
                    <button
                      type="button"
                      className="modal-action-btn is-secondary"
                      onClick={() => triggerImpulseRef.current?.('reset')}
                    >
                      ↺ Reset All
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
