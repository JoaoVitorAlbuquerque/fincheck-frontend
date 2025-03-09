import { useAuth } from "../../../app/hooks/useAuth";
import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts";
import { DashboardContext, DashboardProvider } from "./components/DashboardContext";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions";
import { EditAccountModal } from "./components/modals/EditAccountModal";
import { NewAccountModal } from "./components/modals/NewAccountModal";
import { NewContactTransactionModal } from "./components/modals/NewContactTransactionModal";
import { NewTransactionModal } from "./components/modals/NewTransactionModal";

export function Dashboard() {
  const { user } = useAuth();

  const screenLarge = window.screen.width;

  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
            <header className="h-12 flex items-center justify-between">
              <div className="flex items-center justify-between w-72">
                <Logo className="h-8 text-teal-900" />

                {screenLarge > 768 && (
                  <>
                    <div className="h-8 w-[2px] bg-slate-600" />

                    <div className="tracking-[-1px] md:text-lg font-bold text-teal-900">
                      Olá,
                      <span className="ml-1 font-medium text-teal-900">
                        {user?.name}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <UserMenu />
            </header>

            <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>

              <div className="w-full md:w-1/2">
                <Transactions />
              </div>
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            <NewContactTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
