import {useRef, useState} from "react";
import Accueil from "./components/Accueil.jsx";
import Chargement from "./components/Chargement.jsx";
import Jeu from"./components/Jeu.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./assets/Logo.png";
import './app.css';

function App() {
    // l'état garde en mémoire l'étape active
    const [etape, setEtape] = useState('Accueil');

    // Cette fonction s'active quand on clique sur jouer
    const lancerChargement = () => {
        setEtape('Chargement');

        // 2. On attend 2 seconde puis on bascule sur la page du jeu
        setTimeout(() => { setEtape('Jeu');
            }, 2000);
    };

    return (
        <div className="app-layout">
            <Header />
        <div className="top-100 bg-body-secondary d-flex align-items-center justify-content-center h-100 bg-light">
            {etape === 'Accueil' && (
                <Accueil onStart={lancerChargement} />
            )}

            {etape === 'Chargement' && (
                <Chargement />
            )}

            {etape === 'Jeu' && (
                <Jeu />
            )}
        <Footer />
        </div>
        </div>
    );
}

export default App;