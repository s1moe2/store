import * as db from "../db";

export const getByUserId = (userId: number) => db.orders
  .filter((u) => u.userId === userId);
