import { useState } from 'react';
import Header from './header';
import Accueil from './Accueil';
import AjouterMusique from './AjouterMusique';
import Playlist from "./Playlist";
import Apropos from './Apropos';
import FormulaireConnexion from './FormulaireConnexion';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    
    <Router>
      <div className="container">
      <Header />
      <main className="main-content">
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/AjouterMusique" element={<AjouterMusique />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/FormulaireConnexion" element={<FormulaireConnexion />} />
      </Routes>
      </main>
      </div>
    </Router>
    
  );
}

export default App;
