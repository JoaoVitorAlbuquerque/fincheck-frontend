import { create } from "./create";
import { getAll } from "./getAll";
import { update } from "./update";
import { remove } from "./remove";
import { createContactTransaction } from "./createContactTransaction";

export const transactionsService = {
  create,
  createContactTransaction,
  getAll,
  update,
  remove,
};
