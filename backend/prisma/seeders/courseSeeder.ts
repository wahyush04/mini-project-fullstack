import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedCourses = async (count = 5) => {
  for (let i = 0; i < count; i++) {
    await prisma.course.create({
      data: {
        code: faker.string.alphanumeric(8),
        title: faker.word.words(4),
        description: faker.lorem.sentences(2),
        order: i + 1,
        tag: faker.word.noun(),
        active: faker.datatype.boolean(),
        data: {
          level: faker.helpers.arrayElement(['beginner', 'intermediate', 'advanced']),
          type: faker.helpers.arrayElement(['reading']),
          point: faker.number.int({ min: 100, max: 1000 }),
          image: faker.image.url(),
          totalStudent: faker.number.int({ min: 100, max: 1000 }),
          estimateTime: faker.number.int({ min: 30, max: 1000 }),
        },
      },
    });
  }
};
