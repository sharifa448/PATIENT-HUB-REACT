import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons not showing in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ✅ این کامپوننت جدید باعث می‌شه نقشه با هر جستجو به مقصد پرواز کنه
const MapUpdater = ({ clinics }) => {
  const map = useMap();

  useEffect(() => {
    if (clinics && clinics.length > 0) {
      if (clinics.length === 1) {
        // اگر فقط یک نتیجه پیدا شد، روی همون زوم کن
        map.flyTo([clinics[0].lat, clinics[0].lng], 15, { duration: 1.5 });
      } else {
        // اگر چند نتیجه بود، نقشه رو طوری تنظیم کن که همه دیده بشن
        const bounds = L.latLngBounds(clinics.map(c => [c.lat, c.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else {
      // اگر هیچی پیدا نشد، برگرد به مرکز کابل
      map.flyTo([34.5553, 69.2075], 11, { duration: 1.5 });
    }
  }, [clinics, map]);

  return null;
};

const MapView = ({ clinics }) => {
  // ✅ مرکز پیش‌فرض نقشه رو به کابل تغییر دادم
  const defaultCenter = [34.5553, 69.2075];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-2" style={{ height: '600px' }}>
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* ✅ اضافه کردن MapUpdater به نقشه */}
        <MapUpdater clinics={clinics} />

        {clinics.map((clinic) => (
          <Marker key={clinic.id} position={[clinic.lat, clinic.lng]}>
            <Popup>
              <div className="text-sm">
                <strong className="block mb-1">{clinic.name}</strong>
                <p className="text-xs text-gray-600 mb-1">{clinic.address}</p>
                <p className="text-xs text-gray-500">{clinic.phone}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;