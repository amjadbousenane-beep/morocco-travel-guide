import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function SectionHeading({ title, sub, to, eyebrow }) {
  const { t } = useLang();
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-ochre">{eyebrow}</p>}
        <h2 className="text-4xl font-light md:text-5xl">{title}</h2>
        {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
      </div>
      {to && (
        <Link to={to} className="group inline-flex items-center gap-2 text-sm font-medium text-dusk">
          {t("viewAll")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>
      )}
    </div>
  );
}
