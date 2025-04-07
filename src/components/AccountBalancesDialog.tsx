import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, X } from "lucide-react";
import AccountBalances from "./AccountBalances"; // Ensure this component exists

const AccountBalancesDialog: React.FC<{ balances: any }> = ({ balances }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button to Open Dialog */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        View Balances
      </button>

      {/* Modal/Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated Content */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Wallet className="mr-2 text-blue-500" /> Account Balances
              </h2>
              <AccountBalances balances={balances} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AccountBalancesDialog;
