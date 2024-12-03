import React, { useState } from 'react';
import axios from 'axios';
import './css/FormulaireConnexion.css';

const FormulaireSignin = ({ onClose, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Champ de confirmation pour l'inscription
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);


  // Connexion utilisateur
  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/user?nom_utilisateur=${username}&mots_passe=${password}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login successful:', response.data);
      setUser(response.data);
      // Si la connexion est réussie, fermez le formulaire et effectuez d'autres actions ici
      onClose();
    } catch (error) {
      // Gestion des erreurs de connexion
      console.error('Login error:', error.response ? error.response.data : error.message);
      setErrorMessage('Erreur lors de la tentative de connexion. Veuillez réessayer.');
    }
  };

  // Inscription utilisateur
  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage('Les mots de passe ne correspondent pas.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8080/addUser', { nom_utilisateur: username, mots_passe: password });
      console.log('Sign-up successful:', response.data);

      // Une fois l'inscription réussie, fermez le formulaire
      onClose();
    } catch (error) {
      console.error('Sign-up error:', error.response ? error.response.data : error.message);
      setErrorMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  // Soumettre le formulaire en fonction de l'action
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Réinitialiser le message d'erreur à chaque nouvelle tentative

    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label className="label_utilisateur">
            Nom d'utilisateur:
            <input
              className="input_utilisateur"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label className="label_password">
            Mot de passe:
            <input
              className="input_password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          {isSignUp && (
            <label className="label_confirm_password">
              Confirmer le mot de passe:
              <input
                className="input_confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          )}
          <br />
          <button className="BoutonConnexion" type="submit">
            {isSignUp ? 'S\'inscrire' : 'Se connecter'}
          </button>
          <p>
            {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
            <button className="BoutonInscription" type="button" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </p>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default FormulaireSignin;
