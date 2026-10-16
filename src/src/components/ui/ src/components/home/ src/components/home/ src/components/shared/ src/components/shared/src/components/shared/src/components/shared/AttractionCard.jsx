import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Mountain, ExternalLink } from "lucide-react";
import { Image } from "@/components/ui/image";
import FavButton from "@/components/shared/FavButton";
import { CITIES } from "@/data/cities";
import { CAT_ICON, mapsLink } from "@/data/attractions";
import { useLang } from "@/lib/i18n";

export default function AttractionCard({ a }) {
  const { t, loc } = useLang();
  const city = CITIES.find((c) => c.id === a.city);
  const href = `/explore/${a.city}/${a.slug}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
      <Link to={href} className="relative block aspect-[3/2] overflow-hidden">
        <Image src={a.img} alt={`${a.name}, ${city.name.en}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur">
          {CAT_ICON[a.cat]} {t("c_" + a.cat)}
        </span>
        <FavButton favKey={`place:${a.city}/${a.slug}`} className="absolute end-3 top-3" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-2xl font-medium leading-tight">{a.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-dusk"><MapPin className="h-4 w-4" />{loc(city.name)}</p>
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">{a.desc}</p>
        <p className="text-sm"><span className="font-medium">{t("why")}: </span><span className="text-muted-foreground">{a.why}</span></p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{a.hours} {t("hours")}</span>
          {a.diff && <span className="inline-flex items-center gap-1"><Mountain className="h-4 w-4" />{t(a.diff)}</span>}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link to={href} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ink/80">{t("viewDetails")}</Link>
          <a href={mapsLink(a)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition hover:border-ochre hover:text-ochre">
            <ExternalLink className="h-4 w-4" />{t("openMaps")}
          </a>
        </div>
      </div>
    </article>
  );
}
