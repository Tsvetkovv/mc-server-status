// tag function to escape characters  '_', '*', '`', '['
export const escapeMessage = (messageToEscape: string) => {
  return messageToEscape
    .replaceAll("_", "\\_")
    .replaceAll("*", "\\*")
    .replaceAll("[", "\\[")
    .replaceAll("`", "\\`");
};
