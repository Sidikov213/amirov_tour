import { NextResponse } from "next/server";

// Приём заявки с сайта и отправка менеджеру в Telegram.
// Нужны переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (см. .env.example).

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Поле-ловушка: человек его не видит, бот заполняет. Отвечаем «ок» и ничего не шлём.
  if (clean(body.trap, 100)) return NextResponse.json({ ok: true });

  const lead = {
    tour: clean(body.tour, 160), date: clean(body.date, 10), people: clean(body.people, 4),
    name: clean(body.name, 60), phone: clean(body.phone, 20), note: clean(body.note, 500), page: clean(body.page, 120),
  };
  if (!lead.name || !/^[0-9+()\-\s]{10,20}$/.test(lead.phone) || !lead.tour) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    "🏔 <b>Новая заявка с сайта</b>",
    `<b>Тур:</b> ${esc(lead.tour)}`,
    lead.date && `<b>Дата:</b> ${esc(lead.date.split("-").reverse().join("."))}`,
    `<b>Человек:</b> ${esc(lead.people || "—")}`,
    `<b>Имя:</b> ${esc(lead.name)}`,
    `<b>Телефон:</b> ${esc(lead.phone)}`,
    lead.note && `<b>Пожелания:</b> ${esc(lead.note)}`,
    lead.page && `<i>Страница: ${esc(lead.page)}</i>`,
  ].filter(Boolean).join("\n");

  const digits = lead.phone.replace(/\D/g, "").replace(/^8/, "7");
  const api = process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org";
  const tg = await fetch(`${api}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat, text, parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "Написать в WhatsApp", url: `https://wa.me/${digits}` }]] },
    }),
  });
  if (!tg.ok) {
    console.error("telegram sendMessage failed", tg.status, await tg.text());
    return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
