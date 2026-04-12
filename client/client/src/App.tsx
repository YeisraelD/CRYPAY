import { motion } from 'framer-motion';
import PriceCard from './components/priceCard';
import { LayoutDashboard, History, Settings, Wallet } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Navigation Header */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight m-0">
            <span className="neon-text">CRYPAY</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">
            Merchant Mission Control
          </p>
        </div>

        <nav className="flex gap-4">
          <button className="glass-card hover:bg-white/10 px-4 py-2 flex items-center gap-2 text-sm font-medium">
            <Wallet className="w-4 h-4" /> Connect Wallet
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Stats & Actions */}
        <div className="lg:col-span-2 space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PriceCard />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Total Volume</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$0.00</span>
                <span className="text-sm font-semibold text-slate-500">USD</span>
              </div>
            </motion.div>
          </section>

          {/* Quick Actions */}
          <section className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-indigo-400" /> Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all text-left">
                <div className="text-indigo-400 font-bold mb-1">Create Payment</div>
                <div className="text-xs text-indigo-400/60">Generate a new ID</div>
              </button>
              <button className="p-6 rounded-2xl bg-slate-500/10 border border-border-slate-500/20 hover:bg-slate-500/20 transition-all text-left">
                <div className="text-slate-300 font-bold mb-1">History</div>
                <div className="text-xs text-slate-500">View all logs</div>
              </button>
              <button className="p-6 rounded-2xl bg-slate-500/10 border border-border-slate-500/20 hover:bg-slate-500/20 transition-all text-left">
                <div className="text-slate-300 font-bold mb-1">Settings</div>
                <div className="text-xs text-slate-500">API keys & Webhooks</div>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Recent Activity Shadow */}
        <aside className="space-y-6">
          <div className="glass-card p-6 h-full flex flex-col">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <History className="w-4 h-4" /> Activity Feed
            </h2>
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/5 rounded-3xl">
              <div className="text-slate-600 mb-2 font-medium">No recent transactions</div>
              <p className="text-xs text-slate-700">Once your backend is connected, live payments will appear here.</p>
            </div>
          </div>
        </aside>

      </main>

      <footer className="mt-20 pt-8 border-t border-white/5 text-center">
        <div className="text-xs text-slate-600 font-mono">CRYPAY V1.0 // ENGINE: VITE + REACT</div>
      </footer>
    </div>
  )
}

export default App
