import './fmStyle.css';
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { CurrentScreenSize, screenSize } from '../../../scripts/screenSizeCalc';

// Establish Types
type MenuStates =
  | 'allClosed'
  | 'homeOpen'
  | 'searchOpen'
  | 'bookmarkOpen'
  | 'loading';

//Establish States
export const [menuState, setMenuState] = createSignal<MenuStates>('loading');

//Solid-Ref definitions for typescript

//Homebutton
let homeButton: HTMLAnchorElement;
let homeTitle: HTMLDivElement;
let initTitleWidth = () => window.getComputedStyle(homeTitle).width;
//Searchbar
let searchBar: HTMLDivElement;
let searchBarInput: HTMLInputElement;
let searchCloseButton: HTMLDivElement;
//BookmarkBar
let bookmarkBar: HTMLAnchorElement;
let bookmarkCloseButton: HTMLDivElement;

//Styling Adjust Functions

//Home Button
const openHome = () => {
  homeButton.style.width = `calc((var(--MenuHeight) * 1.2) + ${initTitleWidth()})`;
  homeButton.style.gridTemplateColumns = 'var(--MenuHeight) 1fr';
};

const closeHome = () => {
  homeButton.style.width = 'var(--MenuHeight)';
  homeButton.style.gridTemplateColumns = 'var(--MenuHeight) 0';
};

//Search Bar
const openSearch = () => {
  searchBar.style.width =
    'calc(var(--MenuHeight) * 2.2 + var(--SearchBarWidth))';
  searchBar.style.gridTemplateColumns =
    'var(--MenuHeight) 1fr var(--MenuHeight)';
  searchBarInput.style.cursor = 'text';
  searchCloseButton.style.display = 'grid';
};
const closeSearch = () => {
  searchBar.style.width = 'var(--MenuHeight)';
  searchBar.style.gridTemplateColumns = 'var(--MenuHeight) 0 0';
  searchCloseButton.style.display = 'none';
  //Logic
  searchBarInput.blur();
};

//Bookmark Bar
const openBookmark = () => {
  bookmarkBar.style.width =
    'calc(var(--MenuHeight) * 2.2 + var(--BookmarkBarWidth))';
  bookmarkBar.style.gridTemplateColumns =
    'var(--MenuHeight) 1fr var(--MenuHeight)';
  bookmarkCloseButton.style.display = 'grid';
};
const closeBookmark = () => {
  bookmarkBar.style.width = 'var(--MenuHeight)';
  bookmarkBar.style.gridTemplateColumns = 'var(--MenuHeight) 0 0';
  bookmarkCloseButton.style.display = 'none';
};

function FMHome() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a
          href="/"
          tabIndex="0"
          classList={{
            button: true,
          }}
          ref={homeButton}
          onFocusIn={() => {
            setMenuState('homeOpen');
          }}
        >
          <div id="FMHomeIcon"></div>
          <div style={'display: flex'}>
            <div classList={{ fmHomeTitle: true }} ref={homeTitle}>
              Sylvan Archive
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

function FMSearch() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <div
          ref={searchBar}
          classList={{ button: true }}
          //Focuses correct element when component is clicked
          onClick={() => {
            if (menuState() !== 'searchOpen') {
              searchBarInput.focus();
            }
          }}
        >
          <div id="FMSearchIcon"></div>
          <input
            ref={searchBarInput}
            tabindex="0"
            id="searchInput"
            value="Start searching"
            type="text"
            onFocusIn={() => {
              setMenuState('searchOpen');
            }}
            onFocusOut={() => {
              setMenuState('loading');
            }}
          />
          <div
            id="searchCloseButton"
            ref={searchCloseButton}
            //Timeout added to trigger after the onclick & focus listners above
            onClick={() => {
              setMenuState('loading');
              setTimeout(() => {
                searchBarInput.blur();
              }, 30);
            }}
          >
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

function FMBookmark() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a
          ref={bookmarkBar}
          classList={{ button: true }}
          tabIndex="0"
          onFocusIn={() => {
            setMenuState('bookmarkOpen');
          }}
          onFocusOut={() => {
            setMenuState('loading');
          }}
        >
          <div id="FMBookmarkIcon"></div>
          <div classList={{ fmHomeTitle: true }}>Bookmarks</div>
          <div
            id="bookmarkCloseButton"
            ref={bookmarkCloseButton}
            //Timeout added to trigger after the onclick & focus listners above
            onClick={() => {
              setMenuState('loading');
              setTimeout(() => {
                bookmarkBar.blur();
              }, 30);
            }}
          >
            <div></div>
            <div></div>
          </div>
        </a>
      </div>
    </>
  );
}

function FMAccount() {
  return (
    <>
      <div classList={{ menuItemContainer: true }}>
        <a
          href="/Account"
          classList={{ button: true }}
          tabIndex="0"
          onFocusIn={() => {
            setMenuState('loading');
          }}
        >
          <div id="FMAccountIcon"></div>
        </a>
      </div>
    </>
  );
}

export default function FloatingMenu() {
  // Visually adjusts bookmark based on menuState
  createEffect(() => {
    if (menuState() === 'bookmarkOpen') {
      openBookmark();
    } else {
      closeBookmark();
    }
  });

  // Visually adjusts searchbar based on menuState
  createEffect(() => {
    if (menuState() === 'searchOpen') {
      openSearch();
    } else {
      closeSearch();
    }
  });

  //Start scren size tracking script
  CurrentScreenSize();

  //Log Current Menu State
  createEffect(() => {
    console.log(menuState());
  });

  // Set menuState to "loading" whenever user scrolls or window is resized
  function StateCheck() {
    const setLoading = () => {
      setMenuState('loading');
    };

    createEffect(() => {
      window.addEventListener('resize', setLoading);

      onCleanup(() => {
        window.removeEventListener('resize', setLoading);
      });
    });

    createEffect(() => {
      window.addEventListener('scroll', () => {
        setLoading();
      });
      onCleanup(() => {
        window.removeEventListener('scroll', () => {
          setLoading();
        });
      });
    });
  }

  StateCheck();

  // Converts "loading" menuState based on scroll position & screen size
  createEffect(() => {
    if (menuState() === 'loading') {
      if (window.scrollY === 0 && screenSize() !== 'Mobile') {
        setMenuState('homeOpen');
      } else {
        setMenuState('allClosed');
      }
    }
  });

  // Visually adjusts based on menuState
  createEffect(() => {
    if (menuState() === 'homeOpen') {
      openHome();
    } else if (menuState() === 'searchOpen') {
      closeHome();
    } else {
      closeHome();
    }
  });

  return (
    <>
      <div class="floatingMenuContainer">
        <FMHome />
        <FMSearch />
        <FMBookmark />
        <FMAccount />
      </div>
    </>
  );
}
