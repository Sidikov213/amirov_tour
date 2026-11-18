"use client";
import Image from "next/image";
import { useRef } from "react";
import Arrow from "./Arrow";
import { pickTour } from "@/lib/pick";
import { DESTINATIONS } from "@/lib/tours";

export default function Scroller() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (d: number) => ref.current?.scrollBy({ left: d * 360, behavior: "smooth" });
  return (
    <>
      <div className="head">
        <div><div className="eyebrow">Дальше Дагестана</div><h2>Кавказ, Грузия, Восток</h2></div>
        <div className="arrows">
          <button onClick={() => move(-1)} aria-label="Назад">←</button>
          <button onClick={() => move(1)} aria-label="Вперёд">→</button>
        </div>
      </div>
      <div className="scroller" ref={ref}>
        {DESTINATIONS.map((d) => (
          <button key={d.title} className="card dest" onClick={() => pickTour({ tour: d.title })}>
            <Image src={`/img/${d.img}.webp`} alt={d.title} fill sizes="340px" />
            <div className="bot">
              <h3>{d.title}</h3><p>{d.sub}</p>
              <div className="meta"><span className="days">Узнать даты и цену</span><span className="go"><Arrow /></span></div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
