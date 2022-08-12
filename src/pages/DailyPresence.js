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
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useTheme } from '@mui/material/styles';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import dailyEmployeeService from '../services/dailyEmployeeService';


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
  )))

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
            {rows.map((row) => (
              <Row key={row.matricule} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DailyPresence