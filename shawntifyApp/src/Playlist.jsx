import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Playlist.css";
import PlaylistForm from "./FormulairePlaylist";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [expandedPlaylist, setExpandedPlaylist] = useState(null); // Playlist actuellement déroulée
  const [musics, setMusics] = useState([]); // Musiques de la playlist sélectionnée
  const [newMusicId, setNewMusicId] = useState(""); // ID de la nouvelle musique
  const [newPlaylistId, setNewPlaylistId] = useState(""); // ID de la playlist à laquelle ajouter la musique
  const [newPlaylistName, setNewPlaylistName] = useState(""); // Nom de la nouvelle playlist
  const [showForm, setShowForm] = useState(false); // Contrôle de l'affichage du formulaire

  // Charger les playlists
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/playlist?id_user=${localStorage.getItem("id")}`) // Remplacez par l'URL de votre API
      .then((response) => {
        setPlaylists(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des playlists :", error);
      });
  }, []);

  // Ajouter une playlist
  const handleAddPlaylist = () => {
    if (!newPlaylistName) {
      alert("Le nom de la playlist ne peut pas être vide.");
      return;
    }
    console.log(newPlaylistName);
    console.log( typeof localStorage.getItem("id"));
    const id = parseInt(localStorage.getItem("id"));
    

    axios
      .post("http://127.0.0.1:8080/addPlaylist", { nom_playlist: newPlaylistName, id_createur: id }) 
      .then((response) => {
        console.log(response.data);
        setPlaylists([...playlists, response.data]);
        setNewPlaylistName("");
        window.location.reload(); 
      })
      .catch((error) => {
        console.log(error);
        console.error("Erreur lors de l'ajout de la playlist :", error);
      });
  };

  // Charger les musiques d'une playlist
  const handleExpandPlaylist = (playlistId) => {
    if (expandedPlaylist === playlistId) {
      setExpandedPlaylist(null);
      setMusics([]);
      return;
    }

    axios
      .get(`http://127.0.0.1:8080/musiquePlaylist/${playlistId}`) // Remplacez par l'URL de votre API
      .then((response) => {
        setExpandedPlaylist(playlistId);
        setMusics(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des musiques :", error);
      });
  };

  // Ajouter une musique à une playlist
  const handleAddMusicToPlaylist = async () => {
    if (!newMusicId || !newPlaylistId) {
      alert("Veuillez sélectionner une musique et une playlist.");
      return;
    }

    const data = {
      id_playlist: newPlaylistId,
      id_musique: newMusicId,
    };

    try {
      
      // Une fois la musique ajoutée, charger les musiques à jour pour la playlist
      axios
        .get(`http://127.0.0.1:8080/musiquePlaylist/${newPlaylistId}`)
        .then((response) => {
          setMusics(response.data);
          window.location.reload();
        })
        .catch((error) => { 
          console.error("Erreur lors du chargement des musiques après ajout :", error);
        });

      setNewMusicId("");
      setNewPlaylistId("");
      setShowForm(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la musique à la playlist :", error);
    }
  };

  const handleDeleteMusic = async (musicId) => {
    const data = {
      id_musique: musicId,
      id_playlist: expandedPlaylist,
    }
    console.log(data);

    try {
      axios
        .post(`http://127.0.0.1:8080/removeMusiqueFromPlaylist`, data)
        .then((response) => {
          console.log(response.data);
          handleExpandPlaylist(expandedPlaylist);
        })
        .catch((error) => {
          console.error("Error deleting music:", error);
        });
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      axios
        .delete(`http://127.0.0.1:8080/supprimerPlaylist/${playlistId}`)
        .then((response) => {
          console.log(response.data);
          setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
          
        })
        .catch((error) => {
          console.error("Error deleting playlist:", error);
        });
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div className="playlist-container">
      <h1>Playlists</h1>

      {/* Formulaire d'ajout de playlist */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPlaylist();
          }}
          className="playlist-form"
        >
          <label className="playlist-label" htmlFor="playlist-name">Ajouter une playlist</label>
          <input
            type="text"
            placeholder="Nom de la playlist"
            className="playlist-input"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button className="playlist-button" type="submit">Ajouter Playlist</button>
        </form>
      </div>

      {/* Liste des playlists */}
      <div>
        {playlists.map((playlist,index) => (
          <div key={index} className="playlist">
            <h3 onClick={() => handleExpandPlaylist(playlist.id)}>
              {playlist.nom_playlist}
            </h3>

            {expandedPlaylist === playlist.id && (
              <div>
                <ul className="music-list">
                  {musics.map((music) => (
                    <li className="musiquelister" key={music.id}>

                      {/* Button pour supprimer la musique */}
                      <div className="button-container-supprimer">
                        <button
                          className="playlist-button-supprimer"
                          onClick={() => handleDeleteMusic(music.id)}
                        >
                          Supprimer
                        </button>
                      </div>

                      <img
                        className="imageplaylist"
                        src={`http://127.0.0.1:8080/images/${music.image}`}
                        alt=""
                      />
                      <span className="music-uuid">{music.uuid}</span>

                      {/* Lecture du fichier audio en utilisant l'UUID */}
                      <audio className="audio-player" controls>
                        <source
                          src={`http://127.0.0.1:8080/musiques/${music.uuid}`}
                          type="audio/mp3"
                        />
                        Votre navigateur ne supporte pas l'élément audio.
                      </audio>
                    </li>
                  ))}
                </ul>

                <PlaylistForm
                  playlistId={playlist.id}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  handleAddMusicToPlaylist={handleAddMusicToPlaylist}
                  newMusicId={newMusicId}
                  setNewMusicId={setNewMusicId}
                  newPlaylistId={newPlaylistId}
                  setNewPlaylistId={setNewPlaylistId}
                />
              </div>
            )}

            <button className="playlist-button-supprimer" onClick={() => handleDeletePlaylist(playlist.id)}>Supprimer Playlist</button>
          </div>
          
        ))}
        
      </div>
    </div>
  );
};

export default Playlist;
