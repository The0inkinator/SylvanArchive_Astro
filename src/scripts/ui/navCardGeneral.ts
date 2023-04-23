const pageNavCards = document.getElementsByClassName("navCardBookmark");
const bookmarkedNavCards: string[] = [];

for (let i = 0; i < pageNavCards.length; i++) {
  pageNavCards[i].setAttribute("id", "pageNavCard" + i);

  pageNavCards[i].addEventListener("click", () => {
    let navCardClicked = false;
    const pageNavCard = document.getElementById(`pageNavCard${i}`);
    if (pageNavCard instanceof HTMLElement) {
      if (navCardClicked === false) {
        pageNavCard.style.backgroundImage =
          "url('../../graphics/bookmarkOn.svg')";
        navCardClicked = true;
        bookmarkedNavCards.push(`pageNavCard${i}`);
        console.log(bookmarkedNavCards);
      } else {
        pageNavCard.style.backgroundImage =
          "url('../../graphics/bookmarkOff.svg')";
        navCardClicked = false;
      }
    }
  });
}
