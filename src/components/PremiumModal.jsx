import React from 'react';

const plans = [
  {
    id: 'green',
    name: 'Premium 🟢 GREEN PLAN (Level 1 – Starter)',
    price: '₹99/month',
    highlights: [
      'Access to all public chat rooms',
      'Standard text chat',
      'Basic emojis & reactions',
      'Daily login bonus features',
      'Standard profile theme customization',
      'Ability to send voice messages'
    ]
  },
  {
    id: 'yellow',
    name: '🟡 YELLOW PLAN (Level 2 – Advanced)',
    price: '₹299/month',
    highlights: [
      'Everything in GREEN Plan',
      'Priority room joining',
      'Premium emojis & reactions',
      'Special profile badge (Yellow)'
    ]
  },
  {
    id: 'blue',
    name: '🔵 BLUE PLAN (Level 3 – Premium)',
    price: '₹999/month',
    highlights: [
      'Everything in YELLOW Plan',
      'Blue profile badge (Premium VIP)',
      'Full access to all rooms, including semi-private',
      'Room spotlight feature'
    ]
  }
];

const sampleGifts = [
  { id: 1, name: 'Rose Sticker', price: 9 },
  { id: 2, name: 'Coffee Bundle (x5)', price: 49 },
  { id: 3, name: 'Sparkle Gift', price: 199 }
];

const PremiumModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-white rounded-[28px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-white/10 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">PREMIUM PLANS</h2>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div 
              key={plan.id} 
              className="group p-6 rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-zinc-900/50 hover:border-blue-500 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="font-extrabold text-xl mb-2 relative z-10">{plan.name}</h3>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-4 relative z-10">{plan.price}</p>
              <ul className="space-y-3 relative z-10">
                {plan.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 relative z-10">
                <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95">
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-[32px] bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-white/5 dark:to-white/10 border border-gray-100 dark:border-white/10">
          <h4 className="text-xl font-bold mb-6">Gifts & Bundles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {sampleGifts.map(g => (
              <div key={g.id} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 hover:border-orange-400 transition-colors group">
                <div className="font-bold text-lg group-hover:text-orange-400 transition-colors">{g.name}</div>
                <div className="text-xl font-black mt-1">₹{g.price}</div>
                <button className="mt-4 w-full py-2 rounded-lg text-sm font-bold bg-gray-100 dark:bg-zinc-800 hover:bg-orange-600 hover:text-white transition-all">
                  Send Gift
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
