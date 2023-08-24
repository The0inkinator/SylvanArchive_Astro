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
    title: 'Fixing Lands',
    link: '',
    displayArt: { cardName: 'Flooded Strand' },
    bgCards: [
      { cardName: 'Underground sea', cardSet: 'vma' },
      { cardName: 'copperline gorge', cardSet: 'som' },
      { cardName: 'Temple garden' },
    ],
  },
  {
    title: 'Utility Lands',
    link: '',
    displayArt: { cardName: 'Field of ruin' },
    bgCards: [
      { cardName: 'rishadan port' },
      { cardName: 'Wasteland' },
      { cardName: 'Ancient Tomb' },
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
