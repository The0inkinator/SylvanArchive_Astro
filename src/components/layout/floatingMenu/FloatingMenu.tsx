import FMHome from "./FMHome";
import FMSearch from "./FMSearch";
import FMBookmark from "./FMBookmark";
import FMAccount from "./FMAccount";
import "./floatingMenuStyles/fmStyle.css";
import "./floatingMenuStyles/fmItemStyle.css";
import { createEffect, createSignal } from "solid-js";
// import { createScrollPosition } from "@solid-primitives/scroll";

// export const windowScroll = createScrollPosition();

type MenuStates =
  | "allClosed"
  | "homeOpen"
  | "searchOpen"
  | "bookmarkOpen"
  | "loading";

export const [menuState, setMenuState] = createSignal<MenuStates>("loading");

export default function FloatingMenu() {
  return (
    <>
      <div class="floatingMenuContainer">
        <FMHome />
        <FMSearch />
        <FMBookmark />
        <FMAccount />
      </div>
    </>
  );
}
