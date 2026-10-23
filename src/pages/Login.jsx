import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    contact: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    
    // اگر خطایی وجود داشت، با تایپ کردن پاک بشه
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'این فیلد الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.contact) && !/^\d+$/.test(formData.contact)) {
      newErrors.contact = 'ایمیل یا شماره معتبر وارد کنید';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      
      {/* پس‌زمینه موجی */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-3 py-6 md:py-12">
        
        {/* عنوان بالای صفحه */}
        <div className="text-center mb-6 md:mb-8 text-white px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
            Welcome to MyPatientHUB!
          </h1>
          <p className="text-xs sm:text-sm md:text-base drop-shadow-md">
            We provide smart healthcare services in your hands.
          </p>
        </div>

        {/* کارت لاگین */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] p-6 md:p-8">
          
          <h2 className="text-lg md:text-xl font-bold text-center text-slate-800 mb-5 md:mb-6">
            Sign in to MyPatientHUB
          </h2>

          {/* دکمه‌های شبکه‌های اجتماعی */}
          <div className="flex justify-center gap-3 md:gap-4 mb-5 md:mb-6">
            <button type="button" className="w-12 h-12 md:w-14 md:h-14 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center transition">
              <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button type="button" className="w-12 h-12 md:w-14 md:h-14 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center transition">
              <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-xs md:text-sm">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            
            {/* فیلد ایمیل یا شماره */}
            <div>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Email or Phone number"
                className={`w-full px-4 py-2.5 md:py-3 rounded-lg border text-sm md:text-base focus:outline-none focus:ring-2 transition ${
                  errors.contact ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-purple-500'
                }`}
              />
              {errors.contact && <p className="text-red-500 text-[10px] md:text-xs mt-1">{errors.contact}</p>}
            </div>

            {/* فیلد رمز عبور */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Please enter your password"
                className={`w-full px-4 py-2.5 md:py-3 rounded-lg border text-sm md:text-base focus:outline-none focus:ring-2 transition ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-purple-500'
                }`}
              />
              {errors.password && <p className="text-red-500 text-[10px] md:text-xs mt-1">{errors.password}</p>}
            </div>

            {/* فراموشی رمز و Remember me (در یک خط) */}
            <div className="flex flex-row justify-between items-center text-xs text-slate-500 pt-1 w-full gap-2">
              <a href="#" className="hover:text-purple-500 transition whitespace-nowrap">
                Forgot password?
              </a>
              <label className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-purple-500 focus:ring-purple-500"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* دکمه ورود */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2.5 md:py-3 rounded-lg shadow-md hover:opacity-90 transition text-sm md:text-base mt-2"
            >
              SIGN IN
            </button>

            <div className="flex items-center gap-3 my-3 md:my-4">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-slate-400 text-[10px] md:text-xs">or</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* دکمه ثبت‌نام (می‌رود به صفحه Register) */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-2.5 md:py-3 rounded-lg shadow-md hover:opacity-90 transition text-sm md:text-base"
            >
              SIGN UP
            </button>

          </form>
        </div>
      </div>

      {/* فوتر */}
      <div className="relative z-10 w-full bg-slate-50/90 py-4 md:py-6 mt-auto">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-slate-500 mb-3 md:mb-4 px-2 text-center">
          <a href="#" className="hover:text-purple-500">Google Play Store</a>
          <a href="#" className="hover:text-purple-500">App Store</a>
          <a href="#" className="hover:text-purple-500">About MyPatientHUB</a>
          <a href="#" className="hover:text-purple-500">About Us</a>
          <a href="#" className="hover:text-purple-500">Our Blog</a>
        </div>
        
        <p className="text-center text-[10px] md:text-xs text-slate-400">Copyright © 2026 MyPiHUB.</p>
      </div>

    </div>
  );
};

export default Login;