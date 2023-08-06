import { Middleware } from "grammy";
import type { Context } from "~/bot/context";

export function setScope(): Middleware<Context> {
  return async (ctx, next) => {
    if (ctx.from?.is_bot === false) {
      const { id: telegramId, language_code: languageCode } = ctx.from;

      ctx.scope.user = await ctx.prisma.user.upsert({
        telegramId,
        languageCode,
      });
    }

    return next();
  };
}
