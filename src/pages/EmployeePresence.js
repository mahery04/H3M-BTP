import React, { useEffect, useState, useMemo } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import dailyEmployeeService from '../services/dailyEmployeeService';

import { useParams } from 'react-router-dom';

import Table from "./Table";

import axios from 'axios';

function EmployeePresence() {

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
    const [data, setData] = useState([]);

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

    useEffect(() => {
        (async () => {
          const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
          setData(result.data);
        })();
    }, []);

    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "TV Show",
            // First group columns
            columns: [
              {
                Header: "Name",
                accessor: "show.name"
              },
              {
                Header: "Type",
                accessor: "show.type"
              }
            ]
          },
          {
            // Second group - Details
            Header: "Details",
            // Second group columns
            columns: [
              {
                Header: "Language",
                accessor: "show.language"
              },
              {
                Header: "Genre(s)",
                accessor: "show.genres"
              },
              {
                Header: "Runtime",
                accessor: "show.runtime"
              },
              {
                Header: "Status",
                accessor: "show.status"
              }
            ]
          }
        ],
        []
    );

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
            <Table columns={columns} data={data} />
        </Card>
    </div>
  )
}

export default EmployeePresence