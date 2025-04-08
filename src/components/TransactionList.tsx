// src/components/TransactionList.tsx
import React from 'react';
import { Transaction } from '../types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
}



const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Paid By</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Account</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {(transactions || []).map((transaction, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{transaction.date}</td>
              <td className="p-3">
                <span className={
                  transaction.type === 'Credit' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }>
                  {transaction.amount}
                </span>
              </td>
              <td className="p-3">{transaction.description}</td>
              <td className="p-3">{transaction.category}</td>
              <td className="p-3">{transaction.paid_by}</td>
              <td className="p-3">{transaction.type}</td>
              <td className="p-3">{transaction.account}</td>
              <td className="p-3">{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
