// src/types/Transaction.ts
export interface Transaction {
    date: string;
    description: string;
    name: string;
    amount: number;
    type: 'Debit' | 'Credit' | 'Transferred';
    category: string;
    account: string;
    to_account?: string;
    paid_by: string;
    status: string;
  }