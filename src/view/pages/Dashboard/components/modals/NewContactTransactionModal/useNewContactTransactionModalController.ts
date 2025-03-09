import { useState } from "react";
import { useDashboard } from "../../DashboardContext/useDashboard";
import { useBankAccountByKey } from "../../../../../../app/hooks/useBankAccountByKey";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  amount: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  fromBankAccountId: z.string().uuid(),
  toBankAccountId: z.string().uuid(),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewContactTransactionModalController() {
  const [selectedBankAccountKey, setSelectedBankAccountKey] = useState<undefined | string>(undefined);

  const {
    isNewContactTransactionModalOpen,
    closeNewContactTransactionModal,
  } = useDashboard();

  // const { accounts } = useBankAccounts();

  const {
    bankAccount,
    isLoading,
    refetchTransactions,
  } = useBankAccountByKey({ bankAccountKey: selectedBankAccountKey?.toUpperCase() });

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const {
    isLoading: isLoadingMutation,
    mutateAsync,
  } = useMutation(transactionsService.createContactTransaction);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        amount: currencyStringToNumber(data.amount),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Transação realizada com sucesso');
      closeNewContactTransactionModal();
      reset();

      console.log({ mutateAsync });
    } catch {
      toast.error('Ocorreu um erro ao realizar a transação');
    }
  });

  function handleApplyFilters() {
    refetchTransactions();
  }

  return {
    isNewContactTransactionModalOpen,
    closeNewContactTransactionModal,
    selectedBankAccountKey,
    setSelectedBankAccountKey,
    bankAccount,
    isLoading,
    handleApplyFilters,
    accounts,
    register,
    errors,
    control,
    isLoadingMutation,
    handleSubmit,
  };
}
