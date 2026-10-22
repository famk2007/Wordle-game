import {useState} from "react";

const SOLUTION = "REACT";

function Mots() {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState(Array(6).fill("")); // 6 lignes de tentatives
    const [isGameOver, setIsGameOver] = useState(false);
    const [message, setMessage] = useState("");
}
export default Mots