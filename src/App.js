import Header from './Components/Header/Header';
import Trades from './Modules/Trades';

import styles from './App.module.css';

function App () {
  return (
    <div className={styles.app}>
      <Header />
      <Trades />
    </div>
  );
}

export default App;
