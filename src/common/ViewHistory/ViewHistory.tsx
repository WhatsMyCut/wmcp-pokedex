import React, { useEffect } from 'react';
import { setSelected } from '../../store/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './ViewHistory.scss';

const ViewHistory = (): JSX.Element => {
  const history = useAppSelector((state) => state.pokemon.viewHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    history;
    localStorage.setItem('history', JSON.stringify(history));
  }, []);

  return (
    <>
      <div className="header">View History</div>
      <div className="view-history">
        {history.map((v, i) => (
          <div
            key={v.name + i}
            className={i % 2 === 0 ? 'odd' : 'even'}
            onClick={() => dispatch(setSelected(v))}
          >
            {v.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewHistory;
