import type { Metadata, Viewport } from "next";
import "@fontsource/golos-text/cyrillic-400.css";
import "@fontsource/golos-text/cyrillic-500.css";
import "@fontsource/golos-text/cyrillic-600.css";
import "@fontsource/golos-text/cyrillic-700.css";
import "@fontsource/golos-text/latin-400.css";
import "@fontsource/golos-text/latin-500.css";
import "@fontsource/golos-text/latin-600.css";
import "@fontsource/golos-text/latin-700.css";
import "@fontsource/unbounded/cyrillic-600.css";
import "@fontsource/unbounded/cyrillic-800.css";
import "@fontsource/unbounded/latin-600.css";
import "@fontsource/unbounded/latin-800.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/tours";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amirov-tour.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Амиров-Тур — туры и экскурсии по Дагестану и Кавказу из Махачкалы", template: "%s | Амиров-Тур" },
  description: "Федеральный туроператор (РТО 024891). Однодневные экскурсии из Махачкалы и Каспийска от 3 500 ₽, многодневные и индивидуальные туры по Дагестану, Кавказу и за рубеж.",
  openGraph: { type: "website", locale: "ru_RU", siteName: "Амиров-Тур", images: ["/img/hero-d.webp"] },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#071316" };

const jsonLd = {
  "@context": "https://schema.org", "@type": "TravelAgency", name: COMPANY.name, legalName: COMPANY.legal, url: SITE,
  telephone: COMPANY.phoneRaw, email: COMPANY.email, foundingDate: "2017", taxID: COMPANY.inn,
  address: { "@type": "PostalAddress", addressLocality: "Махачкала", addressRegion: "Республика Дагестан", streetAddress: "ул. Магомедтагирова, 161 Д", addressCountry: "RU" },
  sameAs: [COMPANY.instagram, COMPANY.telegram, COMPANY.youtube], priceRange: "от 3500 ₽",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
