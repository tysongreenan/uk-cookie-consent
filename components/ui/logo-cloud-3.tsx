'use client'

import { PLATFORMS } from '@/components/landing/v2/platform-strip'

/** 21st.dev: 7ovr/logo-cloud-3 — CSS marquee with edge fade, pause on hover. */
export function LogoCloud3({
  label = 'Works on every platform you ship to',
}: {
  label?: string
}) {
  const loop = [...PLATFORMS, ...PLATFORMS]

  return (
    <section
      aria-label="Platforms supported"
      className="border-y border-border bg-background px-6 py-16 text-foreground"
    >
      <style>{`
        @keyframes logo-cloud-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-cloud-track {
          animation: logo-cloud-marquee 32s linear infinite;
        }
        .logo-cloud-mask:hover .logo-cloud-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-cloud-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>

        <div className="logo-cloud-mask relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="logo-cloud-track flex w-max items-center">
            {loop.map((p, index) => (
              <div
                key={`${p.name}-${index}`}
                className="flex shrink-0 items-center gap-2.5 px-8 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                aria-hidden={index >= PLATFORMS.length ? true : undefined}
              >
                <span className="h-6 w-6 [&>svg]:h-full [&>svg]:w-full">{p.icon}</span>
                <span className="whitespace-nowrap text-lg font-semibold tracking-tight">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
