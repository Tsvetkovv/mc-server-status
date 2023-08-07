import { Prisma } from "@prisma/client";
import type { PrismaClientX } from "~/prisma";
import { Role } from "~/prisma/role";

export default Prisma.defineExtension((client) => {
  return client.$extends({
    name: "user",
    result: {
      user: {
        isAdmin: {
          needs: { roleName: true },
          compute(user) {
            return user.roleName === Role.admin;
          },
        },

        isOwner: {
          needs: { roleName: true },
          compute(user) {
            return user.roleName === Role.owner;
          },
        },
      },
    },
    model: {
      user: {
        upsertByTelegramId(user: {
          telegramId: number;
          languageCode?: string;
        }) {
          return Prisma.getExtensionContext(this).upsert({
            where: { telegramId: user.telegramId },
            create: {
              telegramId: user.telegramId,
              languageCode: user.languageCode,
              roleName: Role.user,
            },
            update: {},
            select: {
              id: true,
              telegramId: true,
              languageCode: true,
              ...Prisma.getExtensionContext(this).withRoles(),
            },
          });
        },
        addOwner(telegramId: number) {
          return client.user.upsert({
            where: { telegramId },
            create: {
              telegramId,
              roleName: Role.owner,
            },
            update: {},
          });
        },
        byTelegramId(telegramId: number) {
          return {
            telegramId,
          } satisfies Prisma.UserWhereInput;
        },

        hasAdminRole() {
          return {
            roleName: Role.admin,
          } satisfies Prisma.UserWhereInput;
        },

        hasOwnerRole() {
          return {
            roleName: Role.owner,
          } satisfies Prisma.UserWhereInput;
        },

        withRoles() {
          return {
            roleName: true,
            isAdmin: true,
            isOwner: true,
          } satisfies Prisma.UserSelect<PrismaClientX["$extends"]["extArgs"]>;
        },
      },
    },
  });
});
