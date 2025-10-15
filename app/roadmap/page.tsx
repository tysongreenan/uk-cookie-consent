'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Map, 
  Plus, 
  ThumbsUp, 
  Clock, 
  CheckCircle, 
  Lightbulb,
  Zap,
  Users,
  BarChart3,
  Globe,
  Shield,
  Settings,
  ArrowRight
} from 'lucide-react'

const roadmapItems = [
  {
    id: 1,
    title: 'Advanced Analytics Dashboard',
    description: 'Comprehensive analytics showing consent rates, user interactions, and conversion metrics.',
    category: 'analytics',
    status: 'planned',
    votes: 47,
    userVoted: false,
    icon: BarChart3,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Team Collaboration Features',
    description: 'Invite team members, assign roles, and collaborate on banner projects together.',
    category: 'collaboration',
    status: 'planned',
    votes: 32,
    userVoted: false,
    icon: Users,
    color: 'green'
  },
  {
    id: 3,
    title: 'Multi-Language Support',
    description: 'Built-in translations for 20+ languages with automatic locale detection.',
    category: 'localization',
    status: 'in-progress',
    votes: 28,
    userVoted: true,
    icon: Globe,
    color: 'purple'
  },
  {
    id: 4,
    title: 'Advanced Compliance Tools',
    description: 'Automated compliance checking, privacy policy generators, and legal document templates.',
    category: 'compliance',
    status: 'planned',
    votes: 41,
    userVoted: false,
    icon: Shield,
    color: 'red'
  },
  {
    id: 5,
    title: 'Custom CSS Editor',
    description: 'Advanced styling options with live preview and CSS customization.',
    category: 'design',
    status: 'planned',
    votes: 19,
    userVoted: false,
    icon: Settings,
    color: 'orange'
  },
  {
    id: 6,
    title: 'A/B Testing Framework',
    description: 'Test different banner designs and messages to optimize conversion rates.',
    category: 'optimization',
    status: 'planned',
    votes: 35,
    userVoted: false,
    icon: Zap,
    color: 'yellow'
  }
]

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'bg-blue-500', icon: Clock },
  'planned': { label: 'Planned', color: 'bg-gray-500', icon: Lightbulb },
  'completed': { label: 'Completed', color: 'bg-green-500', icon: CheckCircle }
}

const categoryConfig = {
  'analytics': { label: 'Analytics', color: 'bg-blue-100 text-blue-800' },
  'collaboration': { label: 'Collaboration', color: 'bg-green-100 text-green-800' },
  'localization': { label: 'Localization', color: 'bg-purple-100 text-purple-800' },
  'compliance': { label: 'Compliance', color: 'bg-red-100 text-red-800' },
  'design': { label: 'Design', color: 'bg-orange-100 text-orange-800' },
  'optimization': { label: 'Optimization', color: 'bg-yellow-100 text-yellow-800' }
}

export default function RoadmapPage() {
  const [items, setItems] = useState(roadmapItems)
  const [showSuggestForm, setShowSuggestForm] = useState(false)
  const [newSuggestion, setNewSuggestion] = useState({ title: '', description: '', category: '' })

  const handleVote = (itemId: number) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          votes: item.userVoted ? item.votes - 1 : item.votes + 1,
          userVoted: !item.userVoted
        }
      }
      return item
    }))
  }

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSuggestion.title && newSuggestion.description) {
      // Here you would typically send to your backend
      console.log('New suggestion:', newSuggestion)
      setNewSuggestion({ title: '', description: '', category: '' })
      setShowSuggestForm(false)
      // Show success message
    }
  }

  const sortedItems = [...items].sort((a, b) => b.votes - a.votes)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Map className="w-4 h-4 mr-2" />
              Product Roadmap
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Help Shape Our Future
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Vote on features you'd like to see and suggest new ideas. Your feedback helps us build the tools you need.
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowSuggestForm(true)}
              className="mb-4"
            >
              <Plus className="w-5 h-5 mr-2" />
              Suggest a Feature
            </Button>
          </div>
        </div>
      </section>

      {/* Suggestion Form Modal */}
      {showSuggestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Suggest a New Feature</CardTitle>
              <CardDescription>
                Help us build the features you need most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSuggestion} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Feature Title</label>
                  <Input
                    placeholder="e.g., Advanced Analytics Dashboard"
                    value={newSuggestion.title}
                    onChange={(e) => setNewSuggestion({...newSuggestion, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe the feature and how it would help you..."
                    value={newSuggestion.description}
                    onChange={(e) => setNewSuggestion({...newSuggestion, description: e.target.value})}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Input
                    placeholder="e.g., Analytics, Design, Compliance"
                    value={newSuggestion.category}
                    onChange={(e) => setNewSuggestion({...newSuggestion, category: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowSuggestForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Suggestion
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Roadmap Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {sortedItems.map((item) => {
                const StatusIcon = statusConfig[item.status].icon
                const statusColor = statusConfig[item.status].color
                const categoryInfo = categoryConfig[item.category]
                
                return (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${item.color}-100`}>
                              <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <CardTitle className="text-xl">{item.title}</CardTitle>
                              <Badge className={categoryInfo.color}>
                                {categoryInfo.label}
                              </Badge>
                              <Badge variant="outline" className="flex items-center">
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[item.status].label}
                              </Badge>
                            </div>
                            <CardDescription className="text-base">
                              {item.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <Button
                            variant={item.userVoted ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleVote(item.id)}
                            className="flex items-center space-x-2"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{item.votes}</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recent Updates</h2>
              <p className="text-muted-foreground">
                See what we've been working on
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                    <CardTitle className="text-lg">Enhanced Preferences Modal</CardTitle>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Added advanced cookie category management with individual toggle controls, 
                    improved user experience, and better compliance features.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-blue-100 text-blue-800">
                      <Clock className="w-3 h-3 mr-1" />
                      In Progress
                    </Badge>
                    <CardTitle className="text-lg">Multi-Language Support</CardTitle>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Working on comprehensive translation system with automatic locale detection 
                    and support for 20+ languages including Spanish, French, German, and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Have More Ideas?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We'd love to hear your suggestions and feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setShowSuggestForm(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Suggest Feature
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:greenantyson@gmail.com">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
