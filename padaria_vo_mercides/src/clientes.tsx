import { useState, useEffect } from 'react';
import './app.css'; 
import DataTable from './components/Tabela/Tabela';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Cliente {
  id_cliente: number;
  nm_cliente: string;
  endereco: string;
  telefone: string;
}

function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const backendUrl = 'http://localhost:8081/clientes';
        const response = await fetch(backendUrl);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Dados dos clientes:', data);
          setClientes(data as Cliente[]);  
        } else {
          console.error('Erro ao buscar dados dos clientes:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos clientes:', error);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id_cliente', headerName: 'ID do Cliente', width: 120 },
    { field: 'nm_cliente', headerName: 'Nome', width: 200 },
    { field: 'endereco', headerName: 'Endereço', width: 200 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
  ];

  const getRowId = (row: Cliente["id_cliente"]) => row;

  return (
    <div>
      <h2>Página de Clientes</h2>
      <DataTable columns={columns} getRowId={getRowId}/>
      {clientes.map((cliente) => (
          <tr key={cliente.id_cliente}>
          <td>{cliente.id_cliente}</td>
          <td>{cliente.nm_cliente}</td>
          <td>{cliente.endereco}</td>
          <td>{cliente.telefone}</td>
        </tr>
      ))}
    </div>
  );
}

export default Clientes;
