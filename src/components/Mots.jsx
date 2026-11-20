import { useState, useEffect } from "react";

export const LISTE_MOTS = [
    // Informatique //
    "ROUTE", "VOICE", "BYTES", "DIGIT", "SCANS",
    "FILES", "SHELL", "THROW", "CATCH", "BREAK",
    "SUPER", "CHMOD", "DRIVE", "CHIPS", "MOUSE",
    "PAGES", "FORMS", "SHEET", "BOARD", "PASTE",
    "HACKS", "PATCH", "CRACK", "SYSOP", "LOGES",
    "MODEM", "PLUGZ", "REACT", "DEBUG", "CODER",
    "ARRAY", "FLOAT", "CONST", "ASYNC", "AWAIT",
    "FETCH", "WHILE", "PRINT", "INPUT", "PARSE",
    "TOKEN", "QUERY", "INDEX", "CLASS", "SCOPE",
    "STACK", "QUEUE", "HOOKS", "STATE", "PROPS",
    "BUILD", "MERGE", "CLOUD", "PROXY", "LOGIN",
    "EMAIL", "LIENS", "FIBRE", "MODEM", "HTTPS",
    "CACHE", "FRAME", "NODES", "PORTS", "HOSTS",
    "ADMIN", "PANEL", "ECRAN", "PIXEL", "CABLE",
    "PUCES", "AUDIO", "VIDEO", "FLASH", "LINUX",
    "MACOS", "INTEL", "ROBOT", "DRONE", "VIRUS",
    "CYBER", "CRYPT", "RESET", "OCTET", "SERVE",
    "UPPER", "UNDER", "IMAGE", "ECHEC", "EFFET",
    "FRONT", "DIAPO","APPLE",  "ATARI", "HTML",
    "CANON", "EPSON", "KODAK", "NOKIA", "STEAM",
    "TESLA", "XEROX", "YAHOO", "CISCO", "JOINS",
    "INNER", "PAINT", "MICRO", "BOOLE", "TYPES",
    "VALUE", "BLOCK", "EVENT", "GATES", "RADIX",
    "MACRO", "FAUTE", "OUTER", "PIVOT", "CHART",
    "GRAPH", "RELAY", "PACKS", "PHISH", "SKYPE",
    "LOGON", "ACCES", "BOARD", "CLOCK", "DISKS",
    "MEDIA", "DOMIN", "UNITY", "POWER", "CANVA",
    "CODES", "SITES", "CHIPS", "FIGMA", "ADOBE",
    "RAZER", "NGINX", "AZURE", "VIMEO", "OPERA",
    "API", "CSS", "SCRUM", "XML"


];

export default function Mots({ solution, listeMots = LISTE_MOTS }) {
    // Fonction pour choisir un mot aléatoire
    const getRandomWord = () => {
        if (listeMots.length > 0) {
            return listeMots[Math.floor(Math.random() * listeMots.length)].toUpperCase();
        }
        return "REACT";
    };

    // On utilise un state pour la solution (si une prop solution est fournie, on la prend au départ)
    const [targetWord, setTargetWord] = useState(() =>
        solution ? solution.toUpperCase() : getRandomWord()
    );

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState(Array(6).fill(""));
    const [isGameOver, setIsGameOver] = useState(false);
    const [message, setMessage] = useState("");

    // Fonction pour recommencer la partie
    const handleReset = () => {
        setTargetWord(getRandomWord());
        setTurn(0);
        setCurrentGuess("");
        setGuesses(Array(6).fill(""));
        setIsGameOver(false);
        setMessage("");
    };

    // Fonctions de gestion du clavier
    const handleChar = (char) => {
        if (isGameOver) return;
        if (currentGuess.length < targetWord.length) {
            setCurrentGuess((prev) => prev + char);
        }
    };

    const handleDelete = () => {
        if (isGameOver) return;
        setCurrentGuess((prev) => prev.slice(0, -1));
    };

    const handleEnter = () => {
        if (isGameOver) return;

        // 1. Vérifier la longueur
        if (currentGuess.length !== targetWord.length) {
            setMessage(`Le mot doit faire ${targetWord.length} lettres.`);
            return;
        }

        // 2. Vérifier si le mot existe dans la liste
        if (listeMots.length > 0 && !listeMots.includes(currentGuess)) {
            setMessage("Ce mot n'est pas dans la liste !");
            return;
        }

        // 3. Ajouter la tentative
        const newGuesses = [...guesses];
        newGuesses[turn] = currentGuess;
        setGuesses(newGuesses);

        // 4. Vérifier la victoire
        if (currentGuess === targetWord) {
            setMessage("Bravo ! Vous avez trouvé le mot !");
            setIsGameOver(true);
            return;
        }

        // 5. Vérifier la défaite
        if (turn === 5) {
            setMessage(`Perdu ! Le mot était : ${targetWord}`);
            setIsGameOver(true);
            return;
        }

        setTurn(turn + 1);
        setCurrentGuess("");
        setMessage("");
    };

    // Écoute du clavier physique
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toUpperCase();
            if (key === "ENTER") handleEnter();
            else if (key === "BACKSPACE") handleDelete();
            else if (/^[A-Z]$/.test(key)) handleChar(key);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentGuess, turn, isGameOver, targetWord, guesses, listeMots]);

    // Couleur des lettres
    const getLetterColor = (letter, index, word) => {
        if (!word) return "";

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

            {/* Bouton Rejouer affiché uniquement quand la partie est terminée */}
            {isGameOver && (
                <button onClick={handleReset} style={styles.button}>
                    Rejouer
                </button>
            )}

            <div style={styles.grid}>
                {guesses.map((guess, rowIndex) => {
                    const isCurrentRow = rowIndex === turn && !isGameOver;
                    const wordToDisplay = isCurrentRow ? currentGuess : guess;

                    return (
                        <div key={rowIndex} style={styles.row}>
                            {Array.from({ length: targetWord.length }).map((_, colIndex) => {
                                const letter = wordToDisplay[colIndex] || "";
                                // Correction : on affiche aussi la couleur de la ligne finale si isGameOver est true
                                const isSubmittedRow = rowIndex < turn || (isGameOver && rowIndex <= turn);
                                const color = isSubmittedRow ? getLetterColor(letter, colIndex, guess) : "";

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
}

const styles = {
    container: { display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Arial, sans-serif" },
    message: { fontWeight: "bold", fontSize: "1.1rem", marginBottom: "10px", color: "#805756" },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        fontWeight: "bold",
        backgroundColor: "#6aaa64",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginBottom: "15px"
    },
    grid: { display: "grid", gridTemplateRows: "repeat(6, 1fr)", gap: "5px" },
    row: { display: "flex", gap: "5px" },
    cell: {
        width: "50px", height: "50px", border: "2px solid #ccc",
        display: "flex", justifyContent: "center", alignItems: "center",
        fontSize: "1.8rem", fontWeight: "bold", textTransform: "uppercase"
    }
};