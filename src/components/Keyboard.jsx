import React from 'react';
import styled from 'styled-components';

export default function Keyboard({ onChar, onEnter, onDelete, etat = {} }) {
    const lignes = [
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['ENTRÉE', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
    ];

    const handleClick = (touche) => {
        if (touche === 'ENTRÉE') {
            if (onEnter) onEnter();
        } else if (touche === '⌫') {
            if (onDelete) onDelete();
        } else {
            if (onChar) onChar(touche.toUpperCase()); // En majuscule pour correspondre à la grille
        }
    };

    return (
        <KeyboardContainer>
            {lignes.map((ligne, indexLigne) => (
                <KeyboardRow key={indexLigne}>
                    {ligne.map((touche) => {
                        const lettreEtat = typeof etat === 'object' && etat !== null ? etat[touche.toLowerCase()] || '' : '';
                        const estLarge = touche.length > 1;

                        return (
                            <KeyButton
                                key={touche}
                                type="button"
                                onClick={() => handleClick(touche)}
                                $etat={lettreEtat}
                                $wide={estLarge}
                            >
                                {touche}
                            </KeyButton>
                        );
                    })}
                </KeyboardRow>
            ))}
        </KeyboardContainer>
    );
}

// --- STYLISATION DU CLAVIER (Styled-Components) ---

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const KeyboardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  width: 100%;
`;

const KeyButton = styled.button`
  background-color: ${props => {
    if (props.$etat === 'correct') return '#538d4e'; // Vert Wordle
    if (props.$etat === 'present') return '#b59f3b'; // Jaune Wordle
    if (props.$etat === 'absent') return '#3a3a3c';  // Gris foncé Wordle
    return '#818384'; // Gris standard pour les touches non jouées
}};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: ${props => props.$wide ? '0.75rem' : '0.9rem'};
  height: 58px;
  flex: ${props => props.$wide ? '1.5' : '1'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 480px) {
    height: 45px;
    font-size: ${props => props.$wide ? '0.65rem' : '0.8rem'};
  }
`;
