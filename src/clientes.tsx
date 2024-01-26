import React from "react";
import useClientesData from "./components/Tabela/Busca_Clientes";
import DataTable from "./components/Tabela/Tabela";
import { GridColDef } from "@mui/x-data-grid";
import { ClientesEnum } from "./modules/common/core/enums/clientes.enum";
import "./components/Tabela/tabela.css";


export const Clientes: React.FC = () => {
  const { clientes } = useClientesData();

  const columns: GridColDef[] = [
    { field: "id_cliente", headerName: "ID do Cliente", width: 120, headerAlign: "center" },
    { field: "nm_cliente", headerName: "Nome", width: 200, headerAlign: "center" },
    { field: "endereco", headerName: "Endereço", width: 200, headerAlign: "center" },
    { field: "telefone", headerName: "Telefone", width: 150, headerAlign: "center" },
  ];

  return (
    <div className="table-container">
      <div className="responsive-table">
        <h2>{ClientesEnum.TITLE}</h2>
        {clientes.length > 0 ? (
          <DataTable columns={columns} rows={clientes} getRowId={(row) => row.id_cliente} />
        ) : (
          <p>{ClientesEnum.LOADING}</p>
        )}
      </div>
    </div>
  );
};