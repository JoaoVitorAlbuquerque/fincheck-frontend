import { Controller } from "react-hook-form";

import { Input } from "../../../../../components/Input";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { Select } from "../../../../../components/Select";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";
import { useEditTransactionModalController } from "./useEditTransactionModalController";

interface EditTransactionModalProps {
  open: boolean;
  onClose(): void;
  transaction: Transaction | null;
}

export function EditTransactionModal({ transaction, onClose, open }: EditTransactionModalProps) {
  const {
    control,
    errors,
    handleSubmit,
    register,
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
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={
        !transaction?.isTransfer && (
          <button onClick={handleOpenDeleteModal}>
            <TrashIcon className="w-6 h-6 text-red-900" />
          </button>
        )
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              disabled={transaction?.isTransfer}
              render={({ field: { onChange, value, disabled } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                  disabled={disabled}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            error={errors.name?.message}
            disabled={transaction?.isTransfer}
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            disabled={transaction?.isTransfer}
            render={({ field: { onChange, value, disabled } }) => (
              <Select
                placeholder="Categoria"
                disabled={disabled}
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            disabled={transaction?.isTransfer}
            render={({ field: { onChange, value, disabled } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                disabled={disabled}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            disabled={transaction?.isTransfer}
            render={({ field: { value, onChange, disabled } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
                disabled={disabled}
              />
            )}
          />
        </div>

        {transaction?.isTransfer && transaction.type === "EXPENSE" && (
          <div className="mt-4 cursor-pointer flex items-center justify-center bg-teal-900 border border-teal-900 rounded-md p-2 text-white hover:bg-teal-600 transition-colors">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" aria-disabled={isLoadingFile}>
              Baixar comprovante
            </a>
          </div>
        )}

        {!transaction?.isTransfer && (
          <Button type="submit" className="w-full mt-6" isLoading={isLoading} disabled={transaction?.isTransfer}>
            Salvar
          </Button>
        )}
      </form>
    </Modal>
  );
}
