import React from "react";
import { Heart } from "lucide-react";
import { useFavs } from "@/lib/favorites";
import { useLang } from "@/lib/i18n";

export default function FavButton({ favKey, className = "" }) {
  const { has, toggle } = useFavs();
  const { t } = useLang();
  const on = has(favKey);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? t("saved") : t("save")}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(favKey); }}
      className={`grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition hover:scale-110 ${className}`}
    >
      <Heart className={`h-5 w-5 transition ${on ? "fill-ochre text-ochre" : ""}`} />
    </button>
  );
}
