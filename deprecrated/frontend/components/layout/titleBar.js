import React, {useState} from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { useAuth } from "../../lib/useAuth.js";
import { DeleteSeason, AddSeason } from './addDeleteSeasons';

import Tooltip from '@material-ui/core/Tooltip';

export default function appBar({open, handleDrawerOpen, setSortPageToggle}){
    const classes = useStyles();
    const {pageName, currentSeason, setCurrentSeason, seasonList, setPageName} = useAuth();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    
    const handleSeasonChange = (value) => {
      setSortPageToggle(false);
      setPageName('Programs');
      setCurrentSeason(value);}
    
    return (
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
              
              <IconButton children={<MenuIcon />} edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.menuButtonHidden)}/>
              <Typography children={pageName} component="h1" variant="h6" color="inherit" noWrap className={classes.title}/>
              
              <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2} style={{width: 'auto'}}>
                
                <Grid item>
                  <FormControl className={classes.formControl}>
                    <InputLabel 
                      children={'Season'}
                      id="Season-Select-Label"/>
                    <Select 
                      children={seasonList.map(
                        (Season) => 
                          <MenuItem children={Season} value={Season} key={Season}/>
                      )}
                      id="Season-Select" labelId="Season-Select-Label"  
                      value={currentSeason} 
                      onChange={(e)=>handleSeasonChange(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item>
                  <Fab
                    children={<LightTooltip children={<DeleteOutlineIcon />} title="Delete Season" placement="bottom-end"/>}
                    aria-label="Delete-Season" color="secondary" size='small'  
                    onClick={()=>setDeleteOpen(true)}
                  />
                  <DeleteSeason setDeleteOpen={setDeleteOpen} deleteOpen={deleteOpen}/>
                </Grid>

                <Grid item>
                  <Fab
                    children={<LightTooltip children={<AddIcon/>}  title="New Season" placement="bottom-start"/>} 
                    aria-label="Add-Season" color="secondary" size='small'  
                    onClick={() => setAddOpen(true)}
                  />
                  <AddSeason setAddOpen={setAddOpen} addOpen={addOpen} />
                </Grid>

              </Grid>
          </Toolbar>
      </AppBar>
    );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);