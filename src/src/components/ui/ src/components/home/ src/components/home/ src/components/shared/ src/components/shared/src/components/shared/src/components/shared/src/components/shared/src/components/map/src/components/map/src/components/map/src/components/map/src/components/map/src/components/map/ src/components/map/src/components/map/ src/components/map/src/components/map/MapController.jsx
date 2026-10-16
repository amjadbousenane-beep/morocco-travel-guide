import { useEffect, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { CITIES } from "@/data/cities";
import { MOROCCO_BOUNDS } from "@/components/map/mapConfig";

const ATTRIBUTION = 'Map data &copy; <a href="https://www.naturalearthdata.com" target="_blank" rel="noopener noreferrer">Natural Earth</a>';
const LEAFLET = '<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>';

// Zoom-dependent label/pin sizing is done with CSS classes on the map container.
const syncZoomClasses = (map) => {
  const el = map.getContainer();
  const z = map.getZoom();
  el.classList.toggle("show-labels", z >= 6.5);
  el.classList.toggle("is-far", z < 5.75);
};

export default function MapController({ selId, visibleIds }) {
  const map = useMap();
  useMapEvents({
    zoomend: () => syncZoomClasses(map),
    popupopen: () => map.getContainer().classList.add("popup-open"),
    popupclose: () => map.getContainer().classList.remove("popup-open"),
  });

  useEffect(() => {
    syncZoomClasses(map);
    map.attributionControl.setPrefix(LEAFLET);
    map.attributionControl.addAttribution(ATTRIBUTION);
    return () => map.attributionControl.removeAttribution(ATTRIBUTION);
  }, [map]);

  // Glide to the selected city, leaving room above the pin for its popup.
  useEffect(() => {
    const city = CITIES.find((c) => c.id === selId);
    if (!city) return;
    const zoom = Math.max(map.getZoom(), 7);
    const size = map.getSize();
    const shift = Math.min(size.y - 40, 510) - size.y / 2;
    const target = map.unproject(map.project([city.lat, city.lon], zoom).subtract([0, shift]), zoom);
    map.flyTo(target, zoom, { duration: 0.8 });
  }, [selId, map]);

  // Re-fit the view when search / filters change which pins are shown.
  const key = visibleIds.join(",");
  const lastKey = useRef(key);
  useEffect(() => {
    if (lastKey.current === key) return;
    lastKey.current = key;
    const pts = CITIES.filter((c) => visibleIds.includes(c.id)).map((c) => [c.lat, c.lon]);
    if (!pts.length) return;
    if (pts.length === CITIES.length) map.flyToBounds(MOROCCO_BOUNDS, { padding: [24, 24], duration: 0.8 });
    else if (pts.length === 1) map.flyTo(pts[0], 8, { duration: 0.8 });
    else map.flyToBounds(pts, { padding: [70, 70], maxZoom: 8, duration: 0.8 });
  }, [key, map, visibleIds]);

  return null;
}
