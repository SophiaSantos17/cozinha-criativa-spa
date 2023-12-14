// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://violet-goose-tam.cyclic.app/api/", mode:'cors'
});

// ---------------------- RECEITA -----------------------
export const getInfoReceita = async (id) => {
  try { 
    const response = await api.get(`/receitas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter informações da receita:", error);
    throw error;
  }
};

// READ: Pega todas as receitas
export const getReceitas = async () => {
  try {
    const response = await api.get("/receitas");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter categorias:", error);
    throw error;
  }
};

// CREATE: Criar uma nova receita

export const criarReceita = async (novaReceita) => {
  try {
    const response = await api.post("/receitas", novaReceita);

    console.log('Receita criada:', response.data);
    return response.data; // retornando os dados da receita criada, se necessário
  } catch (error) {
    console.error('Erro ao criar receita:', error);
    throw error;
  }
};




// UPDATE: Atualizar uma receita existente por ID
export const atualizarReceita = async (id, dadosAtualizados) => {
  try {
    const response = await api.put(`/receitas/${id}`, dadosAtualizados);
    console.log('Receita atualizada:', response.data);
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
  }
};


// DELETE: Excluir uma receita por ID
export const excluirReceita = async (id) => {
  try {
    // Pergunta ao usuário se ele realmente deseja excluir a receita
    const confirmacao = window.confirm('Deseja mesmo excluir a receita?');

    if (confirmacao) {
      const response = await api.delete(`/receitas/${id}`);
      console.log('Receita excluída:', response.data);

      // Mostra um alerta após a exclusão bem-sucedida
      alert('Receita excluída com sucesso!');
    } else {
      // O usuário optou por não excluir
      alert('Exclusão cancelada pelo usuário.');
    }
  } catch (error) {
    console.error('Erro ao excluir receita:', error);
    alert('Erro ao excluir receita. Por favor, tente novamente.');
  }
};






export default api;
