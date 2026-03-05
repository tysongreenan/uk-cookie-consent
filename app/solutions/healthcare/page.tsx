'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { FinalCTA } from '@/components/landing/final-cta'
import { HeroSection } from '@/components/blocks/hero-section'
import {
  Heart,
  Shield,
  Users,
  Globe,
  CheckCircle,
  Stethoscope,
  FileText,
  ArrowRight,
  Activity,
  Lock,
  Eye,
  ClipboardCheck,
} from 'lucide-react'
import { motion } from 'framer-motion'

// Metadata must be in a separate file or handled differently for client components
// We'll use a head component approach

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
}

export default function HealthcareSolutionPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <HeroSection
          badge={{ text: 'Healthcare Compliance' }}
          title="HIPAA-Compliant Cookie Consent"
          title2="for Healthcare Organizations"
          description="Manage cookie consent alongside HIPAA, GDPR, PIPEDA, and CCPA requirements. Built for telemedicine platforms, patient portals, and medical device tracking."
          actions={[
            {
              text: 'Get Started Free',
              href: '/auth/signup',
              variant: 'glow',
              icon: <ArrowRight className="h-4 w-4" />,
            },
            {
              text: 'Scan Your Site',
              href: '/tools/cookie-scanner',
              variant: 'outline',
            },
          ]}
          useGeometricBackground
        />

        {/* Trust Indicator Bar */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          custom={0}
          className="border-y border-border bg-muted/30"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                HIPAA Technical Safeguards
              </span>
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                GDPR + PIPEDA + CCPA
              </span>
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                PHI Protection
              </span>
              <span className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                Audit Trail Logging
              </span>
            </div>
          </div>
        </motion.section>

        {/* Healthcare Challenges — Asymmetric grid with visual hierarchy */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0}
                className="mb-14"
              >
                <Badge variant="outline" className="mb-4">
                  The Challenge
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 max-w-2xl">
                  Why Healthcare Cookie Compliance Is Different
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Medical organizations face uniquely complex privacy requirements
                  across overlapping regulations.
                </p>
              </motion.div>

              {/* Asymmetric grid: 2 large + 4 small */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {/* Featured card — spans 2 cols on lg */}
                <motion.div variants={staggerItem} className="lg:col-span-2">
                  <Card className="h-full border-primary/20 bg-primary/[0.02] hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl">
                          HIPAA Meets Cookie Laws
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Healthcare websites must simultaneously comply with HIPAA
                        requirements for Protected Health Information (PHI) and
                        international cookie consent laws like GDPR, PIPEDA, and
                        CCPA. This dual-compliance obligation creates unique
                        challenges that standard cookie consent tools cannot
                        address.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Card className="h-full hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                          <Stethoscope className="h-4 w-4 text-foreground" />
                        </div>
                        <CardTitle className="text-base">
                          Telemedicine Platforms
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Video conferencing, patient data transmission, and
                        remote monitoring require specialized consent workflows.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Card className="h-full hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                          <Users className="h-4 w-4 text-foreground" />
                        </div>
                        <CardTitle className="text-base">
                          Patient Portal Compliance
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Medical records, appointment scheduling, and
                        communication tools each need granular consent handling.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Card className="h-full hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                          <Activity className="h-4 w-4 text-foreground" />
                        </div>
                        <CardTitle className="text-base">
                          Medical Device Tracking
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        IoT devices, wearables, and connected equipment generate
                        data requiring explicit patient consent for processing.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Card className="h-full hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="h-4 w-4 text-foreground" />
                        </div>
                        <CardTitle className="text-base">
                          Audit Trail Requirements
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Healthcare organizations must maintain detailed consent
                        audit trails for regulatory compliance and breach response.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HIPAA + Cookie Law Side-by-Side */}
        <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-14"
              >
                <Badge variant="outline" className="mb-4">
                  Integrated Compliance
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                  One Solution for Both Frameworks
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Meeting HIPAA and international privacy law requirements
                  simultaneously
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-6 mb-10"
              >
                <motion.div variants={staggerItem}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        HIPAA Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {[
                          'Administrative, Physical, and Technical Safeguards',
                          'Business Associate Agreements (BAAs)',
                          'Minimum Necessary Standard',
                          'Patient Access Rights',
                          'Breach Notification Requirements',
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-muted-foreground"
                          >
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        Cookie Law Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {[
                          'Explicit Consent for Non-Essential Cookies',
                          'Granular Consent Categories',
                          'Easy Consent Withdrawal',
                          'Clear Cookie Information Disclosures',
                          'Consent Records and Audit Trails',
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-muted-foreground"
                          >
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Integrated approach — 3-column feature strip */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
              >
                <Card className="border-primary/20 bg-background">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          icon: Shield,
                          title: 'HIPAA Safeguards',
                          desc: 'Technical and administrative controls for PHI protection',
                        },
                        {
                          icon: Globe,
                          title: 'Cookie Consent',
                          desc: 'GDPR, PIPEDA, CCPA compliant consent management',
                        },
                        {
                          icon: Heart,
                          title: 'Patient Trust',
                          desc: 'Transparent privacy practices build patient confidence',
                        },
                      ].map((feature, i) => (
                        <motion.div
                          key={feature.title}
                          variants={staggerItem}
                          className="text-center"
                        >
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-heading font-semibold text-foreground mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {feature.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Healthcare Use Cases — 2x2 grid with icon accents */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0}
                className="mb-14"
              >
                <Badge variant="outline" className="mb-4">
                  Use Cases
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 max-w-2xl">
                  Built for Every Healthcare Environment
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Specialized consent workflows for different healthcare contexts
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-6"
              >
                {[
                  {
                    icon: Stethoscope,
                    title: 'Telemedicine Platforms',
                    items: [
                      'Video conferencing cookie consent',
                      'Screen sharing and recording consent',
                      'Patient data transmission consent',
                      'Prescription management consent',
                      'Multi-provider consent delegation',
                    ],
                  },
                  {
                    icon: Users,
                    title: 'Patient Portals',
                    items: [
                      'Medical records access consent',
                      'Appointment scheduling consent',
                      'Lab results and imaging consent',
                      'Medication management consent',
                      'Communication preferences',
                    ],
                  },
                  {
                    icon: Activity,
                    title: 'Medical Device Tracking',
                    items: [
                      'IoT device data collection consent',
                      'Wearable health monitor consent',
                      'Remote patient monitoring consent',
                      'Continuous glucose monitoring consent',
                      'Device analytics and reporting',
                    ],
                  },
                  {
                    icon: FileText,
                    title: 'Clinical Research',
                    items: [
                      'Research participant consent',
                      'Clinical trial data collection',
                      'Biomarker and genetic data consent',
                      'Long-term study participation',
                      'Data sharing with researchers',
                    ],
                  },
                ].map((useCase) => (
                  <motion.div key={useCase.title} variants={staggerItem}>
                    <Card className="h-full hover:border-primary/30 transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <useCase.icon className="h-4 w-4 text-primary" />
                          </div>
                          {useCase.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5">
                          {useCase.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-muted-foreground"
                            >
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* HIPAA Compliance Checklist — 2x2 with consistent styling */}
        <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-14"
              >
                <Badge variant="outline" className="mb-4">
                  Compliance Checklist
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                  HIPAA Cookie Compliance Checklist
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ensure your healthcare website meets all HIPAA and privacy law
                  requirements
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-6"
              >
                {[
                  {
                    icon: Lock,
                    title: 'Technical Safeguards',
                    items: [
                      {
                        name: 'Access Controls',
                        desc: 'Implement user authentication and authorization for consent data',
                      },
                      {
                        name: 'Audit Controls',
                        desc: 'Log all consent decisions and access to patient data',
                      },
                      {
                        name: 'Integrity Controls',
                        desc: 'Ensure consent data cannot be altered without authorization',
                      },
                      {
                        name: 'Transmission Security',
                        desc: 'Encrypt consent data in transit and at rest',
                      },
                    ],
                  },
                  {
                    icon: ClipboardCheck,
                    title: 'Administrative Safeguards',
                    items: [
                      {
                        name: 'Security Officer',
                        desc: 'Designate a privacy/security officer for consent management',
                      },
                      {
                        name: 'Workforce Training',
                        desc: 'Train staff on HIPAA and cookie consent requirements',
                      },
                      {
                        name: 'Business Associate Agreements',
                        desc: 'Ensure consent management vendors sign BAAs',
                      },
                      {
                        name: 'Incident Response',
                        desc: 'Develop procedures for consent-related breaches',
                      },
                    ],
                  },
                  {
                    icon: Eye,
                    title: 'Patient Rights',
                    items: [
                      {
                        name: 'Access Rights',
                        desc: 'Allow patients to view their consent preferences',
                      },
                      {
                        name: 'Amendment Rights',
                        desc: 'Enable patients to update consent choices',
                      },
                      {
                        name: 'Revocation Rights',
                        desc: 'Provide easy consent withdrawal mechanisms',
                      },
                      {
                        name: 'Notice of Privacy Practices',
                        desc: 'Include cookie consent in privacy notices',
                      },
                    ],
                  },
                  {
                    icon: Heart,
                    title: 'Cookie-Specific Requirements',
                    items: [
                      {
                        name: 'PHI Identification',
                        desc: 'Identify cookies that may collect or process PHI',
                      },
                      {
                        name: 'Explicit Consent',
                        desc: 'Require explicit consent for PHI-related cookies',
                      },
                      {
                        name: 'Minimum Necessary',
                        desc: 'Apply minimum necessary standard to cookie data',
                      },
                      {
                        name: 'Data Retention',
                        desc: 'Implement appropriate consent data retention policies',
                      },
                    ],
                  },
                ].map((section) => (
                  <motion.div key={section.title} variants={staggerItem}>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <section.icon className="h-4 w-4 text-primary" />
                          </div>
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {section.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-semibold text-foreground">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Implementation Guide — Vertical timeline */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-14"
              >
                <Badge variant="outline" className="mb-4">
                  Implementation
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                  5-Step Implementation Guide
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  HIPAA-compliant cookie consent for your healthcare organization
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={staggerContainer}
                className="space-y-0"
              >
                {[
                  {
                    step: 1,
                    title: 'Conduct HIPAA Risk Assessment',
                    items: [
                      'Identify cookies that may collect or process PHI',
                      'Document data flows and third-party integrations',
                      'Assess technical and administrative safeguards',
                      'Review business associate agreements',
                    ],
                  },
                  {
                    step: 2,
                    title: 'Configure Healthcare-Specific Settings',
                    items: [
                      'Enable HIPAA-compliant audit logging',
                      'Configure PHI-specific consent categories',
                      'Set up patient access controls',
                      'Implement consent delegation for providers',
                    ],
                  },
                  {
                    step: 3,
                    title: 'Deploy Patient-Facing Consent',
                    items: [
                      'Use clear, non-technical language for patients',
                      'Provide detailed information about data use',
                      'Enable easy consent withdrawal',
                      'Ensure accessibility compliance (ADA/WCAG)',
                    ],
                  },
                  {
                    step: 4,
                    title: 'Train Healthcare Staff',
                    items: [
                      'Provide HIPAA training on cookie consent',
                      'Establish incident response protocols',
                      'Create consent management workflows',
                      'Schedule regular compliance updates',
                    ],
                  },
                  {
                    step: 5,
                    title: 'Monitor and Audit Compliance',
                    items: [
                      'Regular consent audit reviews',
                      'Monitor for unauthorized access attempts',
                      'Track consent withdrawal requests',
                      'Conduct annual HIPAA risk assessments',
                    ],
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.step}
                    variants={staggerItem}
                    className="relative flex gap-6"
                  >
                    {/* Timeline line */}
                    {i < 4 && (
                      <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
                    )}

                    {/* Step number */}
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="pb-10 flex-1">
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <ul className="space-y-2">
                        {step.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6 text-center">
                Related Resources
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/compliance/gdpr">GDPR Compliance</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/compliance/pipeda">PIPEDA Compliance</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/compliance/ccpa">CCPA Compliance</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/tools/cookie-scanner">Cookie Scanner</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/gdpr-cookie-consent-requirements">
                    GDPR Cookie Requirements
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <FinalCTA />
      </div>
      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Does HIPAA require cookie consent?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'HIPAA does not specifically address cookies, but if cookies collect or transmit Protected Health Information (PHI), HIPAA requirements apply. Healthcare websites must ensure cookies handling PHI have appropriate technical safeguards, patient consent, and audit trails.',
                },
              },
              {
                '@type': 'Question',
                name: 'What cookies require HIPAA compliance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Any cookie that collects, stores, or transmits Protected Health Information (PHI) falls under HIPAA. This includes session cookies on patient portals, analytics cookies that track patient behavior on health pages, and marketing cookies used on telemedicine platforms.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do you handle cookie consent on telemedicine platforms?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Telemedicine platforms need layered consent: essential cookies for the session, separate consent for video conferencing cookies, analytics tracking, and any third-party integrations. Consent must be granular and easy to withdraw.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do patient portals need cookie banners?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Patient portals typically use cookies for session management, analytics, and functionality. Under GDPR and PIPEDA, non-essential cookies require explicit consent. Even HIPAA-covered portals need cookie consent to meet international privacy requirements.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is a Business Associate Agreement (BAA) for cookie consent?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A BAA is required under HIPAA when a third-party cookie consent management tool processes PHI on behalf of a healthcare organization. The BAA ensures the vendor meets HIPAA security standards for handling patient data.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long must healthcare organizations retain cookie consent records?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'HIPAA requires retention of consent-related documentation for at least 6 years. GDPR requires keeping consent records for as long as the processing continues. Healthcare organizations should follow the longer retention period to meet both requirements.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.cookie-banner.ca',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Solutions',
                item: 'https://www.cookie-banner.ca/solutions',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Healthcare',
                item: 'https://www.cookie-banner.ca/solutions/healthcare',
              },
            ],
          }),
        }}
      />
    </>
  )
}
