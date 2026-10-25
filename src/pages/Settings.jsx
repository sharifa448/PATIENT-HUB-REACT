import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  User, List, Lock, Shield, Monitor, Trash2,
  Camera, Smartphone, Check
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // ✅ استیت‌های مربوط به پروفایل
  const [isInvisible, setIsInvisible] = useState(false);

  // ✅ استیت‌های مربوط به اطلاعات پایه
  const [basicInfo, setBasicInfo] = useState({
    firstName: 'Azam', lastName: 'Shah', gender: 'Male',
    email: 'example@email.com', bloodGroup: 'A+', location: 'Kabul, AF',
    phone: '+93 700 000 000', height: '180', weight: '75'
  });
  const [basicErrors, setBasicErrors] = useState({});

  // ✅ استیت‌های مربوط به رمز عبور
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passErrors, setPassErrors] = useState({});

  // ✅ استیت مربوط به حذف حساب
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const menuItems = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'basic', name: 'Basic Info', icon: List },
    { id: 'password', name: 'Change Password', icon: Lock },
    { id: '2fa', name: '2FA', icon: Shield },
    { id: 'sessions', name: 'Sessions', icon: Monitor },
    { id: 'delete', name: 'Delete Account', icon: Trash2 },
  ];

  // ================== هندلرهای اطلاعات پایه ==================
  const handleBasicChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
    if (basicErrors[e.target.name]) setBasicErrors({ ...basicErrors, [e.target.name]: '' });
  };

  const handleSaveBasic = (e) => {
    e.preventDefault();
    const errs = {};
    if (!basicInfo.firstName.trim()) errs.firstName = 'First name is required';
    if (!basicInfo.lastName.trim()) errs.lastName = 'Last name is required';
    if (!basicInfo.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!basicInfo.phone.trim()) errs.phone = 'Phone number is required';

    setBasicErrors(errs);

    if (Object.keys(errs).length === 0) {
      alert("✅ Basic Info saved successfully!");
    }
  };

  // ================== هندلرهای رمز عبور ==================
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    if (passErrors[e.target.name]) setPassErrors({ ...passErrors, [e.target.name]: '' });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const errs = {};
    if (!passwords.current) errs.current = 'Current password is required';
    if (passwords.new.length < 6) errs.new = 'Password must be at least 6 characters';
    if (passwords.new !== passwords.confirm) errs.confirm = 'Passwords do not match';

    setPassErrors(errs);

    if (Object.keys(errs).length === 0) {
      alert("🔒 Password updated successfully!");
      setPasswords({ current: '', new: '', confirm: '' }); // پاک کردن فرم
    }
  };

  // ================== هندلر حذف حساب ==================
  const handleDeleteAccount = () => {
    if (!deleteConfirm) {
      alert("⚠️ Please check the confirmation box first.");
      return;
    }
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone!")) {
      alert("🗑️ Account deleted permanently.");
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ================= سایدبار تنظیمات ================= */}
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-3 sticky top-24">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl mb-1 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ================= محتوای اصلی ================= */}
        <div className="lg:col-span-3">

          {/* ----------------- پروفایل ----------------- */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Profile</h2>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Azam Shah"
                    className="w-28 h-28 rounded-2xl object-cover"
                  />
                  <button 
                    onClick={() => alert("📷 Camera upload feature coming soon!")}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:opacity-90 transition"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                    Azam Shah
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">Patient</p>

                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Switch to invisible
                    </span>
                    {/* ✅ سوییچ واقعی */}
                    <button 
                      onClick={() => setIsInvisible(!isInvisible)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        isInvisible ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                        isInvisible ? 'right-0.5' : 'left-0.5'
                      }`}></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- اطلاعات پایه ----------------- */}
          {activeTab === 'basic' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Basic Info</h2>

              <form onSubmit={handleSaveBasic} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">First Name</label>
                  <input type="text" name="firstName" value={basicInfo.firstName} onChange={handleBasicChange} className={`w-full px-4 py-3 border rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none focus:ring-2 ${basicErrors.firstName ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                  {basicErrors.firstName && <p className="text-red-500 text-xs mt-1">{basicErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Last Name</label>
                  <input type="text" name="lastName" value={basicInfo.lastName} onChange={handleBasicChange} className={`w-full px-4 py-3 border rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none focus:ring-2 ${basicErrors.lastName ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                  {basicErrors.lastName && <p className="text-red-500 text-xs mt-1">{basicErrors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">I'm</label>
                  <select name="gender" value={basicInfo.gender} onChange={handleBasicChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2">
                    <option>Male</option><option>Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Email</label>
                  <input type="email" name="email" value={basicInfo.email} onChange={handleBasicChange} className={`w-full px-4 py-3 border rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none focus:ring-2 ${basicErrors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                  {basicErrors.email && <p className="text-red-500 text-xs mt-1">{basicErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Blood Group</label>
                  <input type="text" name="bloodGroup" value={basicInfo.bloodGroup} onChange={handleBasicChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Location</label>
                  <input type="text" name="location" value={basicInfo.location} onChange={handleBasicChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Phone</label>
                  <input type="text" name="phone" value={basicInfo.phone} onChange={handleBasicChange} className={`w-full px-4 py-3 border rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none focus:ring-2 ${basicErrors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                  {basicErrors.phone && <p className="text-red-500 text-xs mt-1">{basicErrors.phone}</p>}
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Height</label>
                    <input type="text" name="height" value={basicInfo.height} onChange={handleBasicChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Weight</label>
                    <input type="text" name="weight" value={basicInfo.weight} onChange={handleBasicChange} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none" />
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-end mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition">
                    SAVE CHANGES
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ----------------- تغییر رمز ----------------- */}
          {activeTab === 'password' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Change Password</h2>

              <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-lg">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Current Password</label>
                  <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="Enter current password" className={`w-full px-4 py-3 border rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none focus:ring-2 ${passErrors.current ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                  {passErrors.current && <p className="text-red-500 text-xs mt-1">{passErrors.current}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">New Password</label>
                  <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} placeholder="Enter new password" className={`w-full px-4 py-3 border rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none focus:ring-2 ${passErrors.new ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                  {passErrors.new && <p className="text-red-500 text-xs mt-1">{passErrors.new}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Confirm New Password</label>
                  <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} placeholder="Confirm password" className={`w-full px-4 py-3 border rounded-xl text-sm bg-transparent text-slate-800 dark:text-white outline-none focus:ring-2 ${passErrors.confirm ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                  {passErrors.confirm && <p className="text-red-500 text-xs mt-1">{passErrors.confirm}</p>}
                </div>

                <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white mb-3">Password requirements</h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> One special character</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Min 6 characters</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> One number</li>
                  </ul>
                </div>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition">
                    UPDATE PASSWORD
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ----------------- 2FA ----------------- */}
          {activeTab === '2fa' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Two-factor authentication</h2>
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">ENABLED</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                <div className="flex justify-between items-center gap-4 py-5">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">Security keys</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">No Security keys</p>
                  </div>
                  <button onClick={() => alert("🔑 Add Security Key modal would open here.")} className="border border-slate-300 dark:border-slate-600 hover:border-purple-500 hover:text-purple-500 px-5 py-2.5 rounded-xl text-sm font-semibold transition text-slate-800 dark:text-white">ADD</button>
                </div>
                <div className="flex justify-between items-center gap-4 py-5">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">SMS number</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">+93 700 000 000</p>
                  </div>
                  <button onClick={() => alert("📱 Edit SMS number modal would open here.")} className="border border-slate-300 dark:border-slate-600 hover:border-purple-500 hover:text-purple-500 px-5 py-2.5 rounded-xl text-sm font-semibold transition text-slate-800 dark:text-white">EDIT</button>
                </div>
                <div className="flex justify-between items-center gap-4 py-5">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">Authenticator app</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Not Configured</p>
                  </div>
                  <button onClick={() => alert("📲 Scan QR code to set up Authenticator app.")} className="border border-slate-300 dark:border-slate-600 hover:border-purple-500 hover:text-purple-500 px-5 py-2.5 rounded-xl text-sm font-semibold transition text-slate-800 dark:text-white">SET UP</button>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- Sessions ----------------- */}
          {activeTab === 'sessions' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Sessions</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">This is a list of devices that have logged into your account. Remove those that you do not recognize.</p>
              
              <div className="space-y-3">
                <SessionItem 
                  icon={<Monitor className="w-5 h-5" />} 
                  device="Kabul, Afghanistan" 
                  detail="Your current session" 
                  country="AF" 
                  active 
                />
                <SessionItem 
                  icon={<Monitor className="w-5 h-5" />} 
                  device="Chrome on Windows" 
                  country="US" 
                />
                <SessionItem 
                  icon={<Smartphone className="w-5 h-5" />} 
                  device="Safari on iPhone" 
                  country="AF" 
                />
              </div>
            </div>
          )}

          {/* ----------------- حذف حساب ----------------- */}
          {activeTab === 'delete' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Delete Account</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Once you delete your account, there is no going back. Please be certain.</p>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 accent-pink-500" 
                  />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">Confirm</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">I want to delete my account.</p>
                  </div>
                </label>

                <div className="flex gap-3">
                  <button onClick={() => alert("Account deactivated for 30 days.")} className="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-3 rounded-xl text-sm font-bold transition text-slate-800 dark:text-white">DEACTIVATE</button>
                  <button onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition">DELETE ACCOUNT</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const SessionItem = ({ icon, device, detail, country, active }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
    <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{device}</p>
      {detail && <p className="text-xs text-slate-500 dark:text-slate-400">{detail}</p>}
    </div>
    {active && <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-2 py-1 rounded">ACTIVE</span>}
    <span className="text-sm text-slate-500 dark:text-slate-400">{country}</span>
    <button onClick={() => alert(`Details for ${device}`)} className="text-cyan-500 text-sm font-medium hover:underline">See more →</button>
  </div>
);

export default Settings;