import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PopupChips from "@/components/map/PopupChips";
import { ATTRACTIONS } from "@/data/attractions";
import { dishesFor } from "@/data/food";
import { useLang } from "@/lib/i18n";

const ACT_ICON = { sightseeing: "🏛️", hiking: "🥾", water: "🏄", shopping: "🛍️", relaxation: "🧖", desert: "🐪" };

export default function CityPopup({ city }) {
  const { t, loc, lang } = useLang();
  const rtl = lang === "ar";
  const foods = dishesFor(city).slice(0, 3).map((f) => ({ key: f.id, text: loc(f.name) }));
  const acts = [...new Set(ATTRACTIONS.filter((a) => a.city === city.id).map((a) => a.act))]
    .slice(0, 4)
    .map((a) => ({ key: a, text: `${ACT_ICON[a] || ""} ${t("a_" + a)}` }));
  return (
    <div dir={rtl ? "rtl" : "ltr"} className="text-start">
      <div className="relative">
        <Image src={city.img} alt={`${loc(city.name)}, Morocco`} className="h-24 w-full object-cover" />
        <span className={`absolute bottom-2.5 start-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur ${rtl ? "" : "uppercase tracking-widest"}`}>
          {loc(city.tag)}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-display text-3xl font-light leading-none">{loc(city.name)}</h3>
          <div className="mt-2 line-clamp-3 text-[13px] leading-snug text-muted-foreground">{loc(city.desc)}</div>
        </div>
        <PopupChips label={t("map_food")} items={foods} />
        <PopupChips label={t("map_do")} items={acts} />
        <Link
          to={`/explore/${city.id}`}
          className="flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium !text-white transition hover:bg-ochre hover:!text-ink"
        >
          {t("exploreCity")}
          <ArrowRight className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`} />
        </Link>
      </div>
    </div>
  );
}
