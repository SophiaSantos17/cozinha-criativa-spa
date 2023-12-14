import React, { useState, useEffect } from "react";
import HeaderLogin from "../../components/header"
import CardPerfil from "../../components/card-profile";
import Footer from "../../components/footer";
import ImgPerfil from "../../assets/icones/user-preto.png";
import { getReceitas } from '../../api/api';

import { Link } from "react-router-dom";

import "./perfil.css";

const Perfil = () => {
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

    return (
        <div className="container-perfil">
            <HeaderLogin></HeaderLogin>
            <div className="box-profile">
                <div className="size-profile">
                    <div className="top-size-profile">
                        <div className="size-img">
                            <img src={ImgPerfil} alt="" />
                        </div>
                        <div className="size-infos-perfil">
                            <h2>Cozinha Criativa</h2>
                            <h4>@cozinhacriativa</h4>
                            <div className="size-infos-posts">
                                <div className="infos-posts">
                                    <h3>{receitas.length}</h3>
                                    <p>Posts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-size-profile">
                        <h5>Bio</h5>
                        <p>Bem-vindo à Cozinha Criativa, um universo culinário onde a arte de cozinhar se entrelaça com a inovação. Explore nossa vasta biblioteca de receitas, desde pratos clássicos até criações ousadas, e torne-se o chef de sua própria jornada gastronômica. Compartilhe suas criações visualmente deslumbrantes e mergulhe em uma comunidade vibrante de entusiastas da culinária. Aqui, não apenas cozinhamos, mas contamos histórias através dos sabores. Conecte-se, faça perguntas, troque dicas e descubra novas inspirações gastronômicas em um ambiente acolhedor. Siga-nos nas redes sociais para ficar atualizado com as últimas tendências e desafios culinários. Na Cozinha Criativa, cada refeição é uma oportunidade de experimentar, aprender e celebrar a diversidade da culinária. Juntos, transformamos cada prato em uma expressão única de criatividade e paixão. 🍽️🌟🌐</p>
                    </div>
                    <div className="buttons-size">
                        <Link className="btn-criar-post" to="/nova-receita">Criar Postagem</Link>
                        <Link className="btn-gerenciar-perfil" to="/gerenciar-perfil">Gerenciar Perfil</Link>
                    </div>
                    
                </div>
                <div className="size-receitas">  
                    <h2 className="title-receita">Receitas</h2>
                    <div className="box-receitas">
                        {receitas.map((receita) => (
                            <CardPerfil
                            key={receita._id}
                            Id={receita._id}
                            user={receita.nome_receita}
                            receita={receita.nome_receita}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Perfil;