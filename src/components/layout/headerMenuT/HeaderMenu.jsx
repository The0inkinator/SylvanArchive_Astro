import "./headerMenuStyles.css";

export default function HeaderMenuT() {
  return (
    <>
      <div id="menu">
        <HomeButton />
        <SearchBar />
        <BookmarkBar />
        <AccountButton />
      </div>
    </>
  );
}

const HomeButton = () => {
  return (
    <>
      <div class="homeButtonContainer">
        <a tabindex="0" href="/" id="homeButton">
          <div id="homeButtonLogo"></div>
          <div id="homeButtonTitle">Sylvan Archive</div>
        </a>
      </div>
    </>
  );
};

const SearchBar = () => {
  return (
    <>
      <div class="searchBarContainer">
        <div id="searchBar">
          <div id="searchBarLogo"></div>
          <input
            tabindex="0"
            id="searchBarInput"
            value="Start searching"
            type="text"
          />
          <div id="searchCloseButton">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

const BookmarkBar = () => {
  return (
    <>
      <div class="bookmarkBarContainer">
        <div id="bookmarkBar">
          <div id="bookmarkBarLogo"></div>
          <div tabindex="0" id="bookmarkDropdown">
            Bookmarks
          </div>
          <div id="bookmarkCloseButton">
            <div></div>
            <div></div>
          </div>
        </div>
        <ul id="bookmarkListContainer"></ul>
      </div>
    </>
  );
};

const AccountButton = () => {
  return (
    <>
      <div tabindex="-1" class="accountButtonContainer">
        <a tabindex="0" href="/Account" id="accountButton">
          <div id="accountButtonLogo"></div>
        </a>
      </div>
    </>
  );
};
