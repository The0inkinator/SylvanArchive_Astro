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
  // {
  //   title: "White",
  //   link: "",
  //   displayArt: { cardName: "swords to plowshares", cardSet: "ema" },
  //   bgCards: [
  //     { cardName: "thraben inspector" },
  //     { cardName: "thalia, guardian of thraben" },
  //     { cardName: "armageddon" },
  //   ],
  // },
  // {
  //   title: "Blue",
  //   link: "",
  //   displayArt: { cardName: "counterspell", cardSet: "ema" },
  //   bgCards: [
  //     { cardName: "preordain" },
  //     { cardName: "thassas oracle" },
  //     { cardName: "as foretold" },
  //   ],
  // },
  // {
  //   title: "Black",
  //   link: "",
  //   displayArt: { cardName: "thoughtseize" },
  //   bgCards: [
  //     { cardName: "fatal push" },
  //     { cardName: "dark confidant" },
  //     { cardName: "necropotence" },
  //   ],
  // },
  // {
  //   title: "Red",
  //   link: "",
  //   displayArt: { cardName: "fiery emancipation" },
  //   bgCards: [
  //     { cardName: "goblin guide" },
  //     { cardName: "searing blaze" },
  //     { cardName: "chandra torch of defiance" },
  //   ],
  // },
  // {
  //   title: "Green",
  //   link: "",
  //   displayArt: { cardName: "craterhoof behemoth" },
  //   bgCards: [
  //     { cardName: "Elvish Mystic" },
  //     { cardName: "farseek" },
  //     { cardName: "Natural Order" },
  //   ],
  // },
  {
    title: 'White',
    link: '/colors/white',
    displayArt: { cardName: 'swords to plowshares', cardSet: 'ema' },
    bgCards: [
      { cardName: 'thraben inspector' },
      { cardName: 'thalia, guardian of thraben' },
      { cardName: 'armageddon' },
    ],
  },
  {
    title: 'Blue',
    link: '/colors/blue',
    displayArt: { cardName: 'counterspell', cardSet: 'ema' },
    bgCards: [
      { cardName: 'preordain' },
      { cardName: 'thassas oracle' },
      { cardName: 'as foretold' },
    ],
  },
  {
    title: 'Black',
    link: '/colors/black',
    displayArt: { cardName: 'thoughtseize' },
    bgCards: [
      { cardName: 'fatal push' },
      { cardName: 'dark confidant' },
      { cardName: 'necropotence' },
    ],
  },
  {
    title: 'Red',
    link: '/colors/red',
    displayArt: { cardName: 'fiery emancipation' },
    bgCards: [{ cardName: 'goblin guide' }, { cardName: 'searing blaze' }],
  },
  {
    title: 'Green',
    link: '/colors/green',
    displayArt: { cardName: 'craterhoof behemoth' },
    bgCards: [{ cardName: 'Elvish Mystic' }],
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
