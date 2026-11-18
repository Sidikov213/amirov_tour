// Предзаполнение формы заявки из любой кнопки на странице.
export type Pick = { tour?: string; date?: string; people?: string; note?: string };
export const PICK_EVENT = "amirov:pick";

export function pickTour(detail: Pick) {
  window.dispatchEvent(new CustomEvent<Pick>(PICK_EVENT, { detail }));
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
