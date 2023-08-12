import "./gridCardStyles.css";

export default function GridCard() {
  return (
    <>
      <div class="gridCardContainer">
        <div class="fullGridCard">
          <div class="gridCardBox">
            <div class="gridCardImage"></div>
            <div class="overlay"></div>
            <div class="gridCardTitle">Title</div>
            <a class="link"></a>
            <div class="gridCardBookmark"></div>
          </div>
          <p class="gridCardSubtitle">Subtitle</p>
        </div>
      </div>
    </>
  );
}
