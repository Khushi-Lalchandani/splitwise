export interface expenses {
  category: string;
  splitWith: string[];
  amountToBePaid: number;
  amountToBeReceived: number;
}
export interface user {
  name: string;
  email: string;
  friends: any[];
  expenses: expenses[];
  equallySplitted: boolean;
  unequallySplitted: boolean;
  percentageOfSplitting: number[];
}
