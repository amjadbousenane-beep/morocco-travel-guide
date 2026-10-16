import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { Plus, Minus, Maximize2 } from "lucide-react";
import { MOROCCO_BOUNDS } from "@/components/map/mapConfig";
import { useLang } from "@/lib/i18n";

const btn = "grid h-10 w-10 place-items-center text-ink transition hover:bg-sand focus-visible:bg-sand";

export default function ZoomControls() {
  const map = useMap();
  const { t } = useLang();
  const ref = useRef(null);

  useEffect(() => {
    L.DomEvent.disableClickPropagation(ref.current);
    L.DomEvent.disableScrollPropagation(ref.current);
  }, []);

  return (
    <div ref={ref} className="map-zoom absolute end-3 top-3 z-[800] flex flex-col divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white/95 shadow-lg backdrop-blur">
      <button type="button" aria-label={t("map_zoomIn")} onClick={() => map.zoomIn()} className={btn}><Plus className="h-5 w-5" /></button>
      <button type="button" aria-label={t("map_zoomOut")} onClick={() => map.zoomOut()} className={btn}><Minus className="h-5 w-5" /></button>
      <button
        type="button"
        aria-label={t("map_reset")}
        onClick={() => { map.closePopup(); map.flyToBounds(MOROCCO_BOUNDS, { padding: [24, 24], duration: 0.8 }); }}
        className={btn}
      >
        <Maximize2 className="h-4 w-4" />
      </button>
    </div>
  );
}
