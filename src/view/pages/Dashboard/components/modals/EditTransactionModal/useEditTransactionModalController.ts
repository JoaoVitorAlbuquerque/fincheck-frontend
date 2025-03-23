import { z } from "zod";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Transaction } from "../../../../../../app/entities/Transaction";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor'),
    z.number(),
  ]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const {
    isLoading,
    mutateAsync: updateTransaction
  } = useMutation(transactionsService.update);

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeTransaction,
  } = useMutation(transactionsService.remove);

  const {
    isLoading: isLoadingFile,
    mutateAsync: getPresignedUrl,
  } = useMutation(transactionsService.getPresignedUrl);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao salvar a despesa!'
          : 'Erro ao salvar a receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type);
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'A despesa foi deletada com sucesso!'
          : 'A receita foi deletada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao deletar a despesa!'
          : 'Erro ao deletar a receita!'
      );
    }
  }

  useEffect(() => {
    if (!transaction?.pdfUrl) return;

    const fetchUrl = async () => {
      try {
        const url = await getPresignedUrl({ fileName: transaction.pdfUrl });
        console.log('Dentro do useEffect', url);
        setFileUrl(url);
      } catch (error) {
        console.error("Erro ao buscar URL assinada", error);
      }
    };

    fetchUrl();
  }, [transaction?.pdfUrl, getPresignedUrl]);
  console.log('EditController', transaction?.pdfUrl);
  console.log('EditController presigned url', fileUrl);

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }
  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isLoadingFile,
    fileUrl,
  };
}
