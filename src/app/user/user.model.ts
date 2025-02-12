export interface expenses {
  category: string;
  splitWith: string[];
  amountToBePaid: number;
  amountToBeReceived: number;
  equallySplitted: boolean;
  unequallySplitted: boolean;
  percentageOfSplitting: number[];
}
export interface user {
  name: string;
  email: string;
  friends: any[];
  expenses: expenses[];
}
