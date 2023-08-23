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
    title: 'Artifacts',
    link: '',
    displayArt: { cardName: 'emry lurker of the loch' },
    bgCards: [
      { cardName: 'tinker', cardSet: 'v09' },
      { cardName: 'goblin welder' },
      { cardName: 'mindstone' },
    ],
  },
  {
    title: 'Spells',
    link: '',
    displayArt: { cardName: 'expressive iteration' },
    bgCards: [
      { cardName: 'young pyromancer', cardCollectNum: 364 },
      { cardName: 'ponder' },
      { cardName: 'faithless looting' },
    ],
  },
  {
    title: 'Aristocrats',
    link: '',
    displayArt: { cardName: 'bloodghast' },
    bgCards: [
      { cardName: 'blood artist' },
      { cardName: 'goblin bombardment' },
      { cardName: 'woe strider' },
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
