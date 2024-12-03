import { useState, useEffect } from "react";
import axios from "axios";
import "./css/AjouterMusique.css";

const AjouterMusique = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [musiques, setMusiques] = useState([]);
  const [message, setMessage] = useState("");

  // Fonction pour gérer le changement du fichier audio
  const handleAudioFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  // Fonction pour gérer le changement du fichier image
  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const fetchMusiques = async () => {
    axios
    .get("http://127.0.0.1:8080/musiques")
    .then((response) => {
      setMusiques(response.data);
      //console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching musiques:", error);
    });
  };

  // Chargement des musiques existantes
  useEffect(() => {
    fetchMusiques();
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioFile || !imageFile) {
      alert("Veuillez sélectionner un fichier audio et une image.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("image", imageFile);

    console.log(imageFile);

    try {
      const response = await axios.post("http://127.0.0.1:8080/addMusique", formData);
      setMessage(`Musique ajoutée avec succès: ${response.data.message}`);
      setAudioFile(null);
      setImageFile(null);
      setTimeout(() => {
        setMessage(""); 
      }, 5000);
      fetchMusiques();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la musique:", error);
      setMessage("Erreur lors de l'ajout de la musique.");
    }
  };

  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/supprimer/${uuid}`);
      setMessage(`Musique supprimée avec succès.`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
      fetchMusiques();
    } catch (error) {
      console.error("Erreur lors de la suppression de la musique:", error);
      setMessage("Erreur lors de la suppression de la musique.");
    }
  };

  return (
    <div className="container_ajouter_musique">
      <h1>Ajouter une Musique</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="file-upload">
          <input
            type="file"
            accept=".mp3"
            onChange={handleAudioFileChange}
            id="audio-input"
          />
          <label htmlFor="audio-input" className="file-label">
            Choisir un fichier MP3
          </label>
        </div>
        <div className="file-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            id="image-input"
          />
          <label htmlFor="image-input" className="file-label">
            Choisir une image (album cover)
          </label>
        </div>

        <div className="afficher-musique_image">
          {/* Affiche l'image si un fichier image est sélectionné */}
          {imageFile && <img className="album-cover" src={URL.createObjectURL(imageFile)} alt="Album Cover" />}
          {/* Affiche le lecteur audio si un fichier audio est sélectionné */}
          {audioFile && (
            <div>
              <p>Fichier Audio: {audioFile.name}</p>
              <audio controls>
                <source src={URL.createObjectURL(audioFile)} />
                Votre navigateur ne prend pas en charge l'élément audio.
              </audio>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Ajouter
        </button>
      </form>

      {/* Affichage des musiques ajoutées */}

      <div className="container_musiques">
        <h1>Vos musiques :</h1>
        {message && <div className="message">{message}</div>}
        <ul className="musique-list">
          {musiques.length > 0 ? (
            musiques.map((music, index) => (
              <li key={index} className="musique-item">
                <button onClick={() => handleDelete(music.uuid)} className="playlist-button-supprimer">
                  Supprimer
                </button>

                <div className="musique-info">
                  
                  <div className="containerUUID">
                    <span className="musique-uuid">{music.uuid}</span>
                  </div>
                  
                
                  <img src={music.image_url} alt="Album Cover"className="musique-cover"/>
                  
                </div>
              </li>
            ))
          ) : (
            <li className="musique-item no-music">
              <span>Aucune musique</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AjouterMusique;
