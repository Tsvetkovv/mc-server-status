import type { Bot } from "~/bot";
import { Message } from "@grammyjs/types";
import { Container } from "~/container";

export async function editSendMessage(
  bot: Bot,
  container: Container,
  chatId: number,
  text: string,
  messageId?: number,
): Promise<Message | undefined> {
  if (messageId) {
    try {
      const message = await bot.api.editMessageText(chatId, messageId, text);
      if (typeof message === "object") {
        return message;
      }
    } catch (error) {
      container.logger.info(`can't edit message ${JSON.stringify(error)}`);
    }
  }
  if (messageId) {
    try {
      await bot.api.deleteMessage(chatId, messageId);
    } catch (error) {
      container.logger.info(`can't delete message: ${JSON.stringify(error)}`);
    }
  }
  const message = await bot.api.sendMessage(chatId, text, {
    disable_notification: true,
  });
  let pinned = false;
  try {
    await bot.api.pinChatMessage(chatId, message.message_id, {
      disable_notification: true,
    });
    pinned = true;
  } catch (error) {
    container.logger.info(`can't pin message ${JSON.stringify(error)}`);
  }

  await container.prisma.botMessage.upsert({
    where: {
      messageId_chatId: {
        messageId: message.message_id,
        chatId: message.chat.id,
      },
    },
    create: {
      messageId: message.message_id,
      chatId: message.chat.id,
      text: message.text,
      botId: bot.botInfo.id,
      date: new Date(message.date * 1000),
      pinned,
    },
    update: {},
  });
  return message;
}
