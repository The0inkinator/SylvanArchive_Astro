import './shelfStyles.css';
import Stack from '../stack/Stack';

export default function Shelf() {
  return (
    <div class="shelfContainer">
      <div class="stackSlider">
        <Stack />
      </div>
    </div>
  );
}
