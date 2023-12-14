import React, { useState } from 'react';
import './nova-receita.css';
import IconImg from '../../assets/icones/icone-img.png';
import { criarReceita } from '../../api/api';
import Header from "../../components/header";

const NovaReceita = () => {
  const [titulo, setTitulo] = useState('');
  const [apresentacao, setApresentacao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [ingredientes, setIngredientes] = useState(['']);
  const [modoPreparo, setModoPreparo] = useState(['']);

  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, '']);
  };

  const handleAddModoPreparo = () => {
    setModoPreparo([...modoPreparo, '']);
  };

  const handleIngredienteChange = (index, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = value;
    setIngredientes(newIngredientes);
  };

  const handleModoPreparoChange = (index, value) => {
    const newModoPreparo = [...modoPreparo];
    newModoPreparo[index] = value;
    setModoPreparo(newModoPreparo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaReceita = {
      nome_receita: titulo,
      apresentacao,
      categoria,
      tempo_preparo: {
        horas: parseInt(horas) || 0,
        minutos: parseInt(minutos) || 0,
      },
      ingredientes: ingredientes.map(descricao => ({ descricao })),
      modo_de_preparo: modoPreparo.map(passo => ({ passo })),
    };

    try {
      await criarReceita(novaReceita);
      alert('Receita adicionada com sucesso!');
      // Aqui você pode redirecionar para a página de informações da receita, por exemplo.
      // window.location.href = '/informacoes-receita';
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
      alert('Erro ao adicionar receita. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container-add">
      <Header/>
      <h2 className="title-add">Nova Receita</h2>
      <h4 className="title-top-size">Apresentação</h4>
      <form onSubmit={handleSubmit}>
        <div className="top-size">
          <div className="img-size">
            <img src={IconImg} alt="" />
          </div>
          <div className="apresentacao-size">
            <input
              type="text"
              placeholder="Titulo da Receita"
              className="input-title"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="Apresentação"
              className="text-apresentacao"
              value={apresentacao}
              onChange={(e) => setApresentacao(e.target.value)}
            ></textarea>
          </div>
        </div>
        
        <h4 className='title-bottom-infos'>Informações da Receita</h4>
        <div className="bottom-size">
          <div className="box-infos-receita">
          <select
            id="escolher-opcao"
            name="escolher-opcao"
            className='select-opt'
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" disabled hidden>Categoria</option>
            {['Refeição', 'Doce/Sobremesa', 'Bebida', 'Salgado', 'Lanche'].map((opcao, index) => (
              <option key={index} value={opcao}>{opcao}</option>
            ))}
          </select>
            <div className="box-time">
              <label htmlFor="horas-minutos">Tempo de Preparo: </label>
              <div className="box-infos-time">
                <input
                  type="number"
                  name="horas"
                  id="horas"
                  max="24"
                  min="0"
                  placeholder="Horas"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                />
                <h1>:</h1>
                <input
                  type="number"
                  name="minutos"
                  id="minutos"
                  max="60"
                  min="0"
                  placeholder="Minutos"
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                />
                </div>
            </div>
          </div>

          <div className="ingredientes">
            <h4>Ingredientes</h4>
            {ingredientes.map((ingrediente, index) => (
              <div key={index}>
                <input
                  className='input-ingrediente'
                  type="text"
                  placeholder={`Ingrediente ${index + 1}`}
                  value={ingrediente}
                  onChange={(e) => handleIngredienteChange(index, e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddIngrediente} className='btn-add-ingrediente'>
              Adicionar Ingrediente
            </button>
          </div>

          <div className="modo-de-preparo">
            <h4>Modo de Preparo</h4>
            {modoPreparo.map((passo, index) => (
              <div key={index}>
                <textarea
                  cols="30"
                  rows="3"
                  placeholder={`Passo ${index + 1}`}
                  value={passo}
                  onChange={(e) => handleModoPreparoChange(index, e.target.value)}
                ></textarea>
              </div>
            ))}
            <button type="button" onClick={handleAddModoPreparo} className='btn-add-passo'>
              Adicionar Passo
            </button>
          </div>
        </div>

        <div className="box-button">
          <button type="submit" className="btn-salvar">
            Adicionar Receita
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovaReceita;
