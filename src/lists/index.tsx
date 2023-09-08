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
    title: 'Lands',
    link: '/lands',
    displayArt: { cardName: 'flooded strand', cardSet: 'bfz' },
    bgCards: [{ cardName: 'field of ruin' }, { cardName: 'Rishadan Port' }],
  },
  {
    title: 'Creatures',
    link: '/creatures',
    displayArt: { cardName: 'Morophon the boundless' },
    bgCards: [
      { cardName: 'Goblin Guide' },
      { cardName: 'Llanowar Elves' },
      { cardName: 'Mulldrifter' },
    ],
  },
  {
    title: 'Spells',
    link: '/spells',
    displayArt: { cardName: 'Supreme Verdict', cardSet: '2x2' },
    bgCards: [
      { cardName: 'Vindicate' },
      { cardName: 'Counterspell' },
      { cardName: 'Giant Growth' },
    ],
  },
  {
    title: 'Archtypes',
    link: '/archetypes',
    displayArt: { cardName: 'Mayhem Devil' },
    bgCards: [
      { cardName: 'Emry Lurker of the loch' },
      { cardName: 'Expressive iteration' },
      { cardName: 'Bloodghast' },
    ],
  },
  {
    title: 'Colors',
    link: '/colors',
    displayArt: { cardName: 'Mana confluence', cardSet: 'sld' },
    bgCards: [
      { cardName: 'Swords to plowshares' },
      { cardName: 'counterspell' },
      { cardName: 'thoughtseize' },
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
