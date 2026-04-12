import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PriceCard() {
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        // Basic price fetcher - can be replaced with backend API later
        const fetchPrice = async () => {
            try {
                const res = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot');
                const data = await res.json();
                setPrice(parseFloat(data.data.amount));
            } catch (e) {
                console.error("Price fetch failed", e);
            }
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 w-full max-w-sm"
        >
            <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                    <TrendingUp className="text-indigo-400 w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin-slow" /> LIVE
                </span>
            </div>

            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Ethereum Price</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">
                    {price ? `$${price.toLocaleString()}` : "---"}
                </span>
                <span className="text-sm font-semibold text-emerald-400">+2.4%</span>
            </div>
        </motion.div>
    );
}
