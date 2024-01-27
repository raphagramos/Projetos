import "../app.css";
import DataTable from "../components/Tabela/Tabela";
import { GridColDef } from "@mui/x-data-grid";
import useProductsData from "./buscaProdutos"

export const Produtos: React.FC = () => {
  const {produtos}= useProductsData();

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
      {produtos.length > 0 ? (
        <DataTable columns={columns} rows={produtos} getRowId={(row) => row.id_produto} />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};
