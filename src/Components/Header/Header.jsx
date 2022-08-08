import React from 'react';
import useLocalize from '../../Hooks/useLocalize';

import styles from './Header.module.css';

const Header = () => {
  const translate = useLocalize();

  return (
    <header className={ styles.header }>
      <h1 data-testid="app-header">{translate('header')}</h1>
    </header>
  );
};

export default Header;
