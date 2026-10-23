import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ClinicCard from '../components/ClinicCard';
import MapView from '../components/MapView';
import { clinicsData } from '../data/clinic';
import { Search, Map, List, AlertCircle, MapPin } from 'lucide-react';

const FindClinic = () => {
  const [viewMode, setViewMode] = useState('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  
  // ✅ استیت برای موقعیت فعلی کاربر
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // ✅ منطق جستجو با toLowerCase و trim
  const filteredClinics = clinicsData.filter((clinic) => {
    const term = searchTerm.toLowerCase().trim();
    const zip = zipCode.toLowerCase().trim();
    
    if (!term && !zip) return true;

    const matchesSearch = 
      clinic.name.toLowerCase().trim().includes(term) || 
      clinic.address.toLowerCase().trim().includes(term) ||
      (clinic.zipCode && clinic.zipCode.toString().toLowerCase().trim().includes(zip));

    return matchesSearch;
  });

  const handleSearch = () => {
    if (!searchTerm.trim() && !zipCode.trim() && !userLocation) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
      // جستجو به صورت زنده (onChange) انجام می‌شود، این دکمه فقط برای تایید است
    }
  };

  // ✅ تابع پیدا کردن موقعیت فعلی (CURRENT)
  const handleCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setIsLocating(false);
          setShowValidation(false);
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Could not get your current location. Please check your browser permissions.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  return (
    <DashboardLayout title="Find a Clinic">
      <div className="bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500 rounded-xl p-8 mb-6 text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Find a Clinic</h1>
        <p className="text-center text-sm opacity-90 mb-6">
          Search Clinics and schedule an appointment with doctors through Clinic
        </p>

        <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowValidation(false);
            }}
            placeholder="Search"
            className="flex-1 px-4 py-3 rounded-lg text-sm text-gray-800 focus:outline-none"
          />
          
          <input
            type="text"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
              setShowValidation(false);
            }}
            placeholder="Zip Code or Neighborhood"
            className="flex-1 px-4 py-3 rounded-lg text-sm text-gray-800 focus:outline-none"
          />
          
          {/* ✅ دکمه CURRENT که موقعیت GPS را می‌گیرد */}
          <button 
            onClick={handleCurrentLocation}
            disabled={isLocating}
            className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition flex items-center justify-center gap-2"
          >
            {isLocating ? 'Locating...' : <><MapPin className="w-4 h-4"/> CURRENT</>}
          </button>
          
          <button 
            onClick={handleSearch}
            className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition"
          >
            SEARCH
          </button>
        </div>

        {showValidation && (
          <p className="text-center text-sm text-yellow-200 mt-3 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" /> Please enter a clinic name or zip code to search.
          </p>
        )}
      </div>

      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setViewMode('map')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition ${
            viewMode === 'map'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
              : 'bg-white text-gray-600 border'
          }`}
        >
          <Map className="w-4 h-4" /> Map
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm transition ${
            viewMode === 'list'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
              : 'bg-white text-gray-600 border'
          }`}
        >
          <List className="w-4 h-4" /> List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white rounded-xl shadow-sm p-5 h-fit">
          <h3 className="font-bold text-gray-700 mb-4">Filter By</h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Primary Care</label>
              <select className="w-full border rounded-lg p-2 text-sm">
                <option>All</option>
                <option>General</option>
                <option>Specialist</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Specialty</label>
              <select className="w-full border rounded-lg p-2 text-sm">
                <option>All</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Pediatrics</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Providers Who Treat</h4>
            <div className="space-y-1 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" /> All Ages</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Children</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Adults</label>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <p className="text-sm text-gray-500 mb-4">
            {filteredClinics.length} clinic(s) found
          </p>
          
          {filteredClinics.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-slate-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">No Clinics Found</h3>
              <p className="text-slate-500 text-sm max-w-md">
                We couldn't find any clinics matching your search. Please try a different name or zip code.
              </p>
            </div>
          ) : (
            viewMode === 'map' ? (
              // ✅ پاس دادن موقعیت کاربر به نقشه
              <MapView clinics={filteredClinics} userLocation={userLocation} />
            ) : (
              filteredClinics.map((clinic) => (
                <ClinicCard key={clinic.id} clinic={clinic} />
              ))
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FindClinic;