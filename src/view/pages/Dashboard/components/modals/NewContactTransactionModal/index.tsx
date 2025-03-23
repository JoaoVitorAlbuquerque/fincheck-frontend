import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewContactTransactionModalController } from "./useNewContactTransactionModalController";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { ConfirmContactTransactionModal } from "../ConfirmContactTransactionModal";

export function NewContactTransactionModal() {
  const {
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
    openConfirmContactTransactionModal,
    isConfirmContactTransactionModalOpen,
    values,
    filteredNameFromAccount,
    filteredAmountFromAccount,
  } = useNewContactTransactionModalController();

  return (
    <>
      {isConfirmContactTransactionModalOpen && (
        bankAccount.map((account) => (
          <ConfirmContactTransactionModal
            key={account.id}
            bankAccountKey={account?.bankAccountKey}
            email={account.user.email}
            name={account.user.name}
            toBankAccountName={account.name}
            fromBankAccountName={filteredNameFromAccount(values.fromBankAccountId)}
            transactionTitle={values.name}
            amount={values.amount}
            date={String(values.date)}
            onSubmit={handleSubmit}
            isLoading={isLoadingMutation}
          />
        ))
      )}

      <Modal
        title='Nova transação'
        open={isNewContactTransactionModalOpen}
        onClose={closeNewContactTransactionModal}
        hidden={isConfirmContactTransactionModalOpen === true}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-lg tracking-[-1px] font-semibold text-gray-800 mb-4">
            Transação para um contato
          </h1>

          <div className="space-y-4">
            {bankAccount.length === 0 && (
              <div className="space-y-2">
                <span>Insira uma chave de conta:</span>
                <Input
                  name=""
                  placeholder="Chave de conta do deestinatário"
                  onChange={(e) => setSelectedBankAccountKey(e.target.value)}
                />

                <Button
                  onClick={handleApplyFilters}
                  disabled={!selectedBankAccountKey || isLoading}
                >
                  Buscar
                </Button>
              </div>
            )}

            <div className="space-y-2 overflow-y-scroll">
              {bankAccount.map(account => (
                <div key={account.id} className="space-y-4 p-2 border border-gray-600 rounded-md">
                  <Input
                    type="text"
                    hidden
                    // error={errors.name?.message}
                    // placeholder='Escreva o título da transação'
                    {...register('toBankAccountId')}
                    value={account.id}
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-gray-700">
                        Nome da conta:
                      </span>
                      <p className="text-base font-bold text-gray-800 p-1 bg-gray-100 rounded-md border border-teal-600">
                        {account.name}
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-gray-700">
                        Chave de conta:
                      </span>
                      <p className="text-base font-bold text-gray-800 p-1 bg-gray-100 rounded-md border border-teal-600">
                        {account.bankAccountKey}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-bold text-gray-700">
                      Indivações pessoais do destinatário:
                    </span>

                    <p className="text-sm font-bold text-gray-600">
                      nome: <span className="text-base font-bold text-gray-800">{account.user.name}</span>
                    </p>
                    <p className="text-sm font-bold text-gray-600">
                      email: <span className="text-base font-bold text-gray-800">{account.user.email}</span>
                    </p>
                  </div>
                </div>
              ))}

              <div className="max-h-48">
                {bankAccount.length !== 0 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span>Valor da Transação</span>

                      <div className="flex items-center gap-2 border border-gray-600 rounded-md">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

                        <Controller
                          name="amount"
                          control={control}
                          defaultValue="0"
                          render={({ field: { onChange, value } }) => (
                            <InputCurrency
                              error={errors.amount?.message}
                              onChange={onChange}
                              value={value}
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span>Título</span>

                      <Input
                        type="text"
                        error={errors.name?.message}
                        placeholder='Escreva o título da transação'
                        {...register('name')}
                      />
                    </div>

                    <div className="space-y-1">
                      <span>Conta</span>

                      <Controller
                        control={control}
                        name="fromBankAccountId"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <Select
                            placeholder="Transferir com"
                            onChange={onChange}
                            value={value}
                            error={errors.fromBankAccountId?.message}
                            options={accounts.map(account => ({
                              value: account.id,
                              label: account.name,
                            }))}
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-1">
                      <span>Data</span>

                      <Controller
                        control={control}
                        name="date"
                        defaultValue={new Date()}
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

                    <div className="flex flex-col justify-center">
                      <span>saldo da conta: </span>

                      <span>{filteredAmountFromAccount(values.fromBankAccountId)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {bankAccount.length !== 0 && (
            <>
              <Button type="button" onClick={openConfirmContactTransactionModal} className="mt-4">
                Revisar dados da transação
              </Button>
            </>
          )}
        </form>
      </Modal>
    </>
  );
}
