import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import TourCard from "@/components/TourCard";
import { TOURS, rub } from "@/lib/tours";

type Props = { params: Promise<{ slug: string }> };

// Страницы есть только у экскурсий из lib/tours.ts, любой другой адрес — 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = TOURS.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: `${t.title} — экскурсия из Махачкалы, ${rub(t.price)}`,
    description: `${t.about} Выезд ${t.time.split(" – ")[0]}, группа до 20 человек, ${rub(t.price)} с человека.`,
    alternates: { canonical: `/tours/${t.slug}` },
    openGraph: { images: [`/img/${t.img}.webp`] },
  };
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params;
  const t = TOURS.find((x) => x.slug === slug);
  if (!t) notFound();
  const more = TOURS.filter((x) => x.slug !== t.slug && x.region === t.region).concat(TOURS.filter((x) => x.region !== t.region)).slice(0, 3);
  const ld = {
    "@context": "https://schema.org", "@type": "TouristTrip", name: t.title, description: t.about,
    touristType: "Групповая экскурсия", itinerary: t.route.map((r) => ({ "@type": "TouristAttraction", name: r })),
    offers: { "@type": "Offer", price: t.price, priceCurrency: "RUB", availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: "Амиров-Тур" },
  };
  return (
    <>
      <section className="thero">
        <Image src={`/img/${t.img}.webp`} alt={t.title} fill priority sizes="100vw" />
        <div className="wrap">
          <nav className="crumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><Link href="/#tours">Экскурсии</Link></nav>
          <h1>{t.title}</h1>
          <p className="lead">{t.about}</p>
        </div>
      </section>

      <section className="tbody">
        <div className="wrap tcols">
          <div>
            <div className="facts">
              <div><span>Время</span><b>{t.time}</b></div>
              <div><span>Сложность</span><b>{t.level}</b></div>
              <div><span>Группа</span><b>до 20 человек</b></div>
              <div><span>Цена</span><b>{rub(t.price)}</b></div>
            </div>

            {t.gallery.length > 0 && (
              <div className="shots">
                {t.gallery.map((src) => <Image key={src} src={src} alt={t.title} width={1200} height={900} sizes="(max-width:1020px) 50vw, 30vw" />)}
              </div>
            )}

            <h2 className="h4">Маршрут дня</h2>
            <ol className="stops">
              <li>Выезд<small>{t.departure}</small></li>
              {t.route.map((r) => <li key={r}>{r}</li>)}
              <li>Возвращение в Махачкалу<small>{t.time.split(" – ")[1]}</small></li>
            </ol>

            <h2 className="h4">Дни выезда</h2>
            <ul className="dots">{t.days.split(" · ").map((d) => <li key={d}>{d}</li>)}</ul>

            <h2 className="h4">Входит в стоимость</h2>
            <ul className="dots">{t.included.map((r) => <li key={r}>{r}</li>)}</ul>

            {t.extra.length > 0 && (<>
              <h2 className="h4">Оплачивается отдельно</h2>
              <ul className="dots x2">{t.extra.map((r) => <li key={r}>{r}</li>)}</ul>
            </>)}

            <h2 className="h4">Что взять с собой</h2>
            <ul className="dots x2">{["воду и перекус", "паспорт", "солнцезащитные очки и крем", "головной убор", "наличные", "аптечку и зарядку для телефона"].map((r) => <li key={r}>{r}</li>)}</ul>

            <div className="note">Предоплата 1 000 ₽ с человека. Она не возвращается при отказе или переносе менее чем за 24 часа до выезда. В целях безопасности туроператор может изменить программу по погодным условиям.</div>
          </div>

          <aside className="side">
            <LeadForm tour={t.title} title={rub(t.price)} text="с человека · транспорт и гид включены. Оставьте заявку — подтвердим дату и места." />
          </aside>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head"><div><div className="eyebrow">Ещё маршруты</div><h2>Куда поехать потом</h2></div></div>
          <div className="grid">{more.map((m) => <TourCard key={m.slug} tour={m} />)}</div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
