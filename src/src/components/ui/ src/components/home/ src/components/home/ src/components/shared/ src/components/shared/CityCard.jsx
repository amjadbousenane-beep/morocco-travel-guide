import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import FavButton from "@/components/shared/FavButton";
import { useLang } from "@/lib/i18n";

export default function CityCard({ city, tall = false }) {
  const { loc } = useLang();
  return (
    <Link
      to={`/explore/${city.id}`}
      className={`group relative block overflow-hidden rounded-3xl bg-sand shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}
    >
      <Image src={city.img} alt={`${loc(city.name)}, Morocco`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <FavButton favKey={`city:${city.id}`} className="absolute end-3 top-3" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-white/80">{loc(city.tag)}</p>
        <h3 className="text-3xl font-light">{loc(city.name)}</h3>
      </div>
    </Link>
  );
}
