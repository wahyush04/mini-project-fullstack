import { LogModel } from 'src/types/model/log.type';
import { prisma } from '../prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { S } from '@faker-js/faker/dist/airline-BUL6NtOJ';

export const getAllCompletedLogs = async () => {
  const logs = await prisma.log.findMany({
    where: {
      code: {
        in: ['COMPLETE_TRYOUT_SECTION', 'COMPLETE_COURSE'],
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return logs.map((log) => ({
    id: log.id,
    code: log.code,
    userId: log.userId,
    data: log.data,
    description: log.description,
    createdAt: log.createdAt,
    username: log.user?.username ?? null,
  }));
};

export const createLogsAndUpdateStatus = async (
  data: Omit<LogModel, 'id' | 'createdAt' | 'updatedAt'>,
  examId: string
) => {

  await prisma.$executeRaw`
    UPDATE exams
    SET data = JSON_SET(data, '$.status', ${"completed"})
    WHERE id = ${examId}`;

  await prisma.$executeRaw`
    UPDATE users
    SET data = JSON_SET(data, '$.points', 
      COALESCE(JSON_UNQUOTE(JSON_EXTRACT(data, '$.points')), 0) + ${data.data.point})
    WHERE id = ${data.userId}`;

  return await prisma.log.create({
    data: {
      userId: data.userId,
      code: data.code,
      action: "action",
      description: data.description,
      data: data.data as unknown as JsonObject,
    }
  });
};



