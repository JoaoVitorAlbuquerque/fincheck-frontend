import { z } from "zod";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDashboard } from "../../DashboardContext/useDashboard";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";
import { useDropzone } from "react-dropzone";
import { getPresignedUrl } from "../../../../../../app/services/transactionsService/getPresignedUrl";
import { uploadFile } from "../../../../../../app/services/transactionsService/uploadFile";
import { generateFileName } from "../../../../../../app/utils/generateFileName";

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  async function handleUpload() {
    const urls = await Promise.all(files.map(async (file) => ({
      url: await getPresignedUrl({ fileName: generateFileName(file.name) }),
      file,
    })));

    const response = await Promise.allSettled(urls.map(({ file, url }) => (
      uploadFile(url, file)
    )));

    response.forEach((response, index) => {
      const fileWithError = files[index]
      if (response.status === 'rejected') {
        console.log(`O upload do arquivo ${fileWithError.name} falhou!`);
      }
    });
  }

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
  const { categories: categoriesList } = useCategories();
  const {
    isLoading,
    mutateAsync,
  } = useMutation(transactionsService.create);

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      await handleUpload();

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!'
      );
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar a despesa!'
          : 'Erro ao cadastrar a receita!'
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  function handleRemoveFile(removingIndex: number) {
    // setFiles(prevState => prevState.filter((_, index) => index !== removingIndex));

    // Mais performático para Arrays maiores
    setFiles(prevState => {
      const newState = [...prevState];
      newState.splice(removingIndex, 1);

      return newState;
    });
  }

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    handleRemoveFile,
  };
}
