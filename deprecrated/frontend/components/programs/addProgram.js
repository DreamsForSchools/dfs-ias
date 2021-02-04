import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';


import { useAuth } from "../../lib/useAuth.js";
import {mutate} from 'swr';

import { SketchPicker } from 'react-color'
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/storage';

export default function AddProgram({open, setOpen, programData}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 
    const [programName, setProgramName] = useState('');
    const [programColor, setProgramColor] = useState('#ffffff');
    const [programLogo, setProgramLogo] = useState('');

    const [error, setError] = useState(false);
    const [imgError, setImgError] = useState(false);

    const handleAdd = () =>{
        var newProgramData = programData;
        newProgramData[programName] = {
            'name': programName, 
            'color': programColor, 
            'assigned_schools': 0, 
            'assigned_instructors': 0,
            'needed_instructors': 0,
        };
        
        return firebase.storage().ref().child(currentSeason+'/'+programName+'.png').put(programLogo)
            .then(function(snapshot){
                console.log("File uploaded Sucessfully!");
                firebase.storage().ref().child(currentSeason+'/'+programName+'.png').getDownloadURL()
                    .then(function(url){
                        newProgramData[programName]['logo']=url;
                        firebase.database().ref(currentSeason+'/Programs/'+programName).set(newProgramData[programName]);
                        mutate(['Programs',currentSeason],newProgramData,false);
                        setProgramLogo('');
                        setProgramName('');
                        setError('');
                        setProgramColor('#ffffff')
                        setOpen(false);
                    });
            }).catch();
    };
    const handleFileUpload = (file)=>{
        if(file.type!=='image/png'){
            setProgramLogo('');
            setImgError('Invaild File type. Please upload .png file.');
        }else{
            setProgramLogo(file);
            setImgError(false);
        }
    };
    const handleTextChange = (value)=>{
        setProgramName(value);
        if(value in programData){
            setError('Program name already exists.');
        }else{
            setError(false);
        }
    };
    return (
        <Dialog style={{height:'100%'}} open={open} onClose={()=>setOpen(false)} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Add New Program
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add new program to current season. Please enter the name of the program, the associated theme color and the app logo in png format.
                </DialogContentText>
        
                <form className={classes.form} noValidate>
                    <TextField
                        label="New Program" id="New-Program-Name"
                        className={classes.formControl} variant="outlined" margin="normal" fullWidth autoFocus
                        value={programName}
                        onChange={(event)=>handleTextChange(event.target.value)}
                        error={error!=''}
                        helperText={error}
                    />
                    
                    <SketchPicker 
                        className={classes.formControlLabel} 
                        color={programColor} 
                        onChangeComplete={(color)=>{setProgramColor(color.rgb)}}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            children={'Select Logo'} id="logo upload program"/>
                        <Input error={imgError!=''} id="file input" type='file' accept="image/png" onChange={(event)=>handleFileUpload(event.target.files[0])}/>
                        <FormHelperText id="my-helper-text">{imgError}</FormHelperText>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={()=>setOpen(false)} color="primary"
                />
                <Button
                    children={'Create'}
                    disabled={(error!='') || (programName==='') || (imgError!='') || (programLogo==='')} 
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
      maxWidth: 225,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));
