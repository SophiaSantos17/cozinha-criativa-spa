import React, { useState, useEffect } from 'react';
import "./config-profile.css";
import { getReceitas, excluirReceita } from '../../api/api';
import IconConfig from "../../assets/icones/configuracao-vazado-branco.png";
import Header from "../../components/header";
import CardGerenciar from "../../components/card-gerenciar-receita";
import { useNavigate } from 'react-router-dom';

function ConfigProfile() {
  const [receitas, setReceitas] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        const response = await getReceitas();
        setReceitas(response);
      } catch (error) {
        console.error('Erro ao obter receitas:', error);
      }
    };

    fetchReceitas();
  }, []);

  const handleExcluirReceita = async (id) => {
    try {
      await excluirReceita(id);
      const novasReceitas = await getReceitas();
      setReceitas(novasReceitas);
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
    }
  };

  const handleEditarReceita = (id) => {
    navigate(`/editar-receita/${id}`);
  };

  const [alturaNav] = useState('auto');


  return (
    <div className="container-config-profile">
      <Header />
      <div className="conteudo">
        <nav className="menu" style={{ height: alturaNav }}>
          <button className="btn-menu">
            <img src={IconConfig} alt="" />Configurar Receitas
          </button>
        </nav>

        <div className="box-conteudo">
          <div className="box-configurar-receitas">
            <h2 className="title-gerenciar">Gerenciar Receitas</h2>
            <h4 className="total-receitas-title"><span>{receitas.length}</span> Receitas</h4>
            <div className="box-cards">
              {receitas.map((receita) => (
                <CardGerenciar
                  key={receita._id}
                  Id={receita._id}
                  Titulo={receita.nome_receita}
                  Apresentacao={receita.apresentacao}
                  onExcluir={handleExcluirReceita}
                  onEditar={handleEditarReceita}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigProfile;
