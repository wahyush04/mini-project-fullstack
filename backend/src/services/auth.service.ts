import { faker } from '../../node_modules/@faker-js/faker/.';
import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'example-secret-key';

export const registerUser = async (fullname: string,username: string,phoneNumber: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const UserDataModel = {
    points: 0,
    role: 'student',
    biography: faker.lorem.paragraph(),
    profilePhoto: faker.image.avatar(),
  }
  const user = await prisma.user.create({
    data: {
      fullname,
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      data: UserDataModel
    },
  });

  // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
  return { user: { id: user.id, name: user.fullname, email: user.email } };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
  return { user: { id: user.id, name: user.fullname, email: user.email, data: user.data }, token };
};
