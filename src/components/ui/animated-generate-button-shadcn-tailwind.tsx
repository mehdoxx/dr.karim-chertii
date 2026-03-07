import * as React from "react";
import clsx from "clsx";

export type AnimatedGenerateButtonProps = {
  className?: string;
  labelIdle?: string;
  labelActive?: string;
  generating?: boolean;
  highlightHueDeg?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
};

export default function AnimatedGenerateButton({
  className,
  labelIdle = "Skin Advisor",
  labelActive = "Analyzing...",
  generating = false,
  highlightHueDeg = 210,
  onClick,
  type = "button",
  disabled = false,
  id,
  ariaLabel,
}: AnimatedGenerateButtonProps) {
  // Detect RTL text (Arabic script) — render as whole words, not individual chars
  const isRTL = (text: string) =>
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);

  const renderText = (text: string) => {
    if (isRTL(text)) {
      return (
        <span className="skin-advisor-text" style={{ direction: "rtl" }}>
          {text}
        </span>
      );
    }
    // Latin — stagger letter-by-letter
    return Array.from(text).map((ch, i) => (
      <span
        key={i}
        className="skin-advisor-letter"
        style={{ animationDelay: `${i * 0.06}s` }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));
  };

  return (
    <div className={clsx("relative inline-block", className)} id={id}>
      <button
        type={type}
        aria-label={ariaLabel || (generating ? labelActive : labelIdle)}
        aria-pressed={generating}
        disabled={disabled}
        onClick={onClick}
        className="skin-advisor-btn"
        style={
          {
            ["--highlight-hue" as string]: `${highlightHueDeg}deg`,
          } as React.CSSProperties
        }
      >
        {/* Sparkle icon */}
        <svg
          className="skin-advisor-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>

        {/* Label text */}
        <span className="skin-advisor-label">
          {generating ? renderText(labelActive) : renderText(labelIdle)}
        </span>
      </button>

      <style jsx>{`
        .skin-advisor-btn {
          --highlight: hsl(var(--highlight-hue), 100%, 70%);
          --highlight-glow: hsla(var(--highlight-hue), 100%, 65%, 0.35);

          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 28px;
          border-radius: 9999px;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          font-size: 16px;
          font-weight: 500;
          font-family: var(--font-inter), system-ui, sans-serif;
          letter-spacing: 0.01em;

          /* Glass surface */
          background: hsla(var(--highlight-hue), 15%, 50%, 0.08);
          border: 1px solid hsl(var(--border) / 0.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: hsl(var(--foreground));

          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Subtle bottom glow line */
        .skin-advisor-btn::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--highlight-glow),
            transparent
          );
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        /* Hover state */
        .skin-advisor-btn:hover {
          background: hsla(var(--highlight-hue), 20%, 50%, 0.15);
          border-color: hsla(var(--highlight-hue), 80%, 70%, 0.4);
          box-shadow:
            0 0 20px -5px var(--highlight-glow),
            inset 0 1px 0 hsla(var(--highlight-hue), 80%, 90%, 0.1);
          transform: translateY(-1px);
        }

        .skin-advisor-btn:hover::after {
          opacity: 1;
        }

        .skin-advisor-btn:hover .skin-advisor-icon {
          color: var(--highlight);
          filter: drop-shadow(0 0 6px var(--highlight-glow));
          animation: none;
        }

        .skin-advisor-btn:hover .skin-advisor-letter,
        .skin-advisor-btn:hover .skin-advisor-text {
          color: hsl(var(--foreground));
        }

        /* Active / pressed */
        .skin-advisor-btn:active {
          transform: translateY(0);
          background: hsla(var(--highlight-hue), 25%, 45%, 0.2);
          border-color: hsla(var(--highlight-hue), 80%, 70%, 0.6);
          box-shadow: 0 0 30px -5px var(--highlight-glow);
        }

        /* Focus visible */
        .skin-advisor-btn:focus-visible {
          outline: 2px solid hsla(var(--highlight-hue), 80%, 65%, 0.6);
          outline-offset: 2px;
        }

        /* Disabled */
        .skin-advisor-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* ─── Icon ─── */
        .skin-advisor-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          color: hsl(var(--foreground) / 0.55);
          animation: sparkle-pulse 2.5s ease-in-out infinite;
          transition: color 0.35s ease, filter 0.35s ease;
        }

        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        /* ─── Label ─── */
        .skin-advisor-label {
          display: inline-flex;
          align-items: center;
          position: relative;
        }

        /* Latin letters */
        .skin-advisor-letter {
          display: inline-block;
          color: hsl(var(--foreground) / 0.7);
          animation: letter-shimmer 2.4s ease-in-out infinite;
          transition: color 0.35s ease;
        }

        @keyframes letter-shimmer {
          0%, 100% { color: hsl(var(--foreground) / 0.7); }
          50% { color: hsl(var(--foreground) / 1); }
        }

        /* Arabic whole-text  */
        .skin-advisor-text {
          color: hsl(var(--foreground) / 0.75);
          font-size: 17px;
          transition: color 0.35s ease;
        }

        /* ─── Dark mode refinements ─── */
        :global(.dark) .skin-advisor-btn {
          background: hsla(var(--highlight-hue), 20%, 30%, 0.12);
          border-color: hsl(var(--border) / 0.25);
        }

        :global(.dark) .skin-advisor-btn:hover {
          background: hsla(var(--highlight-hue), 30%, 40%, 0.2);
          border-color: hsla(var(--highlight-hue), 80%, 70%, 0.35);
          box-shadow:
            0 0 25px -5px hsla(var(--highlight-hue), 100%, 65%, 0.25),
            inset 0 1px 0 hsla(var(--highlight-hue), 80%, 90%, 0.06);
        }

        :global(.dark) .skin-advisor-icon {
          color: hsl(var(--foreground) / 0.5);
        }

        :global(.dark) .skin-advisor-btn:hover .skin-advisor-icon {
          color: var(--highlight);
        }

        :global(.dark) .skin-advisor-letter {
          color: hsl(var(--foreground) / 0.6);
        }

        :global(.dark) .skin-advisor-text {
          color: hsl(var(--foreground) / 0.65);
        }

        :global(.dark) .skin-advisor-btn:hover .skin-advisor-letter,
        :global(.dark) .skin-advisor-btn:hover .skin-advisor-text {
          color: hsl(var(--foreground) / 0.95);
        }
      `}</style>
    </div>
  );
}
