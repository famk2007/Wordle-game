import React from 'react';
import styled from "styled-components";
import Accueil from "../components/Accueil";

export default function Header() {
    return (
        <HeaderContainer>
            <HeaderLogo>
                <TitleGame>Wordle game</TitleGame>
            </HeaderLogo>

            <Nav>
                <NavList>
                    <NavItem><NavLink href="/">Accueil</NavLink></NavItem>
                </NavList>
            </Nav>
        </HeaderContainer>
    );
}

/* ==========================================
   STYLES AVEC STYLED-COMPONENTS
   ========================================== */

// 1. Conteneur principal du Header
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
`;

const TitleGame = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  color: #121213;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// 2. Section Navigation
const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #000000;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.2s ease;
    cursor: pointer;

  &:hover {
    color: #538d4e; /* Couleur verte Wordle au survol */
  }
`;