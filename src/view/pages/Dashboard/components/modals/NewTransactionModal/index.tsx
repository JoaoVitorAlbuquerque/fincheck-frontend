import { Controller } from "react-hook-form";

import { Button } from "../../../../../components/Button";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { cn } from "../../../../../../app/utils/cn";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    handleRemoveFile,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
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
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            error={errors.name?.message}
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
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
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
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
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <div className="w-full" hidden>
            {files.length === 0 && (
              <>
                <span>Deseja anexar algum comprovante:</span>

                <div
                  {...getRootProps()}
                  className={cn(
                    'border p-12 w-full rounded-md border-dashed transition-colors flex items-center justify-center cursor-pointer',
                    isDragActive && 'bg-gray-100',
                  )}
                >
                  <input {...getInputProps()} />

                  {/* <PackadOpenIcon clasName="size-10 strke-1 mb-2" /> */}

                  <div className="space-y-1 felx flex-col gap-1">
                    <span>Solte seus arquivos aqui</span>
                    <small className="block">Apenas arquivos .PDF de até 1MB são aceitos</small>
                  </div>
                </div>
              </>
            )}

            {files.length > 0 && (
              <div className="mt-1">
                <span className="font-medium text-base tracking-tight mb-4">
                  Arquivos selecionados
                </span>

                {files.map((file, index) => (
                  <div
                    key={file.name}
                    className="border p-1 rounded-md flex items-center justify-between"
                  >
                    <span className="text-sm">
                      {file.name}
                    </span>

                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
