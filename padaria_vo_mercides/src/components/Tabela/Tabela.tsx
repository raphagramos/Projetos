import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  columns: GridColDef[];
  getRowId: number[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, getRowId }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={getRowId}
        columns={columns}
        pageSizeOptions={[5,10]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
