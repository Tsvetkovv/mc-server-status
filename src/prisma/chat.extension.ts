import { Prisma } from "@prisma/client";
import { ChatType } from "~/prisma/chat-type";
import { isSomeEnum } from "~/utils/is-some-enum";

const isChatType = isSomeEnum(ChatType);

export default Prisma.defineExtension((client) => {
  return client.$extends({
    name: "chat",
    result: {
      chat: {
        type: {
          needs: { chatTypeName: true },
          compute(chat): ChatType {
            if (isChatType(chat.chatTypeName)) {
              return chat.chatTypeName;
            }
            throw new Error(`Unknown chat type: ${chat.chatTypeName}`);
          },
        },
      },
    },
    model: {
      chat: {},
    },
  });
});
