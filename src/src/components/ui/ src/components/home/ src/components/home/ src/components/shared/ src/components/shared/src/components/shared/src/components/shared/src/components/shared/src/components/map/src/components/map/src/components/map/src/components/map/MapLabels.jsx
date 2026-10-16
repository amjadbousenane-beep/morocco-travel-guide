import React, { useMemo } from "react";
import L from "leaflet";
import { Marker } from "react-leaflet";
import { MAP_LABELS } from "@/components/map/mapConfig";
import { useLang } from "@/lib/i18n";

export default function MapLabels() {
  const { loc } = useLang();
  const labels = useMemo(
    () => MAP_LABELS.map((l) => ({
      ...l,
      icon: L.divIcon({ className: `map-label map-label-${l.cls}`, html: `<span>${loc(l.text)}</span>`, iconSize: [0, 0] }),
    })),
    [loc]
  );
  return labels.map((l) => (
    <Marker key={l.id} position={l.pos} icon={l.icon} interactive={false} keyboard={false} zIndexOffset={-1000} />
  ));
}
