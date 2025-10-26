export interface CryptoPrice {
    symbol : string;
    name: string;
    price: number;
    change24h:number;
    volume24h: number;
    marketCap: number;
    lastUpdate: string;
}

export interface Payment{
    id: string;
    amount: number;
    currency: string;
    cryptoAmount: number;
    cryptoCurrency: string;
    status: 'pending' | 'completed' | 'failed' | 'expired';
    platform: 'ebay' | 'paypal' | 'direct' | 'other';
    recipient: string;
    createdAt?: string;
    completedAt?: string;
    txHash?: string;
}

export interface Transaction{
    id: string;
    type: 'payment' |'received' | 'conversion';
    amount : number;
    currency: string;
    status: 'completed' | 'pending' | 'failed';
    timestamp: string;
    description: string;
    txHash?: string
}

export interface Wallet{
    id: string;
    currency: string;
    balance: number;
    address: string;
    name: string;
}

export interface PlatformConnection{
    platform: 'ebay' | 'paypal' | 'stripe';
    connected: boolean;
    accountId?: string;
    accountName?: string;
    lastSync?: string;
}
