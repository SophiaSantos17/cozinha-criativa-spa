
import "./info_receita.css";
import IconImg from "../../assets/icones/icone-img.png";
import Header from "../../components/header";
import Footer from "../../components/footer";

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {getInfoReceita} from '../../api/api';

const InfoReceita = () => {
  let { id } = useParams();
  const [receita, setReceita] = useState(null);


  useEffect(() => {
    getInfoReceita(id)
      .then((response) => {
        console.log('Resposta da API:', response);
        setReceita(response); // Alteração nesta linha
      })
      .catch((error) => console.log('Erro ao chamar a API:', error));
  }, [id]);
  
  

  if (!receita) {
    console.log('Receita:', receita);
    return <p>Carregando...</p>;
  }
  

  return (
    <div className="container-info">
      <Header />
      <div className="top-box">
        <img src={IconImg} alt="" width={400} height={400} />
        <div className="box-text">
          <h1>{receita.nome_receita}</h1>
          <p>{receita.apresentacao}</p>
        </div>
      </div>

      <div className="bottom-box">
        <h2>Informação da Receita</h2>
        <div className="text-top">
          <div>
            <h3>Categoria:</h3>
            <p>{receita.categoria}</p>
          </div>

          <div>
            <h3>Tempo de Preparo:</h3>
            <p>{receita.tempo_preparo[0].horas_receita} Horas {receita.tempo_preparo[0].minutos} Minutos</p>
          </div>
        </div>
        <div className="text-bottom">
          <h3>Ingredientes:</h3>
            {receita.ingredientes.map((ingrediente) => (
              <p key={ingrediente._id}>
                {ingrediente.descricao}
              </p>
            ))}

          <h3>Modo de preparo:</h3>
            {receita.modo_de_preparo.map((passo) => (
              <p key={passo._id}>{passo.passo}</p>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoReceita;
