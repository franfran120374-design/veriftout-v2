export interface Coloc {
  id: string;
  name: string;
  members: Member[];
  createdAt: Date;
  createdBy: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  balance: number;
}

export interface Expense {
  id: string;
  colocId: string;
  amount: number;
  description: string;
  category: string;
  paidBy: string;
  splitBetween: string[];
  date: Date;
  receipt?: string;
}

export type ExpenseCategory = 
  | 'groceries' 
  | 'utilities' 
  | 'rent' 
  | 'internet'
  | 'cleaning'
  | 'other';