import { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { color, currentBalance, name, type, bankAccountKey } = data;
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div className="flex justify-between">
        <div>
          <BankAccountTypeIcon type={type} />

          <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
            {name}
          </span>
        </div>

        <div>
          <span className="text-gray-800 font-medium">Chave de conta: </span>

          <span className="text-base font-bold text-gray-800 p-1 bg-gray-100 rounded-md border border-teal-600">
            {bankAccountKey}
          </span>
        </div>
      </div>

      <div>
        <span className={cn(
          'text-gray-800 font-medium tracking-[-0.5px] block',
          !areValuesVisible && 'blur-sm',
        )}>
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">
          Saldo atual
        </small>
      </div>
    </div>
  );
}
