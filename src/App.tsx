import { createMemo, createSignal } from "solid-js";
import "./App.css";
import lyricsEn from "./data/lyrics-en";
import lyricsJa from "./data/lyrics-en"; // placeholder, replace later

export default function App() {
  const maxIndex = lyricsEn.length;
  const [currentPage, setCurrentPage] = createSignal(maxIndex);
  const [langJa, setLangJa] = createSignal(false);
  let toggleLang = () => {
    setLangJa(!langJa());
  };
  const currentLine = createMemo(() => {
    if (langJa()) {
      return lyricsJa[currentPage()];
    } else {
      return lyricsEn[currentPage()];
    }
  });

  let toPrevPage = () => {
    if (currentPage() > 0) {
      setCurrentPage(currentPage() - 1);
    }
  };
  let toNextPage = () => {
    if (currentPage() < maxIndex) {
      setCurrentPage(currentPage() + 1);
    } else {
      setCurrentPage(0);
    }
  };
  // listen to keyboard events
  document.addEventListener("keydown", (event) => {
    if (["ArrowLeft"].includes(event.code)) {
      toPrevPage();
    } else if (["ArrowRight", "F19", "Space"].includes(event.code)) {
      toNextPage();
    }
  });
  // listen to mobile swipe events
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });
  document.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    if (touchEndX + 50 < touchStartX) {
      toNextPage();
    } else if (touchEndX - 50 > touchStartX) {
      toPrevPage();
    }
  });
  return (
    <div class="w-screen h-screen fixed left-0 top-0 flex items-center justify-center bg-black text-white text-center">
      <div class="w-0 max-w-0 relative text-9xl">
        <div class="relative -left-192 w-384 flex flex-col text-[12rem]">
          <div class="w-full my-5">Flower Man,</div>
          <div class="w-full my-5">Flower Man </div>
        </div>
      </div>
    </div>
  );
}
