import React from 'react';


export default function Case({lettre = '', etat = ''}) {
    return (
        <div className={`wordle-case ${etat}`}>
            {lettre.toUpperCase()}
        </div>
    )
}