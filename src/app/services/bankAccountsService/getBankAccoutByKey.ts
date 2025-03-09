import { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../httpClient";

type BankAccountsResponse = Array<BankAccount>;

export type BankAccoutByKeyFilter = {
  bankAccountKey: string | undefined;
};

export async function getBankAccoutByKey(filters: BankAccoutByKeyFilter) {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts/key', {
    params: filters,
  });

  return data;
}
