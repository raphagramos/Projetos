import { useState, useEffect } from "react";
import "./app.css";
import DataTable from "./components/Tabela/Tabela";
import { GridColDef } from "@mui/x-data-grid";

interface Produto {
  id_produto: number;
  nome_produto: string;
  preco: string;
  descricao: string;
  data_cadastro: string;
}

export const Produtos: React.FC = () => {
  const [Produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = "http://localhost:8081/produtos";
        const response = await fetch(backendUrl);

        if (response.ok) {
          const data = await response.json();
          console.log("Dados dos Produtos:", data);
          setProdutos(data as Produto[]);
        } else {
          console.error("Erro ao buscar dados dos Produtos:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos Produtos:", error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id_produto", headerName: "ID do Produto", width: 120, headerAlign: "center" },
    { field: "nome_produto", headerName: "Nome", width: 200, headerAlign: "center" },
    { field: "preco", headerName: "Preço", width: 200, headerAlign: "center" },
    { field: "descricao", headerName: "Descrição", width: 150, headerAlign: "center" },
    { field: "data_cadastro", headerName: "Data de Cadastro", width: 150, headerAlign: "center" },
  ];

  return (
    <div>
      <h2>Produtos</h2>
      {Produtos.length > 0 ? (
        <DataTable columns={columns} rows={Produtos} getRowId={(row) => row.id_produto} />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};
