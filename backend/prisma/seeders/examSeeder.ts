import { PrismaClient } from '../generated/prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedExams = async () => {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.exam.create({
      data: {
        userId: user.id,
        tag: faker.word.noun(),
        active: faker.datatype.boolean(),
        data: {
          score: faker.number.int({ min: 0, max: 100 }),
        },
      },
    });
  }
};
