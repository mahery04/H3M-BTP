import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation, Link, BrowserRouter as Router } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();

  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  const getMenus = (category) => navConfig.map(item => {
    if (item.category == category) return <NavItem key={item.title} item={item} active={match} />
  })

  const category = {
    boxSizing: 'border-box',
    listStyle: 'none',
    fontWeight: 700,
    lineHeight: 3,
    fontSize: '0.75rem',
    letterSpacing: '1.1px',
    textTransform: 'uppercase',
    paddingLeft: '10px'
  }

  return (
    <Box {...other}>
      <Accordion style={{backgroundColor: "#F9F9F9"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={category}>Accueil</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {getMenus('home')}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: "#F9F9F9"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={category}>Employé(e)s</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {getMenus('employee')}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: "#F9F9F9"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={category}>Outillage</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {getMenus('tools')}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: "#F9F9F9"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={category}>Fiche de présence</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {getMenus('presence')}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: "#F9F9F9"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={category}>Contrat</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {getMenus('contrat')}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor: "#F9F9F9"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={category}>Famille</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {getMenus('family')}
        </AccordionDetails>
      </Accordion>
       
      {/* <p style={category}>Dashboard</p>
      {getMenus('dashboard')} <br />
      <p style={category}>Employé(e)s</p>
      {getMenus('employee')} <br />
      <p style={category}>Outillage</p>
      {getMenus('tools')} <br /> */}
    </Box>
  );
}
