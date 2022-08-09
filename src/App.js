import React from 'react';

import Header from './Components/Header/Header';
import Trades from './Modules/Trades';
import styles from './App.module.css';
import ErrorBoundary from './ErrorBoundary';
import APIError from './Components/APIError';

function App () {
  return (
    <div className={styles.app}>
      <div className={styles.contentWrapper}>
        <Header />
        <ErrorBoundary>
          <APIError />
          <Trades />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
