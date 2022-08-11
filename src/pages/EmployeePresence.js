import React, { useEffect, useState } from 'react';
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const dataPresence = React.useMemo(() => makeData(20), [])
  
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
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
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