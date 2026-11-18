"use client";
import { useEffect, useState } from "react";
import { pickTour } from "@/lib/pick";
import { ALL_OPTIONS } from "@/lib/tours";

const PEOPLE = ["1", "2", "3", "4", "5", "10", "15"];
const LABEL: Record<string, string> = { "1": "1 человек", "2": "2 человека", "3": "3 человека", "4": "4 человека", "5": "5–9 человек", "10": "10–14 человек", "15": "15 и больше" };

export default function Picker() {
  const [tour, setTour] = useState(ALL_OPTIONS[0]);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const [min, setMin] = useState("");
  useEffect(() => setMin(new Date().toISOString().slice(0, 10)), []);
  return (
    <form className="picker" onSubmit={(e) => { e.preventDefault(); pickTour({ tour, date, people }); }}>
      <label><span>Куда едем</span>
        <select value={tour} onChange={(e) => setTour(e.target.value)}>{ALL_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label><span>Когда</span><input type="date" min={min} value={date} onChange={(e) => setDate(e.target.value)} /></label>
      <label><span>Сколько вас</span>
        <select value={people} onChange={(e) => setPeople(e.target.value)}>{PEOPLE.map((p) => <option key={p} value={p}>{LABEL[p]}</option>)}</select>
      </label>
      <button type="submit">Узнать о местах</button>
    </form>
  );
}
