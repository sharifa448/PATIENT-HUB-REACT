import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, User, Stethoscope, Building2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  
  // 1: ورود، 2: انتخاب نقش، 3: مشخصات
  const [step, setStep] = useState(1); 
  
  // استیت‌های مرحله 1
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [authData, setAuthData] = useState({ contact: '', password: '' });
  const [authErrors, setAuthErrors] = useState({});
  const [isSliderVerified, setIsSliderVerified] = useState(false);

  // استیت‌های مرحله 2
  const [role, setRole] = useState(''); 

  // استیت‌های مرحله 3 (اطلاعات تکمیلی)
  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', address: '', birthMonth: '', birthDay: '', birthYear: '',
    bloodGroup: '', gender: '', specialty: '', clinicType: '', extraPhone: '', extraEmail: '', hospitalName: ''
  });
  const [profileErrors, setProfileErrors] = useState({});

  // ================== دیتای تاریخ تولد ==================
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1 تا 31
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // 100 سال اخیر

  // ================== توابع تغییرات ==================
  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
    if (authErrors[e.target.name]) setAuthErrors({ ...authErrors, [e.target.name]: '' });
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    if (profileErrors[e.target.name]) setProfileErrors({ ...profileErrors, [e.target.name]: '' });
  };

  const toggleMode = () => {
    setIsEmailMode(!isEmailMode);
    setAuthData({ contact: '', password: '' });
    setAuthErrors({});
    setIsSliderVerified(false);
  };

  // ================== اعتبارسنجی‌ها (Validation) ==================
  const validateStep1 = () => {
    const newErrors = {};
    if (!authData.contact.trim()) {
      newErrors.contact = isEmailMode ? 'Email is required' : 'Phone number is required';
    } else if (isEmailMode && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authData.contact)) {
      newErrors.contact = 'Please enter a valid email address';
    } else if (!isEmailMode && !/^\+?[0-9]{7,15}$/.test(authData.contact)) {
      newErrors.contact = 'Please enter a valid phone number (7-15 digits)';
    }

    if (!authData.password) {
      newErrors.password = 'Password is required';
    } else if (authData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isSliderVerified) {
      newErrors.slider = isEmailMode ? 'Please confirm your email' : 'Please slide for SMS code';
    }

    setAuthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (role !== 'hospital') {
      if (!profileData.firstName.trim()) newErrors.firstName = 'First name is required';
      else if (profileData.firstName.length < 2) newErrors.firstName = 'Name too short';

      if (!profileData.lastName.trim()) newErrors.lastName = 'Last name is required';
      else if (profileData.lastName.length < 2) newErrors.lastName = 'Name too short';

      if (!profileData.birthMonth) newErrors.birthMonth = 'Required';
      if (!profileData.birthDay) newErrors.birthDay = 'Required';
      if (!profileData.birthYear) newErrors.birthYear = 'Required';

      if (!profileData.address.trim()) newErrors.address = 'Address is required';

      if (!profileData.bloodGroup) newErrors.bloodGroup = 'Required';
      if (!profileData.gender) newErrors.gender = 'Required';
    }

    if (role === 'doctor' && !profileData.specialty) {
      newErrors.specialty = 'Specialty is required';
    }

    if (role === 'hospital') {
      if (!profileData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required';
      if (!profileData.address.trim()) newErrors.address = 'Address is required';
      if (!profileData.clinicType) newErrors.clinicType = 'Clinic type is required';
      
      if (profileData.extraPhone && !/^\+?[0-9]{7,15}$/.test(profileData.extraPhone)) {
        newErrors.extraPhone = 'Invalid phone number';
      }
      if (profileData.extraEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.extraEmail)) {
        newErrors.extraEmail = 'Invalid email address';
      }
    }

    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================== سابمیت فرم‌ها ==================
  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    setStep(3);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative font-sans bg-slate-50">
      
      {/* پس‌زمینه */}
      <div className="absolute top-0 w-full h-[300px] z-0">
        <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80" alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-purple-900/30"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-20">
        
        {/* ======================= مرحله ۱ ======================= */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] p-6 md:p-8 mt-12">
            <h2 className="text-xl font-bold text-center text-slate-800 mb-6">Register with</h2>

            <div className="flex justify-center gap-4 mb-6">
              <button type="button" className="w-14 h-14 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </button>
              <button type="button" className="w-14 h-14 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center justify-center transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-slate-400 text-sm">or</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-4" noValidate>
              <div>
                <input type={isEmailMode ? "email" : "text"} name="contact" value={authData.contact} onChange={handleAuthChange} placeholder={isEmailMode ? "Enter Email" : "Phone number"} className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 ${authErrors.contact ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                {authErrors.contact && <p className="text-red-500 text-xs mt-1">{authErrors.contact}</p>}
              </div>
              <div>
                <input type="password" name="password" value={authData.password} onChange={handleAuthChange} placeholder="Password" className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 ${authErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                {authErrors.password && <p className="text-red-500 text-xs mt-1">{authErrors.password}</p>}
              </div>
              
              <div>
                <div className={`relative h-12 rounded-full flex items-center px-1 overflow-hidden transition-colors ${isSliderVerified ? 'bg-green-50' : 'bg-slate-100'} ${authErrors.slider ? 'border border-red-500' : ''}`}>
                  <input type="range" min="0" max="100" onChange={(e) => { if (e.target.value > 90) setIsSliderVerified(true); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white transition-all z-10 ${isSliderVerified ? 'bg-green-500 ml-[calc(100%-40px)]' : 'bg-blue-500 ml-0'}`}>
                    {isSliderVerified ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                  <span className={`absolute left-14 text-sm font-medium ${isSliderVerified ? 'text-green-600' : 'text-slate-400'}`}>{isSliderVerified ? 'Verified successfully' : (isEmailMode ? 'Email confirmation' : 'Slide for SMS code')}</span>
                </div>
                {authErrors.slider && <p className="text-red-500 text-xs mt-1">{authErrors.slider}</p>}
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition mt-2">SIGN UP</button>
              
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-slate-200"></div><span className="text-slate-400 text-xs">or</span><div className="flex-1 h-px bg-slate-200"></div>
              </div>
              <button type="button" onClick={toggleMode} className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition">
                {isEmailMode ? 'SIGN UP WITH NUMBER' : 'SIGN UP WITH EMAIL'}
              </button>
            </form>
          </div>
        )}

        {/* ======================= مرحله ۲ ======================= */}
        {step === 2 && (
          <div className="w-full max-w-3xl text-center mt-12">
            <h2 className="text-2xl font-bold text-white mb-8 drop-shadow-md">Register As..</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button onClick={() => handleSelectRole('patient')} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center gap-4 w-full md:w-48">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-500"><User className="w-10 h-10" /></div>
                <span className="text-lg font-bold text-slate-800">Patient</span>
              </button>
              <button onClick={() => handleSelectRole('doctor')} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center gap-4 w-full md:w-48">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500"><Stethoscope className="w-10 h-10" /></div>
                <span className="text-lg font-bold text-slate-800">Doctor</span>
              </button>
              <button onClick={() => handleSelectRole('hospital')} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center gap-4 w-full md:w-48">
                <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-500"><Building2 className="w-10 h-10" /></div>
                <span className="text-lg font-bold text-slate-800">Hospital</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================= مرحله ۳ ======================= */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-10 mt-8">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
              {role === 'patient' ? 'Patient Registration' : role === 'doctor' ? 'Doctor Registration' : 'Hospital Registration'}
            </h2>
            <p className="text-slate-500 text-center text-sm mb-8">Please fill in the following info to create your account.</p>

            <form onSubmit={handleFinalSubmit} className="space-y-5" noValidate>
              
              {/* ✅ فرم بیمار و دکتر */}
              {role !== 'hospital' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                      <input type="text" name="firstName" value={profileData.firstName} onChange={handleProfileChange} placeholder="Eg. Michael" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm ${profileErrors.firstName ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                      {profileErrors.firstName && <p className="text-red-500 text-xs mt-1">{profileErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                      <input type="text" name="lastName" value={profileData.lastName} onChange={handleProfileChange} placeholder="Eg. Tomson" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm ${profileErrors.lastName ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                      {profileErrors.lastName && <p className="text-red-500 text-xs mt-1">{profileErrors.lastName}</p>}
                    </div>
                  </div>
                  
                  {/* تاریخ تولد با تمام ماه‌ها و روزها و سال‌ها */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Birth Date</label>
                    <div className="grid grid-cols-3 gap-4">
                      {/* ماه‌ها */}
                      <div>
                        <select name="birthMonth" value={profileData.birthMonth} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.birthMonth ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                          <option value="">Month</option>
                          {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                          ))}
                        </select>
                        {profileErrors.birthMonth && <p className="text-red-500 text-[10px] mt-1">{profileErrors.birthMonth}</p>}
                      </div>
                      {/* روزها */}
                      <div>
                        <select name="birthDay" value={profileData.birthDay} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.birthDay ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                          <option value="">Day</option>
                          {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        {profileErrors.birthDay && <p className="text-red-500 text-[10px] mt-1">{profileErrors.birthDay}</p>}
                      </div>
                      {/* سال‌ها */}
                      <div>
                        <select name="birthYear" value={profileData.birthYear} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.birthYear ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                          <option value="">Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        {profileErrors.birthYear && <p className="text-red-500 text-[10px] mt-1">{profileErrors.birthYear}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">My Address</label>
                      <input type="text" name="address" value={profileData.address} onChange={handleProfileChange} placeholder="Choose Location" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm ${profileErrors.address ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                      {profileErrors.address && <p className="text-red-500 text-xs mt-1">{profileErrors.address}</p>}
                    </div>
                    
                    {role === 'doctor' ? (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Speciality</label>
                        <select name="specialty" value={profileData.specialty} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.specialty ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                          <option value="">Select Specialty</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Pediatrics">Pediatrics</option>
                        </select>
                        {profileErrors.specialty && <p className="text-red-500 text-xs mt-1">{profileErrors.specialty}</p>}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                        <select name="bloodGroup" value={profileData.bloodGroup} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.bloodGroup ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                          <option value="">Select</option>
                          <option value="A+">A+</option><option value="A-">A-</option>
                          <option value="B+">B+</option><option value="B-">B-</option>
                          <option value="O+">O+</option><option value="O-">O-</option>
                          <option value="AB+">AB+</option><option value="AB-">AB-</option>
                        </select>
                        {profileErrors.bloodGroup && <p className="text-red-500 text-xs mt-1">{profileErrors.bloodGroup}</p>}
                      </div>
                    )}

                    {role === 'doctor' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                        <select name="bloodGroup" value={profileData.bloodGroup} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.bloodGroup ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                          <option value="">Select</option>
                          <option value="A+">A+</option><option value="B+">B+</option><option value="O+">O+</option>
                        </select>
                        {profileErrors.bloodGroup && <p className="text-red-500 text-xs mt-1">{profileErrors.bloodGroup}</p>}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">I'm</label>
                      <select name="gender" value={profileData.gender} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.gender ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {profileErrors.gender && <p className="text-red-500 text-xs mt-1">{profileErrors.gender}</p>}
                    </div>
                  </div>
                </>
              )}

              {/* ✅ فرم بیمارستان */}
              {role === 'hospital' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input type="text" name="hospitalName" value={profileData.hospitalName} onChange={handleProfileChange} placeholder="Eg. Klinik Pakar" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm ${profileErrors.hospitalName ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                      {profileErrors.hospitalName && <p className="text-red-500 text-xs mt-1">{profileErrors.hospitalName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                      <input type="text" name="address" value={profileData.address} onChange={handleProfileChange} placeholder="Choose Location" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm ${profileErrors.address ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                      {profileErrors.address && <p className="text-red-500 text-xs mt-1">{profileErrors.address}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Select Clinic Type</label>
                      <select name="clinicType" value={profileData.clinicType} onChange={handleProfileChange} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm text-slate-500 ${profileErrors.clinicType ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`}>
                        <option value="">Select Type</option>
                        <option value="GP">GP</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Dental">Dental</option>
                      </select>
                      {profileErrors.clinicType && <p className="text-red-500 text-xs mt-1">{profileErrors.clinicType}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Phone Number</label>
                      <input type="text" name="extraPhone" value={profileData.extraPhone} onChange={handleProfileChange} placeholder="Phone #" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm ${profileErrors.extraPhone ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                      {profileErrors.extraPhone && <p className="text-red-500 text-xs mt-1">{profileErrors.extraPhone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Email</label>
                      <input type="email" name="extraEmail" value={profileData.extraEmail} onChange={handleProfileChange} placeholder="Email" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-sm ${profileErrors.extraEmail ? 'border-red-500' : 'border-slate-200 focus:ring-purple-500'}`} />
                      {profileErrors.extraEmail && <p className="text-red-500 text-xs mt-1">{profileErrors.extraEmail}</p>}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center pt-8 mt-8">
                <button type="button" onClick={() => setStep(2)} className="text-slate-500 font-medium hover:text-slate-800 transition">Back</button>
                <button type="submit" className="bg-slate-800 text-white font-bold py-3 px-12 rounded-lg shadow-md hover:bg-slate-900 transition">NEXT</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Register;