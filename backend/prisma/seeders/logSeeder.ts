import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedLogs = async () => {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.log.create({
      data: {
        userId: user.id,
        code: faker.helpers.arrayElement(['COMPLETE_TRYOUT_SECTION', 'COMPLETE_COURSE']),
        action: faker.hacker.verb(),
        description: faker.lorem.sentence(),
        data: {
          point: faker.number.int({ min: 100, max: 1000 }),
        },
      },
    });
  }
};
