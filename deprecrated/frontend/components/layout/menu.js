import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import { MenuItems, SignOut, DFSIcon } from './menuItems';

import { useRouter } from 'next/router';

import { useAuth } from "../../lib/useAuth.js";


export default function Menu({open, handleDrawerClose}){
    
    const classes = useStyles();
    const router = useRouter();
    
    const {signout} = useAuth();
    
    const handleSignOut = () =>{
      signout().then(function(){
        console.log('Signed Out');
        router.push('/login');
      }).catch(function(error) {
        console.error('Sign Out Error', error);
      });
    };

    return (
      <Drawer open={open} variant="permanent" classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}}>   
          
          <Grid container direction="column" justify="space-between" style={{height: '100%'}}>
            
            <Grid item>
              <div className={classes.toolbarIcon}>
              {open? (<div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',}}><DFSIcon /></div>):''}
                  <IconButton onClick={handleDrawerClose}><ChevronLeftIcon /></IconButton>
              </div>
              <Divider /><MenuItems /><Divider />  
            </Grid>

            <Grid item>
              <Divider /><SignOut handleSignOut={handleSignOut} /><Divider />
            </Grid> 
          </Grid>       
      </Drawer>
    );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));