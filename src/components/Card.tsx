import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  icon?: string;
}

export function Card({ children, title, icon }: CardProps) {
  return (
    <div className="rounded-2xl overflow-hidden vintage-shadow burned-edges w-full min-w-[300px]">
      {" "}
      {title && (
        <div
          className="p-4 border-b-2 border-orange-950/50 relative"
          style={{
            background: "linear-gradient(to bottom, #7c2d12, #c2410c, #ea580c)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
          <h2
            className="text-xl font-bold text-center text-amber-100 relative z-10 flex items-center justify-center gap-2"
            style={{ fontFamily: "'Righteous', sans-serif" }}
          >
            {icon && <span className="text-2xl">{icon}</span>}
            {title}
          </h2>
        </div>
      )}
      <div
        className="p-4 relative min-w-full"
        style={{
          background: "#f59e0b",
          backgroundImage: `
          radial-gradient(ellipse at 20% 30%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(234, 88, 12, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(252, 211, 77, 0.2) 0%, transparent 70%),
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(180, 83, 9, 0.03) 3px, rgba(180, 83, 9, 0.03) 6px),
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(146, 64, 14, 0.03) 3px, rgba(146, 64, 14, 0.03) 6px)
        `,
          boxShadow: "inset 0 0 100px rgba(180, 83, 9, 0.1)",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none rounded-b-2xl"
          style={{ mixBlendMode: "multiply" }}
        ></div>

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
