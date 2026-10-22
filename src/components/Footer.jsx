import './Footer.css';

export default  function Footer() {
    return (
        <footer className="footer d-flex">
            <p>&copy; {new Date().getFullYear()} Wordle game. Tous droits réservés.</p>
            <div className="footer-links">
                <h1 className="Title-game">Wordle game</h1>
            </div>
            </footer>
    );
}