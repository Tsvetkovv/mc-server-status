// loose checking for existing enum value
export const isSomeEnum =
  <T extends { [s: string]: unknown }>(enumeric: T) =>
  (token: unknown): token is T[keyof T] =>
    Object.values(enumeric).includes(token as T[keyof T]);
