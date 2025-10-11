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
    <section className="container px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            No dev required. No confusing setup. Just drop it in and move on with your life.
          </p>
        </div>

        <ol className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground sm:h-12 sm:w-12 sm:text-xl">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 sm:h-16 sm:w-16 sm:mb-4">
                <step.icon className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
              </div>
              
              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
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
