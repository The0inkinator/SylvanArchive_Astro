import MTGCardArt from '../backend/MTGCardArt';
import { createSignal } from 'solid-js';

const [image, setImage] = createSignal();

export default function APITester() {
  return (
    <>
      <button
        onClick={() => {
          console.log('running API Test');
          MTGCardArt('Goblin Guide');
          console.log(MTGCardArt('Goblin Guide'));
        }}
      >
        Run API Test
      </button>
      <div style={'width: 12rem; height: 12rem; background-color: red'}></div>
    </>
  );
}
