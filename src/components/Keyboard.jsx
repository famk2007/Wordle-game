import React from 'react'
import './app.css'
export default function Keyboard({onChar, etat = {}}) {


    const lignes = [
                ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l'],
                ['ENTRÉE', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
    ];

    const handleClick = (touch) => {
        if (touche === 'ENTRÉE') {
            onEnter();
        } else if (touche === '⌫') {
            onDelete();
        } else {
            onChar(touche);
        }
    };

    return (
        <div className={"wordle-keyboard">
            {lettre.map((ligne, indexLigne) => (
                <div key={indexLigne} className="keyboard-row">
                    {lignes.map((Ligne, indexLigne) => {
                    const etat = lettreEtats[touche.toLowerCase()] || '';
                    const estLarge = touche.length > 1;
                    return (
                        <button
                            key={touche}
                            className={`keyboard-etat ${etat} ${estLarge ? 'wide' :''}`}
                            >
                            {touche}

                    )

        </div>
    )
}