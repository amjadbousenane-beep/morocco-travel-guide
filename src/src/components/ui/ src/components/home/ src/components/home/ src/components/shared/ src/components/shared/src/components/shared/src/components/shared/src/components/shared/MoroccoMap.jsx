import React, { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CITIES } from "@/data/cities";
import { MAP_FILTERS, MAX_BOUNDS, MOROCCO_BOUNDS, matchesQuery } from "@/components/map/mapConfig";
import MapFilters from "@/components/map/MapFilters";
import MapLand from "@/components/map/MapLand";
import MapLabels from "@/components/map/MapLabels";
import CityPin from "@/components/map/CityPin";
import CityList from "@/components/map/CityList";
import ZoomControls from "@/components/map/ZoomControls";
import MapController from "@/components/map/MapController";

export default function MoroccoMap({ height = "h-[560px] md:h-[600px] lg:h-[680px]" }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selId, setSelId] = useState(null);
  const mapBox = useRef(null);

  const visible = useMemo(() => {
    const f = MAP_FILTERS.find((x) => x.id === filter);
    return CITIES.filter((c) => f.test(c) && matchesQuery(c, query));
  }, [filter, query]);
  const visibleIds = useMemo(() => visible.map((c) => c.id), [visible]);

  const changeQuery = (v) => { setQuery(v); setSelId(null); };
  const changeFilter = (v) => { setFilter(v); setSelId(null); };
  const closePin = useCallback((id) => setSelId((cur) => (cur === id ? null : cur)), []);
  const pick = (id) => {
    setSelId(id);
    if (window.matchMedia("(max-width: 1023px)").matches) mapBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
      <MapFilters
        className="order-1 lg:col-span-2"
        query={query}
        onQuery={changeQuery}
        filter={filter}
        onFilter={changeFilter}
        onSubmit={() => visible[0] && pick(visible[0].id)}
      />
      <div ref={mapBox} className={`relative isolate z-0 order-2 overflow-hidden rounded-3xl border border-black/5 shadow-sm lg:order-3 ${height}`}>
        <MapContainer
          bounds={MOROCCO_BOUNDS}
          boundsOptions={{ padding: [24, 24] }}
          maxBounds={MAX_BOUNDS}
          maxBoundsViscosity={0.8}
          minZoom={4}
          maxZoom={8}
          zoomSnap={0.25}
          zoomDelta={0.5}
          zoomControl={false}
          scrollWheelZoom={false}
          className="morocco-map map-sea h-full w-full"
        >
          <MapController selId={selId} visibleIds={visibleIds} />
          <MapLand />
          <MapLabels />
          {visible.map((c) => (
            <CityPin key={c.id} city={c} selected={selId === c.id} onSelect={setSelId} onClose={closePin} />
          ))}
          <ZoomControls />
        </MapContainer>
      </div>
      <CityList className="order-3 lg:order-2" cities={visible} selId={selId} onPick={pick} />
    </div>
  );
}
