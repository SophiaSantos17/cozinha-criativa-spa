import React, { useState } from 'react';
import "./header-login.css";
import Logo from "../../assets/logo/logo_laranja.png";
import IconMenu from "../../assets/icones/menu-preto.png";
import IconPerfil from "../../assets/icones/user-preto.png";

import { Link } from 'react-router-dom';
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <div className="box-logo">
                <Link to="/">
                    <img src={Logo} alt="" />

                </Link>
            </div>
            <div className={`box-opts ${menuOpen ? 'active' : ''}`}>
                <div className="box-icons">
                    <Link to="/perfil" className='btn-perfil'><img src={IconPerfil} alt="" /><p>Perfil</p></Link>
                </div>
            </div>
            <div className="box-btn-responsivo">
                <button className={`btn-open-menu ${!menuOpen ? '' : 'hidden'}`} onClick={toggleMenu}> <img src={IconMenu} alt="" /> </button>
            </div>
        </header>
    );
}

export default Header;
