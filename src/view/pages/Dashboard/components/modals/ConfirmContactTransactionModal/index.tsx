// import { formatCurrency } from "../../../../../../app/utils/formatCurrency";
import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";
import { useConfirmContactTransactionModal } from "./useConfirmContactTransactionModal";

interface ConfirmContactTransactionModalProps {
  toBankAccountName: string;
  bankAccountKey?: string;
  name: string;
  email: string;
  fromBankAccountName: string;
  amount: number;
  transactionTitle: string;
  date: string;
  onSubmit(): void;
  isLoading: boolean;
}

export function ConfirmContactTransactionModal({
  toBankAccountName,
  bankAccountKey,
  name,
  email,
  fromBankAccountName,
  amount,
  transactionTitle,
  date,
  onSubmit,
  isLoading,
}: ConfirmContactTransactionModalProps) {
  const {
    isConfirmContactTransactionModalOpen,
    closeConfirmContactTransactionModal,
  } = useConfirmContactTransactionModal();

  return (
    <Modal
      title="Confirme os dados da transação"
      open={isConfirmContactTransactionModalOpen}
      onClose={closeConfirmContactTransactionModal}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-lg text-gray-700">Informações do destinatário:</span>

          <div className="space-y-4 p-2 border border-gray-600 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-gray-700">
                  Nome da conta:
                </span>
                <p className="text-base font-bold text-gray-800 p-1 bg-gray-100 rounded-md border border-teal-600">
                  {toBankAccountName}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-gray-700">
                  Chave de conta:
                </span>
                <p className="text-base font-bold text-gray-800 p-1 bg-gray-100 rounded-md border border-teal-600">
                  {bankAccountKey}
                </p>
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-gray-700">
                Informações pessoais do destinatário:
              </span>

              <p className="text-sm font-bold text-gray-600">
                nome: <span className="text-base font-bold text-gray-800">{name}</span>
              </p>
              <p className="text-sm font-bold text-gray-600">
                email: <span className="text-base font-bold text-gray-800">{email}</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="text-lg text-gray-700">Informações do remetente:</span>

          <div className="space-y-2 p-2 border border-gray-600 rounded-md">
            <div>
              <span className="text-sm font-bold text-gray-700">Valor da Transação: </span>
              <span className="text-base font-bold text-gray-800">R$ {amount}</span>
            </div>

            <div>
              <span className="text-sm font-bold text-gray-700">Título da Transação: </span>
              <span className="text-base font-bold text-gray-800">{transactionTitle}</span>
            </div>

            <div>
              <span className="text-sm font-bold text-gray-700">Conta: </span>
              <span className="text-base font-bold text-gray-800">{fromBankAccountName}</span>
            </div>

            <div>
              <span className="text-sm font-bold text-gray-700">Data: </span>
              <span className="text-base font-bold text-gray-800">{date}</span>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between">
          <Button type="button" className="mt-2" onClick={onSubmit} isLoading={isLoading}>
            Realizar transação
          </Button>

          <button
            type="button"
            onClick={closeConfirmContactTransactionModal}
            className="px-2 pt-2 bg-white rounded-md text-red-600 hover:text-gray-700 hover:border-b hover:border-red-600 transition-all"
          >
            Cancelar operação
          </button>
        </footer>
      </div>
    </Modal>
  );
}
