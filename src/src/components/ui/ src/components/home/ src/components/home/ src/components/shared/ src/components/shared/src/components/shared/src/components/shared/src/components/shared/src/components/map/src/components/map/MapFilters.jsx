import React from "react";
import { Search, X } from "lucide-react";
import { MAP_FILTERS } from "@/components/map/mapConfig";
import { useLang } from "@/lib/i18n";

export default function MapFilters({ query, onQuery, filter, onFilter, onSubmit, className = "" }) {
  const { t } = useLang();
  return (
    <div className={`flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${className}`}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="relative w-full md:max-w-sm">
        <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          inputMode="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={t("map_search")}
          aria-label={t("map_search")}
          className="h-12 w-full rounded-full border border-black/10 bg-white ps-11 pe-11 text-sm shadow-sm outline-none transition focus:border-ochre focus:ring-2 focus:ring-ochre/30"
        />
        {query && (
          <button type="button" aria-label={t("map_clear")} onClick={() => onQuery("")} className="absolute end-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full transition hover:bg-sand">
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {MAP_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => onFilter(f.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${filter === f.id ? "border-ink bg-ink text-white" : "border-black/10 bg-white hover:border-ochre hover:text-ochre"}`}
          >
            {t(f.key)}
          </button>
        ))}
      </div>
    </div>
  );
}
