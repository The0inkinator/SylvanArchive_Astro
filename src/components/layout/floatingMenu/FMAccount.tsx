import { menuState, setMenuState } from "./FloatingMenu";

export default function FMAccount() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a href="/Account" classList={{ button: true }} tabIndex="0">
          <div id="FMAccountIcon"></div>
        </a>
      </div>
    </>
  );
}
