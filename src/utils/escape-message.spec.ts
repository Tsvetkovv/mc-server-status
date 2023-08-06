import { escapeMessage } from "./escape-message";

describe("escapeMessage", () => {
  it("escape C0ffee_Gr0unds", () => {
    expect(escapeMessage("C0ffee_Gr0unds")).toBe(`C0ffee\\_Gr0unds`);
  });
  it("escape bold characters", () => {
    expect(escapeMessage("*markdown injection*")).toBe(
      `\\*markdown injection\\*`,
    );
  });
});
