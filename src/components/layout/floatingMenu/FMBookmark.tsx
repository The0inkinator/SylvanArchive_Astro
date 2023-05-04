import { menuState, setMenuState } from "./FloatingMenu";

export default function FMBookmark() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a classList={{ button: true }}>
          <div id="FMBookmarkIcon"></div>
        </a>
      </div>
    </>
  );
}
