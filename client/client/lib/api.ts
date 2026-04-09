import axios from 'axios';
import { CryptoPrice, Payment } from '../types/crypto';

// API Model Interfaces
export interface CoinGeckoPrice {
    current_price: {
        usd: number;
    };
    price_change_24h: number;
    market_cap: number;
    total_volume: number;
}

export interface ApiResponse<T> {
    res: 'success' | 'fail' | 'waiting';
    body?: T;
    status?: string;
    version?: string;
    uptime?: number;
    timestamp?: string;
}

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * CRYPAY Frontend API Client
 */
export const crypayApi = {
    // --- Ethereum Endpoints ---
    
    /**
     * Get current ETH price
     */
    async getEthPrice(): Promise<CoinGeckoPrice> {
        const response = await apiClient.get('/eth/price');
        return response.data.price;
    },

    /**
     * Get balance for a single ETH address
     */
    async getEthBalance(acct: string): Promise<number> {
        const response = await apiClient.post('/eth/balance', { acct });
        return response.data.balance;
    },

    /**
     * Get balances for multiple ETH addresses
     */
    async getEthBalances(accts: string[]): Promise<number[]> {
        const response = await apiClient.post('/eth/mulBalance', { accts });
        return response.data.balance;
    },

    // --- Payment Endpoints ---

    /**
     * Create a new payment request
     */
    async createPayment(price: number, info: any, id: string): Promise<ApiResponse<void>> {
        const response = await apiClient.post('/payments/create', { price, info, id });
        return response.data;
    },

    /**
     * Get payment details by ID
     */
    async getPayment(id: string): Promise<ApiResponse<Payment>> {
        const response = await apiClient.post('/payments/get', { id });
        return response.data;
    },

    /**
     * Complete and verify a payment
     */
    async completePayment(id: string, transactionHash: string): Promise<ApiResponse<void>> {
        const response = await apiClient.post('/payments/complete', { id, transactionHash });
        return response.data;
    },

    // --- Utility Endpoints ---

    /**
     * Search for asset tickers
     */
    async searchTickers(term: string): Promise<any[]> {
        const response = await apiClient.post('/search', { term });
        return response.data;
    },

    /**
     * Check API health status
     */
    async checkHealth(): Promise<ApiResponse<void>> {
        const response = await apiClient.get('/health');
        return response.data;
    },

    /**
     * Get API version and environment
     */
    async getVersion(): Promise<ApiResponse<void>> {
        const response = await apiClient.get('/version');
        return response.data;
    }
};

export default crypayApi;
