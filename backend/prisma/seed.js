import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create user with hashed PIN
  const defaultPIN = '123456'; // Change this to your desired PIN
  const pinHash = await bcrypt.hash(defaultPIN, 10);

  const user = await prisma.user.upsert({
    where: { username: 'ananya' },
    update: {},
    create: {
      username: 'ananya',
      pinHash: pinHash
    }
  });

  console.log('Created user:', user.username);
  console.log(`Default PIN: ${defaultPIN}`);
  console.log('Please change this PIN in production!');

  // Create initial visit stats
  await prisma.visitStats.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      totalVisits: 0
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

