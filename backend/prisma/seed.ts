import { PrismaClient } from '../src/generated/prisma/client';
import { seedUsers } from './seeders/userSeeder';
import { seedExams } from './seeders/examSeeder';
import { seedLogs } from './seeders/logSeeder';
import { seedTryoutSections } from './seeders/tryoutSectionSeeder';
import { seedCourses } from './seeders/courseSeeder';

const prisma = new PrismaClient();

const main = async () => {
  console.log('Seeding database...');
  await seedUsers();
  await seedExams();
  await seedLogs();
  await seedTryoutSections();
  await seedCourses();
  console.log('Seeding complete.');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
