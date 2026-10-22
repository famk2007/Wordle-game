
import React from 'react'
import './app.css'
export default function Case({lettre = '', etat = ''}) {
    return (
        <div className={`wordle-case ${etat}`}>
            {lettre.toUpperCase()}
        </div>
    )
}