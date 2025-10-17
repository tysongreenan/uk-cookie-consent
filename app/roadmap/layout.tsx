import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roadmap - Cookie Banner Generator',
  description: 'Vote on upcoming features and see what\'s planned for Cookie Banner Generator. Help shape the future of cookie compliance tools.',
}

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
