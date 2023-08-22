type CardFetcherInputs = {
  cardName: string;
  cardSet?: string;
  cardCollectNum?: number;
  cardFace?: "front" | "back";
};

interface GridCardInputs {
  link: string;
  title: string;
  displayArt: CardFetcherInputs;
  bgCards?: CardFetcherInputs[];
}
const TestList: GridCardInputs[] = [
  {
    title: "Double Faced Cards",
    link: "",
    displayArt: { cardName: "Huntmaster of the fells", cardCollectNum: 1 },
    bgCards: [
      { cardName: "thing in the ice", cardFace: "front" },
      { cardName: "thing in the ice", cardFace: "back" },
      { cardName: "needleverge pathway" },
    ],
  },

  {
    title: "Izzet Spells",
    link: "",
    displayArt: { cardName: "young pyromancer", cardSet: "2x2" },
    bgCards: [
      { cardName: "Lightning Bolt" },
      { cardName: "Expressive iteration", cardCollectNum: 196 },
    ],
  },
  {
    title: "Literally The One Ring",
    link: "",
    displayArt: { cardName: "the one ring", cardCollectNum: 1 },
    bgCards: [{ cardName: "the one ring" }],
  },
];
export default TestList;
