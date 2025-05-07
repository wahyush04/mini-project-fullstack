import { PrismaClient } from '../generated/prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedTryoutSections = async (count = 5) => {
  for (let i = 0; i < count; i++) {
    await prisma.tryoutSection.create({
      data: {
        code: faker.string.uuid(),
        description: faker.lorem.paragraph(),
        title: faker.word.words(3),
        order: i + 1,
        tag: faker.word.adjective(),
        active: faker.datatype.boolean(),
        data: {
          duration: faker.number.int({ min: 30, max: 120 }),
        },
      },
    });
  }
};
