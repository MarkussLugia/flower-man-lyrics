import { createMemo, createSignal, Show, For } from "solid-js";
import "./App.css";
import lyricsEn from "./data/lyrics-en";
import lyricsJa from "./data/lyrics-ja";
import flowery from "./Flowery_overworld_container_broken.png";

export default function App() {
  const maxIndex = lyricsEn.length;
  const [currentPage, setCurrentPage] = createSignal(0);
  const [langJa, setLangJa] = createSignal(false);
  let toggleLang = () => {
    setLangJa(!langJa());
  };

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
    if (["ArrowLeft", "PageUp"].includes(event.code)) {
      toPrevPage();
    } else if (["ArrowRight", "PageDown", "F19", "Space"].includes(event.code)) {
      toNextPage();
    } else if (["ArrowUp", "ArrowDown"].includes(event.code)) {
      toggleLang();
    }
  });
  // listen to mobile swipe events
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  });
  document.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    if (touchEndX + 80 < touchStartX) {
      toNextPage();
    } else if (touchEndX - 80 > touchStartX) {
      toPrevPage();
    } else if (touchEndY + 360 < touchStartY) {
      toggleLang();
    }
  });

  const chorusLines = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 27, 28, 29, 30, 31, 32, 33, 34, 35];
  const isChoros = createMemo<boolean>(() => chorusLines.includes(currentPage()));
  return (
    <>
      <div class={["w-screen h-screen fixed z-0 top-0 bg-black running-bar"]}>
        <div class="h-screen w-3 top-0 bg-neutral-800 absolute left-[110vw]"></div>
        <div class="h-screen w-3 top-0 bg-neutral-800 absolute left-[80vw]"></div>
        <div class="h-screen w-3 top-0 bg-neutral-800 absolute left-[50vw]"></div>
        <div class="h-screen w-3 top-0 bg-neutral-800 absolute left-[20vw]"></div>
      </div>
      <div
        class={[
          "w-screen h-screen fixed z-50 left-0 top-0 flex items-center justify-center text-center select-none",
          {
            "font-ja": langJa(),
            "text-yellow-300": isChoros(),
            "text-white": !isChoros(),
          },
        ]}
      >
        <div
          class={[
            "absolute z-20 w-full h-12 left-0 rainbow transition-all duration-500",
            {
              "top-0 opacity-100": isChoros(),
              "-top-6 opacity-0": !isChoros(),
            },
          ]}
        ></div>
        <div
          class={[
            "absolute z-20 w-full h-12 left-0 rainbow transition-all duration-500",
            {
              "bottom-0 opacity-100": chorusLines.includes(currentPage()),
              "-bottom-6 opacity-0": !chorusLines.includes(currentPage()),
            },
          ]}
        ></div>
        <div
          class={[
            "absolute z-10 w-full h-12 left-0 bg-[#00FF00] transition-all duration-500",
            {
              "top-0": chorusLines.includes(currentPage()),
              "-top-6": !chorusLines.includes(currentPage()),
              "opacity-0": currentPage() === 36,
            },
          ]}
        ></div>
        <div
          class={[
            "absolute z-10 w-full h-12 left-0 bg-[#00FF00] transition-all duration-500",
            {
              "bottom-0": isChoros(),
              "-bottom-6": !isChoros(),
              "opacity-0": currentPage() === 36,
            },
          ]}
        ></div>
        <div class="w-0 max-w-0 relative leading-52">
          <div class="lyrics relative -left-384 w-768 flex flex-col items-center justify-center text-[11rem] tracking-tight">
            <Show when={currentPage() === 36}>
              <img src={flowery} class="flowery-image w-3xl mb-8" />
            </Show>
            <LyricsLines
              data={langJa() ? lyricsJa[currentPage()] : lyricsEn[currentPage()]}
              isJa={langJa()}
            />
          </div>
        </div>
        <Show when={isChoros()}>
          <div class="w-0 max-w-0 relative leading-52 lyric-pounding1 origin-center">
            <div class="lyrics relative -left-384 w-768 flex flex-col text-[11rem] tracking-tight opacity-9">
              <LyricsLines
                data={langJa() ? lyricsJa[currentPage()] : lyricsEn[currentPage()]}
                isJa={langJa()}
              />
            </div>
          </div>
          <div class="w-0 max-w-0 relative leading-52 lyric-pounding2 origin-center">
            <div class="lyrics relative -left-384 w-768 flex flex-col text-[11rem] tracking-tight opacity-9">
              <LyricsLines
                data={langJa() ? lyricsJa[currentPage()] : lyricsEn[currentPage()]}
                isJa={langJa()}
              />
            </div>
          </div>
          <div class="w-0 max-w-0 relative leading-52 lyric-pounding3 origin-center">
            <div class="lyrics relative -left-384 w-768 flex flex-col text-[11rem] tracking-tight opacity-9">
              <LyricsLines
                data={langJa() ? lyricsJa[currentPage()] : lyricsEn[currentPage()]}
                isJa={langJa()}
              />
            </div>
          </div>
          <div class="w-0 max-w-0 relative leading-52 lyric-pounding4 origin-center">
            <div class="lyrics relative -left-384 w-768 flex flex-col text-[11rem] tracking-tight opacity-9">
              <LyricsLines
                data={langJa() ? lyricsJa[currentPage()] : lyricsEn[currentPage()]}
                isJa={langJa()}
              />
            </div>
          </div>
          <div class="w-0 max-w-0 relative leading-52 lyric-pounding5 origin-center">
            <div class="lyrics relative -left-384 w-768 flex flex-col text-[11rem] tracking-tight opacity-9">
              <LyricsLines
                data={langJa() ? lyricsJa[currentPage()] : lyricsEn[currentPage()]}
                isJa={langJa()}
              />
            </div>
          </div>
          <div class="w-0 max-w-0 relative leading-52 lyric-pounding6 origin-center">
            <div class="lyrics relative -left-384 w-768 flex flex-col text-[11rem] tracking-tight opacity-9">
              <LyricsLines
                data={langJa() ? lyricsJa[currentPage()] : lyricsEn[currentPage()]}
                isJa={langJa()}
              />
            </div>
          </div>
        </Show>
      </div>
    </>
  );
}

function LyricsLines(props: { data: (string | string[] | null)[] | null; isJa: boolean }) {
  return (
    <div>
      {props.data ? (
        <For each={props.data}>
          {(section) => {
            if (!section) {
              return <br />;
            } else if (typeof section === "string") {
              return <span>{section}</span>;
            } else {
              return (
                <span class="mark-container inline-flex flex-col items-center justify-center">
                  <div class="translate-y-10">{section[0]}</div>
                  <div class="text-8xl -translate-y-64 tracking-normal">{section[1]}</div>
                </span>
              );
            }
          }}
        </For>
      ) : props.isJa ? (
        <div class="text-neutral-500">
          インストゥル-
          <br />
          メンタル
          <br />
          ブレイク
        </div>
      ) : (
        <div class="text-neutral-500">
          Instrumental
          <br />
          Break
        </div>
      )}
    </div>
  );
}
