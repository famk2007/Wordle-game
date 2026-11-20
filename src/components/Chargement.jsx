// src/components/Chargement.jsx
export default function Chargement() {
    return (
        <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-2 px-4 fs-5 text-white">Chargement en cours...</p>
        </div>
    );
}