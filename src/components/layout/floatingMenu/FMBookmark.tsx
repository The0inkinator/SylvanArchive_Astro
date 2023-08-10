import { menuState, setMenuState } from "./FloatingMenu";

export default function FMBookmark() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a
          classList={{ button: true }}
          tabIndex="0"
          onFocusIn={() => {
            setMenuState("bookmarkOpen");
          }}
        >
          <div id="FMBookmarkIcon"></div>
        </a>
      </div>
    </>
  );
}
