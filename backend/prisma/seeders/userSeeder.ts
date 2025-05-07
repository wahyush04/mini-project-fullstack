import { PrismaClient } from '../generated/prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedUsers = async (count: number = 10) => {
  for (let i = 0; i < count; i++) {
    await prisma.user.create({
      data: {
        fullname: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number({ style: 'national' }),
        password: faker.internet.password(),
        active: faker.datatype.boolean(),
        data: {
          bio: faker.lorem.sentence(),
        },
      },
    });
  }
};
