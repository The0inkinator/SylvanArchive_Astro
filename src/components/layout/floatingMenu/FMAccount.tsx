import { menuState, setMenuState } from "./FloatingMenu";

export default function FMAccount() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a classList={{ button: true }} tabIndex="4">
          <div id="FMAccountIcon"></div>
        </a>
      </div>
    </>
  );
}
