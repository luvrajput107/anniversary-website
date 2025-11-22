import { execSync } from 'child_process';

try {
  console.log('Running Prisma migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('Migrations completed!');
} catch (error) {
  console.error('Migration error:', error.message);
  process.exit(1);
}

