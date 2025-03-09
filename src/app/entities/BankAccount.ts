export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
  currentBalance: number;
  bankAccountKey?: string; //
  user: {
    name: string,
    email: string,
  },
}
