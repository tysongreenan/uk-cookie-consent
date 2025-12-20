
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Shield, Users, Globe, CheckCircle, AlertTriangle, ExternalLink, Download, BookOpen, Laptop, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Education Cookie Consent | FERPA COPPA Compliance Solution 2025',
  description: 'Complete education cookie consent solution for schools, universities, and EdTech platforms. FERPA compliance, COPPA for children under 13, student data protection, LMS integration.',
  keywords: 'school website cookies, edtech privacy compliance, FERPA cookie consent, COPPA compliance, student data protection, university privacy',
  openGraph: {
    title: 'Education Cookie Consent | FERPA COPPA Compliance Solution 2025',
    description: 'Complete education cookie consent solution for schools, universities, and EdTech platforms. FERPA compliance, COPPA for children under 13.',
    type: 'article',
  },
}

export default function EducationSolutionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-indigo-500 text-white">Education Solution</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Education Cookie Consent
              <span className="block text-indigo-200">Student Privacy First</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">
              Complete education cookie consent solution for schools, universities, and EdTech platforms. FERPA compliance, COPPA for children under 13, student data protection, and LMS integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                <GraduationCap className="mr-2 h-5 w-5" />
                Get Education Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <BookOpen className="mr-2 h-5 w-5" />
                Download FERPA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Education Challenges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Education Cookie Compliance Challenges
              </h2>
              <p className="text-xl text-gray-600">
                Educational institutions face unique privacy challenges with student data protection
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>FERPA Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Family Educational Rights and Privacy Act requires special handling of student educational records and personally identifiable information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-blue-500" />
                    <CardTitle>COPPA for Children Under 13</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Children's Online Privacy Protection Act requires verifiable parental consent for children under 13, with special restrictions on data collection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Laptop className="h-6 w-6 text-green-500" />
                    <CardTitle>Learning Management Systems</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    LMS platforms like Canvas, Blackboard, and Moodle require cookies for functionality while protecting student privacy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>Parent Consent Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Managing consent for minors requires parental involvement, with different requirements based on student age and data sensitivity.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-orange-500" />
                    <CardTitle>Multi-Jurisdictional Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    International students and online programs require compliance with multiple privacy laws across different countries.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Educational Technology Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Third-party educational tools, assessment platforms, and digital resources require careful consent management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FERPA & COPPA Compliance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                FERPA & COPPA Compliance
              </h2>
              <p className="text-xl text-gray-600">
                Meeting educational privacy requirements for student data protection
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Shield className="h-5 w-5" />
                    FERPA Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Educational Records Protection</h4>
                      <p className="text-sm text-gray-600">Protect student educational records and personally identifiable information</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Parental Rights</h4>
                      <p className="text-sm text-gray-600">Parents have right to inspect, review, and request amendment of records</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Directory Information</h4>
                      <p className="text-sm text-gray-600">Manage consent for directory information disclosure</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Third-Party Disclosures</h4>
                      <p className="text-sm text-gray-600">Control sharing of student data with external parties</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <UserCheck className="h-5 w-5" />
                    COPPA Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Parental Consent</h4>
                      <p className="text-sm text-gray-600">Verifiable parental consent required for children under 13</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Data Minimization</h4>
                      <p className="text-sm text-gray-600">Collect only information reasonably necessary for educational purposes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Parental Access</h4>
                      <p className="text-sm text-gray-600">Parents must be able to review and delete their child's information</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Data Security</h4>
                      <p className="text-sm text-gray-600">Implement reasonable security measures to protect children's data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Educational Privacy Framework</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">FERPA Compliance</h4>
                    <p className="text-sm text-gray-600">Educational records protection and parental rights</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserCheck className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">COPPA Protection</h4>
                    <p className="text-sm text-gray-600">Children's online privacy and parental consent</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Student Safety</h4>
                    <p className="text-sm text-gray-600">Comprehensive student privacy and data protection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Education Use Cases
              </h2>
              <p className="text-xl text-gray-600">
                Specialized solutions for different educational environments
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    K-12 Schools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Parent consent for students under 13 (COPPA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Student educational records protection (FERPA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Classroom technology consent management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Digital learning platform integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Assessment and testing consent</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="h-5 w-5" />
                    Universities & Colleges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Student directory information consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Research participation consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Financial aid and enrollment data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>International student compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Alumni and donor communication</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    EdTech Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Learning management system integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Assessment and grading platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Virtual classroom and video conferencing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Digital textbook and resource access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Student progress and analytics tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Online Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Massive Open Online Courses (MOOCs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Virtual reality and immersive learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Adaptive learning algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Peer collaboration and social learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Certification and credentialing systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Age Verification Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Age Verification & Parental Consent
              </h2>
              <p className="text-xl text-gray-600">
                Specialized features for managing consent across different age groups
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <UserCheck className="h-5 w-5" />
                    Children Under 13 (COPPA)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Verifiable Parental Consent</h4>
                        <p className="text-sm text-gray-600">Secure methods for parent consent verification</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Age Verification</h4>
                        <p className="text-sm text-gray-600">Automatic age detection and appropriate consent flows</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Data Minimization</h4>
                        <p className="text-sm text-gray-600">Collect only necessary information for educational purposes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Parental Access Controls</h4>
                        <p className="text-sm text-gray-600">Parents can review, modify, and delete child's data</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <GraduationCap className="h-5 w-5" />
                    Students 13+ (FERPA)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Student Self-Consent</h4>
                        <p className="text-sm text-gray-600">Age-appropriate consent for students 13 and older</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Educational Records Protection</h4>
                        <p className="text-sm text-gray-600">FERPA-compliant handling of educational records</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Directory Information Management</h4>
                        <p className="text-sm text-gray-600">Control over directory information disclosure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Parental Rights for Minors</h4>
                        <p className="text-sm text-gray-600">Parents retain rights for students under 18</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Laptop className="h-5 w-5" />
                    Adult Learners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Direct Consent</h4>
                        <p className="text-sm text-gray-600">Full consent management for adult students</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Research Participation</h4>
                        <p className="text-sm text-gray-600">Consent for research studies and data analysis</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Alumni Communications</h4>
                        <p className="text-sm text-gray-600">Consent for ongoing communications and fundraising</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Career Services</h4>
                        <p className="text-sm text-gray-600">Consent for job placement and career development services</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Users className="h-5 w-5" />
                    International Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Multi-Jurisdictional Compliance</h4>
                        <p className="text-sm text-gray-600">Compliance with privacy laws from students' home countries</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Data Transfer Controls</h4>
                        <p className="text-sm text-gray-600">Manage cross-border data transfers and residency</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Cultural Sensitivity</h4>
                        <p className="text-sm text-gray-600">Respect cultural differences in privacy expectations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Visa and Immigration Data</h4>
                        <p className="text-sm text-gray-600">Special handling for immigration-related information</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Education Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                FERPA and COPPA compliant cookie consent for educational institutions
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Privacy Law Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Assess your educational privacy compliance requirements:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Identify applicable laws (FERPA, COPPA, state privacy laws)</li>
                    <li>Map student age groups and consent requirements</li>
                    <li>Catalog educational technology and third-party tools</li>
                    <li>Document data flows and educational records handling</li>
                    <li>Assess international student privacy requirements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Age-Appropriate Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Configure consent management for different age groups:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Set up COPPA-compliant parental consent for under 13</li>
                    <li>Configure FERPA-compliant student consent for 13+</li>
                    <li>Implement age verification and appropriate consent flows</li>
                    <li>Set up directory information consent management</li>
                    <li>Configure educational technology integration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Parent & Student Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Communicate privacy practices to families and students:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Create age-appropriate privacy notices</li>
                    <li>Develop parent consent forms and procedures</li>
                    <li>Provide clear information about data use</li>
                    <li>Establish communication channels for privacy questions</li>
                    <li>Train staff on privacy law requirements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Educational Technology Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Integrate consent management with educational tools:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure LMS and educational platform consent</li>
                    <li>Set up assessment and testing tool consent</li>
                    <li>Manage digital resource and textbook consent</li>
                    <li>Configure virtual classroom and video consent</li>
                    <li>Set up student progress and analytics consent</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Ongoing Compliance Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Maintain educational privacy compliance:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor consent rates and parent engagement</li>
                    <li>Regular privacy law updates and training</li>
                    <li>Audit educational records access and disclosure</li>
                    <li>Review and update privacy practices annually</li>
                    <li>Handle privacy complaints and requests</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Educational Privacy Compliance?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join leading educational institutions using our FERPA and COPPA compliant cookie consent solution. Protect student privacy while enabling educational technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                <GraduationCap className="mr-2 h-5 w-5" />
                Get Education Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <BookOpen className="mr-2 h-5 w-5" />
                Download FERPA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
