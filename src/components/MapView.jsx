import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapUpdater = ({ clinics }) => {
  const map = useMap();

  useEffect(() => {
    // ✅ چک میکنیم که کلینیک‌ها وجود داشته باشن و حداقل یکی مختصات داشته باشه
    const validClinics = clinics.filter(c => c.lat && c.lng);

    if (validClinics.length > 0) {
      if (validClinics.length === 1) {
        map.flyTo([validClinics[0].lat, validClinics[0].lng], 14, { duration: 1.5 });
      } else {
        const bounds = L.latLngBounds(validClinics.map(c => [c.lat, c.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else {
      map.flyTo([34.5553, 69.2075], 12, { duration: 1.5 }); // اگر هیچ مختصاتی نبود، برو کابل
    }
  }, [clinics, map]);

  return null;
};

const MapView = ({ clinics }) => {
  const defaultCenter = [34.5553, 69.2075];

  // فیلتر کردن دکترهایی که مختصات دارن تا ارور ندن
  const validClinics = clinics.filter(c => c.lat && c.lng);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-2" style={{ height: '600px' }}>
      <MapContainer
        key={JSON.stringify(validClinics.map(c => c.id))} // ✅ این کلید جلوگیری از ارور initialized میکنه
        center={defaultCenter}
        zoom={12}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater clinics={validClinics} />

        {validClinics.map((clinic) => (
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