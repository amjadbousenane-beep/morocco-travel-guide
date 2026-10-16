import React from "react";
import { Image } from "@/components/ui/image";
import { CITIES } from "@/data/cities";
import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";

export default function FoodCard({ f }) {
  const { t, loc } = useLang();
  return (
    <article className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden">
        <Image src={f.img} alt={`${f.name.en} Moroccan dish`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-medium">{loc(f.name)}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{loc(f.desc)}</p>
        <p className="mb-2 mt-4 text-xs font-medium uppercase tracking-widest text-ochre">{t("whereTry")}</p>
        <div className="flex flex-wrap gap-2">
          {f.where.map((id) => { const c = CITIES.find((x) => x.id === id); return <Link key={id} to={`/explore/${id}`} className="rounded-full bg-sand px-3 py-1 text-xs transition hover:bg-ochre/20">{loc(c.name)}</Link>; })}
        </div>
      </div>
    </article>
  );
}
