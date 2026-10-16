import React, { useEffect, useRef } from "react";
import { Image } from "@/components/ui/image";
import { useLang } from "@/lib/i18n";

export default function CityList({ cities, selId, onPick, className = "" }) {
  const { t, loc } = useLang();
  const listRef = useRef(null);

  // Scroll only the list (never the page) so the selected city is visible.
  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector('[data-active="true"]');
    if (list && active) list.scrollTo({ top: active.offsetTop - 8, behavior: "smooth" });
  }, [selId]);

  if (!cities.length) {
    return <div className={`rounded-3xl border border-black/5 bg-white p-6 text-center text-sm text-muted-foreground ${className}`}>{t("map_none")}</div>;
  }
  return (
    <div className={`lg:relative ${className}`}>
      <ul ref={listRef} className="relative grid max-h-72 gap-2 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:absolute lg:inset-0 lg:max-h-none lg:grid-cols-1 lg:content-start">
        {cities.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              data-active={selId === c.id}
              onClick={() => onPick(c.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-start transition ${selId === c.id ? "border-ochre bg-ochre/10 shadow-sm" : "border-black/5 bg-white hover:border-ochre/50"}`}
            >
              <Image src={c.img} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
              <span className="min-w-0">
                <span className="block truncate font-display text-xl leading-tight">{loc(c.name)}</span>
                <span className="block truncate text-xs text-muted-foreground">{loc(c.tag)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
