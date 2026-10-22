import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <h1 className="Title-game">Wordle game</h1>
            </div>

            <nav className="header-nav">
                <ul>
                    <li><a href="#accueil">Accueil</a></li>
                    <li><a href="#jeu"></a>Jeu</li>
                    <li><a href="#a-propos">À propos</a></li>
                </ul>
            </nav>
        </header>
    );
}