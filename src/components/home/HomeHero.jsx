import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMG, CITIES } from "@/data/cities";
import { cityHay, norm } from "@/lib/search";
import { useLang } from "@/lib/i18n";

export default function HomeHero() {
  const { t, loc } = useLang();
  const nav = useNavigate();
  const ref = useRef(null);
  const [q, setQ] = useState("");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const matches = q ? CITIES.filter((c) => cityHay(c).includes(norm(q))).slice(0, 5) : [];
  const submit = (e) => {
    e.preventDefault();
    if (matches[0]) nav(`/explore/${matches[0].id}`);
    else if (q) nav(`/places?q=${encodeURIComponent(q)}`);
  };
  return (
    <section ref={ref} className="relative h-[92vh] min-h-[640px] overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={IMG.hero} alt="Sahara dunes at golden hour in Morocco" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/80" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 md:px-8 md:pb-28">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-4 text-xs uppercase tracking-[0.3em] text-white/80">Morocco Travel Guide</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="text-6xl font-light text-white md:text-8xl lg:text-9xl">{t("heroTitle")} 🇲🇦</motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">{t("heroSub")}</motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }} className="mt-8 max-w-xl">
          <form onSubmit={submit} className="relative">
            <div className="flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-5 py-3.5 backdrop-blur-xl transition focus-within:bg-white/25">
              <Search className="h-5 w-5 text-white" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchCity")} aria-label={t("searchCity")} className="w-full bg-transparent text-white outline-none placeholder:text-white/70" />
            </div>
            {matches.length > 0 && (
              <ul className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-2xl bg-white p-1 shadow-xl">
                {matches.map((c) => (
                  <li key={c.id}><Link to={`/explore/${c.id}`} className="block rounded-xl px-4 py-2.5 hover:bg-sand">{loc(c.name)} <span className="text-xs text-muted-foreground">· {loc(c.tag)}</span></Link></li>
                ))}
              </ul>
            )}
          </form>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/map" className="rounded-full bg-ochre px-6 py-3 text-sm font-medium text-ink transition hover:bg-white">{t("exploreMorocco")}</Link>
            <Link to="/cities" className="rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-ink">{t("discoverCities")}</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
