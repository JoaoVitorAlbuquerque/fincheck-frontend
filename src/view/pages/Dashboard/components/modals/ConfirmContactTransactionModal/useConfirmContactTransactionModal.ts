import { useDashboard } from "../../DashboardContext/useDashboard";

export function useConfirmContactTransactionModal() {
  const {
    isConfirmContactTransactionModalOpen,
    closeConfirmContactTransactionModal,
  } = useDashboard();

  return {
    isConfirmContactTransactionModalOpen,
    closeConfirmContactTransactionModal,
  };
}
