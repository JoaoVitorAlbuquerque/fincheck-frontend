import { create } from './create';
import { getAll } from './getAll';
import { update } from './update';
import { remove } from './remove';
import { getBankAccoutByKey } from './getBankAccoutByKey';

export const bankAccountsService = {
  create,
  getAll,
  getBankAccoutByKey,
  update,
  remove,
};
