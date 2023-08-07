import { PrismaClient } from "@prisma/client";
import { ChatType } from "../src/prisma/chat-type";
import { Role } from "../src/prisma/role";

const prisma = new PrismaClient();

async function main() {
  // upsert roles to prisma
  await prisma.role.upsert({
    where: { name: Role.user },
    create: {
      name: Role.user,
    },
    update: {},
  });
  await prisma.role.upsert({
    where: { name: Role.admin },
    create: {
      name: Role.admin,
    },
    update: {},
  });
  await prisma.role.upsert({
    where: { name: Role.owner },
    create: {
      name: Role.owner,
    },
    update: {},
  });

  // upsert chat types to prisma
  await prisma.chatType.upsert({
    where: { name: ChatType.private },
    create: {
      name: ChatType.private,
    },
    update: {},
  });
  await prisma.chatType.upsert({
    where: { name: ChatType.group },
    create: {
      name: ChatType.group,
    },
    update: {},
  });
  await prisma.chatType.upsert({
    where: { name: ChatType.supergroup },
    create: {
      name: ChatType.supergroup,
    },
    update: {},
  });
  await prisma.chatType.upsert({
    where: { name: ChatType.channel },
    create: {
      name: ChatType.channel,
    },
    update: {},
  });
}

try {
  await main();
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
} finally {
  await prisma.$disconnect();
}
