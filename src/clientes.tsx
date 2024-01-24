import { useState, useEffect } from 'react';
import './app.css'; 
import DataTable from './components/Tabela/Tabela';
import { GridColDef } from '@mui/x-data-grid';

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
    { field: 'id_cliente', headerName: 'ID do Cliente', width: 120, headerAlign: 'center'},
    { field: 'nm_cliente', headerName: 'Nome', width: 200, headerAlign: 'center'},
    { field: 'endereco', headerName: 'Endereço', width: 200, headerAlign: 'center' },
    { field: 'telefone', headerName: 'Telefone', width: 150, headerAlign: 'center'},
    
  ];
  return (
    <div>
      <h2>Clientes</h2>
      {clientes.length > 0 ? (
        <DataTable columns={columns} rows={clientes}getRowId={(row) => row.id_cliente} />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
}

export default Clientes;
