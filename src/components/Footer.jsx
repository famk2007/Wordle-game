import React from 'react';
import styled from 'styled-components';

export default function Footer() {
    return (
        <FooterContainer>
            <FooterText>
                &copy; {new Date().getFullYear()} Wordle Game. Tous droits réservés.
            </FooterText>

            <FooterLinks>
                {/* Remplacement du h1 par un span ou un lien plus adapté pour un footer */}
                <BrandName>Wordle Game</BrandName>
            </FooterLinks>
        </FooterContainer>
    );
}

/* ==========================================
   STYLES AVEC STYLED-COMPONENTS
   ========================================== */

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #121213; /* Fond sombre assorti au jeu */
  color: #818384; /* Texte gris discret */
  border-top: 1px solid #3a3a3c;
  width: 100%;
  gap: 10px;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 40px;
  }
`;

const FooterText = styled.p`
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
`;

const BrandName = styled.span`
  font-weight: bold;
  text-transform: uppercase;
  color: #818384;
  letter-spacing: 1px;
`;