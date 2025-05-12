import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedExams = async () => {
  const users = await prisma.user.findMany();
  for (const user of users) {
    const randomStatus = faker.helpers.arrayElement([
      'in-progress',
      'completed',
      'cancelled',
      'submitted',
    ]);
    await prisma.exam.create({
      data: {
        userId: user.id,
        tag: faker.word.noun(),
        active: faker.datatype.boolean(),
        data: {
          status: randomStatus,
        },
      },
    });
  }
};
