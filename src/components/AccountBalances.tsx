// src/components/AccountBalances.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AccountBalancesProps {
  balances: { [key: string]: number };
}

const AccountBalances: React.FC<AccountBalancesProps> = ({ balances }) => {
  if (!balances || Object.keys(balances).length === 0) {
    return <div className="text-gray-500">No account balances available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="space-y-3">
        {Object.entries(balances).map(([account, balance]) => (
          <motion.div 
            key={account}
            whileHover={{ scale: 1.02 }}
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 border-l-4"
            style={{ 
              borderLeftColor: balance >= 0 ? '#10B981' : '#EF4444' 
            }}
          >
            <div>
              <span className="font-medium capitalize">{account}</span>
            </div>
            <div className={`text-lg font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{Math.abs(balance).toFixed(2)}
              <span className="text-xs ml-1">
                {balance >= 0 ? 'CR' : 'DR'}
              </span>
            </div>
          </motion.div>
        ))}
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Balance</span>
            <span className="text-xl font-bold">
            ₹{Object.values(balances).reduce((sum, balance) => sum + balance, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBalances;