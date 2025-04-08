// src/components/TransactionForm.tsx
import React, { useState } from 'react';
import { Transaction } from '../types/Transaction';

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [transaction, setTransaction] = useState<Transaction>({
    date: '',
    description: '',
    name: 'None',
    amount: 0,
    type: 'Debit',
    category: '',
    account: 'None',
    paid_by: 'Self',
    status: 'Paid',
    to_account: 'None',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(transaction);
    // Reset form after submission
    setTransaction({
      date: '',
      description: '',
      name: '',
      amount: 0,
      type: 'Debit',
      category: '',
      account: 'Maha',
      paid_by: '',
      status: '',
      to_account: 'None',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={transaction.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="category"
          value={transaction.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="None">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Petrol">Petrol</option>
          <option value="Extras">Extras</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleChange}
          className="border p-2 rounded"
          step="0.01"
          required
        />
        <select
          name="paid_by"
          value={transaction.paid_by}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="Self">Self</option>
          <option value="Dhanu">Dhanu</option>
        </select>
        
        {transaction.paid_by === "Self" && (
        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
          <option value="Transferred">Transferred</option>
        </select>
        )}
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={transaction.status=transaction.paid_by === "Self" ? ("Paid"):("Unpaid")}
          onChange={handleChange}
          className="border p-2 rounded"
          required
          hidden
        />
        {transaction.paid_by === "Self" && (
        <select
          name="account"
          value={transaction.account}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="None">Select Account</option>
          <option value="Maha">Maha</option>
          <option value="HDFC">HDFC</option>
          <option value="ICICI">ICICI</option>
          <option value="IPPB">IPPB</option>
          <option value="Cash">Cash</option>
        </select>
        )}


        {/* ✅ Show "To Account" only if type is "Transferred" */}
        {transaction.type === "Transferred" && (
          <select
            name="toaccount"
            value={transaction.to_account}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="None">Select To Account</option>
            <option value="Maha">Maha</option>
            <option value="HDFC">HDFC</option>
            <option value="ICICI">ICICI</option>
            <option value="IPPB">IPPB</option>
            <option value="Cash">Cash</option>
          </select>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>

  );
};

export default TransactionForm;