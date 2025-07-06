// src/Header.js
import React from 'react';

const Header = ({ language, toggleLanguage }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>SneakerPulse</h1>
      <button onClick={toggleLanguage} style={styles.langBtn}>
        {language === 'en' ? 'FR' : 'EN'}
      </button>
    </header>
  );
};

const styles = {
  header: {
    padding: '1rem 2rem',
    backgroundColor: '#3b82f6', // bright blue
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '0 0 12px 12px',
  },
  logo: {
    margin: 0,
    fontWeight: '700',
    fontSize: '2rem',
  },
  langBtn: {
    backgroundColor: 'white',
    color: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '4rem',
  },
};

export default Header;
