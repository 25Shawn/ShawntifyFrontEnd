import { useState, useEffect } from "react";
import axios from "axios";
import "./css/Playlist.css";

function PlaylistForm({ playlistId }) {
  const [showForm, setShowForm] = useState(false);
  const [musiques, setMusiques] = useState([]); // Pour stocker toutes les musiques disponibles
  const [selectedMusicId, setSelectedMusicId] = useState(""); // ID de la musique sélectionnée

  // Fonction pour récupérer toutes les musiques disponibles dans la base de données
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/musiques") // Remplacez par l'URL de votre API
      .then((response) => {
        setMusiques(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des playlists :", error);
      });
  }, []);
  console.log(typeof playlistId);
  console.log(typeof selectedMusicId + "sadada");

  // Fonction pour gérer l'ajout de la musique à la playlist
  const handleAddMusic = async () => {
    try {
      axios
        .post("http://127.0.0.1:8080/addMusiqueToPlaylist", {
            id_musique: parseInt(selectedMusicId),
            id_playlist: playlistId
        })
        .then((response) => {
          console.log(response.data);
        });
      if (response.ok) {
        alert("Musique ajoutée à la playlist !");
      } else {
        alert("Erreur lors de l'ajout de la musique à la playlist.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la musique", error);
    }
  };

  return (
    <div>
      <button className="boutonAjouterMusique" onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "Annuler" : "Ajouter une musique"}
      </button>

      {/* Formulaire pour ajouter une musique (affiché conditionnellement) */}
      {showForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMusic();
          }}
        >
          <label htmlFor="musicSelect">Choisissez une musique :</label>
          <select
            id="musicSelect"
            value={selectedMusicId}
            onChange={(e) => setSelectedMusicId(e.target.value)}
            className="form-select"
          >
            <option value="">-- Sélectionnez une musique --</option>
            {musiques.map((music) => (
              <option key={music.id} value={music.id}>
                {music.uuid} - {music.duree} {/* Remplacez par le champ de votre choix */}
              </option>
            ))}
          </select>
          <button className="boutonAjouterMusique" type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
}

export default PlaylistForm;
