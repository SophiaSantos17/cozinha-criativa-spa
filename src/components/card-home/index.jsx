import React from "react";
import { Link } from "react-router-dom";
import './style-cardHome.css';
import IconImg from "../../assets/icones/icone-img.png"
import IconProfile from "../../assets/icones/user-preto.png"

const CardHome = ({Id, Titulo, Horas, Minutos}) =>{

    return(
            <Link to={`/info-receita/${Id}`} className="box-total-card-home">
                <div className="box-top-size">
                    <img src={IconImg} alt="" id="icon-img" />
                </div>
                <div className="box-bottom-size">
                    <div className="top-size-profile">
                        <img src={IconProfile} alt="" />
                        <p>@cozinhacriativa</p>
                    </div>
                    <div className="box-text-receita">
                        <h3>{Titulo}</h3>
                        <p>{Horas} Horas <br/> {Minutos} Minutos</p>
                    </div>
                </div>
            </Link>
    )

}


export default CardHome;