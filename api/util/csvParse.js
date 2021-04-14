const csv = require('csvtojson')
const axios = require('axios');

// USAGE:
// node /Users/arjuntyagi/Documents/GitProjects/dfs-ias-demo/api/util/csvParse.js /Users/arjuntyagi/Documents/GitProjects/dfs-ias-demo/api/util/instructorData.csv

const filePath = process.argv.slice(2)[0];
const weekdays = {
    mondays: 1,
    tuesdays: 2,
    wednesdays: 3,
    thursdays: 4,
    fridays: 5,
    saturdays: 6,
    sundays: 7
}

csv({
    noheader: false,
    headers: ['omit', 'email', 'firstName', 'lastName', 'phoneNumber', 'gender', 'ethnicity', 'university', 'major', 'omit', 'omit', 'schoolYear', 'graduationDate', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'programmingLanguages', 'firstPref', 'secondPref', 'thirdPref', 'fourthPref', 'avail_09_10', 'avail_10_11', 'avail_11_12', 'avail_12_13', 'avail_13_14', 'avail_14_15', 'avail_15_16', 'avail_16_17', 'avail_17_18', 'omit', 'hasCar', 'shirtSize', 'isASL', 'otherLanguages', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit'],
    colParser: {
        "omit": "omit"
    },
    checkType: false
}).fromFile(filePath)
    .then(instructors => {

        parseAvailability(instructors);

        let payload = {newInstructorArray: instructors}
        axios.post('http://localhost:5000/api/instructor/CSV',
            payload).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });

    }).catch(err => {
    // log error if any
    console.log(err);
});


const parseAvailability = (instructorData) => {
    let availability = [];

    instructorData.forEach(obj => {
        availability = [];
        Object.entries(obj).forEach(([key, value]) => {
            if (`${key}`.startsWith('avail')) {
                let timeSlot = `${key}`.split('_');
                let availableDays = `${value}`.split(';');
                insertAvailability(timeSlot[1], timeSlot[2], availableDays, availability);
                delete obj[key];
            } else if (`${key}`.startsWith('isASL') || `${key}`.startsWith('hasCar')) {
                if (`${value}` === 'Yes') {
                    obj[`${key}`] = true;
                } else {
                    obj[`${key}`] = false;
                }
            }
        });
        obj['availability'] = availability;
    });
}

const insertAvailability = (start, end, availableDays, availability) => {
    let startTime = start + ":00:00";
    let endTime = end + ":00:00";

    availableDays.forEach(day => {
        day = day.toLowerCase().trim();
        if (weekdays[day]) {
            let result = availability.filter(obj => {
                return (obj.weekday === weekdays[day] && obj.endTime === startTime)
            });
            if (result && result[0]) {
                console.log("result found: ");
                console.log(result);
                result[0].endTime = endTime
            } else {
                console.log("no matching result found: " + result);
                availability.push({
                    weekday: weekdays[day],
                    startTime: startTime,
                    endTime: endTime
                });
            }
        }
    });
    return availability;
}
