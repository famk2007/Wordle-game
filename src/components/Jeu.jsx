// src/components/Chargement.jsx
export default function Jeu() {
    return (
        <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-2 text-muted">Chargement en cours...</p>
        </div>
    );
}