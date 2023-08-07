import { isSomeEnum } from "~/utils/is-some-enum";

enum TestEnum {
  value1,
  value2,
}

describe("is-some-enum", () => {
  it("should return true if value exists in enum", () => {
    expect(isSomeEnum(TestEnum)("value1")).toBe(true);
    expect(isSomeEnum(TestEnum)("value2")).toBe(true);
  });
  it("should return false if value exists in enum", () => {
    expect(isSomeEnum(TestEnum)("value123")).toBe(false);
  });
});
