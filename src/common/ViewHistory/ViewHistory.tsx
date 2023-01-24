import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import './ViewHistory.scss';

const ViewHistory = (): JSX.Element => {
  const history = useAppSelector((state) => state.pokemon.viewHistory);

  useEffect(() => {
    history;
    localStorage.setItem('history', JSON.stringify(history));
  }, []);

  return (
    <>
      <div className="header">View History</div>
      <div className="view-history">
        {history.map((v) => (
          <div key={v.name}>
            {v.name}
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewHistory;
