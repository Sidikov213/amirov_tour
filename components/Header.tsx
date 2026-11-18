"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/tours";

const NAV = [
  ["/#tours", "Экскурсии"], ["/#multi", "Туры"], ["/#abroad", "Направления"], ["/#ny", "Новый год"], ["/#faq", "Вопросы"],
] as const;

export function Logo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" />
      <path d="M6 28 15 13l5 8 3-5 11 12" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="28" cy="11" r="2.6" fill="#c2613a" />
    </svg>
  );
}

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header className={solid || open ? "solid" : ""}>
        <div className="wrap nav">
          <Link href="/" className="logo" aria-label="Амиров-Тур — на главную">
            <Logo />
            <span>АМИРОВ‑ТУР<small>ТУРОПЕРАТОР · РТО {COMPANY.rto}</small></span>
          </Link>
          <nav>{NAV.map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}</nav>
          <a className="tel" href={`tel:${COMPANY.phoneRaw}`}>{COMPANY.phone}</a>
          <Link className="btn btn-primary" href="/#book">Подобрать тур</Link>
          <button className="burger" aria-label="Меню" aria-expanded={open} onClick={() => setOpen(!open)}><span /></button>
        </div>
      </header>
      <div className={`mnav ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        {NAV.map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}
        <Link href="/#book">Оставить заявку</Link>
      </div>
    </>
  );
}
