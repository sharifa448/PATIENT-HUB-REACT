import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  calendarAppointments,
  monthlyData,
  previousAppointments,
  upcomingAppointments,
  proceduresData,
  treatmentsData,
} from "../data/Appointment.jsx";
import {
  TrendingUp, Calendar as CalendarIcon, List, Plus, MoreVertical,
  ChevronLeft, ChevronRight, X, AlertCircle
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [activeRange, setActiveRange] = useState('days');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ doctorName: '', date: '', time: '', type: 'In-person' });
  const [errors, setErrors] = useState({});

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleDayClick = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (clickedDate < today) {
      alert("Cannot book an appointment in the past.");
      return;
    }

    const formattedDate = `${clickedDate.getFullYear()}-${String(clickedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    setFormData({ ...formData, date: formattedDate });
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.doctorName.trim()) newErrors.doctorName = 'Doctor name is required';
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(formData.date) < today) newErrors.date = 'Date cannot be in the past';
    }
    if (!formData.time) newErrors.time = 'Time is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      alert("Appointment booked successfully!");
      setIsModalOpen(false);
      setFormData({ doctorName: '', date: '', time: '', type: 'In-person' });
    } else {
      setErrors(validationErrors);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const isPastDay = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(year, month, day) < today;
  };

  return (
    <DashboardLayout title="Appointment">

      <div className="flex justify-center mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-2 flex gap-2 border border-slate-100 dark:border-slate-700">
          <button onClick={() => setActiveTab('appointments')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'appointments' ? 'bg-white dark:bg-slate-700 shadow-sm text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-300'}`}>
            <CalendarIcon className="w-4 h-4" /> Appointments
          </button>
          <button onClick={() => { setActiveTab('booking'); setIsModalOpen(true); }} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'booking' ? 'bg-white dark:bg-slate-700 shadow-sm text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-300'}`}>
            <List className="w-4 h-4" /> New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <StatCard title="Procedures Taken" value={30} change="+3" data={proceduresData} />
        <StatCard title="Treatments Taken" value={12} change="+1" data={treatmentsData} />
        <button onClick={() => setIsModalOpen(true)} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col items-center justify-center hover:shadow-md transition-all min-h-[180px]">
          <div className="w-12 h-12 bg-purple-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3 text-purple-600 dark:text-purple-400">
            <Plus className="w-6 h-6" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white text-lg">New Appointment</p>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{monthNames[month]} {year}</h3>
            <div className="flex gap-2">
              <button onClick={goToToday} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300">today</button>
              <button onClick={prevMonth} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg"><ChevronLeft className="w-4 h-4 text-slate-700 dark:text-slate-300" /></button>
              <button onClick={nextMonth} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg"><ChevronRight className="w-4 h-4 text-slate-700 dark:text-slate-300" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((d) => (<div key={d} className="text-center text-xs font-bold text-slate-400 py-2">{d}</div>))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (<div key={`empty-${i}`} className="min-h-[80px] p-2 border-t border-slate-50 dark:border-slate-700/50"></div>))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isPast = isPastDay(day);
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
              return (
                <div key={day} onClick={() => handleDayClick(day)} className={`min-h-[80px] p-2 border-t border-slate-100 dark:border-slate-700 transition ${isPast ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'}`}>
                  <p className={`text-sm mb-1 flex justify-center w-7 h-7 items-center rounded-full ${isToday ? 'bg-purple-500 text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}>{day}</p>
                  <div className="space-y-1">
                    {calendarAppointments[day]?.map((apt, i) => (
                      <div key={i} className="text-[10px] text-white font-semibold px-2 py-1 rounded truncate" style={{ backgroundColor: apt.color }}>{apt.label}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <BarChartCard data={monthlyData} />

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-5">Previous Appointments</h3>
            <AppointmentsListInner items={previousAppointments} />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Up Coming Appointments</h3>
            <div className="bg-cyan-50 dark:bg-slate-700 rounded-xl p-1 flex gap-1 mb-5">
              {['days', 'months', 'years'].map((r) => (
                <button key={r} onClick={() => setActiveRange(r)} className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize ${activeRange === r ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{r}</button>
              ))}
            </div>
            <AppointmentsListInner items={upcomingAppointments} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Book New Appointment</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4" noValidate>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Doctor Name</label>
                <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} placeholder="e.g. Dr. Ahmad Faizal" className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 ${errors.doctorName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-purple-500'}`} />
                {errors.doctorName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.doctorName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 ${errors.date ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-purple-500'}`} />
                {errors.date && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 ${errors.time ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-600 focus:ring-purple-500'}`} />
                {errors.time && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.time}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Appointment Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 border-slate-200 dark:border-slate-600 focus:ring-purple-500">
                  <option value="In-person">In-person</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition mt-4">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

const StatCard = ({ title, value, change, data }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
    <div className="flex justify-between items-center mb-3">
      <p className="text-slate-500 dark:text-slate-400 text-sm">{title}</p>
      <TrendingUp className="w-4 h-4 text-slate-400" />
    </div>
    <div className="flex items-baseline gap-2 mb-4">
      <span className="text-3xl font-bold text-slate-800 dark:text-white">{value}</span>
      <span className="text-sm font-bold text-green-500">{change}</span>
    </div>
    <div className="h-24 -mx-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
          <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const BarChartCard = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chartRef = useRef(null);

  const downloadCSV = () => {
    const headers = ['Month', 'Emergency', 'Examination', 'Consultation', 'Routine'];
    const csvRows = [headers.join(',')];
    data.forEach(row => {
      csvRows.push([row.month, row.emergency, row.examination, row.consultation, row.routine].join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointments.csv';
    a.click();
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  const downloadImage = (format) => {
    const svg = chartRef.current?.querySelector('svg');
    if (!svg) return;

    if (format === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'appointments.svg';
      a.click();
      URL.revokeObjectURL(url);
      setIsMenuOpen(false);
    } else if (format === 'png') {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngFile;
        a.download = 'appointments.png';
        a.click();
        setIsMenuOpen(false);
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 relative">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-800 dark:text-white">Appointment</h3>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl z-50 py-1">
              <button onClick={() => downloadImage('svg')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">Download SVG</button>
              <button onClick={() => downloadImage('png')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">Download PNG</button>
              <button onClick={downloadCSV} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">Download CSV</button>
            </div>
          )}
        </div>
      </div>

      <div className="h-56" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
            <Bar dataKey="emergency" stackId="a" fill="#3b82f6" />
            <Bar dataKey="examination" stackId="a" fill="#22c55e" />
            <Bar dataKey="consultation" stackId="a" fill="#f59e0b" />
            <Bar dataKey="routine" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-blue-500"></span><span className="text-slate-600 dark:text-slate-300">Emergency</span>
          <span className="w-3 h-3 rounded bg-green-500 ml-4"></span><span className="text-slate-600 dark:text-slate-300">Examination</span>
        </div>
        <div className="flex items-center gap-2 ml-6">
          <span className="w-3 h-3 rounded bg-amber-500"></span><span className="text-slate-600 dark:text-slate-300">Consultation</span>
        </div>
        <div className="flex items-center gap-2 ml-6">
          <span className="w-3 h-3 rounded bg-red-500"></span><span className="text-slate-600 dark:text-slate-300">Routine Checkup</span>
        </div>
      </div>
    </div>
  );
};

// ✅ این کامپوننت حالا منوی کشویی داره
const AppointmentsListInner = ({ items }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // بستن منو وقتی بیرون کلیک می‌شه
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((apt) => (
        <div key={apt.id} className="flex items-center gap-3 relative">
          <img src={apt.avatar} alt={apt.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{apt.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">{apt.type}</p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-right whitespace-pre-line flex-shrink-0">{apt.date}</p>
          
          {/* دکمه سه نقطه با منو */}
          <div className="relative" ref={openMenuId === apt.id ? menuRef : null}>
            <button onClick={() => toggleMenu(apt.id)} className="text-slate-400 p-1 hover:text-slate-600 dark:hover:text-slate-200 transition">
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {openMenuId === apt.id && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl z-50 py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">Action</button>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">Another action</button>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">Something else here</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointments;