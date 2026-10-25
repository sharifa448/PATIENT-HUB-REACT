import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { foodItems, tableData } from '../data/marketplace';
import { Search, ChevronDown, AlertCircle, X, CheckCircle } from 'lucide-react';

const FindMarketPlace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(7);

  // ✅ استیت‌های مربوط به خرید (Checkout)
  const [selectedFood, setSelectedFood] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const filteredTable = tableData.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      item.name.toLowerCase().trim().includes(term) ||
      item.serviceBy.toLowerCase().trim().includes(term) ||
      item.category.toLowerCase().trim().includes(term)
    );
  });

  const displayedData = filteredTable.slice(0, entriesPerPage);

  // ✅ تابع باز کردن پنجره خرید
  const handleBuyNow = (item) => {
    setSelectedFood(item);
    setPurchaseSuccess(false); // ریست کردن پیام موفقیت
    setIsCheckoutOpen(true);
  };

  // ✅ تابع تایید نهایی خرید
  const handleConfirmPurchase = () => {
    setPurchaseSuccess(true);
    // بعد از ۲ ثانیه پنجره بسته میشه
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setSelectedFood(null);
    }, 2000);
  };

  return (
    <DashboardLayout title="Marketplace">
      
      {/* ================= بخش ۱: کارت‌های بالا ================= */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
          Search Marketplaces and order what you need
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 hover:shadow-md transition">
              
              <div className="mb-4 h-32 overflow-hidden rounded-lg">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-slate-800 dark:text-white">{item.name}</h3>
                <span className="text-cyan-500 font-bold">{item.price} RM</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <img src={item.logo} alt={item.name} className="w-8 h-8 rounded-full object-cover bg-gray-100 p-1" />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 h-12 overflow-hidden">
                {item.description}
              </p>

              {/* ✅ دکمه خرید که حالا کار می‌کند */}
              <button 
                onClick={() => handleBuyNow(item)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2.5 rounded-lg text-sm hover:opacity-90 transition"
              >
                BUY NOW
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= بخش ۲: جدول ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
          Other results for healthy diet search
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="appearance-none border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 pr-10 text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none"
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-sm text-slate-500">entries per page</span>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="hidden md:grid grid-cols-6 gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-700/50 rounded-t-lg text-xs font-bold text-slate-500 dark:text-slate-300 uppercase">
            <div className="col-span-1">NAME</div>
            <div>CATEGORY</div>
            <div className="col-span-2">SERVICE BY</div>
            <div>DISCOUNT</div>
            <div>PRICE</div>
            <div className="hidden">ID</div>
          </div>

          {displayedData.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <AlertCircle className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No results found for "{searchTerm}"
              </p>
            </div>
          ) : (
            displayedData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
              >
                <div className="flex items-center gap-3 font-medium text-slate-800 dark:text-white">
                  <img src={foodItems[0].image} alt="food" className="w-10 h-8 rounded object-cover" />
                  {item.name}
                </div>
                
                <div className="text-slate-500 dark:text-slate-400">{item.category}</div>

                <div className="col-span-2 flex items-center gap-3">
                  <img src={item.serviceLogo} alt={item.serviceBy} className="w-8 h-8 rounded object-cover bg-white p-1" />
                  <span className="font-medium text-slate-800 dark:text-white">{item.serviceBy}</span>
                </div>

                <div className="text-slate-500 dark:text-slate-400">{item.discount}</div>
                <div className="text-slate-800 dark:text-white font-medium">{item.price} RM</div>
                <div className="hidden text-slate-400 text-xs">{item.code}</div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Showing 1 to {displayedData.length} of {filteredTable.length} entries
        </div>

      </div>

      {/* ================= ✅ کارت خرید (Checkout Modal) ================= */}
      {isCheckoutOpen && selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700">
            
            {/* هدر مودال */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Checkout</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* بدنه مودال */}
            <div className="p-6">
              {purchaseSuccess ? (
                // ✅ پیام موفقیت‌آمیز بودن خرید
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Payment Successful!</h3>
                  <p className="text-slate-500 dark:text-slate-400">Your order for {selectedFood.name} has been placed.</p>
                </div>
              ) : (
                // ✅ فرم تایید خرید
                <>
                  <div className="flex items-center gap-4 mb-6 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <img src={selectedFood.image} alt={selectedFood.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">{selectedFood.name}</h3>
                      <p className="text-cyan-500 font-bold text-lg mt-1">{selectedFood.price} RM</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span>{selectedFood.price} RM</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Delivery Fee</span>
                      <span>2.00 RM</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-700 text-base">
                      <span>Total</span>
                      <span>{selectedFood.price + 2} RM</span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmPurchase}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition"
                  >
                    Confirm Payment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default FindMarketPlace;