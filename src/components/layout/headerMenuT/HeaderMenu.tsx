import { createEffect, createSignal, Switch, Match, Show } from 'solid-js';
import { createScrollPosition } from '@solid-primitives/scroll';
import './headerMenuStyles.css';

export const [homeScrolled, setHomeScrolled] = createSignal(false);
export const [searchFocused, setSearchFocused] = createSignal(false);
export const [bookmarksFocused, setBookmarksFocused] = createSignal(false);
export const windowScroll = createScrollPosition();

export default function HeaderMenuT() {
  setHomeScrolled(true);
  console.log(homeScrolled());
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
        <a
          tabindex="0"
          id="homeButton"
          href="/"
          // classList={{ homeButtonScrolled: homeScrolled() === true }}
          class="test"
        >
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
        <div
          id="searchBar"
          onClick={() => {
            document.getElementById('searchBarInput').focus();
          }}
          onFocusIn={() => {
            setSearchFocused(true);
          }}
          onFocusOut={() => {
            setSearchFocused(false);
          }}
        >
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
        <div
          id="bookmarkBar"
          onClick={() => {
            document.getElementById('bookmarkDropdown').focus();
          }}
          onFocusIn={() => {
            setBookmarksFocused(true);
          }}
          onFocusOut={() => {
            setBookmarksFocused(false);
          }}
        >
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
