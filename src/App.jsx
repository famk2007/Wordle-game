import {useRef, useState} from "react";
import Accueil from "./components/Accueil.jsx";
import Chargement from "./components/Chargement.jsx";
import {Jeu} from "./components/Jeu.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./assets/Logo.png";
import styled from "styled-components";

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
        <AppLayout>
            <Header />
            {/* Conteneur principal flexible et adapté au jeu */}
            <MainContent>
            {etape === 'Accueil' && (
                <Accueil onStart={lancerChargement} />

            )}

            {etape === 'Chargement' && (
                <Chargement />
            )}

            {etape === 'Jeu' && (
                <Jeu />
            )}
            </MainContent>
            <Footer />
        </AppLayout>
    );
}

export default App;

// --- Styles avec Styled Components ----
const AppLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #111112; /* Fond sombre Wordle par défaut */
    color: #ffffff;
    font-family: helvetica;
`;

const MainContent = styled.main`
flex: 2;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
padding: 10px;
overflow-y: auto;
font-family: "helvetica neue", helvetica, arial, sans-serif;
`;