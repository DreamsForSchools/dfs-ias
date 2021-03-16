import faker from  'faker';
const chance = require('chance').Chance();

var count = 0;

export const getRandomInstructorSet = (amount) => {
    let DUMMY_DATA = [];
    let i;
    for (i = 0; i < amount; i++) {
        DUMMY_DATA.push(getRandomInstructor());
    }
    return(DUMMY_DATA);
}

export const getRandomInstructor = () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName,lastName,"gmail");
    let universityPool = ['UC Irvine', 'UCLA', 'UC Berkeley', 'UC Davis', 'UC San Diego'];
    let majorPool =  ['Software Engineer', 'Computer Science', 'Informatics', 'Physics', 'Biology'];
    let graduationPool =  ['Winter 2020', 'Spring 2020', 'Fall 2020', 'Winter 2021', 'Spring 2021', 'Fall 2021'];
    let prefPool =  ["WebJam", "AppJam", "LESTEM", "Scratch"];
    let yearPool = ['1st','2nd','3rd','4th'];
    let ethnictyPool = ['Asian', 'White', 'Hispanic', 'Black'];
    let startTimePool = ['08:00:00', '09:00:00', '10:00:00', '11:00:00','12:00:00'];
    let endTimePool = ['14:00:00', '15:00:00', '16:00:00', '17:00:00','18:00:00','19:00:00'];
    count+=1;

    const DUMMY_DATA =
        {
            id: count,
            isActive: chance.bool(),
            email: email,
            firstName: firstName,
            lastName: lastName,
            university: chance.pickone(universityPool),
            major: chance.pickone(majorPool),
            graduationDate: chance.pickone(graduationPool),
            seasonsTaught: (Math.random() * (10 - 1) + 1),
            shirtSize: "S",
            pref: chance.pickset(prefPool,4),
            gender: chance.gender(),
            year: chance.pickone(yearPool),
            previouslyTaught: chance.pickone(graduationPool),
            isASL: chance.bool(),
            phoneNumber: chance.phone({ formatted: false }),
            ethnicity: chance.pickone(ethnictyPool),
            hasCar: chance.bool(),
            availability: [
                {
                    weekday: 1,
                    startTime: chance.pickone(startTimePool),
                    endTime: chance.pickone(endTimePool)
                },
                {
                    weekday: 2,
                    startTime: chance.pickone(startTimePool),
                    endTime: chance.pickone(endTimePool)
                },
                {
                    weekday: 3,
                    startTime: chance.pickone(startTimePool),
                    endTime: chance.pickone(endTimePool)
                },
                {
                    weekday: 4,
                    startTime: chance.pickone(startTimePool),
                    endTime: chance.pickone(endTimePool)
                },
                {
                    weekday: 5,
                    startTime: chance.pickone(startTimePool),
                    endTime: chance.pickone(endTimePool)
                }
            ]
        };

    return (DUMMY_DATA);
}



