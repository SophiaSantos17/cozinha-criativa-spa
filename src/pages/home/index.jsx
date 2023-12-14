import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import ImgBanner from '../../assets/banners/img-banner-home.png';
import CardHome from '../../components/card-home';
import Footer from '../../components/footer';
import { getReceitas } from '../../api/api'; // Ajuste o caminho conforme necessário
import "./home.css"

const Home = () => {
  const [receitas, setReceitas] = useState([]);

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

  const handleScroll = () => {
    const targetElement = document.getElementById('ver-mais');

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container-home">
      <Header />
      <div className="div-total-banner">
        <div className="div-text">
          <h1>Uma Viagem Gastronômica Através das Receitas mais Irresistíveis!</h1>
          <p>Explorando Sabores: Descubra o Delicioso Mundo da Culinária Conosco.</p>
          <button className="btn-ver" onClick={handleScroll}>
            Ver Receitas
          </button>
        </div>
        <div className="div-img">
          <img src={ImgBanner} alt="img-banner" width={800} height={600} />
        </div>
      </div>
      <div id="ver-mais" className="sub-title">
        <div className="text-conteudo">
          <h2>Veja Todas as Receitas</h2>
        </div>
        <div className="container-cards">
          {receitas.map((receita) => (
            <CardHome
              key={receita._id}
              Id={receita._id}
              Titulo={receita.nome_receita}
              Horas={receita.tempo_preparo[0].horas_receita}
              Minutos={receita.tempo_preparo[0].minutos}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
