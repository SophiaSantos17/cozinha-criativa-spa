import React from "react";
import "./gerenciar.css";

import IconImg from "../../assets/icones/icone-img.png";
import IconLixeira from "../../assets/icones/delete-vazado-preto.png";
import IconEdit from "../../assets/icones/edit-vazado-preto.png";
import { useNavigate } from 'react-router-dom';

const CardGerenciar = ({ Id, Titulo, Apresentacao, onExcluir }) => {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/editar-receita/${Id}`);
  };

  const handleExcluir = () => {
    onExcluir(Id); // Chama a função passada como propriedade
  };

  return (
    <div className="card">
      <div className="size-img-card">
        <img src={IconImg} alt="" />
      </div>
      <div className="size-conteudo">
        <h1 className="title-receita">{Titulo}</h1>
        <p className="apresentacao-receita">{Apresentacao}</p>
      </div>
      <div className="size-icons">
        <button className="btn-editar" onClick={handleEditar}>
          <img src={IconEdit} alt="" />
        </button>
        <button className="btn-excluir" onClick={handleExcluir}>
          <img src={IconLixeira} alt="" />
        </button>
      </div>
    </div>
  );
};

export default CardGerenciar;
