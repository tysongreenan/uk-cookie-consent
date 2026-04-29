import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Search all projects with well.ca domain or owned by well.ca users
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { domain: { contains: 'well.ca', mode: 'insensitive' } },
        { user: { email: { contains: 'well.ca', mode: 'insensitive' } } },
      ]
    },
    select: {
      id: true,
      name: true,
      domain: true,
      userId: true,
      user: { select: { email: true } },
      consentBanners: { select: { id: true, isActive: true, name: true } },
    },
  })
  console.log(JSON.stringify(projects, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
