import React, { useState,useEffect } from 'react'

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { useTheme } from '@mui/material/styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import dailyEmployeeService from '../services/dailyEmployeeService';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function createData(id,matricule, firstname, lastname) {
  return {
    id,
    matricule,
    firstname,
    lastname,
    history: [
      {
        jour: 'Lundi',        
      },
      {
        jour: 'Mardi',        
      },
      {
        jour: 'Mercredi',        
      },
      {
        jour: 'Jeudi',        
      },
      {
        jour: 'Vendredi',        
      },
      {
        jour: 'Samedi',        
      },
      {
        jour: 'Dimanche',
      },
    ],
  };
}






function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.matricule}</TableCell>
        <TableCell align="center">{row.firstname}</TableCell>
        <TableCell align="center">{row.lastname}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Présence
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Janvier 2022</TableCell>
                      
                    <TableCell align="center" sx={{backgroundColor:'Khaki'}}>Semaine 1</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'Khaki'}}>Avance</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'Khaki'}}>Salaire</TableCell>
            
                    <TableCell align="center" sx={{backgroundColor:'Plum'}}>Semaine 2</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'Plum'}}>Avance</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'Plum'}}>Salaire</TableCell>  
                
                    <TableCell align="center" sx={{backgroundColor:'PaleGreen'}}>Semaine 3</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'PaleGreen'}}>Avance</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'PaleGreen'}}>Salaire</TableCell>
                  
                    <TableCell align="center" sx={{backgroundColor:'LightSeaGreen'}}>Semaine 4</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'LightSeaGreen'}}>Avance</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'LightSeaGreen'}}>Salaire</TableCell>
                
                    <TableCell align="center" sx={{backgroundColor:'Coral'}}>Semaine 5</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'Coral'}}>Avance</TableCell>
                    <TableCell align="center" sx={{backgroundColor:'Coral'}}>Salaire</TableCell>
                    
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.jour}>
                      <TableCell component="th" scope="row">
                        {historyRow.jour}
                      </TableCell>
                      <TableCell align="center" sx={{backgroundColor:'Khaki'}}>1</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'Khaki'}}>2</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'Khaki'}}>3</TableCell>

                      <TableCell align="center" sx={{backgroundColor:'Plum'}}>4</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'Plum'}}>5</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'Plum'}}>6</TableCell>

                      <TableCell align="center" sx={{backgroundColor:'PaleGreen'}}>7</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'PaleGreen'}}>8</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'PaleGreen'}}>9</TableCell>

                      <TableCell align="center" sx={{backgroundColor:'LightSeaGreen'}}>10</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'LightSeaGreen'}}>11</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'LightSeaGreen'}}>12</TableCell>

                      <TableCell align="center" sx={{backgroundColor:'Coral'}}>13</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'Coral'}}>14</TableCell>
                      <TableCell align="center" sx={{backgroundColor:'Coral'}}>15</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    nom: PropTypes.number.isRequired,
    prenom: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        jour: PropTypes.string.isRequired,
      }),
    ).isRequired,
    matricule: PropTypes.string.isRequired,
  }).isRequired,
};

const DailyPresence = () => {

  const [dailyEmployees, setDailyEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const getDailyEmployees = () => {
    dailyEmployeeService.getAll().then((res) => {
      setDailyEmployees(res.data)
      
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getDailyEmployees()
  },[])

  const rows = dailyEmployees.map(dailyEmployee => ( createData(
    dailyEmployee.id,
    dailyEmployee.matricule,
    dailyEmployee.firstname,
    dailyEmployee.lastname,
  ))).sort((a, b) => (a.firstname < b.firstname ? -1 : 1));

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
      <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
        Présence des employés
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="rigth">N° Matricule</TableCell>
              <TableCell align="center">Nom </TableCell>
              <TableCell align="center">Prénom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => (
              <Row key={row.matricule} row={row} />
            ))} */}


          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.matricule} row={row} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}

          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DailyPresence