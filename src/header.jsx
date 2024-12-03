import React, { useState, useEffect } from 'react';
import FormulaireConnexion from './FormulaireConnexion';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [estActif, setEstActif] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");

  const handleActif = (lien) => {
    setEstActif(lien);
  };

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    window.location.reload();
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  // Mise à jour de l'état d'authentification après une connexion réussie
  const handleAuthenticationSuccess = (user) => {
    setIsAuthenticated(true);
    setUserName(user.nom_utilisateur);  // Stocker le nom d'utilisateur
    setShowLoginForm(false);  // Fermer le formulaire de connexion
    localStorage.setItem('isAuthenticated', 'true');  // Optionnel pour garder l'état même après rechargement
    localStorage.setItem('userName', user.nom_utilisateur);
    localStorage.setItem('id', user.id);  // Stocker le nom d'utilisateur dans localStorage
  };

  useEffect(() => {
    // Récupérer l'état d'authentification à partir de localStorage
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUserName = localStorage.getItem('userName');
    const storedId = localStorage.getItem('id');

    console.log(storedAuthStatus, storedUserName, storedId);
    
    if (storedAuthStatus) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
      setId(storedId);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="assets/image/logoSpotify.png" alt="logo" />
        <span>Shawntify</span>
      </div>

      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className={`nav-link ${estActif === 'Accueil' ? 'active' : ''}`}
            href="/"
            onClick={() => handleActif("Accueil")}
          >
            <span className="icon"></span> Accueil
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${estActif === 'playlist' ? 'active' : ''}`}
            href="/playlist"
            onClick={() => handleActif('playlist')}
          >
            <span className="icon"></span> Playlists
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${estActif === 'AjouterMusique' ? 'active' : ''}`}
            href="/AjouterMusique"
            onClick={() => handleActif('AjouterMusique')}
          >
            <span className="icon"></span> Ajouter une musique
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${estActif === 'Apropos' ? 'active' : ''}`}
            href="/Apropos"
            onClick={() => handleActif('Apropos')}
          >
            <span className="icon"></span> À propos
          </a>
        </li>
      </ul>

      <div className="sidebar-footer">
        <a className="nav-link" href="#">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
          <span className="icon"></span> 
        </a>

        {isAuthenticated ? (
          <div>
            <span>Bonjour, {userName}!</span>  {/* Afficher le nom d'utilisateur */}
            <button className="boutonConnexion logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        ) : (
          <button className="boutonConnexion login-btn" onClick={handleLogin}>Connexion</button>
          
        )}
      </div>

      {showLoginForm && <FormulaireConnexion onClose={handleCloseLoginForm} setUser={handleAuthenticationSuccess} />}
    </nav>
  );
};

export default Header;
