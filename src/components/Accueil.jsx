import logoImage from '../assets/logo.png'

export default function Accueil({onStart}) {
    return (
        <div className="zoompage-centree container text-center mt-5 p-4 rounded shadow-lg bg-light">

                <img src={logoImage} alt="logo" className="img-fluid mb-4" style={{maxWidth: '300px'}}/>
                <h1 className="text-primary fw-bold mb-3">Bienvenue sur Wordle game Rafisa</h1>
                <p className="lead text-muted mb-4">
                    Ayez 6 occasions de deviner un mot de 5 lettres.
                </p>

                <button onClick={onStart} className="btn btn-primary btn-lg px-4 fs-5">
                    Jouer
                </button>
            </div>
    );
}
