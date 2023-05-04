import FMHome from "./FMHome";
import FMSearch from "./FMSearch";
import FMBookmark from "./FMBookmark";
import FMAccount from "./FMAccount";
import "./floatingMenuStyles/floatingMenuStyle.css";
import "./floatingMenuStyles/fmItemStyle.css";
import { createSignal } from "solid-js";

type MenuStates =
  | "allClosed"
  | "homeOpen"
  | "searchOpen"
  | "bookmarkOpen"
  | "loading";

export const [menuState, setMenuState] = createSignal<MenuStates>("homeOpen");

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
