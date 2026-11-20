import logoImage from '../assets/logo.png'
import styled from "styled-components";


export default function Accueil({onStart}) {return (
       <Container>

                <Image src={logoImage} alt="logo Wordle"/>
                <Title>Bienvenue sur Wordle game Rafisa</Title>
                <EditionTitle>
                    Édition : Culture Numérique
                </EditionTitle>
           <Text>
               Des mots 5 lettres ou moins liés aux écrans, au web et au high-tech
           </Text>
                <Button onClick={onStart}>
                    Jouer
                </Button>
       </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 50vh;
    padding: 20px;
    box-sizing: border-box;
    background-color: #121213; /* Harmonisé avec le reste du jeu */
    margin-bottom: 70px;
`;

const Image = styled.img`
    width: 100%;
    max-width: 450px; /* Taille contrôlée pour le logo */
    margin-bottom: 20px;

    @media (max-width: 480px) {
        height: auto;
        max-width: 3000px;
    }
`;

const Title = styled.h1`
    font-weight: 800;
    font-size: 3rem;
    color: #ffffff;
    margin: 10px 0;
    letter-spacing: 1px;

    @media (max-width: 768px) {
        font-size: 2.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
    }
`;

const EditionTitle = styled.h3`
    margin: 5px 0 15px 0;
    color: #818384; /* Plus doux sur fond sombre, ou mettez votre couleur préférée */
    font-size: 2.5em;
    font-weight: 600;
    letter-spacing: 2px;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const Text = styled.p`
    font-size: 1.2rem;
    margin: 0 0 30px 0;
    color: #ffffff;
    max-width: 300px;
    line-height: 1.5;

    @media (max-width: 480px) {
        font-size: 1rem;
        padding: 0 10px;
    }
`;

const Button = styled.button`
    padding: 14px 32px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #7c6fff, #9b6bff);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(124, 111, 255, 0.35);

    &:hover {
        opacity: 0.9;
       transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(124, 111, 255, 0.5);
    }

    @media (max-width: 480px) {
        width: 80%;
        max-width: 250px;
        padding: 12px 20px;
    }
`;