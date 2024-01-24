import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import localeTextPTBR from './Traducoes_MUI'

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  getRowId: (row: any) => any; 
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows, getRowId }) => {
  return (
    <Box sx={{ height: 380, width: '100%', backgroundColor: 'rgba(32, 32, 32, 0.9)', borderRadius: 9, overflow: 'hidden' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 100]}
        checkboxSelection
        getRowId={getRowId}
        localeText={localeTextPTBR}
        sx={{
          '& .MuiDataGrid-cell': {
            color: 'white'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'white'
          },
          '.MuiDataGrid-checkboxInput': {
            color: 'white'
          }
        }}
      />
    </Box>
  );
};

export default DataTable;
