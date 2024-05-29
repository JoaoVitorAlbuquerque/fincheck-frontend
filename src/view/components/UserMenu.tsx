import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";

export function UserMenu() {
  const { signout, user } = useAuth();
  // const firstName = user?.name;
  // const lastName = user?.name;
  // const avatar = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
  // Implementar quando colocar input de sobrenome na tela de cadastro.

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100" role="button">
          <span className="text-sm tracking[-0.5px] text-teal-900 font-medium">
            {user?.name.slice(0, 1).toLocaleUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-32">
          <DropdownMenu.Item
            className="flex items-center justify-between"
            onSelect={signout}
          >
            Sair
            <ExitIcon className="w-4 h-4" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
