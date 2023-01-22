import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEventHandler,
} from 'react';
import { Pokemon, PokemonClient } from 'pokenode-ts';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPokemon } from '../../store/pokemonSlice';
import './PokeDex.scss';
interface Props {
  // data: NamedAPIResource[];
  client: PokemonClient;
}

function PokeDex(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemon.selected);
  const isLoading = useRef<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

  const setBGImage = (imgSrc: string | null) => {
    console.log({ imgSrc });
    document.documentElement.style.backgroundImage = imgSrc || '';
  };

  const handleUpButton = useCallback((event: MouseEventHandler<HTMLDivElement, MouseEvent>) => {
    console.log('handleUpButton', { event });
    if (event.clientY < 389) {
      console.log('handleUp')
    }
    if (event.clientY > 415) {
      console.log('handleDown')
    }
  }, []);

  const

  useEffect(() => {
    if (selected.name !== '' && selected.name !== pokemon?.name) {
      console.log({ selected });
      const api = new PokemonClient();
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
                      pokemon?.sprites?.versions['generation-i'].yellow
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
                <div className="long-button red"></div>
                <div className="long-button light-blue"></div>
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
                  <div className="nav-center-circle"></div>
                  <button
                    className="nav-button-vertical"
                    onClick={handleUpButton}
                  />
                  <div className="nav-button-horizontal">
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
              {'Height:'} {pokemon?.height ? pokemon?.height + 'cm' : '-'}
              <br />
              {'Weight:'} {pokemon?.weight ? pokemon?.weight + 'kg' : '-'}
            </div>
          </div>
          {/*  Blue Buttons */}
          <div className="square-buttons-container">
            <div className="blue-squares-container">
              <div className="blue-square">A</div>
              <div className="blue-square">B</div>
              <div className="blue-square">C</div>
              <div className="blue-square">D</div>
              <div className="blue-square">E</div>
              <div className="blue-square">0</div>
              <div className="blue-square">1</div>
              <div className="blue-square">2</div>
              <div className="blue-square">3</div>
              <div className="blue-square">4</div>
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
                <div className="white-square">Search</div>
                <div className="white-square">Clear</div>
              </div>
            </div>
            <div className="center-right-container">
              <div className="thin-buttons-container">
                <div className="thin-button"></div>
                <div className="thin-button"></div>
              </div>
              <div className="yellow-button yellow">
                <div className="big-dot light-yellow"></div>
              </div>
            </div>
          </div>
          {/*  Bottom screens */}
          <div className="bottom-screens-container">
            <div id="type-screen" className="right-panel-screen">
              grass
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
}

export default PokeDex;
