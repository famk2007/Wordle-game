import React, { useState } from 'react';
import styled from 'styled-components';
import Keyboard from './Keyboard.jsx';
import { LISTE_MOTS } from './Mots';

export function Jeu() {
    const [grille, setGrille] = useState(
        Array(6).fill('').map(() => Array(5).fill(''))
    );
    const [etats, setEtats] = useState(
        Array(6).fill('').map(() => Array(5).fill(''))
    );

    const [ligneActuelle, setLigneActuelle] = useState(0);
    const [colonneActuelle, setColonneActuelle] = useState(0);

    // Sélection du mot aléatoire initial
    const [motAleatoire, setMotAleatoire] = useState(() => {
        return LISTE_MOTS[Math.floor(Math.random() * LISTE_MOTS.length)];
    });

    // 1. Nouveaux states pour gérer la fin de partie et la pop-up
    const [partieTerminee, setPartieTerminee] = useState(false);
    const [messageFin, setMessageFin] = useState('');

    // Calcul de l'état du clavier en fonction des essais validés
    const clavierEtats = {};
    grille.forEach((ligneMot, rIndex) => {
        if (rIndex < ligneActuelle) {
            ligneMot.forEach((lettre, cIndex) => {
                const etatCase = etats[rIndex][cIndex];
                const lettreLower = lettre.toLowerCase();

                if (etatCase === 'correct') {
                    clavierEtats[lettreLower] = 'correct';
                } else if (etatCase === 'present' && clavierEtats[lettreLower] !== 'correct') {
                    clavierEtats[lettreLower] = 'present';
                } else if (etatCase === 'absent' && !clavierEtats[lettreLower]) {
                    clavierEtats[lettreLower] = 'absent';
                }
            });
        }
    });

    // Fonction pour réinitialiser le jeu (Rejouer)
    const handleRejouer = () => {
        setGrille(Array(6).fill('').map(() => Array(5).fill('')));
        setEtats(Array(6).fill('').map(() => Array(5).fill('')));
        setLigneActuelle(0);
        setColonneActuelle(0);
        setMotAleatoire(LISTE_MOTS[Math.floor(Math.random() * LISTE_MOTS.length)]);
        setPartieTerminee(false);
        setMessageFin('');
    };

    // Fonction pour ajouter une lettre (bloquée si la partie est finie)
    const handleChar = (lettre) => {
        if (partieTerminee) return; // Bloque si le jeu est fini
        if (colonneActuelle < 5 && ligneActuelle < 6) {
            const nouvelleGrille = grille.map((ligne, rIndex) =>
                rIndex === ligneActuelle
                    ? ligne.map((col, cIndex) => cIndex === colonneActuelle ? lettre : col)
                    : ligne
            );
            setGrille(nouvelleGrille);
            setColonneActuelle(colonneActuelle + 1);
        }
    };

    // Fonction pour effacer (bloquée si la partie est finie)
    const handleDelete = () => {
        if (partieTerminee) return; // Bloque si le jeu est fini
        if (colonneActuelle > 0) {
            const nouvelleGrille = grille.map((ligne, rIndex) =>
                rIndex === ligneActuelle
                    ? ligne.map((col, cIndex) => cIndex === colonneActuelle - 1 ? '' : col)
                    : ligne
            );
            setGrille(nouvelleGrille);
            setColonneActuelle(colonneActuelle - 1);
        }
    };

    // Fonction pour valider la ligne (bloquée si la partie est finie)
    const handleEnter = () => {
        if (partieTerminee) return; // Bloque si le jeu est fini

        if (colonneActuelle === 5) {
            const motPropose = grille[ligneActuelle].join('');

            // Vérifie si le mot existe dans la liste
            if (!LISTE_MOTS.includes(motPropose)) {
                alert("Ce mot n'est pas dans la liste !");
                return;
            }

            const nouveauxEtatsLigne = Array(5).fill('absent');
            const solutionTableau = motAleatoire.split('');
            const tentativeTableau = motPropose.split('');

            // 1. Vérification des lettres bien placées (Vert)
            tentativeTableau.forEach((lettre, i) => {
                if (lettre === solutionTableau[i]) {
                    nouveauxEtatsLigne[i] = 'correct';
                    solutionTableau[i] = null;
                }
            });

            // 2. Vérification des lettres mal placées (Jaune)
            tentativeTableau.forEach((lettre, i) => {
                if (nouveauxEtatsLigne[i] !== 'correct') {
                    const indexSolution = solutionTableau.indexOf(lettre);
                    if (indexSolution !== -1) {
                        nouveauxEtatsLigne[i] = 'present';
                        solutionTableau[indexSolution] = null;
                    }
                }
            });

            // Met à jour les états de la grille
            const nouveauxEtats = etats.map((ligne, rIndex) =>
                rIndex === ligneActuelle ? nouveauxEtatsLigne : ligne
            );
            setEtats(nouveauxEtats);

            // Victoire ? Remplacement de l'alert par la pop-up
            if (motPropose === motAleatoire) {
                setMessageFin("Bravo ! Vous avez gagné !");
                setPartieTerminee(true);
                return;
            }

            // Passer à la ligne suivante ou Défaite
            if (ligneActuelle < 5) {
                setLigneActuelle(ligneActuelle + 1);
                setColonneActuelle(0);
            } else {
                setMessageFin(`Perdu ! Le mot était : ${motAleatoire}`);
                setPartieTerminee(true);
            }
        }
    };

    return (
        <Container>
            <Title>À toi de jouer</Title>

            <GrilleContainer>
                {grille.map((ligne, rIndex) => (
                    <LigneGrille key={rIndex}>
                        {ligne.map((lettre, cIndex) => {
                            const etatCase = etats[rIndex][cIndex] || '';
                            const estRemplie = lettre !== '';

                            return (
                                <Case
                                    key={cIndex}
                                    $etat={etatCase}
                                    $remplie={estRemplie}
                                >
                                    {lettre}
                                </Case>
                            );
                        })}
                    </LigneGrille>
                ))}
            </GrilleContainer>

            {/* Intégration du clavier virtuel */}
            <KeyboardWrapper>
                <Keyboard
                    onChar={(char) => handleChar(char)}
                    onEnter={() => handleEnter()}
                    onDelete={() => handleDelete()}
                    etat={clavierEtats}
                />
            </KeyboardWrapper>

            {/* 2. Affichage conditionnel de la fenêtre Pop-up (Modale) */}
            {partieTerminee && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalText>{messageFin}</ModalText>
                        <ReplayButton onClick={handleRejouer}>Rejouer</ReplayButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
}


// STYLES (Ajout des styles pour la pop-up à la fin)


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 10px;
    background-color: #121213;
    color: #ffffff;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    position: relative; /* Nécessaire pour positionner l'overlay par-dessus */
`;

const Title = styled.h1`
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin: 5px 0;
    border-bottom: 1px solid #3a3a3c;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
`;

const GrilleContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    gap: 5px;
    width: 100%;
    max-width: 350px;
    aspect-ratio: 5 / 6;
    margin: auto 0;
`;

const LigneGrille = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
`;

const Case = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid ${props => props.$remplie ? '#565758' : '#3a3a3c'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    user-select: none;

    background-color: ${props => {
    if (props.$etat === 'correct') return '#538d4e';
    if (props.$etat === 'present') return '#b59f3b';
    if (props.$etat === 'absent') return '#3a3a3c';
    return 'transparent';
}};

    border-color: ${props => {
    if (props.$etat === 'correct') return '#538d4e';
    if (props.$etat === 'present') return '#b59f3b';
    if (props.$etat === 'absent') return '#3a3a3c';
    return props.$remplie ? '#565758' : '#3a3a3c';
}};

    @media (max-width: 480px) {
        font-size: 1.5rem;
    }
`;

const KeyboardWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
`;

// ================= Styles de la Pop-up (Modale) =================

const ModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Fond sombre semi-transparent */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #1a1a1b;
    border: 2px solid #3a3a3c;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    max-width: 320px;
    width: 90%;
`;

const ModalText = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 25px;
    color: #ffffff;
`;

const ReplayButton = styled.button`
    background-color: #538d4e;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #42753d;
    }
`;