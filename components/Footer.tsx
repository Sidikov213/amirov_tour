import { COMPANY } from "@/lib/tours";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <div className="logo">АМИРОВ‑ТУР</div>
              <a className="bigtel" href={`tel:${COMPANY.phoneRaw}`}>{COMPANY.phone}</a>
              <p>Ежедневно на связи в WhatsApp и Telegram</p>
            </div>
            <div>
              <h4>Офис</h4>
              <p>Махачкала,<br />ул. Магомедтагирова, 161 Д</p>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </div>
            <div>
              <h4>Мы в сети</h4>
              <a href={COMPANY.instagram} target="_blank" rel="noopener">Instagram</a>
              <a href={COMPANY.telegram} target="_blank" rel="noopener">Telegram</a>
              <a href={COMPANY.youtube} target="_blank" rel="noopener">YouTube</a>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
            </div>
            <div>
              <h4>Реквизиты</h4>
              <p>{COMPANY.legal}</p>
              <p>ИНН {COMPANY.inn}</p>
              <p>РТО {COMPANY.rto}</p>
            </div>
          </div>
          <div className="legal">
            <span>© 2017–2026 Амиров-Тур. Туроператор может изменить программу по погодным условиям.</span>
            <span>Концепт редизайна сайта</span>
          </div>
        </div>
      </footer>
      <div className="mbar">
        <a href={`tel:${COMPANY.phoneRaw}`}>Позвонить</a>
        <a href="#book">Оставить заявку</a>
      </div>
      <a className="fab" href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.400L3 29l6.800-1.700C11.600 28.400 13.800 29 16 29c7.200 0 13-5.800 13-13S23.200 3 16 3zm0 23.600c-2 0-3.900-.5-5.600-1.500l-.4-.2-4 1 1.100-3.900-.3-.4C5.700 19.900 5.200 18 5.200 16 5.200 10 10 5.200 16 5.200S26.800 10 26.800 16 22 26.600 16 26.600zm5.900-7.900c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.200-.2.2-.4.2-.7.1-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.300-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.7-1.800-1-2.400-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.200 1.100-1.200 2.800s1.200 3.200 1.400 3.500c.2.2 2.400 3.700 5.900 5.200.8.4 1.500.6 2 .7.800.3 1.600.2 2.200.1.7-.1 1.900-.8 2.200-1.600.3-.8.3-1.400.2-1.600-.1-.1-.3-.2-.600-.4z" /></svg>
      </a>
    </>
  );
}
