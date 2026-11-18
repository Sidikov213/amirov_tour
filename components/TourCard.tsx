import Image from "next/image";
import Link from "next/link";
import Arrow from "./Arrow";
import { rub, type Tour } from "@/lib/tours";

export default function TourCard({ tour, big = false, priority = false }: { tour: Tour; big?: boolean; priority?: boolean }) {
  return (
    <Link href={`/tours/${tour.slug}`} className={`card ${big ? "big" : ""}`}>
      <Image src={`/img/${tour.img}.webp`} alt={tour.title} fill priority={priority}
        sizes={big ? "(max-width:640px) 100vw, 66vw" : "(max-width:640px) 100vw, (max-width:1020px) 50vw, 33vw"} />
      <div className="top">
        <span className={`tag ${tour.hit ? "hit" : ""}`}>{tour.hit ? "Хит" : `Сложность: ${tour.level.toLowerCase()}`}</span>
        <span className="tag">{tour.time.split(" – ")[0]}</span>
      </div>
      <div className="bot">
        <h3>{tour.title}</h3>
        <div className="meta">
          <div>
            <div className="price">{rub(tour.price)}</div>
            <div className="days">{tour.days.split(" · ")[0]}</div>
          </div>
          <span className="go"><Arrow /></span>
        </div>
      </div>
    </Link>
  );
}
