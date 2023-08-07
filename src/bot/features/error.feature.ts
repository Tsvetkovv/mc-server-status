import { Composer } from "grammy";
import type { Context } from "~/bot/context";
import { logHandle } from "~/bot/helpers/logging";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

// testing error handling
feature.command("error", logHandle("error"), () => {
  throw new Error("test");
});

export { composer as errorFeature };
