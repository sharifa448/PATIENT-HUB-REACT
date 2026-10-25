import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import MedicineCard from '../components/MedicineCard';
import { medicineCards, medicineTable } from '../data/pharmacies';
import { ChevronDown, ArrowUpDown, AlertCircle, X, Search, CheckCircle, ShoppingCart } from 'lucide-react';

const FindPharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('asc');

  // ✅ استیت‌های مربوط به خرید (Checkout)
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const filteredTable = medicineTable.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    return (
      item.name.toLowerCase().trim().includes(term) ||
      item.serviceBy.toLowerCase().trim().includes(term) ||
      item.category.toLowerCase().trim().includes(term)
    );
  });

  const sortedTable = [...filteredTable].sort((a, b) => {
    if (sortBy === 'default') return 0;
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    if (typeof valueA === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
  });

  const paginatedTable = sortedTable.slice(0, entriesPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // ✅ تابع باز کردن پنجره خرید (هم برای کارت‌ها، هم برای جدول)
  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setPurchaseSuccess(false);
    setIsCheckoutOpen(true);
  };

  // ✅ تابع تایید نهایی خرید
  const handleConfirmPurchase = () => {
    setPurchaseSuccess(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setSelectedItem(null);
    }, 2000);
  };

  return (
    <DashboardLayout title="Pharmacyplace">
      
      {/* ================= بخش ۱: کارت‌های بالا ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 mb-6">
        <h1 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
          Search Pharmacies for Medicines
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {medicineCards.map((item) => (
            // پاس دادن تابع handleBuyNow به کارت
            <MedicineCard key={item.id} data={item} onBuyClick={handleBuyNow} />
          ))}
        </div>
      </div>

      {/* ================= بخش ۲: جدول نتایج ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
          {filteredTable.length} Medicine returned for the keyword "{searchTerm || 'All'}"
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="appearance-none border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">entries per page</span>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-10 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-slate-400"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* جدول - دسکتاپ */}
        <div className="hidden md:block overflow-x-auto">
          {/* ✅ اضافه کردن ستون ACTION به هدر */}
          <div className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
            <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-purple-500 transition text-left">
              NAME <ArrowUpDown className={`w-3 h-3 ${sortBy === 'name' ? 'text-purple-500' : 'text-slate-300'}`} />
            </button>
            <button onClick={() => handleSort('category')} className="flex items-center gap-1 hover:text-purple-500 transition text-left">
              CATEGORY <ArrowUpDown className={`w-3 h-3 ${sortBy === 'category' ? 'text-purple-500' : 'text-slate-300'}`} />
            </button>
            <div className="col-span-2">SERVICE BY</div>
            <button onClick={() => handleSort('discount')} className="flex items-center gap-1 hover:text-purple-500 transition text-left">
              DISCOUNT <ArrowUpDown className={`w-3 h-3 ${sortBy === 'discount' ? 'text-purple-500' : 'text-slate-300'}`} />
            </button>
            <button onClick={() => handleSort('price')} className="flex items-center gap-1 hover:text-purple-500 transition text-left">
              PRICE <ArrowUpDown className={`w-3 h-3 ${sortBy === 'price' ? 'text-purple-500' : 'text-slate-300'}`} />
            </button>
            <div className="text-center">ACTION</div>
          </div>

          {paginatedTable.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <AlertCircle className="w-10 h-10 text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">No Medicine Found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Try searching for a different name.</p>
            </div>
          ) : (
            paginatedTable.map((item) => (
              <div key={item.id} className="grid grid-cols-7 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded flex items-center justify-center flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{item.name}</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400">{item.category}</div>
                <div className="col-span-2 flex items-center gap-2">
                  <img src={item.serviceLogo} alt={item.serviceBy} className="w-8 h-8 rounded object-cover flex-shrink-0" />
                  <span className="font-medium text-slate-800 dark:text-white">{item.serviceBy}</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400">{item.discount}</div>
                <div className="text-slate-800 dark:text-white font-medium">{item.price} RM</div>
                
                {/* ✅ دکمه خرید کوچک در جدول */}
                <div className="text-center">
                  <button 
                    onClick={() => handleBuyNow(item)}
                    className="bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-slate-700 dark:text-purple-300 dark:hover:bg-slate-600 text-xs font-bold py-1.5 px-3 rounded-md transition flex items-center justify-center gap-1 mx-auto"
                  >
                    <ShoppingCart className="w-3 h-3" /> BUY
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          Showing 1 to {paginatedTable.length} of {filteredTable.length} entries
        </div>
      </div>

      {/* ================= ✅ مودال خرید (Checkout) ================= */}
      {isCheckoutOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700">
            
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Checkout</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {purchaseSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Order Placed!</h3>
                  <p className="text-slate-500 dark:text-slate-400">Your order for {selectedItem.name} from {selectedItem.pharmacy || selectedItem.serviceBy} has been confirmed.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                    <img src={selectedItem.image} alt={selectedItem.name} className="w-16 h-16 rounded-lg object-contain" />
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">{selectedItem.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{selectedItem.pharmacy || selectedItem.serviceBy}</p>
                      <p className="text-cyan-500 font-bold text-lg mt-1">{selectedItem.price} RM</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span>{selectedItem.price} AFG</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Delivery Fee</span>
                      <span>2.00 RM</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-white pt-3 border-t border-slate-200 dark:border-slate-700 text-base">
                      <span>Total</span>
                      <span>{selectedItem.price + 2} AFG</span>
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

export default FindPharmacy;