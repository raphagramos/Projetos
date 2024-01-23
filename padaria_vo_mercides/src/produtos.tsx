import React, { useState, useEffect } from 'react';
import './app.css'; // Importa o arquivo de estilos

interface Produto {
  id_produto: number;
  nome_produto: string;
  preco: number;
  descricao: string;
  // Adicione outras propriedades conforme necessário
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua a URL abaixo pela rota correta do seu backend
        const backendUrl = 'http://localhost:8081/produtos';
        const response = await fetch(backendUrl);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Dados dos produtos:', data);
          setProdutos(data as Produto[]);  // Defina o tipo de data como Produto[]
        } else {
          console.error('Erro ao buscar dados dos produtos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos produtos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Página de Produtos</h2>
      <table className="padrao-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id_produto}>
              <td>{produto.id_produto}</td>
              <td>{produto.nome_produto}</td>
              <td>{produto.preco}</td>
              <td>{produto.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produtos;
