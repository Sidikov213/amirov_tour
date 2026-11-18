"use client";
import { useState } from "react";
import TourCard from "./TourCard";
import { TOURS, type Region } from "@/lib/tours";

const FILTERS: [Region | "all", string][] = [["all", "Все"], ["dag", "Дагестан"], ["che", "Чечня"], ["kav", "Осетия и Ингушетия"]];

export default function Catalogue() {
  const [f, setF] = useState<Region | "all">("all");
  const list = TOURS.filter((t) => f === "all" || t.region === f);
  return (
    <>
      <div className="head">
        <div>
          <div className="eyebrow">Экскурсии на один день</div>
          <h2>Утром выехали —<br />вечером дома</h2>
          <p className="lead">Групповые поездки из Махачкалы и Каспийска. В цене транспорт и гид, в большинстве маршрутов — обед.</p>
        </div>
        <div className="chips" role="tablist">
          {FILTERS.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={f === k} className={`chip ${f === k ? "on" : ""}`} onClick={() => setF(k)}>{label}</button>
          ))}
        </div>
      </div>
      <div className="grid">
        {list.map((t, i) => <TourCard key={t.slug} tour={t} big={t.big && f === "all"} priority={i < 2} />)}
      </div>
    </>
  );
}
