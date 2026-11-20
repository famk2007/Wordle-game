import {useState} from "react";

const LISTE_MOTS = [
    "REACT",
    "PLANT",
    "TABLE",
    "POMME",
    "LIVRE",
    "CHIEN",
    "CHAT",
    "TRAIN"
];

function Mots({ solution = "REACT"}) {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState(Array(6).fill("")); // 6 lignes de tentatives
    const [isGameOver, setIsGameOver] = useState(false);
    const [message, setMessage] = useState("");
}

useEffect(() => {
    const handleKeyDown = (e) => {
        const key = e.key.toUpperCase();
        if (key === "ENTER") handleEnter();
        else if (key === "BACKSPACE") handleDelete();
        else if (/^[A-Z]$/.test(key)) handleChar(key);

        if (key === "ENTER") {
            // 1. Vérifier la longueur
            if (currentGuess.length !== solution.length) {
                setMessage(`Le mot doit faire ${solution.length} lettres.`);
                return;
            }

            // 2. NOUVEAU : Vérifier si le mot existe dans la liste (si une liste est fournie)
            if (listeMots.length > 0 && !listeMots.includes(currentGuess)) {
                setMessage("Ce mot n'est pas dans la liste !");
                return;
            }

            // 3. Ajouter la tentative
            const newGuesses = [...guesses];
            newGuesses[turn] = currentGuess;
            setGuesses(newGuesses);

            // 4. Vérifier la victoire
            if (currentGuess === solution.toUpperCase()) {
                setMessage("Bravo ! Vous avez trouvé le mot !");
                setIsGameOver(true);
                return;
            }

            // 5. Vérifier la défaite
            if (turn === 5) {
                setMessage(`Perdu ! Le mot était : ${solution}`);
                setIsGameOver(true);
                return;
            }

            setTurn(turn + 1);
            setCurrentGuess("");
            setMessage("");
        }
        else if (key === "BACKSPACE") {
            setCurrentGuess((prev) => prev.slice(0, -1));
        }
        else if (/^[A-Z]$/.test(key)) {
            if (currentGuess.length < solution.length) {
                setCurrentGuess((prev) => prev + key);
            }
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
}, [currentGuess, turn, isGameOver, solution, guesses, listeMots]);

const getLetterColor = (letter, index, word) => {
    if (!word) return "";
    const targetWord = solution.toUpperCase();

    if (targetWord[index] === letter) {
        return "green";
    } else if (targetWord.includes(letter)) {
        return "yellow";
    } else {
        return "gray";
    }
};

return (
    <div style={styles.container}>
        <h2>Wordle</h2>
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.grid}>
            {guesses.map((guess, rowIndex) => {
                const isCurrentRow = rowIndex === turn;
                const wordToDisplay = isCurrentRow ? currentGuess : guess;

                return (
                    <div key={rowIndex} style={styles.row}>
                        {Array.from({ length: solution.length }).map((_, colIndex) => {
                            const letter = wordToDisplay[colIndex] || "";
                            const color = rowIndex < turn ? getLetterColor(letter, colIndex, guess) : "";

                            return (
                                <div
                                    key={colIndex}
                                    style={{
                                        ...styles.cell,
                                        backgroundColor:
                                            color === "green" ? "#6aaa64" :
                                                color === "yellow" ? "#c9b458" :
                                                    color === "gray" ? "#787c7e" : "transparent",
                                        color: color ? "#fff" : "#000",
                                        borderColor: letter ? "#000" : "#ccc",
                                    }}
                                >
                                    {letter}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    </div>
);


const styles = {
    container: {display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Arial, sans-serif"},
    message: {fontWeight: "bold", fontSize: "1.1rem", marginBottom: "10px", color: "#805756"},
    grid: {display: "grid", gridTemplateRows: "repeat(6, 1fr)", gap: "5px"},
    row: {display: "flex", gap: "5px"},
    cell: {
        width: "50px", height: "50px", border: "2px solid #ccc",
        display: "flex", justifyContent: "center", alignItems: "center",
        fontSize: "1.8rem", fontWeight: "bold", textTransform: "uppercase"
    }
}

export default Mots