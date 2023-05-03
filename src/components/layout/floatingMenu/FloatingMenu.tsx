import FMHome from './FMHome';
import FMSearch from './FMSearch';
import FMBookmark from './FMBookmark';
import FMAccount from './FMAccount';
import './floatingMenuStyles/floatingMenuStyle.css';
import './floatingMenuStyles/fmItemStyle.css';

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
