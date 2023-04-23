const pageNavCards = document.getElementsByClassName("navCardBookmark");
export const bookmarkedNavCards: object[] = [];

for (let i = 0; i < pageNavCards.length; i++) {
  pageNavCards[i].setAttribute("id", "pageNavCard" + i);

  pageNavCards[i].addEventListener("click", () => {
    let navCardClicked = false;
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
      }
    }
  });
}
