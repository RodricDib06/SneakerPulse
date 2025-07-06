import React from 'react';

const Footer = ({ t }) => {
  return (
    <footer style={styles.footer}>
      <p>{t.footer.rights}</p>
      <p>{t.footer.madeBy}</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: '3rem',
    padding: '1rem 2rem',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    textAlign: 'center',
    borderRadius: '12px 12px 0 0',
    fontSize: '0.9rem',
  },
};

export default Footer;
