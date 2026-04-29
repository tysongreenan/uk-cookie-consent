import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = 'larry.farr@gmail.com'

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.error('User not found:', email)
    process.exit(1)
  }

  console.log('Found user:', { id: user.id, email: user.email, currentPlan: user.planTier })

  if (user.planTier !== 'free') {
    console.log('User is already on:', user.planTier, '— no change made.')
    process.exit(0)
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      planTier: 'pro_lifetime',
      billingCycle: 'one_time',
      upgradedAt: new Date(),
      featureFreezeDate: new Date(),
      loyaltyUpgradeEligible: true,
    },
  })

  console.log('Done — upgraded to pro_lifetime.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
