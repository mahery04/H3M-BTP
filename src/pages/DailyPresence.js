import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

const DailyPresence = () => {
    const breadcrumbs = [
        <Typography key="1">
            Employé(e)s
        </Typography>,
        <Typography key="2">
            Employées Journalier
        </Typography>,
    ];

    return (
        <div>
            <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
                Employées Journalier
                <Typography variant="h4" sx={{ px: 5, mt: 2, ml: -5, mb: 2 }}>
                    Employé(e)s
                </Typography>
                <Stack spacing={2}>
                    <Breadcrumbs separator="." aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Stack>

                {/* <Link to='/employee/new-dailyemployee'>
                    <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 10, ml: 150, mt: -10, width: 250, marginLeft: '70%' }}
                        startIcon={<AddIcon />}
                        href=''
                    >
                        Nouveau employé
                    </Button>
                    </Link> */}
            </Typography>
            <Container>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>
                            Matricule - nom - prénom
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>
                            Matricule - nom - prénom
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Container>

        </div>
    )
}

export default DailyPresence