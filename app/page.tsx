import Image from "next/image";
import BookButton from "@/components/BookButton";
import Catalogue from "@/components/Catalogue";
import LeadForm from "@/components/LeadForm";
import Picker from "@/components/Picker";
import Reveal from "@/components/Reveal";
import Scroller from "@/components/Scroller";
import Arrow from "@/components/Arrow";
import { COMPANY, MULTI, NEW_YEAR, rub } from "@/lib/tours";

const MARQUEE = ["Сулакский каньон", "Дербент", "Гуниб", "Хунзах", "Кахиб", "Самурский лес", "Кубачи", "Кезеной-Ам", "Грозный", "Осетия", "Ингушетия", "Грузия", "Армения", "Абхазия"];

const FAQ: [string, string][] = [
  ["С какого возраста можно брать детей?", "В поездку можно брать детей любого возраста."],
  ["Какой у вас транспорт?", "Автобусы на 20 человек с удобными регулируемыми сиденьями, ремнями безопасности, кондиционером, подсветкой, ТВ и стереосистемой."],
  ["Я из Каспийска, Буйнакска, Кизилюрта или Хасавюрта — заберёте?", "Место сбора в Махачкале, на ряд экскурсий есть отдельный выезд из Каспийска. Если ваша точка по пути маршрута — заберём с удобного места. Уточните это у менеджера при бронировании."],
  ["Есть ли скидка для компании?", "Если вы соберёте 15 человек, сами поедете бесплатно. В остальных случаях скидка уже заложена в стоимость тура."],
  ["Как забронировать и какая предоплата?", "Оставьте заявку или напишите в WhatsApp. Экскурсии на день — предоплата 1 000 ₽ с человека, она не возвращается при отказе или переносе менее чем за 24 часа до выезда. Туры — предоплата 50% стоимости."],
  ["Что взять с собой?", "Воду и перекус, паспорт, солнцезащитные очки и крем, головной убор, наличные, аптечку и зарядку для телефона."],
  ["Что если испортится погода?", "В целях безопасности туроператор может изменить программу экскурсии по погодным условиям."],
];

const faqLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Home() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-bg">
          {/* Горизонтальный кадр для широких экранов, вертикальный — для телефона. */}
          <Image className="only-d" src="/img/hero.webp" alt="Сулакский каньон" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 40%" }} />
          <Image className="only-m" src="/img/premium.webp" alt="Катер у плачущих скал в Сулакском каньоне" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 62%" }} />
        </div>
        <div className="wrap">
          <div className="badge"><i>✓</i><span className="only-d">Федеральный туроператор · в реестре РТО {COMPANY.rto}</span><span className="only-m">Туроператор · РТО {COMPANY.rto}</span></div>
          <h1><span>Дагестан,</span><span>который <em>не забыть</em></span></h1>
          <p className="sub only-d">Экскурсии и туры из Махачкалы и Каспийска: Сулакский каньон, Дербент, Гуниб, горные аулы. Возим с 2017 года — с гидом, обедом и комфортным автобусом.</p>
          <p className="sub only-m">Экскурсии и туры из Махачкалы и Каспийска — с гидом, обедом и комфортным автобусом.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#tours">Выбрать экскурсию</a>
            <a className="btn btn-ghost only-d" href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener">Написать в WhatsApp</a>
            <a className="btn btn-ghost only-m" href="#book">Куда и когда едем? <Arrow /></a>
          </div>
          <div className="only-d"><Picker /></div>
          <div className="stats">
            <div className="stat"><b>с 2017</b><span>года возим туристов</span></div>
            <div className="stat"><b>15</b><span>экскурсий на один день</span></div>
            <div className="stat"><b>от 3 500 ₽</b><span>за экскурсию с гидом</span></div>
            <div className="stat"><b>до 20</b><span>человек в группе</span></div>
          </div>
        </div>
      </section>

      <div className="marq" aria-hidden>
        <div>{[0, 1].map((k) => MARQUEE.map((m) => <span key={k + m}>{m}<b>✦</b></span>))}</div>
      </div>

      <section id="tours"><div className="wrap"><Catalogue /></div></section>

      <section className="feature" id="sulak">
        <div className="wrap feat">
          <Reveal className="feat-img">
            <Image src="/img/premium.webp" alt="Катер у плачущих скал в Сулакском каньоне" width={1200} height={1600} sizes="(max-width:1020px) 100vw, 50vw" />
            <Image className="float" src="/img/feature.webp" alt="Сулакский каньон сверху" width={700} height={700} sizes="300px" />
          </Reveal>
          <Reveal>
            <div className="eyebrow">Хит сезона</div>
            <h2>Сулакский каньон. Премиум</h2>
            <p>Самый глубокий каньон Европы — с воды и с высоты. Час на катере по бирюзовому Сулаку к плачущим скалам, бархан Сарыкум и обед с форелью на углях.</p>
            <ol className="tl">
              <li><time>07:00</time><b>Выезд из Махачкалы</b><span>из Каспийска — в 06:00, от Анжи-Арены</span></li>
              <li><b>Бархан Сарыкум</b><span>одна из крупнейших песчаных дюн Евразии</span></li>
              <li><b>Час на катере по Сулаку</b><span>плачущие скалы, гроты, бирюзовая вода</span></li>
              <li><b>Форелевое хозяйство и обед</b><span>форель на углях, куриный шашлык либо хинкал и чуду</span></li>
              <li><b>Подвесной мост и пещеры Нохъо</b></li>
              <li><b>Смотровая в Дубках и Чиркейское водохранилище</b></li>
              <li><time>18:00–19:00</time><b>Возвращение</b></li>
            </ol>
            <div className="incl"><span>Транспорт</span><span>Час на катере</span><span>Обед</span><span>Экскурсовод</span></div>
            <div className="pricebar">
              <div><b>5 500 ₽</b><small>с человека · предоплата 1 000 ₽</small></div>
              <a className="btn btn-primary" href="/tours/kanonpremium">Программа и бронь</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="multi" id="multi">
        <div className="wrap">
          <Reveal className="multi-box">
            <div className="multi-photo"><Image src="/img/multi.webp" alt="Старый Кахиб" fill sizes="(max-width:1020px) 100vw, 45vw" style={{ objectFit: "cover" }} /></div>
            <div className="multi-in">
              <div className="eyebrow">Авторские туры</div>
              <h2>Дагестан на несколько дней</h2>
              <p className="lead">Многодневные туры с питанием и проживанием в горах. Нажмите на тур — пришлём программу и ближайшие даты.</p>
              <div className="rows">
                {MULTI.map((m, i) => (
                  <BookButton key={m.title} className="row" tour={`${m.title} по Дагестану`}>
                    <span className="n">0{i + 1}</span>
                    <span className="t">{m.title}<small>{m.sub}</small></span>
                    <span className="p">{rub(m.price)}</span>
                    <span className="arr"><Arrow /></span>
                  </BookButton>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="formats">
        <div className="wrap">
          <div className="head"><Reveal><div className="eyebrow">Только свои</div><h2>Поездка под вас</h2></Reveal></div>
          <div className="f3">
            <Reveal as="article" className="fcard">
              <Image src="/img/indiv.webp" alt="" width={958} height={1280} sizes="(max-width:1020px) 100vw, 33vw" />
              <div>
                <h3>Индивидуальный тур</h3>
                <p>Ваши друзья и родные, наш транспорт и лучший гид. Маршрут составим по вашим желаниям.</p>
                <ul><li>Поездка в любой день</li><li>Выезд из любой точки Дагестана</li><li>Группа от 15 человек — организатор едет бесплатно</li></ul>
                <BookButton className="btn btn-dark" tour="Индивидуальный тур">Рассчитать стоимость</BookButton>
              </div>
            </Reveal>
            <Reveal as="article" className="fcard" delay={80}>
              <Image src="/img/jeep.webp" alt="" width={960} height={1280} sizes="(max-width:1020px) 100vw, 33vw" />
              <div>
                <h3>Джип-тур</h3>
                <p>Внедорожник премиум-класса, только ваши близкие и маршрут туда, куда автобус не доедет.</p>
                <ul><li>Компания до 4 человек</li><li>VIP-транспорт</li><li>Выезд из любой точки Дагестана</li></ul>
                <BookButton className="btn btn-dark" tour="Джип-тур">Забронировать джип</BookButton>
              </div>
            </Reveal>
            <Reveal as="article" className="fcard" delay={160}>
              <Image src="/img/school.webp" alt="" width={1280} height={720} sizes="(max-width:1020px) 100vw, 33vw" />
              <div>
                <h3>Школьные туры</h3>
                <p>Поездки для школьных и студенческих групп: класс, параллель или целый курс.</p>
                <ul><li>Автобусы на 20 мест с ремнями</li><li>Экскурсовод на весь маршрут</li><li>Программа под возраст группы</li></ul>
                <BookButton className="btn btn-dark" tour="Школьный тур">Обсудить поездку</BookButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="abroad"><div className="wrap"><Scroller /></div></section>

      <section className="ny" id="ny">
        <div className="wrap">
          <Reveal className="ny-box">
            <div className="snow" />
            <div style={{ position: "relative" }}>
              <div className="eyebrow">Новый год 2027</div>
              <h2>Встретьте год в горах</h2>
              <p className="lead">Новогодние туры из Махачкалы. Места в группах ограничены — бронируйте заранее, предоплата 50%.</p>
              <div style={{ marginTop: 26 }}><BookButton className="btn btn-primary" tour="Новогодний тур">Забронировать Новый год</BookButton></div>
            </div>
            <div className="ny-list" style={{ position: "relative" }}>
              {NEW_YEAR.map(([t, p]) => (
                <BookButton key={t} className="ny-item" tour="Новогодний тур" note={`Новый год: ${t}`}><b>{t}</b><span>{p}</span></BookButton>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head"><Reveal><div className="eyebrow">Почему с нами спокойно</div><h2>Всё честно и по делу</h2></Reveal></div>
          <Reveal className="why">
            <div><b>01</b><h3>Официальный туроператор</h3><p>{COMPANY.legal} в федеральном реестре: РТО {COMPANY.rto}. Договор и ответственность.</p></div>
            <div><b>02</b><h3>Комфортный транспорт</h3><p>Автобусы на 20 мест: регулируемые сиденья с ремнями, кондиционер, ТВ и музыка.</p></div>
            <div><b>03</b><h3>Можно с детьми</h3><p>В поездку берём детей любого возраста — маршруты подходят семьям.</p></div>
            <div><b>04</b><h3>Собрали 15 — едете бесплатно</h3><p>Соберите группу из 15 человек, и ваше место в поездке за наш счёт.</p></div>
          </Reveal>
          <div className="gal">
            {[["g1", "Группа туристов в горах"], ["g2", "Группа у водопада"], ["boat", "Катер на Сулаке"], ["bus", "Фирменный автобус Амиров-Тур"], ["food", "Обед: национальная кухня"], ["g4", "Группа в горах"]].map(([k, alt], i) => (
              <Reveal as="figure" key={k} delay={(i % 3) * 80}>
                <Image src={`/img/${k}.webp`} alt={alt} width={900} height={700} sizes="(max-width:640px) 50vw, 40vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap two">
          <Reveal>
            <div className="eyebrow">Частые вопросы</div>
            <h2 style={{ marginBottom: 34 }}>Коротко о главном</h2>
            {FAQ.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
          </Reveal>
          <LeadForm title="Подберём тур за 10 минут" text="Оставьте заявку — менеджер перезвонит, подскажет свободные даты и забронирует места." />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
