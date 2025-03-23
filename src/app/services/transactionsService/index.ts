import { create } from "./create";
import { getAll } from "./getAll";
import { update } from "./update";
import { remove } from "./remove";
import { createContactTransaction } from "./createContactTransaction";
import { getPresignedUrl } from "./getPresignedUrl";

export const transactionsService = {
  create,
  createContactTransaction,
  getPresignedUrl,
  getAll,
  update,
  remove,
};
