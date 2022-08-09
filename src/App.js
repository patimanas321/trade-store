import React from 'react';
import Header from './Components/Header/Header';
import Trades from './Modules/Trades';

import styles from './App.module.css';

function App () {
  return (
    <div className={styles.app}>
      <div className={styles.contentWrapper}>
        <Header />
        <Trades />
      </div>
    </div>
  );
}

export default App;
