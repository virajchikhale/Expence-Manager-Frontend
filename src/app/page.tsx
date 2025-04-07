// src/app/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  ChartPie, 
  Banknote,
  AlertTriangle 
} from 'lucide-react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import AccountBalances from '../components/AccountBalances';
import { Transaction } from '../types/Transaction';
import { transactionService } from './services/transactionService';
import AddTransactionDialog from "../components/AddTransactionDialog";
import AccountBalancesDialog from "../components/AccountBalancesDialog";


export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balances, setBalances] = useState<{[key: string]: number}>({});
  const [spendingByCategory, setSpendingByCategory] = useState<{[key: string]: number}>({});
  const [categoryChart, setCategoryChart] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Error state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reset previous errors
        setError(null);
        setLoading(true);

        // Fetch all data concurrently for better performance
        const [
          fetchedTransactions,
          fetchedBalances,
          fetchedSpending,
          chart
        ] = await Promise.all([
          transactionService.getTransactions(),
          transactionService.getBalances(),
          transactionService.getSpendingByCategory(),
          transactionService.getCategoryChart().catch(() => null) // Make chart optional
        ]);

        setTransactions(fetchedTransactions);
        setBalances(fetchedBalances);
        setSpendingByCategory(fetchedSpending);
        setCategoryChart(chart);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTransaction = async (newTransaction: Transaction) => {
    try {
      await transactionService.addTransaction(newTransaction);
      
      // Refresh data after adding a transaction
      const [
        fetchedTransactions,
        fetchedBalances,
        fetchedSpending
      ] = await Promise.all([
        transactionService.getTransactions(),
        transactionService.getBalances(),
        transactionService.getSpendingByCategory()
      ]);
      
      setTransactions(fetchedTransactions);
      setBalances(fetchedBalances);
      setSpendingByCategory(fetchedSpending);
    } catch (error) {
      console.error('Failed to add transaction:', error);
      setError('Failed to add transaction. Please try again.');
    }
  };

  const calculateTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'Debit')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const calculateTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'Credit')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const getFinancialMood = () => {
    const netBalance = calculateTotalIncome() - calculateTotalExpenses();
    if (netBalance > 5000) return '🎉 Awesome Financial Health!';
    if (netBalance > 0) return '😊 Good Job Saving!';
    if (netBalance === 0) return '🤔 Breaking Even';
    return '😰 Time to Budget Carefully!';
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center h-screen">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-50 p-8 rounded-xl shadow-lg text-center"
        >
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-red-700 mb-4">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-white">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center text-blue-800"
      >
        💰 Financial Tracker Pro
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div 
            className="bg-white p-6 rounded-xl shadow-md flex  justify-center items-center space-x-4 mb-6"
          >
          <AddTransactionDialog  onSubmit={handleAddTransaction}/>
          </div>
          <div 
            className="bg-white p-6 rounded-xl shadow-md flex  justify-center items-center space-x-4 mb-6"
          >
          <AccountBalancesDialog  balances={balances}/>    
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { 
            icon: <TrendingUp className="text-green-500" />, 
            title: 'Total Income', 
            value: `$${calculateTotalIncome().toFixed(2)}` 
          },
          { 
            icon: <TrendingDown className="text-red-500" />, 
            title: 'Total Expenses', 
            value: `$${calculateTotalExpenses().toFixed(2)}` 
          },
          { 
            icon: <PiggyBank className="text-blue-500" />, 
            title: 'Financial Mood', 
            value: getFinancialMood() 
          }
        ].map((card, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4"
          >
            {card.icon}
            <div>
              <h3 className="text-gray-500">{card.title}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <ChartPie className="mr-2 text-orange-500" /> Spending Breakdown
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            {Object.entries(spendingByCategory).length > 0 ? (
              Object.entries(spendingByCategory).map(([category, amount]) => (
                <div key={category} className="flex justify-between mb-2 hover:bg-gray-100 p-2 rounded">
                  <span>{category}</span>
                  <span className="text-red-600 font-bold">${amount.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No spending data available</p>
            )}
          </div>
        </motion.div>

        {categoryChart && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">Category Spending Chart</h2>
            <img 
              src={`data:image/png;base64,${categoryChart}`} 
              alt="Category Spending Chart" 
              className="w-full max-h-[300px] object-contain"
            />
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
        {transactions.length > 0 ? (
          <TransactionList transactions={transactions} />
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No transactions yet. Add your first transaction above!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}