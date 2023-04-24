const pageNavCards = document.getElementsByClassName("navCardBookmark");
export const bookmarkedNavCards: object[] = [];

for (let i = 0; i < pageNavCards.length; i++) {
  pageNavCards[i].setAttribute("id", "pageNavCard" + i);
  let navCardClicked = false;

  pageNavCards[i].addEventListener("click", () => {
    const pageNavCard = document.getElementById(`pageNavCard${i}`);

    if (pageNavCard instanceof HTMLElement) {
      const pageNavCardTitle = pageNavCard.previousSibling?.previousSibling
        ?.previousSibling?.previousSibling as HTMLDivElement;
      const pageNavCardImage = pageNavCard.previousSibling?.previousSibling
        ?.previousSibling?.previousSibling?.previousSibling?.previousSibling
        ?.previousSibling?.previousSibling as HTMLElement;

      if (navCardClicked === false) {
        pageNavCard.style.backgroundImage =
          "url('../../graphics/bookmarkOn.svg')";
        navCardClicked = true;
        bookmarkedNavCards.push({
          id: `pageNavCard${i}`,
          title: pageNavCardTitle.innerHTML,
          image: pageNavCardImage.style.backgroundImage,
        });
      } else {
        pageNavCard.style.backgroundImage =
          "url('../../graphics/bookmarkOff.svg')";
        navCardClicked = false;
        const pageNavCardToRemove = `pageNavCard${i}`;
        const indexToRemove = bookmarkedNavCards.findIndex(
          (bookmark) => bookmark.id === pageNavCardToRemove
        );
        if (indexToRemove !== -1) {
          bookmarkedNavCards.splice(indexToRemove, 1);
        }
      }
    }
  });
}
