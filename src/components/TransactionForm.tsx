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
    name: '',
    amount: 0,
    type: 'Debit',
    category: '',
    account: '',
    paidBy: '',
    status: '',
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
      paidBy: '',
      status: '',
      toaccount: 'None',
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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={transaction.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
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
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={transaction.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="account"
          value={transaction.account}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="Maha">Maha</option>
          <option value="HDFC">HDFC</option>
          <option value="ICICI">ICICI</option>
          <option value="IPPB">IPPB</option>
          <option value="Cash">Cash</option>
        </select>
        <input
          type="text"
          name="paidBy"
          placeholder="Paid By"
          value={transaction.paidBy}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={transaction.status}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* ✅ Show "To Account" only if type is "Transferred" */}
        {transaction.type === "Transferred" && (
          <select
            name="toAccount"
            value={transaction.toaccount}
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