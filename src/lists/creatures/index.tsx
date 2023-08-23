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
    title: 'Aggro',
    link: '',
    displayArt: { cardName: 'Goblin Guide' },
    bgCards: [
      { cardName: 'isamaru, hound of konda' },
      { cardName: 'zurgo bellstriker' },
      { cardName: 'bloodsoaked champion' },
    ],
  },
  {
    title: 'Mana Dorks',
    link: '',
    displayArt: { cardName: 'llanowar elves', cardSet: 'pdom' },
    bgCards: [
      { cardName: 'noble hierarch' },
      { cardName: 'avacyns pilgrim' },
      { cardName: 'faeburrow elder' },
    ],
  },
  {
    title: 'Card Advantage',
    link: '',
    displayArt: { cardName: 'mulldrifter' },
    bgCards: [
      { cardName: 'elvish visionary' },
      { cardName: 'uro, titan of natures wrath' },
      { cardName: 'cloudkin seer' },
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
