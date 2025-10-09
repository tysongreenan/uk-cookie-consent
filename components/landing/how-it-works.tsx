import { Palette, Code, Shield } from 'lucide-react'

const steps = [
  {
    icon: Palette,
    title: 'Customize',
    description: 'your banner to match your brand.',
  },
  {
    icon: Code,
    title: 'Copy and paste',
    description: 'the install code to your site.',
  },
  {
    icon: Shield,
    title: 'Stay compliant',
    description: 'with GDPR, PIPEDA, and CASL.',
  },
]

export function HowItWorks() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            No dev required. No confusing setup. Just drop it in and move on with your life.
          </p>
        </div>

        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="mb-2 text-xl font-semibold">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>

              {/* Connector arrow (hidden on mobile, shown on desktop between steps) */}
              {index < steps.length - 1 && (
                <div className="absolute left-full top-6 hidden w-full -translate-x-1/2 md:block">
                  <svg
                    className="h-6 w-full text-primary/20"
                    fill="none"
                    viewBox="0 0 100 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 12h94m0 0l-6-6m6 6l-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
