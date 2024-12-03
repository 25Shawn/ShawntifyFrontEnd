import React from 'react';

const Footer = () => {
  return (
    <footer className="spotify-footer">
      <div className="footer-content">
        <div className="footer-section links">
          <ul>
            <li><a href="/AjouterMusique">Ajouter une Musique</a></li>
            <li><a href="/playlist">Playlist</a></li>
            <li><a href="/Apropos">À Propos</a></li>
            <li><a href="/Accueil">Accueil</a></li>
          </ul>
        </div>
        <div className="footer-section social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className="footer-section copyright">
          <p>&copy; 2024 Shawntify | Site 100% legit!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
