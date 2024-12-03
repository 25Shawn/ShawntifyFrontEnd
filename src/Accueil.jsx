import React, { useState, useEffect } from 'react';
import Footer from './footer';
import axios from 'axios';

const Accueil = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);  // Pour afficher un état de chargement
  const [error, setError] = useState(null);  // Pour capturer les erreurs

  const [album, setAlbum] = useState([
    { id: 1, nom: "Graduation", image: "https://i.pinimg.com/enabled/564x/cd/8a/02/cd8a024a8d8c05e5c39d2e0de731dba3.jpg", lien: "https://open.spotify.com/intl-fr/album/4SZko61aMnmgvNhfhgTuD3?si=gcDsGxbJSz6NZJcLrBFW1w", artist: "Kanye West" },
    { id: 2, nom: "Jesus is King", image: "https://i.pinimg.com/736x/5b/c5/25/5bc52530d23b8a63acefc3dc1efb295c.jpg", lien: "https://open.spotify.com/intl-fr/album/0FgZKfoU2Br5sHOfvZKTI9?si=ED9VfE9PQNm3RJxf0fFjIw", artist: "Kanye West" },
    { id: 3, nom: "The life of Pablo", image: "https://i.pinimg.com/enabled/564x/26/78/3f/26783f2be5d4a6f46b1c7e24323e6482.jpg", lien: "https://open.spotify.com/intl-fr/album/7gsWAHLeT0w7es6FofOXk1?si=e1cEHrgnQzaMf6_AAvVfvg", artist: "Kanye West" },
    { id: 4, nom: "SAVAGE MODE II", image: "https://i.pinimg.com/enabled/564x/f1/c3/0a/f1c30a02a37cb3c6cdab4e20bb7fbf00.jpg", lien: "https://open.spotify.com/intl-fr/album/6wTyGUWGCilBFZ837k5aRi?si=C-ru8RPFQUSQVSQW4SofDQ", artist: "21 Savage, Metro Boomin" },
    { id: 5, nom: "Culture II", image: "https://i.pinimg.com/564x/07/c1/9c/07c19cf1e7a8ab94a80557e4fa451e0e.jpg", lien: "https://open.spotify.com/intl-fr/album/7fd7SEK25VS3gJAUgSwL6y?si=5urAGmr3SpuYnwdJlkZaVw", artist: "Migos" },
    { id: 6, nom: "ASTROWORLD", image: "https://i.pinimg.com/enabled/564x/61/99/95/6199952ac4d1b93427fe9da7ae266eb8.jpg", lien: "https://open.spotify.com/intl-fr/album/41GuZcammIkupMPKH2OJ6I?si=anoV7RL7Tg-rPwkc3njwiw", artist: "Travis Scott" },
    { id: 7, nom: "Bandit", image: "https://i.pinimg.com/736x/29/6b/a8/296ba802088cb2f45edf76bfe18cf4b2.jpg", lien: "https://open.spotify.com/intl-fr/album/0jSSRlhYuZmtLMrYB8pjzC?si=1chLUzYDRGKIRTCQyoXETA", artist: "Don Toliver" },
    { id: 8, nom: "Glockoma 2 (delxue)", image: "https://i.pinimg.com/564x/8b/ed/1a/8bed1abb99f8cba4cc09ab2b33f56848.jpg", lien: "https://open.spotify.com/intl-fr/album/49vCWZ0yKkRvfetjsYVLnx?si=dF3TTJxeSda1y20aLoDbgg", artist: "Key Glock" },
  ]);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    const id_int = parseInt(userId);

    if (id_int) {
      setLoading(true); // Début du chargement
      axios
        .get(`https://apirustshawntify.onrender.com/playlist?id_user=${id_int}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
          setPlaylists(response.data);
          setLoading(false); // Fin du chargement
        })
        .catch((error) => {
          setError('Erreur lors du chargement des playlists');
          setLoading(false); // Fin du chargement même en cas d'erreur
        });
    } else {
      setError('Utilisateur non connecté');
      setLoading(false); // Fin du chargement si aucun utilisateur n'est connecté
    }
  }, []); // Le tableau vide [] assure que l'effet est exécuté uniquement au premier rendu

  return (
    <div className='containerPrincipaleAccueil'>
      <h1>Liste des Playlists</h1>

      <div className="playlist-grid">
  {Array.isArray(playlists) ? (
    playlists.map((playlist) => (
      <div key={playlist.id} className="playlist-card">
        <h3>{playlist.nom_playlist}</h3>
      </div>
    ))
  ) : (
    <p>Aucune playlist disponible</p>
  )}
</div>


      <div className='AlbumDecoration'>
        <h1>Albums</h1>
        <div className="album-grid">
          {album.map((album) => (
            <div key={album.id} className="album-card"
              onClick={() => window.location.href = album.lien}
              style={{ cursor: 'pointer' }}
            >
              <img src={album.image} alt={album.nom} className="album-image" />
              <p className="album-title">{album.nom}</p>
              <p className="album-artist">{album.artist}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accueil;
