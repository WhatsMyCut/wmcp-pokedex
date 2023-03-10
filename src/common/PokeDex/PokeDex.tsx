import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pokemon, PokemonClient } from 'pokenode-ts';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setCurrentPayload,
  setCurrentPokemon,
  setSelected,
} from '../../store/pokemonSlice';
import { searchButton } from './utils';
import './PokeDex.scss';

enum Screen {
  Search = 'search',
  SearchResults = 'searchresults',
  Abilities = 'abilities',
  Moves = 'moves',
  Default = 'default',
}

const PokeDex = (): JSX.Element => {
  const api = new PokemonClient();
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemon.selected);
  const data = useAppSelector((state) => state.pokemon.data);
  const isLoading = useRef<boolean>(true);
  const [displayScreen, setDisplayScreen] = useState<Screen>(Screen.Default);
  const [searchMode, setSearchMode] = useState<number>(0);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [searchString, setSearchString] = useState<string>('');
  const [movesIndex, setMovesIndex] = useState<number>(0);
  const [abilitiesIndex, setAbilitiesIndex] = useState<number>(0);

  const setBGImage = (imgSrc: string | null) => {
    document.documentElement.style.setProperty('--main-bg-image', imgSrc || '');
  };

  const handleDownKey = () => {
    if (data && data.results) {
      const idx = data.results.indexOf(selected);
      if (idx - 1 >= 0) {
        dispatch(setSelected(data.results[idx - 1]));
      }
    }
  };

  const handleUpKey = () => {
    if (data && data.results) {
      const idx = data.results.indexOf(selected);

      if (idx + 1 <= data.results.length - 1) {
        dispatch(setSelected(data.results[idx + 1]));
      } else {
        if (data.next) {
          const options = data.next
            .replace('https://pokeapi.co/api/v2/pokemon?', '')
            .replaceAll('=', ': ')
            .replaceAll('&', ', ')
            .split(', ');
          const offset = Number(options[0].replace('offset: ', ''));
          api.listPokemons(offset).then((res) => {
            dispatch(setSelected(res.results[0]));
            const combined = data.results.concat(res.results);
            const allData = {
              count: res.count,
              next: res.next,
              previous: res.previous,
              results: combined,
            };
            dispatch(setCurrentPayload(allData));
          });
        }
      }
    }
  };

  const handleButton = (event: React.MouseEvent) => {
    if (event.clientY < 290) {
      // console.log('up', { event });
      switch (displayScreen) {
        case Screen.Moves:
          if (pokemon?.moves && movesIndex + 1 <= pokemon?.moves.length - 1) {
            setMovesIndex(movesIndex + 1);
          } else {
            setMovesIndex(0);
          }
          break;
        case Screen.Abilities:
          if (
            pokemon?.abilities &&
            abilitiesIndex + 1 <= pokemon?.abilities.length - 1
          ) {
            setAbilitiesIndex(abilitiesIndex + 1);
          } else {
            setAbilitiesIndex(0);
          }
          break;
        default:
          break;
      }
    }
    if (event.clientY > 310) {
      // console.log('down', { event });
      switch (displayScreen) {
        case Screen.Moves:
          if (movesIndex - 1 >= 0) {
            setMovesIndex(movesIndex - 1);
          }
          break;
        case Screen.Abilities:
          if (abilitiesIndex - 1 >= 0) {
            setAbilitiesIndex(abilitiesIndex - 1);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleHButton = (event: React.MouseEvent) => {
    if (event.clientX < 315) {
      switch (displayScreen) {
        case Screen.Default:
          setDisplayScreen(Screen.Abilities);
          break;
        case Screen.Abilities:
          setAbilitiesIndex(0);
          setDisplayScreen(Screen.Moves);
          break;
        case Screen.Moves:
          setMovesIndex(0);
          setDisplayScreen(Screen.Default);
          break;
      }
      // console.log('left', { displayScreen });
    }
    if (event.clientX > 335) {
      switch (displayScreen) {
        case Screen.Default:
          setDisplayScreen(Screen.Moves);
          break;
        case Screen.Abilities:
          setDisplayScreen(Screen.Default);
          break;
        case Screen.Moves:
          setDisplayScreen(Screen.Abilities);
          break;
      }
      // console.log('right', { displayScreen });
    }
  };

  const handleCircleButton = (event: React.MouseEvent) => {
    // console.log('select', { event });
  };

  const showSearch = () => {
    if (displayScreen === 'search') {
      setDisplayScreen(Screen.SearchResults);
    } else {
      setDisplayScreen(Screen.Search);
    }
  };

  const clearSearch = () => {
    setDisplayScreen(Screen.Default);
    setSearchString('');
  };

  const handleLeftSearchButton = () => {
    if (searchMode - 1 >= 0) {
      setSearchMode(searchMode - 1);
    }
  };

  const handleRightSearchButton = () => {
    if (searchMode + 1 <= 5) {
      setSearchMode(searchMode + 1);
    }
  };

  const handleSearchButton = (index: number) => {
    if (displayScreen !== 'search') return;
    const letter = searchButton(index, searchMode);
    const ss = searchString || '';
    setSearchString(ss + letter?.toLowerCase());
  };

  const defaultScreen = useCallback(() => {
    return (
      <>
        {'Height:'} {pokemon?.height ? pokemon?.height + 'cm' : '-'}
        <br />
        {'Weight:'} {pokemon?.weight ? pokemon?.weight + 'kg' : '-'}
      </>
    );
  }, [pokemon]);

  const searchScreen = () => {
    return (
      <>
        {'Search:'}
        <br />
        {searchString || '-'}
      </>
    );
  };

  const searchResultsScreen = () => {
    const results = data?.results.filter(
      (pok) => pok.name.indexOf(searchString) !== -1
    );
    return (
      <>
        {'Search Results:'}
        <br />
        {results && results[0] && results[0].name}
      </>
    );
  };

  const movesScreen = () => {
    return (
      <>
        {'Moves:'}
        <br />
        {!pokemon?.moves && '-'}
        {pokemon?.moves[movesIndex] && pokemon?.moves[movesIndex].move.name}
      </>
    );
  };

  const abilitiesScreen = () => {
    return (
      <>
        {'Abilities:'}
        <br />
        {!pokemon?.abilities && '-'}
        {pokemon?.abilities[abilitiesIndex] &&
          pokemon?.abilities[abilitiesIndex].ability.name}
      </>
    );
  };

  const aboutScreen = () => {
    switch (displayScreen) {
      case 'search':
        return searchScreen();
      case 'searchresults':
        return searchResultsScreen();
      case 'moves':
        return movesScreen();
      case 'abilities':
        return abilitiesScreen();
      default:
        return defaultScreen();
    }
  };

  useEffect(() => {
    if (selected.name !== '' && selected.name !== pokemon?.name) {
      isLoading.current = true;
      api
        .getPokemonByName(selected?.name)
        .then((pk) => {
          setPokemon(pk);
          setBGImage(pk?.sprites?.front_default);
          dispatch(setCurrentPokemon(pk));
          isLoading.current = false;
        })
        .catch((error) => console.error(error));
    }
  }, [selected]);

  return (
    <div className="App">
      Pokedex
      <div id="pokedex">
        {/* Left Panel */}
        <div id="left-panel">
          {/*  Top lights */}
          <div className="left-top-container">
            <svg height="100" width="225" className="left-svg">
              <polyline
                points="0,75 70,75 90,38 224,38"
                style={{ fill: 'none', stroke: 'black', strokeWidth: 3 }}
              />
            </svg>
            <div className="lights-container">
              <div className="big-light-border">
                <div className="big-light blue">
                  <div className="big-dot light-blue"></div>
                </div>
              </div>
              <div className="small-lights-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="small-light yellow">
                  <div className="dot light-yellow"></div>
                </div>
                <div className="small-light green">
                  <div className="dot light-green"></div>
                </div>
              </div>
            </div>
          </div>
          {/*  Center Screen */}
          <div className="screen-container">
            <div className="screen">
              <div className="top-screen-lights">
                <div className="mini-light red"></div>
                <div className="mini-light red"></div>
              </div>
              <div id="main-screen">
                {isLoading.current && <>Initializing...</>}
                {!isLoading.current && (
                  <img
                    src={
                      pokemon?.sprites?.versions['generation-i']['red-blue']
                        .front_default || ''
                    }
                    alt={pokemon?.name}
                    style={{
                      height: '106px',
                      width: '108px',
                      backgroundSize: 'contain',
                    }}
                  />
                )}
              </div>
              <div className="bottom-screen-lights">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="burger">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>
          {/*  Bottom Buttons */}
          <div className="buttons-container">
            <div className="upper-buttons-container">
              <div className="big-button"></div>
              <div className="long-buttons-container">
                <div className="long-button red" onClick={handleDownKey}></div>
                <div
                  className="long-button light-blue"
                  onClick={handleUpKey}
                ></div>
              </div>
            </div>
            <div className="nav-buttons-container">
              <div className="dots-container">
                <div>.</div>
                <div>.</div>
              </div>
              <div className="green-screen">
                <span id="name-screen">{pokemon?.name || '-'}</span>
              </div>
              <div className="right-nav-container">
                <div className="nav-button">
                  <div
                    className="nav-center-circle"
                    onClick={handleCircleButton}
                  ></div>
                  <div className="nav-button-vertical" onClick={handleButton} />
                  <div
                    className="nav-button-horizontal"
                    onClick={handleHButton}
                  >
                    <div className="border-top"></div>
                    <div className="border-bottom"></div>
                  </div>
                </div>
                <div className="bottom-right-nav-container">
                  <div className="small-light red">
                    <div className="dot light-red"></div>
                  </div>
                  <div className="dots-container">
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                    <div className="black-dot">.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  End of Left panel */}

        {/*  Right-panel */}
        <div id="right-panel">
          {/*  Blank container */}
          <div className="empty-container">
            <svg height="100%" width="100%">
              <polyline
                points="0,0 0,40 138,40 158,75 250,75 250,0 0,0"
                style={{ fill: '#f2f2f2', stroke: 'none', strokeWidth: 3 }}
              />
              <polyline
                points="0,40 138,40 158,75 250,75"
                style={{ fill: 'none', stroke: 'black', strokeWidth: 3 }}
              />
            </svg>
          </div>
          {/*  Top screen */}
          <div className="top-screen-container">
            <div id="about-screen" className="right-panel-screen">
              {aboutScreen()}
            </div>
          </div>
          {/*  Blue Buttons */}
          <div className="square-buttons-container">
            <div className="blue-squares-container">
              <div
                className="blue-square"
                onClick={() => handleSearchButton(0)}
              >
                {searchButton(0, searchMode)}
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(1)}
              >
                {searchButton(1, searchMode)}
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(2)}
              >
                {searchButton(2, searchMode)}
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(3)}
              >
                {searchButton(3, searchMode)}
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(4)}
              >
                {searchButton(4, searchMode)}
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(5)}
              >
                0
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(6)}
              >
                1
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(7)}
              >
                2
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(8)}
              >
                3
              </div>
              <div
                className="blue-square"
                onClick={() => handleSearchButton(9)}
              >
                4
              </div>
            </div>
          </div>
          {/*  Center Buttons */}
          <div className="center-buttons-container">
            <div className="center-left-container">
              <div className="small-reds-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
              </div>
              <div className="white-squares-container">
                <div className="white-square" onClick={showSearch}>
                  Search
                </div>
                <div className="white-square" onClick={clearSearch}>
                  Clear
                </div>
              </div>
            </div>
            <div className="center-right-container">
              <div className="thin-buttons-container">
                <div
                  className="thin-button"
                  onClick={handleLeftSearchButton}
                ></div>
                <div
                  className="thin-button"
                  onClick={handleRightSearchButton}
                ></div>
              </div>
              <div className="yellow-button yellow">
                <div className="big-dot light-yellow"></div>
              </div>
            </div>
          </div>
          {/*  Bottom screens */}
          <div className="bottom-screens-container">
            <div id="type-screen" className="right-panel-screen">
              {pokemon?.types[0]?.type?.name
                ? pokemon?.types[0]?.type?.name
                : '-'}
            </div>
            <div id="id-screen" className="right-panel-screen">
              {pokemon?.id ? '#' + pokemon?.id : '-'}
            </div>
          </div>
        </div>
      </div>
      {/* <div>{JSON.stringify(pokemon)}</div> */}
    </div>
  );
};

export default PokeDex;
