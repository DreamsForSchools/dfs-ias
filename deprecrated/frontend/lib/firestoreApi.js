import firebase from 'firebase/app'
import 'firebase/database';
// import {mutate} from 'swr';

// import {sampleData} from '../sample-data/sampleData';

const db = firebase.database();

export async function firestoreGet(id, currentSeason){
    if(id === 'Seasons'){
      console.log("2. Reading Seasons: ");
      return db.ref('Seasons').once('value').then(
        (Snapshot) => {
            var seasonList = [];
            for (const key in Snapshot.val()){
                seasonList.push(Snapshot.val()[key]);
            }
            return seasonList;
        }
      ).catch((e)=>{console.log("2.1 Reading Seasons Error,",currentSeason,id,e);return []});
    }else{
      console.log("3.1 Reading Document: ",id,currentSeason);
      if (id === 'Programs'){
          return db.ref(currentSeason+'/'+id).once('value').then(
            (Snapshot) => {return Snapshot.val()}
          ).catch((e)=>console.log("3.2 Reading Document Error,",currentSeason,id,e));
      }else if(id === 'Instructors'){
          return db.ref(currentSeason+'/'+'instructors').once('value').then(
            (Snapshot) => {
                const instructorObject = Snapshot.val();
                var documentList = [];
                var newDocument = {};
                for (const key in instructorObject){
                    newDocument = instructorObject[key];
                    newDocument.id = key;
                    documentList.push(newDocument);
                }
                return documentList;
            }
          ).catch((e)=>{console.log("3.2 Reading Document Error,",currentSeason,id,e);return []});
      }
      return db.ref(currentSeason+'/'+'schools').once('value').then(
        (Snapshot) => {
            const schoolObject = Snapshot.val();
            var documentList = [];
            var newDocument = {};
            for (const key in schoolObject){
                newDocument = schoolObject[key];
                newDocument.id = key;
                documentList.push(newDocument);
            }
            return documentList;
        }
      ).catch((e)=>{console.log("3.2 Reading Document Error,",currentSeason,id,e);return []});
    }
};

export function addDocuments(currentSeason, table_type, added){
    if(table_type === 'Instructors'){
        table_type='instructors';
    }else{
        table_type='schools';
    }
    console.log('4.1 Adding new doc: ',added,'to',currentSeason,table_type);
    var oldRef = db.ref(currentSeason+'/'+table_type);
    var newIds = [];
    added.map(item => {
        var newRef = oldRef.push();
        newIds.push(newRef.key);
        newRef.set(item).catch(e=>console.log("Error Adding document: ", e));
    });
    return newIds;
};
export function editDocuments(currentSeason, table_type, changed, changedRows){
    if(table_type === 'Instructors'){
        table_type='instructors';
    }else{
        table_type='schools';
    }
    console.log('4.2 Editing doc: ',changed,'to',currentSeason,table_type);
    changedRows.map(item => { if (changed[item.id]){
        db.ref(currentSeason+'/'+table_type+'/'+item.id)
            .set(item)
            .catch(e=>console.log("Error Editing document: ", e))
    }})
    return null;
};
export function deleteDocuments(currentSeason, table_type, deleted){
    if(table_type === 'Instructors'){
        table_type='instructors';
    }else{
        table_type='schools';
    }
    console.log('4.3 Deleting doc: ',deleted,'from',currentSeason,table_type);
    deleted.forEach(item => {
        db.ref(currentSeason+'/'+table_type+'/'+item)
            .remove()
            .catch(e=>console.log("Error Editing document: ", e))
    });
    return null;
};