import React from "react";

// ✅ onBuyClick رو به عنوان پراپ دریافت می‌کنیم
const MedicineCard = ({ data, onBuyClick }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 hover:shadow-md transition border border-slate-100 dark:border-slate-700">

      {/* عکس دارو */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center py-6 h-32">
        <img
          src={data.image}
          alt={data.name}
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* نام و قیمت */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 dark:text-white text-sm">
          {data.name}
        </h3>
        <span className="text-cyan-500 font-bold text-sm">
          {data.price} AFG
        </span>
      </div>

      {/* لوگو و نام داروخانه */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={data.logo}
          alt={data.pharmacy}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">
          {data.pharmacy}
        </h4>
      </div>

      {/* توضیحات */}
      <p className="text-xs text-slate-400 mb-4 line-clamp-2 min-h-[32px]">
        {data.description}
      </p>

      {/* ✅ دکمه BUY NOW که حالا به تابع والد وصل شده */}
      <button 
        onClick={() => onBuyClick(data)}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold py-2.5 rounded-md hover:opacity-90 transition"
      >
        BUY NOW
      </button>

    </div>
  );
};

export default MedicineCard;