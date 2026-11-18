"use client";
import { useEffect, useState, type FormEvent } from "react";
import { PICK_EVENT, type Pick } from "@/lib/pick";
import { ALL_OPTIONS, COMPANY } from "@/lib/tours";

type State = "idle" | "sending" | "sent" | "fallback";

const ruDate = (d: string) => (d ? new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "long" }) : "");

export default function LeadForm({ tour: fixedTour, title, text }: { tour?: string; title: string; text: string }) {
  const [tour, setTour] = useState(fixedTour ?? ALL_OPTIONS[0]);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<State>("idle");
  const [min, setMin] = useState("");

  useEffect(() => setMin(new Date().toISOString().slice(0, 10)), []);
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<Pick>).detail;
      if (d.tour && !fixedTour) setTour(ALL_OPTIONS.includes(d.tour) ? d.tour : "Помогите выбрать");
      if (d.date) setDate(d.date);
      if (d.people) setPeople(d.people);
      if (d.note) setNote(d.note);
      setState("idle");
    };
    window.addEventListener(PICK_EVENT, on);
    return () => window.removeEventListener(PICK_EVENT, on);
  }, [fixedTour]);

  const whatsappUrl = () => {
    const lines = ["Здравствуйте! Заявка с сайта.", `Тур: ${tour}`, date && `Дата: ${ruDate(date)}`, `Человек: ${people}`, `Имя: ${name}`, note && `Пожелания: ${note}`];
    return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tour, date, people, name, phone, note, trap, page: location.pathname }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setState("sent");
    } catch {
      // Сервер не принял заявку (например, бот ещё не настроен) — не теряем клиента, ведём в WhatsApp.
      setState("fallback");
      window.open(whatsappUrl(), "_blank", "noopener");
    }
  }

  if (state === "sent") {
    return (
      <div className="form" id="book">
        <div className="ok">
          <b>Заявка у менеджера</b>
          <p>Спасибо, {name}! Перезвоним или напишем на {phone} в ближайшее время.</p>
          <button className="btn btn-dark" onClick={() => setState("idle")}>Отправить ещё одну</button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" id="book" onSubmit={submit}>
      <h3>{title}</h3>
      <p>{text}</p>
      {!fixedTour && (
        <label className="fld"><span>Что интересует</span>
          <select value={tour} onChange={(e) => setTour(e.target.value)}>{ALL_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
        </label>
      )}
      <div className="f2">
        <label className="fld"><span>Дата</span><input type="date" min={min} value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label className="fld"><span>Сколько человек</span><input type="number" min={1} max={60} value={people} onChange={(e) => setPeople(e.target.value)} /></label>
      </div>
      <label className="fld"><span>Ваше имя</span><input type="text" required maxLength={60} placeholder="Как к вам обращаться" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label className="fld"><span>Телефон</span><input type="tel" required pattern="[0-9+()\-\s]{10,20}" placeholder="+7 900 000-00-00" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
      <label className="fld"><span>Пожелания</span><textarea rows={2} maxLength={500} placeholder="Например: едем с ребёнком 5 лет" value={note} onChange={(e) => setNote(e.target.value)} /></label>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={trap} onChange={(e) => setTrap(e.target.value)} name="company" />
      <button className="btn btn-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Отправляем…" : "Отправить заявку"}</button>
      {state === "fallback" && <div className="err">Не получилось отправить с сайта — открыли WhatsApp, отправьте сообщение там.</div>}
      <div className="alt">
        <a href={COMPANY.telegram} target="_blank" rel="noopener">Telegram</a>
        <a href={`tel:${COMPANY.phoneRaw}`}>Позвонить</a>
      </div>
      <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных</small>
    </form>
  );
}
