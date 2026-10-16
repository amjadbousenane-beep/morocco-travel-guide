import React from "react";
import { Link } from "react-router-dom";
import HomeHero from "@/components/home/HomeHero";
import ThemeGrid from "@/components/home/ThemeGrid";
import FoodCard from "@/components/home/FoodCard";
import SectionHeading from "@/components/shared/SectionHeading";
import CityCard from "@/components/shared/CityCard";
import AttractionCard from "@/components/shared/AttractionCard";
import MoroccoMap from "@/components/shared/MoroccoMap";
import { CITIES } from "@/data/cities";
import { ATTRACTIONS } from "@/data/attractions";
import { FOODS } from "@/data/food";
import { useLang } from "@/lib/i18n";
import useSeo from "@/lib/useSeo";

const POPULAR = ["marrakech", "fes", "chefchaouen", "essaouira"];
const RECOMMENDED = ["jemaa-el-fnaa", "ait-benhaddou", "hassan-ii-mosque", "blue-medina", "fes-el-bali", "essaouira-medina"];
const wrap = "mx-auto max-w-7xl px-4 md:px-8";

export default function Home() {
  const { t } = useLang();
  useSeo({ title: "Discover Morocco: Cities, Attractions, Food & Hidden Gems", description: "Plan your trip to Morocco: explore Marrakech, Fes, Chefchaouen and more, find attractions on Google Maps and build an itinerary.", keywords: "Morocco travel, Marrakech, Fes, Chefchaouen, Morocco itinerary" });
  const rec = RECOMMENDED.map((s) => ATTRACTIONS.find((a) => a.slug === s));
  return (
    <>
      <HomeHero />
      <section className={`${wrap} pt-24`}>
        <SectionHeading eyebrow="01" title={t("popular")} sub={t("popularSub")} to="/cities" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {POPULAR.map((id, i) => <div key={id} className={i % 2 ? "md:mt-10" : ""}><CityCard city={CITIES.find((c) => c.id === id)} tall /></div>)}
        </div>
      </section>
      <section className={`${wrap} pt-24`}>
        <SectionHeading eyebrow="02" title={t("browseByTheme")} sub={t("browseSub")} />
        <ThemeGrid />
      </section>
      <section className={`${wrap} pt-24`}>
        <SectionHeading eyebrow="03" title={t("recommended")} sub={t("recommendedSub")} to="/places" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rec.map((a) => <AttractionCard key={a.slug} a={a} />)}</div>
      </section>
      <section className={`${wrap} pt-24`}>
        <SectionHeading eyebrow="04" title={t("mapTitle")} sub={t("mapSub")} to="/map" />
        <MoroccoMap />
      </section>
      <section className={`${wrap} pt-24`}>
        <SectionHeading eyebrow="05" title={t("foodTitle")} sub={t("foodSub")} to="/food" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{FOODS.slice(0, 4).map((f) => <FoodCard key={f.id} f={f} />)}</div>
      </section>
      <section className={`${wrap} pt-24`}>
        <div className="zellige overflow-hidden rounded-[2rem] bg-ink p-10 text-white md:p-16">
          <h2 className="text-4xl font-light md:text-6xl">{t("plannerTitle")}</h2>
          <p className="mt-3 max-w-lg text-white/75">{t("plannerSub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/planner" className="rounded-full bg-ochre px-6 py-3 text-sm font-medium text-ink hover:bg-white">{t("planner")}</Link>
            <Link to="/hidden-gems" className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium hover:bg-white hover:text-ink">{t("hidden")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
