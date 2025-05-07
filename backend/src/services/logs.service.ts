import { prisma } from '../prisma/client';

export const getLogsByUserAndCodes = async (userId: string) => {
  console.log("wahyu ->", userId);
  return prisma.log.findMany({
    where: {
      userId,
      code: {
        in: ['COMPLETE_TRYOUT_SECTION', 'COMPLETE_COURSE'],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};