import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedTryoutSections = async (count = 5) => {
  for (let i = 0; i < count; i++) {
    const start = faker.date.future();
    const tryoutType = faker.helpers.arrayElement([
      'website',
      'telegram',
      'accuracy_test',
    ]);
    await prisma.tryoutSection.create({
      data: {
        code: faker.string.uuid(),
        description: faker.lorem.paragraph(),
        title: faker.word.words(3),
        order: i + 1,
        tag: faker.word.adjective(),
        active: faker.datatype.boolean(),
        data: {
          startDate: start,
          endDate: faker.date.soon({ days: 7, refDate: start }),
          type: tryoutType,
          point: faker.number.int({ min: 100, max: 1000 }),
          image: faker.image.url(),
          level: faker.helpers.arrayElement(['beginner', 'intermediate', 'advanced']),
          totalStudent: faker.number.int({ min: 100, max: 1000 }),
          estimateTime: faker.number.int({ min: 30, max: 1000 }),
        },
      },
    });
  }
};
