import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { useAuth } from "../../lib/useAuth.js";
import {mutate} from 'swr';


import firebase from 'firebase/app'
import 'firebase/database';

export default function DeleteProgram({   
        open, setOpen, 
        programData, oldProgramName, 
        handleProgramChange,
    }){
    const {currentSeason} = useAuth(); 


    const handleDelete = () =>{
        
        firebase.database().ref(currentSeason+'/Programs/'+oldProgramName).remove();
        firebase.database().ref(currentSeason+'/programs/'+oldProgramName).remove();
        firebase.storage().ref().child(currentSeason+'/'+oldProgramName+'.png').delete();

        delete programData[oldProgramName];
        mutate(['Programs',currentSeason],programData,false);

        handleProgramChange({
            oldProgramName: oldProgramName,
            newProgramName: null, 
            deleting: true, 
        });

        setOpen(false);
        return null;
    };

    return (
        <Dialog maxWidth='xs' open={open} onClose={()=>setOpen(false)} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Delete Program <b>{oldProgramName}</b>?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to <b>delete</b> program <b>{oldProgramName}</b> from current season?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={()=>setOpen(false)} color="primary"
                />
                <Button
                    children={"Delete"}
                    onClick={()=>handleDelete()} color="primary" variant="contained"
                    // style={{color:'red'}}
                />
            </DialogActions>
        </Dialog>
    );
}
