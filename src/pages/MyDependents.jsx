import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Check } from 'lucide-react';

const MyDependents = () => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    // مرحله ۱
    firstName: '',
    lastName: '',
    month: '',
    day: '',
    year: '',
    relation: '',
    gender: '',
    // مرحله ۲
    bloodType: '',
    allergies: '',
    conditions: '',
    // مرحله ۳ (طرح انتخابی)
    selectedPlan: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!form.firstName.trim()) newErrors.firstName = 'Required';
      if (!form.lastName.trim()) newErrors.lastName = 'Required';
      if (!form.month) newErrors.month = 'Required';
      if (!form.day) newErrors.day = 'Required';
      if (!form.year) newErrors.year = 'Required';
      if (!form.relation.trim()) newErrors.relation = 'Required';
      if (!form.gender) newErrors.gender = 'Required';
    } else if (step === 2) {
      if (!form.bloodType) newErrors.bloodType = 'Required';
      if (!form.allergies.trim()) newErrors.allergies = 'Required';
    } else if (step === 3) {
      if (!form.selectedPlan) newErrors.selectedPlan = 'Please select a plan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert(`Successfully registered! You chose the ${form.selectedPlan}.`);
      console.log("Final Data:", form);
    }
  };

  // ✅ دیتای طرح‌ها برای مرحله ۳
  const plans = [
    {
      name: 'Standard Plan',
      features: ['Detail One', 'Detail Two', 'Detail Three'],
    },
    {
      name: 'Premium Plan',
      features: ['Detail One', 'Detail Two', 'Detail Three'],
    },
    {
      name: 'Super Plan',
      features: ['Detail One', 'Detail Two', 'Detail Three'],
    },
  ];

  return (
    <DashboardLayout title="MyDependents">
      
      {/* ================= عنوان اصلی ================= */}
      <div className="text-center mb-12 mt-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
          Build Your Profile
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">
          This information will let us know more about your Family.
        </p>
      </div>

      {/* ================= نوار پیشرفت ================= */}
      <div className="flex items-start justify-center max-w-4xl mx-auto mb-12 px-4">
        <div className="flex flex-col items-center flex-shrink-0 w-32 md:w-40">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${step > 1 ? 'bg-green-500 text-white' : step === 1 ? 'bg-slate-800 dark:bg-purple-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
            {step > 1 ? <Check className="w-5 h-5" /> : '1'}
          </div>
          <p className={`text-xs text-center ${step >= 1 ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-400'}`}>Dependents Registration</p>
        </div>
        <div className={`flex-1 h-0.5 mt-4 ${step > 1 ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
        <div className="flex flex-col items-center flex-shrink-0 w-32 md:w-40">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${step > 2 ? 'bg-green-500 text-white' : step === 2 ? 'bg-slate-800 dark:bg-purple-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
            {step > 2 ? <Check className="w-5 h-5" /> : '2'}
          </div>
          <p className={`text-xs text-center ${step >= 2 ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-400'}`}>Dependents Health Records</p>
        </div>
        <div className={`flex-1 h-0.5 mt-4 ${step > 2 ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
        <div className="flex flex-col items-center flex-shrink-0 w-32 md:w-40">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${step === 3 ? 'bg-slate-800 dark:bg-purple-600 text-white' : 'bg-slate-200 text-slate-400'}`}>3</div>
          <p className={`text-xs text-center ${step >= 3 ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-400'}`}>Family Care Plan</p>
        </div>
      </div>

      {/* ================= کارت فرم ================= */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 md:p-12 max-w-5xl mx-auto">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* مرحله ۱ */}
          {step === 1 && (
            <>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Basic Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">First Name</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Eg. Michael" className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.firstName ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">Last Name</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Eg. Tomson" className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.lastName ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <select name="month" value={form.month} onChange={handleChange} className={`w-full px-3 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.month ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}>
                  <option value="">Month</option>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select name="day" value={form.day} onChange={handleChange} className={`w-full px-3 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.day ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}>
                  <option value="">Day</option>{Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                </select>
                <select name="year" value={form.year} onChange={handleChange} className={`w-full px-3 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.year ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}>
                  <option value="">Year</option>{Array.from({ length: 100 }, (_, i) => <option key={new Date().getFullYear() - i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">Relation</label>
                  <input type="text" name="relation" value={form.relation} onChange={handleChange} placeholder="Eg. Brother, Child" className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.relation ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.gender ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}>
                    <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* مرحله ۲ */}
          {step === 2 && (
            <>
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Health Records</h2>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">Blood Type</label>
                <select name="bloodType" value={form.bloodType} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.bloodType ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`}>
                  <option value="">Select Blood Type</option><option value="A+">A+</option><option value="O+">O+</option><option value="B+">B+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">Allergies</label>
                <input type="text" name="allergies" value={form.allergies} onChange={handleChange} placeholder="Or write None" className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm dark:text-white ${errors.allergies ? 'border-red-500' : 'border-slate-200 dark:border-slate-600'}`} />
              </div>
            </>
          )}

          {/* ================= مرحله ۳: انتخاب طرح (مطابق عکس) ================= */}
          {step === 3 && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Family Care Plan</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Select the plan that fits your family's needs.</p>
                {errors.selectedPlan && <p className="text-red-500 text-sm mt-2 bg-red-50 dark:bg-red-900/30 inline-block px-4 py-1 rounded-full">{errors.selectedPlan}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => {
                  const isSelected = form.selectedPlan === plan.name;
                  return (
                    <div 
                      key={index}
                      onClick={() => {
                        setForm({ ...form, selectedPlan: plan.name });
                        setErrors({ ...errors, selectedPlan: '' });
                      }}
                      className={`cursor-pointer rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                        isSelected 
                          ? 'bg-white dark:bg-slate-700 shadow-xl border-2 border-purple-500 scale-105' 
                          : 'bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                        {plan.name}
                      </h3>
                      <ul className="space-y-4 flex-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                            <Check className="w-5 h-5 text-pink-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ================= دکمه‌ها ================= */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-700 mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
              >
                BACK
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-slate-800 hover:bg-slate-900 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-12 py-3 rounded-lg text-sm font-bold tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                NEXT
              </button>
            ) : (
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-12 py-3 rounded-lg text-sm font-bold tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                SEND
              </button>
            )}
          </div>

        </form>
      </div>

    </DashboardLayout>
  );
};

export default MyDependents;