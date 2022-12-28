import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const columns = [
 
  { 
      field: 'event', 
      headerName: 'Evento', 
      minWidth: 300,
      description: 'Qual o evento'
  },
  { 
      field: 'date', 
      headerName: 'Data',
      description: 'Data em que ocorreu o evento',
      minWidth: 120,
      /*resizable: true,*/
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    description: 'Status do evento',
    minWidth: 200,
    /*resizable: true,*/
  },
  {
    field: 'owner',
    headerName: 'Responsável',
    description: 'Pessoa responsável pelo evento.',
    sortable: true,
    minWidth: 180,
    /*resizable: true,*/
  },
];

const rows = [
  { id: 1, event: 'Snow', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'Pedro' },
  { id: 2, event: 'Lannister', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'José' },
  { id: 3, event: 'Lannister', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'Maria' },
  { id: 4, event: 'Stark', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'João' },
  { id: 5, event: 'Targaryen', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'Alfredo' },
  { id: 6, event: 'Melisandre', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'Jaburicaba' },
  { id: 7, event: 'Clifford', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'Zé Zezão' },
  { id: 8, event: 'Frances', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'Pé de Boi' },
  { id: 9, event: 'Roxie', date: '20/11/2021', status: 'Aguardando confirmação', owner: 'Maria Maria da Silva' },
];


const Log = (props) => 
{
    return(
      <Box
          sx={{
              boxShadow: 3,
              bgcolor: 'background.paper',
              m: 1,
              borderRadius:2,
              overflow: 'hidden',
          }}
      >
        
        <div style={{ height: 400, width: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  rowsPerPage={5}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>

      </Box>
    )
}


export default Log