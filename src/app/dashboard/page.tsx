"use client"
import React, { useState, useEffect } from 'react';
import { Plus, CreditCard, TrendingUp, TrendingDown, Users, Wallet, Eye, EyeOff } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  type: 'personal' | 'friends';
  balance: number;
  email?: string; // for friend accounts
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  name: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
  account: string;
  status?: string;
}

interface Balance {
  account: string;
  balance: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [personalAccounts, setPersonalAccounts] = useState<Account[]>([]);
  const [friendAccounts, setFriendAccounts] = useState<Account[]>([]);
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [hideBalances, setHideBalances] = useState(false);

  // New transaction form state
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    name: '',
    amount: '',
    type: 'debit' as 'debit' | 'credit',
    category: '',
    account: ''
  });

  // New account form state
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'personal' as 'personal' | 'friends',
    initial_balance: '',
    email: '' // for friend accounts
  });

  // Mock API calls - replace with actual API calls using your token
  const fetchData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockAccounts: Account[] = [
        { id: '1', name: 'Wallet', type: 'personal', balance: 5000 },
        { id: '2', name: 'Bank Account', type: 'personal', balance: 25000 },
        { id: '3', name: 'Credit Card', type: 'personal', balance: -2000 },
        { id: '4', name: 'John Doe', type: 'friends', balance: 2000, email: 'john@example.com' }, // You lent ₹2000
        { id: '5', name: 'Jane Smith', type: 'friends', balance: -1500, email: 'jane@example.com' }, // You owe ₹1500
        { id: '6', name: 'Mike Johnson', type: 'friends', balance: 500, email: 'mike@example.com' } // You lent ₹500
      ];

      const personalAccs = mockAccounts.filter(acc => acc.type === 'personal');
      const friendAccs = mockAccounts.filter(acc => acc.type === 'friends');
      
      setPersonalAccounts(personalAccs);
      setFriendAccounts(friendAccs);
      setAllAccounts(mockAccounts);

      const mockTransactions: Transaction[] = [
        { id: '1', date: '2025-07-10', description: 'Lunch', name: 'Lunch', amount: 200, type: 'debit', category: 'Food', account: 'Wallet' },
        { id: '2', date: '2025-07-09', description: 'Salary', name: 'Salary', amount: 50000, type: 'credit', category: 'Income', account: 'Bank Account' },
        { id: '3', date: '2025-07-08', description: 'Lent money', name: 'Lent to John', amount: 2000, type: 'debit', category: 'Lend', account: 'John Doe' },
        { id: '4', date: '2025-07-07', description: 'Borrowed money', name: 'Borrowed from Jane', amount: 1500, type: 'credit', category: 'Borrow', account: 'Jane Smith' },
        { id: '5', date: '2025-07-06', description: 'Coffee', name: 'Coffee Shop', amount: 150, type: 'debit', category: 'Food', account: 'Wallet' },
        { id: '6', date: '2025-07-05', description: 'Lent money', name: 'Lent to Mike', amount: 500, type: 'debit', category: 'Lend', account: 'Mike Johnson' }
      ];

      const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com' }
      ];

      setTransactions(mockTransactions);
      setUsers(mockUsers);
      setBalances(mockAccounts.map(acc => ({ account: acc.name, balance: acc.balance })));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add API call here
      const transactionData = {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        date: newTransaction.date.split('-').reverse().join('-') // Convert to DD-MM-YYYY
      };

      // Mock adding transaction
      const newTrans: Transaction = {
        id: Date.now().toString(),
        ...transactionData,
        amount: parseFloat(newTransaction.amount)
      };

      setTransactions(prev => [newTrans, ...prev.slice(0, 9)]);
      setNewTransaction({
        date: new Date().toISOString().split('T')[0],
        description: '',
        name: '',
        amount: '',
        type: 'debit',
        category: '',
        account: ''
      });
      setShowAddTransaction(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add API call here
      const accountData = {
        ...newAccount,
        initial_balance: parseFloat(newAccount.initial_balance)
      };

      // Mock adding account
      const newAcc: Account = {
        id: Date.now().toString(),
        name: newAccount.name,
        type: newAccount.type,
        balance: parseFloat(newAccount.initial_balance),
        email: newAccount.type === 'friends' ? newAccount.email : undefined
      };

      if (newAccount.type === 'personal') {
        setPersonalAccounts(prev => [...prev, newAcc]);
      } else {
        setFriendAccounts(prev => [...prev, newAcc]);
      }
      setAllAccounts(prev => [...prev, newAcc]);
      
      setNewAccount({
        name: '',
        type: 'personal',
        initial_balance: '',
        email: ''
      });
      setShowAddAccount(false);
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  const personalBalance = personalAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalLent = friendAccounts.filter(acc => acc.balance > 0).reduce((sum, acc) => sum + acc.balance, 0);
  const totalOwed = friendAccounts.filter(acc => acc.balance < 0).reduce((sum, acc) => sum + Math.abs(acc.balance), 0);
  const totalIncome = transactions.filter(t => t.type === 'credit' && !['Lend', 'Borrow'].includes(t.category)).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'debit' && !['Lend', 'Borrow'].includes(t.category)).reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Personal Balance</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {hideBalances ? '****' : `₹${personalBalance.toLocaleString()}`}
                  </p>
                  <button
                    onClick={() => setHideBalances(!hideBalances)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {hideBalances ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Wallet className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Money Lent</p>
                <p className="text-2xl font-bold text-green-600">
                  {hideBalances ? '****' : `₹${totalLent.toLocaleString()}`}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Money Owed</p>
                <p className="text-2xl font-bold text-red-600">
                  {hideBalances ? '****' : `₹${totalOwed.toLocaleString()}`}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Worth</p>
                <p className={`text-2xl font-bold ${(personalBalance + totalLent - totalOwed) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {hideBalances ? '****' : `₹${(personalBalance + totalLent - totalOwed).toLocaleString()}`}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Accounts Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Personal Accounts</h2>
                <button
                  onClick={() => setShowAddAccount(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Account
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {personalAccounts.map(account => (
                <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CreditCard className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{account.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{account.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {hideBalances ? '****' : `₹${account.balance.toLocaleString()}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                <button
                  onClick={() => setShowAddTransaction(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Transaction
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {transactions.slice(0, 10).map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.category === 'Lend' ? 'bg-orange-100' :
                        transaction.category === 'Borrow' ? 'bg-purple-100' :
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.category === 'Lend' ? 
                          <TrendingUp className="text-orange-600" size={20} /> :
                          transaction.category === 'Borrow' ? 
                          <TrendingDown className="text-purple-600" size={20} /> :
                          transaction.type === 'credit' ? 
                          <TrendingUp className="text-green-600" size={20} /> : 
                          <TrendingDown className="text-red-600" size={20} />
                        }
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{transaction.name}</h3>
                        <p className="text-sm text-gray-600">{transaction.category} • {transaction.account}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.category === 'Lend' ? 'text-orange-600' :
                        transaction.category === 'Borrow' ? 'text-purple-600' :
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' && transaction.category !== 'Borrow' ? '+' : 
                         transaction.category === 'Lend' ? '↗' : 
                         transaction.category === 'Borrow' ? '↙' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Friends & Balances Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Friends & Balances</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {friendAccounts.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{friend.name}</h3>
                        <p className="text-sm text-gray-600">{friend.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${friend.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {hideBalances ? '****' : 
                         friend.balance >= 0 ? 
                         `+₹${friend.balance.toLocaleString()}` : 
                         `-₹${Math.abs(friend.balance).toLocaleString()}`
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        {friend.balance >= 0 ? 'Owes you' : 'You owe'}
                      </p>
                    </div>
                  </div>
                ))}
                
                {friendAccounts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No friend accounts yet</p>
                    <p className="text-sm">Add friends to track lending/borrowing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Transaction</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newTransaction.name}
                  onChange={(e) => setNewTransaction({...newTransaction, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'debit' | 'credit'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Income">Income</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                <select
                  value={newTransaction.account}
                  onChange={(e) => setNewTransaction({...newTransaction, account: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Account</option>
                  {allAccounts.map(account => (
                    <option key={account.id} value={account.name}>{account.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddTransaction(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddTransaction(e);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Account</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                <input
                  type="text"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <select
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({...newAccount, type: e.target.value as 'personal' | 'friends'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="personal">Personal</option>
                  <option value="friends">Friends</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Balance</label>
                <input
                  type="number"
                  value={newAccount.initial_balance}
                  onChange={(e) => setNewAccount({...newAccount, initial_balance: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddAccount(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddAccount(e);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;