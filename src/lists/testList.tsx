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
    title: "LOTR Cards",
    link: "",
    displayArt: { cardName: "the one ring", cardCollectNum: 1 },
    bgCards: [
      { cardName: "the one ring" },
      { cardName: "bilbo retired burglar" },
      { cardName: "nazgul" },
    ],
  },
];
export default TestList;
