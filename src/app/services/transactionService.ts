// src/services/transactionService.ts
import axios from 'axios';
import { Transaction } from '../../types/Transaction';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust to your FastAPI server URL

export const transactionService = {
  async getTransactions(limit = 10): Promise<Transaction[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`, { 
        params: { limit } 
      });
      return response.data.transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  async addTransaction(transaction: Transaction) {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, transaction);
      return response.data;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  async getBalances() {
    try {
      const response = await axios.get(`${API_BASE_URL}/balances`);
      return response.data.balances;
    } catch (error) {
      console.error('Error fetching balances:', error);
      return {};
    }
  },

  async getSpendingByCategory(startDate?: string, endDate?: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/spending/category`, {
        params: { start_date: startDate, end_date: endDate }
      });
      return response.data.spending;
    } catch (error) {
      console.error('Error fetching spending by category:', error);
      return {};
    }
  },

  async getCategoryChart(startDate?: string, endDate?: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/charts/category`, {
        params: { start_date: startDate, end_date: endDate }
      });
      return response.data.chart;
    } catch (error) {
      console.error('Error fetching category chart:', error);
      return null;
    }
  },

  async getMonthlyChart() {
    try {
      const response = await axios.get(`${API_BASE_URL}/charts/monthly`);
      return response.data.chart;
    } catch (error) {
      console.error('Error fetching monthly chart:', error);
      return null;
    }
  }
};