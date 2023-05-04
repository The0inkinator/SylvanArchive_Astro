import { menuState, setMenuState } from "./FloatingMenu";

export default function FMSearch() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a classList={{ button: true }}>
          <div id="FMSearchIcon"></div>
        </a>
      </div>
    </>
  );
}
