

var instructor = {
    id :{ incrementalId: 0},
    name : { faker: 'name.findName'},
    gender : { chance: 'gender' },
    schoolYear : {values: ['1st Year', '2nd Year', '3rd Year', '4th Year', '4+ Years']},
    major : {values: ['CS', 'EECS', 'Maths', 'Physics', 'Econ']},
    university : {values: ['UCI', 'UCLA', 'USC', 'UC Davis', 'UCSC']},
    region : {values: ['Irvine', 'Los Angeles', 'Orang County']},
    startingLocation : {faker: 'address.streetAddress', locale: 'en_US'},
    car : {chance: 'bool'},
    returner : {chance: 'bool'},
    shirtSize : {values: ['S', 'M', 'L', 'XL']},
    programs : {randexp: /(Appjam,)?(WebJam,)?/},
    languages : {randexp: /(Spanish,)?(Chinese,)?(Korean,)?(Hindi,)?/}
};
    
var school = {

};
// Using traditional callback Style
 
// mocker()
//     .schema('user', user, 2)
//     .schema('group', group, 2)
//     .schema('conditionalField', conditionalField, 2)
//     .build(function(error, data) {
//         if (error) {
//             throw error
//         }
//         console.log(util.inspect(data, { depth: 10 }))
        
//         // This returns an object
//         // {
//         //      user:[array of users],
//         //      group: [array of groups],
//         //      conditionalField: [array of conditionalFields]
//         // }
//     })
 
// // Using promises
 
// mocker()
//     .schema('user', user, 2)
//     .schema('group', group, 2)
//     .schema('conditionalField', conditionalField, 2)
//     .build()
//     .then(
//         data => {
//             console.log(util.inspect(data, { depth: 10 }))
//             // This returns an object
//             // {
//             //      user:[array of users],
//             //      group: [array of groups],
//             //      conditionalField: [array of conditionalFields]
//             // }
//         },
//         err => console.error(err)
//     )
 
// Synchronously
 
// This returns an object
// {
//      user:[array of users],
//      group: [array of groups],
//      conditionalField: [array of conditionalFields]
// }
var mocker = require('mocker-data-generator').default;
var util = require('util');
var data = mocker()
    .schema('Instructors', instructor, 100)
    .buildSync();
 
//console.log(util.inspect(data, { depth: 10 }));

const fs = require('fs');

fs.writeFile('./sample-data/sampleData.js', "export const sampleData = ".concat(JSON.stringify(data)), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
});

