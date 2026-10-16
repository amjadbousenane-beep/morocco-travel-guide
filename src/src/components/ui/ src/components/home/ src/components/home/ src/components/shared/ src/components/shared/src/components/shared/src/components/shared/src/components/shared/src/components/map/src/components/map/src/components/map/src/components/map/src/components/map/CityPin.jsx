import React, { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import CityPopup from "@/components/map/CityPopup";
import { LABEL_LEFT } from "@/components/map/mapConfig";
import { useLang } from "@/lib/i18n";

export default function CityPin({ city, selected, onSelect, onClose }) {
  const { loc } = useLang();
  const ref = useRef(null);
  const name = loc(city.name);
  const icon = useMemo(
    () => L.divIcon({
      className: "city-pin" + (LABEL_LEFT.has(city.id) ? " is-left" : ""),
      html: `<span class="city-pin-dot"></span><span class="city-pin-label">${name}</span>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -16],
    }),
    [city.id, name]
  );

  // Keep the pin highlight and its popup in sync with the selected city (list click, search, marker click).
  useEffect(() => {
    const marker = ref.current;
    if (!marker) return;
    marker.getElement()?.classList.toggle("is-active", selected);
    if (selected && !marker.isPopupOpen()) marker.openPopup();
    if (!selected && marker.isPopupOpen()) marker.closePopup();
  }, [selected, icon]);

  return (
    <Marker
      ref={ref}
      position={[city.lat, city.lon]}
      icon={icon}
      zIndexOffset={selected ? 1000 : 0}
      alt={name}
      eventHandlers={{ popupopen: () => onSelect(city.id), popupclose: () => onClose(city.id) }}
    >
      <Popup className="map-popup" minWidth={300} maxWidth={300} autoPan={false}>
        <CityPopup city={city} />
      </Popup>
    </Marker>
  );
}
