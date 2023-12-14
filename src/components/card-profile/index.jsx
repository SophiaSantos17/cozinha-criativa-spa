import React from "react";
import IconImg from "../../assets/icones/icone-img.png";
import IconProfile from "../../assets/icones/user-preto.png"

import "./card-perfil.css"
import { Link } from "react-router-dom";

const CardPerfil = ({Id, receita}) => {
    return(
        <Link to={`/info-receita/${Id}`} className="box-total">
            <div className="box-top-size">
                <img src={IconImg} alt="" />
            </div>
            <div className="box-bottom-size">
                <div className="top-size-profile">
                    <img src={IconProfile} alt="" />
                    <p>@cozinhacriativa</p>
                </div>
                <div className="bottom-size-profile">
                    <h3>{receita}</h3>
                </div>
            </div>
        </Link>
    );

}

export default CardPerfil;