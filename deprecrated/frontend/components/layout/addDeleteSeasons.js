import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useAuth } from "../../lib/useAuth.js";
import {mutate} from 'swr';


import firebase from 'firebase/app'
import 'firebase/database';

export function DeleteSeason({deleteOpen, setDeleteOpen}){
    const {setPageName, seasonList, currentSeason, setSeasonList, setCurrentSeason} = useAuth();

    const handleSeasonDelete = ()=>{
        var newSeasonList = seasonList.filter(season=> season!==currentSeason);
        firebase.database().ref(currentSeason).remove();
        firebase.database().ref('Seasons/'+currentSeason).remove();
        setDeleteOpen(false);
        setSeasonList(newSeasonList);
        setCurrentSeason(newSeasonList[0]);
        mutate(['Seasons',true],newSeasonList,false);
        setPageName('Programs');
    };
    const actionButtons = (
        <>
        <Button 
            children={'Cancel'}
            style={{color: "#ffffff"}} 
            onClick={()=>setDeleteOpen(false)} 
            size="small"
        />
        <Button 
            children={'Delete'} 
            style={{color: "#f50057"}} 
            onClick={()=>{handleSeasonDelete()}} 
            size="small"
        />
        </>
    );

    return (
        <Snackbar 
            message={"Are you sure you want to delete the \""+currentSeason+"\" database?"} 
            style={{width:"100%"}} 
            anchorOrigin={{vertical:'bottom', horizontal:'center'}} 
            open={deleteOpen} 
            action={actionButtons}
        />
    );
}

export function AddSeason({addOpen, setAddOpen}){
    const classes = useStyles();
    const {setPageName, seasonList, setSeasonList, setCurrentSeason} = useAuth(); 
    const [seasonName, setSeasonName] = useState('');
    const [blankSeason, setBlankSeason] = useState(true);
    const [exportSeason, setExportSeason] = useState('');
    const [error, setError] = useState(false);

    const handleAdd = () =>{
        var newSeasonList = seasonList;
        newSeasonList.push(seasonName);
        setAddOpen(false);
        setSeasonList(newSeasonList);
        setCurrentSeason(seasonName);
        const tempSeasonObject = {};
        tempSeasonObject[seasonName] = seasonName;
        firebase.database().ref('Seasons').update(tempSeasonObject);
        if(blankSeason){
            firebase.database().ref(seasonName).update({'Programs':{'unassigned_instructors':0}});
        }else{
            firebase.database().ref(exportSeason).once('value').then(
                (Snapshot)=>{
                    var newDatabase = {};
                    newDatabase[seasonName] = Snapshot.val();
                    firebase.database().ref('/').update(newDatabase);
                }
            );
        }
        setSeasonName('');
        setError('');
        mutate(['Seasons',true],newSeasonList,false);
        setPageName('Programs');
        return null;
    };
    const handleTextChange = (value)=>{
        setSeasonName(value);
        if(seasonList.includes(value)){
            setError('Season name already exists.');
        }else if(value === 'Seasons'){
            setError('Cannot name season \"Seasons\"');
        }else{
            setError(false);
        }
    }
    return (
        <Dialog open={addOpen} aria-labelledby="addSeasonDialogTitle">
            <DialogTitle
                children={'Create a New Season'} id="addSeasonDialogTitle"/>
            <DialogContent>
                <DialogContentText 
                    children={'Please enter the name for the new Season and \
                    choose between starting a new blank database or exporting \
                    data from an older database.'}
                />
                <form className={classes.form} noValidate>
                    <TextField
                        label="New Season" id="New-Season-Name"
                        className={classes.formControl} variant="outlined" margin="normal" fullWidth autoFocus
                        value={seasonName}
                        onChange={(event)=>handleTextChange(event.target.value)}
                        error={error?true:false}
                        helperText={error}
                    />
                    <FormControlLabel
                        label={blankSeason?"New Blank Season":"Export Old Season"} className={classes.formControlLabel}
                        control={
                            <Switch checked={blankSeason} onChange={()=>setBlankSeason(!blankSeason)}/>}       
                    />
                    <FormControl className={classes.formControl} disabled={blankSeason}>
                        <InputLabel
                            children={'Export Season'} id="ExportSeasonLabel"/>
                        <Select id="ExportSeasonSelect" value={exportSeason} onChange={(event)=>setExportSeason(event.target.value)}>
                            {seasonList.map(season => (<MenuItem  value={season} key={"ExportSeason"+season}>{season}</MenuItem >))}
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={()=>setAddOpen(false)} color="primary"
                />
                <Button
                    children={'Create'}
                    disabled={error?true:false || seasonName===''} 
                    onClick={()=>handleAdd()} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));
