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
      <div className="view-history">{JSON.stringify(history)}</div>
    </>
  );
};

export default ViewHistory;
