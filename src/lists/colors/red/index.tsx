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
    title: 'Creatures',
    link: '',
    displayArt: { cardName: 'Eidolon of the Great Revel' },
    bgCards: [
      { cardName: 'Goblin Guide' },
      { cardName: 'Laelia, the blade Reforged' },
      { cardName: 'Fury' },
    ],
  },
  {
    title: 'Spells',
    link: '',
    displayArt: { cardName: 'Lightning Bolt' },
    bgCards: [
      { cardName: 'Flame Slash' },
      { cardName: 'pyroclasm' },
      { cardName: 'fiery emancipation' },
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
