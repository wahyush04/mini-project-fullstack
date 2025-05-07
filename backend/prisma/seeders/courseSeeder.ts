import { PrismaClient } from '../generated/prisma/client';
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
        },
      },
    });
  }
};
