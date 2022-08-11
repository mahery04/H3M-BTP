import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import dailyEmployeeService from '../services/dailyEmployeeService';

import styled from 'styled-components';
import { useTable } from 'react-table';

import makeData from './makeData';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function EmployeePresence() {

  const columns = useMemo(
    () => [
      {
        Header: '1ère Semaine',
        columns: [
          {
            Header: 'Janvier',
            accessor: 'janvier',
          }
        ],
      },
      {
        Header: '1ère Semaine',
        columns: [
          {
            Header: 'Semaine 1',
            accessor: 'semaine 1',
          },
          {
            Header: 'Salaire 1',
            accessor: 'salaire 1',
          },
        ],
      },
      {
        Header: '2ème Semaine',
        columns: [
          {
            Header: 'Semaine 2',
            accessor: 'semaine 2',
          },
          {
            Header: 'Salaire 2',
            accessor: 'salaire 2',
          },
        ],
      },
      {
        Header: '3ème Semaine',
        columns: [
          {
            Header: 'Semaine 3',
            accessor: 'semaine 3',
          },
          {
            Header: 'Salaire 3',
            accessor: 'salaire 3',
          },
        ],
      },
      {
        Header: '4ème Semaine',
        columns: [
          {
            Header: 'Semaine 4',
            accessor: 'semaine 4',
          },
          {
            Header: 'Salaire 4',
            accessor: 'salaire 4',
          },
        ],
      },
      {
        Header: '5ème Semaine',
        columns: [
          {
            Header: 'Semaine 5',
            accessor: 'semaine 5',
          },
          {
            Header: 'Salaire 5',
            accessor: 'salaire 5',
          },
        ],
      },
    ],
    []
  )

  const dataPresence = useMemo(() => makeData(7), [])
  
  const initialEmployeeState = {
    id:           null,
    matricule:    '',
    firstname:    '',
    lastname:     ''
  }

  const findEmployee = useParams();
  const employee_id = findEmployee.id 
  const [loaded, setLoaded] = useState(false)
  const [dailyemployee, setDailyemployee] = useState(initialEmployeeState)
  const [data, setData] = useState([])

  
  useEffect(() => {
    const load = async () => {
      const res = await dailyEmployeeService.get(employee_id)
      console.log("RES LAVA BE ", res.data);
      setDailyemployee(res.data)
      setLoaded(true)
    }
    if (employee_id && !loaded) {
      load();
    }
  }, [employee_id, loaded])

  return (
    <div>
        <Button 
          variant="contained"
          href={'/presence/dailypresence'}
        >
          Retour
        </Button> 
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5, textAlign:'center' }}>
          Listes des présences des employés
        </Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <b>N° Matricule : </b>{dailyemployee.matricule} <br/>
            <b>Nom : </b> {dailyemployee.firstname} <br/>
            <b>Prénom : </b> {dailyemployee.lastname} <br/>
          </CardContent>
          <Styles>
          <Table columns={columns} data={dataPresence} />
        </Styles>
        </Card>
    </div>
  )
}

export default EmployeePresence