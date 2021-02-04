var firebase = require('firebase/app');

const getSchedule = (max_hours,min_hours) =>{

  while(true){
    var start_hour = (Math.floor(Math.random()*12)+8);
    var period_length = (Math.ceil(Math.random()*(max_hours-min_hours))+min_hours);
    var end_hour = start_hour + period_length;
    if(end_hour > 16){
      continue
    } 
    start_hour = start_hour<10?'0'+start_hour.toString():start_hour.toString();
    end_hour = end_hour<10?'0'+end_hour.toString():end_hour.toString();
    var start_min = (Math.floor(Math.random()*4)*15);
    start_min = start_min?start_min.toString():'00';
    
    var retObject = {
      'start':  start_hour + ':' + start_min,
      'end':  end_hour + ':' + start_min,
    };
    return retObject; 
  }
      
};



var instructors = {
    // id :{ incrementalId: 0},
    name : { faker: 'name.findName'},
    gender : { chance: 'gender' },
    year_of_instruction : {values: ['1st Year', '2nd Year', '3rd Year', '4th Year', '4+ Years']},
    major : {values: ['CS', 'EECS', 'Maths', 'Physics', 'Econ']},
    university : {values: ['UCI', 'UCLA', 'USC', 'UC Davis', 'UCSC']},
    region : {values: [['Irvine'], ['Los Angeles'], ['Orange County']]},
    address : {faker: 'address.streetAddress', locale: 'en_US'},
    car : {chance: 'bool'},
    returning_instructor : {chance: 'bool'},
    shirt_size : {values: ['S', 'M', 'L', 'XL']},
    programs_teaching : {function: function() {
      const shuffled = ['AppJam','WebJam','Scratch','LESTEM'].sort(()=>0.5-Math.random());
      return shuffled.slice(0,Math.ceil(Math.random()*4));
    }},
    languages_spoken : {function: function() {
      const shuffled = ['Spanish','Chinese','Hindi','Korean'].sort(()=>0.5-Math.random());
      return shuffled.slice(0,Math.ceil(Math.random()*4));
    }},
    schedule: { function: function(){
      const returnObject = {};

      const MonWedFri = getSchedule(3,6);

      returnObject['Monday'] = [MonWedFri];
      returnObject['Wednesday'] = [MonWedFri];
      returnObject['Friday'] = [MonWedFri];
      
      const TuThu = getSchedule(3,6);

      returnObject['Tuesday'] = [TuThu];
      returnObject['Thursday'] = [TuThu];
      

      
      return returnObject;
    }},
    city: { faker: 'address.city'},
    programs: {function: function(){
      const returnObject = {};
      for (const program of this.object.programs_teaching){
        returnObject[program] = Math.ceil(Math.random()*10);
      }
      return returnObject;
    }},
    phone_number: {chance: 'phone()'},
};


var schools = {
  id :{ incrementalId: 35434},
  name_temp : { faker: 'name.findName'},
  name: {function: function(){
    return this.object.name_temp+[' High',' Middle School',' Elementary School'][Math.floor(Math.random()*3)];
  }},
  region : {values: [['Irvine'], ['Los Angeles'], ['Orange County']]},
  address : {faker: 'address.streetAddress', locale: 'en_US'},
  programs: { function: function(){
    const returnObject = {};
    const programsList = ['AppJam','WebJam','Scratch','LESTEM'];
    const singleProgram = programsList[Math.floor(Math.random()*4)];
    
    if(Math.random()>0.5){
      const MonWedFri = getSchedule(1,2);
      returnObject['Monday'] = [MonWedFri];
      returnObject['Wednesday'] = [MonWedFri];
      returnObject['Friday'] = [MonWedFri];
    }else{
      const TuThu = getSchedule(1,2);
      returnObject['Tuesday'] = [TuThu];
      returnObject['Thursday'] = [TuThu];

    }
    
    returnObject['number_of_instructors'] = Math.ceil(Math.random()*5+1);
    const ret = {};
    ret[singleProgram] = returnObject;
    return ret;
  }},
  special_language_request : {function: function() {
    const shuffled = ['Spanish','Chinese','Hindi','Korean'].sort(()=>0.5-Math.random());
    return shuffled.slice(0,Math.ceil(Math.random()*4));
  }},
  location_preferences: {function: function(){return this.object.region}},
  is_virtual : {chance: 'bool'},
  program_time_flexibility : {chance: 'bool'},
};


var mocker = require('mocker-data-generator').default;
var data = mocker()
    .schema('instructors', instructors, 100)
    .schema('schools', schools, 35)
    .buildSync();
// var util = require('util');
// console.log(util.inspect(data, { depth: 10 }));
// return 0;
const programsList = ['AppJam','WebJam','Scratch','LESTEM'];
const programsAssignedSchools = {};
const programsNumInst = {};
for(const program of programsList){
  var assignedSchools = {};
  var neededInstructors = 0;
  for(const school of data['schools']){
    for(const schoolProgram in school['programs']){
      if(schoolProgram===program){
        assignedSchools[school['id'].toString()] = 0;
        neededInstructors += school['number_of_instructors'];
      }
    }
  }
  programsAssignedSchools[program] = Object.keys(assignedSchools).length===0?0:assignedSchools;
  programsNumInst[program] = neededInstructors;
}
const programs = {
  'AppJam': {
    'name': 'AppJam',
    'color': '#9003fc',
    'logo': "https://i.imgur.com/T2oSehg.png",
    'assigned_schools': programsAssignedSchools['AppJam'], 
    'needed_instructors': programsNumInst['AppJam'],
  },
  'WebJam': {
    'name': 'WebJam',
    'color': '#eef205',
    'logo': "https://i.imgur.com/T2oSehg.png",
    'assigned_schools': programsAssignedSchools['WebJam'], 
    'needed_instructors': programsNumInst['WebJam'],
  },
  'Scratch': {
    'name': 'Scratch',
    'color': '#f20505',
    'logo': "https://i.imgur.com/T2oSehg.png",
    'assigned_schools': programsAssignedSchools['Scratch'], 
    'needed_instructors': programsNumInst['Scratch'],
  },
  'LESTEM': {
    'name': 'LESTEM',
    'color': '#19f205',
    'logo': "https://i.imgur.com/T2oSehg.png",
    'assigned_schools': programsAssignedSchools['LESTEM'], 
    'needed_instructors': programsNumInst['LESTEM'],
  },
  'unassigned_instructors': 100,
}
const programs2 = {
  'AppJam': {
    'name': 'AppJam',
  },
  'WebJam': {
    'name': 'WebJam',
  },
  'Scratch': {
    'name': 'Scratch',
  },
  'LESTEM': {
    'name': 'LESTEM',
  },
};

const config = {
  apiKey: "AIzaSyD5xRlDFsIss2U9nR-tSriQIRwBzPmvQ5k",
  authDomain: "dfs-ias.firebaseapp.com",
  databaseURL: "https://dfs-ias.firebaseio.com",
  projectId: "dfs-ias",
  storageBucket: "dfs-ias.appspot.com",
  messagingSenderId: "44070275331",
  appId: "1:44070275331:web:a825361e868c7e63824136",
  measurementId: "G-0LQRWS0W4Z"
};

function initFirebase() {
  if (!firebase.apps.length) {
    console.log("Firebase Initiated");
    firebase.initializeApp(config);
  }
}
 
initFirebase();
var db = require('firebase/database');;
const db1 = firebase.database();
var ret = [];
var oldRef = db1.ref('/Winter 2021/instructors');

data['instructors'].forEach(item => {
    var newRef = oldRef.push();
    console.log(newRef.key);
    newRef.set(item).catch((e)=>console.log("Error Found: +++++++++++++++++++++++++",e));
});

data['schools'].forEach(item => {
  var newRef = db1.ref('/Winter 2021/schools/'+item.id.toString())
  console.log(item.id);
  delete item['id'];
  newRef.set(item).catch((e)=>console.log("Error Found: +++++++++++++++++++++++++",e));
});
// for(const program in programs){
//   db1.ref('/Fall 2020/Programs/'+program+'/assigned_schools').set(programs[program]['assigned_schools']);
//   db1.ref('/Fall 2020/Programs/'+program+'/needed_instructors').set(programs[program]['needed_instructors']);
// }
// db1.ref('/Winter 2021/programs/').set(programs2);
// db1.ref('/Winter 2021/Programs/').set(programs);
// db1.ref('/Seasons/').update({'Winter 2021':'Winter 2021'});
