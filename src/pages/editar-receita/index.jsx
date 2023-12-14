import React, { useState, useEffect } from 'react';
import './edit-receita.css';
import IconImg from '../../assets/icones/icone-img.png';
import { getInfoReceita, atualizarReceita } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

import Header from "../../components/header"

const EditarReceita = () => {
  const [titulo, setTitulo] = useState('');
  const [apresentacao, setApresentacao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState(0);
  const [ingredientes, setIngredientes] = useState(['']);
  const [modoDePreparo, setModoDePreparo] = useState(['']);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceita = async () => {
      try {
        const receita = await getInfoReceita(id);

        setTitulo(receita.nome_receita);
        setApresentacao(receita.apresentacao);
        setCategoria(receita.categoria);
        setHoras(receita.tempo_preparo.horas);
        setMinutos(receita.tempo_preparo.minutos);
        setIngredientes(receita.ingredientes.map(ingrediente => ingrediente.descricao));
        setModoDePreparo(receita.modo_de_preparo.map(passo => passo.passo));
      } catch (error) {
        console.error('Erro ao obter informações da receita:', error);
      }
    };

    fetchReceita();
  }, [id]);

  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, '']);
  };

  const handleAddPasso = () => {
    setModoDePreparo([...modoDePreparo, '']);
  };

  const handleIngredienteChange = (index, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = value;
    setIngredientes(newIngredientes);
  };

  const handlePassoChange = (index, value) => {
    const newModoDePreparo = [...modoDePreparo];
    newModoDePreparo[index] = value;
    setModoDePreparo(newModoDePreparo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receitaAtualizada = {
      nome_receita: titulo,
      apresentacao,
      categoria,
      tempo_preparo: [
        {
          horas_receita: parseInt(horas) || 0,
          minutos: parseInt(minutos) || 0,
        }
      ],
      ingredientes: ingredientes.map(descricao => ({ descricao })),
      modo_de_preparo: modoDePreparo.map(passo => ({ passo })),
    };

    try {
      await atualizarReceita(id, receitaAtualizada);
      alert('Receita atualizada com sucesso!');
      
      navigate(`/info-receita/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      alert('Erro ao atualizar receita. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container-add">
      <Header />
      <h2 className="title-add">Editar Receita</h2>
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
                <input
                    type="number"
                    name="horas"
                    id="horas"
                    max="24"
                    min="0"
                    placeholder="Horas"
                    value={horas || 0 }
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
                value={minutos || 0}
                onChange={(e) => setMinutos(e.target.value)}
              />
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
                {modoDePreparo.map((passo, index) => (
                    <div key={index}>
                    <textarea
                        cols="30"
                        rows="3"
                        placeholder={`Passo ${index + 1}`}
                        value={passo}
                        onChange={(e) => handlePassoChange(index, e.target.value)}
                    ></textarea>
                    </div>
                ))}
                <button type="button" onClick={handleAddPasso} className='btn-add-passo'>
                    Adicionar Passo
                </button>

            </div>
        </div>

        <div className="box-button">
          <button type="submit" className="btn-salvar">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarReceita;
