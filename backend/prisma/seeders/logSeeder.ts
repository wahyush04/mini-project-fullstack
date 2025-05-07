import { PrismaClient } from '../../src/generated/prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedLogs = async () => {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.log.create({
      data: {
        userId: user.id,
        code: faker.string.uuid(),
        action: faker.hacker.verb(),
        description: faker.lorem.sentence(),
        data: {
          ip: faker.internet.ip(),
        },
      },
    });
  }
};
