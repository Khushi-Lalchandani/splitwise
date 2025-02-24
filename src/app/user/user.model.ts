export interface expenses {
  category: string;
  totalAmount: number;
  amountToBePaid: number;
  amountToBeReceived: number;
  equallySplitted: boolean;
  unequallySplitted: boolean;
  percentageOfSplitting: any[];
  date: string;
}
export interface user {
  name: string;
  email: string;
  friends: any[];
  expenses: expenses[];
}
