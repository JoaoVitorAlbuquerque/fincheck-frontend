import { httpClient } from "../httpClient";

export interface CreateContactTransactionParams {
  name: string;
  fromBankAccountId: string;
  toBankAccountId: string;
  amount: number;
  date: string;
}

export async function createContactTransaction(params: CreateContactTransactionParams) {
  const { data } = await httpClient.post('/transactions/transfer', params);

  return data;
}
