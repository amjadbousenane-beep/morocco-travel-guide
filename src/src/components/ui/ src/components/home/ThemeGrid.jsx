import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, CAT_ICON } from "@/data/attractions";
import { useLang } from "@/lib/i18n";

export default function ThemeGrid() {
  const { t } = useLang();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {CATEGORIES.map((c) => (
        <Link key={c} to={`/places?cat=${c}`} className="group rounded-3xl border border-black/5 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-ochre/50 hover:shadow-lg">
          <span className="block text-4xl transition group-hover:scale-110">{CAT_ICON[c]}</span>
          <span className="mt-3 block text-sm font-medium">{t("c_" + c)}</span>
        </Link>
      ))}
    </div>
  );
}
