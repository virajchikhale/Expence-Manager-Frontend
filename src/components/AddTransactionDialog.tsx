import React, { useState } from "react";
import { motion } from "framer-motion";
import { Banknote, X } from "lucide-react";
import TransactionForm from "./TransactionForm";

interface AddTransactionDialogProps {
  onSubmit: (transactionData: any) => void;
}

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle form submission and close dialog
  const handleSubmit = (transactionData: any) => {
    onSubmit(transactionData); // Call parent function
    setIsOpen(false); // Close dialog after submission
  };

  return (
    <div>
      {/* Button to open dialog */}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
        onClick={() => setIsOpen(true)}
      >
        + Add Transaction
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
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Banknote className="mr-2 text-purple-500" /> Add Transaction
              </h2>
              <TransactionForm onSubmit={handleSubmit} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AddTransactionDialog;
