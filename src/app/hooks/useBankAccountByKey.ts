import { useQuery } from "@tanstack/react-query";

import { BankAccoutByKeyFilter } from "../services/bankAccountsService/getBankAccoutByKey";
import { bankAccountsService } from "../services/bankAccountsService";

export function useBankAccountByKey(filters: BankAccoutByKeyFilter) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['bankAccounts', filters.bankAccountKey],
    queryFn: () => bankAccountsService.getBankAccoutByKey(filters),
    enabled: false,
  });

  return {
    bankAccount: data ? (Array.isArray(data) ? data : [data]) : [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  };
}
