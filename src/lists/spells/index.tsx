type CardFetcherInputs = {
  cardName: string;
  cardSet?: string;
  cardCollectNum?: number;
  cardFace?: 'front' | 'back';
};

interface GridCardInputs {
  link: string;
  title: string;
  displayArt: CardFetcherInputs;
  bgCards?: CardFetcherInputs[];
}
const FixingLands: GridCardInputs[] = [
  {
    title: 'Removal',
    link: '',
    displayArt: { cardName: 'vindicate', cardCollectNum: 322 },
    bgCards: [
      { cardName: 'swords to plowshares' },
      { cardName: 'lightning bolt' },
      { cardName: 'fatal push' },
    ],
  },
  {
    title: 'Counter Magic',
    link: '',
    displayArt: { cardName: 'counter spell', cardSet: 'ema' },
    bgCards: [
      { cardName: 'make disappear' },
      { cardName: 'mana tithe' },
      { cardName: 'tibalts trickery' },
    ],
  },
  {
    title: 'Combat Tricks',
    link: '',
    displayArt: { cardName: 'Giant Growth' },
    bgCards: [
      { cardName: 'infuriate' },
      { cardName: 'fight as one' },
      { cardName: 'Embercleave' },
    ],
  },
];
export default FixingLands;

// {
//   title: 'Title',
//   link: '',
//   displayArt: { cardName: 'DiplayArt'},
//   bgCards: [
//     { cardName: 'Bg Card 1' },
//     { cardName: 'Bg Card  2' },
//     { cardName: 'Bg Card  3' },
//   ],
// },
