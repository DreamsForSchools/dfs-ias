const faker = require('faker');
const chance = require('chance').Chance();
const axios = require('axios');
const args = process.argv.slice(2);

// Usage: node api/util/generateInstructors.js amount
// ex: node api/util/generateInstructors.js 5


const getRandomInstructor = () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName, "gmail");
    let universityPool = ['UC Irvine', 'UCLA', 'UC Berkeley', 'UC Davis', 'UC San Diego'];
    let majorPool = ['Software Engineer', 'Computer Science', 'Informatics', 'Physics', 'Biology'];
    let graduationPool = ['Winter 2020', 'Spring 2020', 'Fall 2020', 'Winter 2021', 'Spring 2021', 'Fall 2021'];
    let shirtSizePool = ['S', 'M', 'L', 'XL'];
    let prefPool = ["WebJam", "AppJam", "LESTEM", "Scratch"];
    let yearPool = ['1st', '2nd', '3rd', '4th'];
    let ethnicityPool = ['Asian', 'White', 'Hispanic', 'Black'];
    let languagesPool = ['English', 'Spanish', 'Chinese', 'Hindi'];
    let startTimePool = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00'];
    let endTimePool = ['14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00'];
    let preferences = chance.pickset(prefPool, 4);
    const DUMMY_DATA =
        {
            email: email,
            phone: chance.phone({formatted: false}),
            fname: firstName,
            lname: lastName,
            gender: chance.gender(),
            ethnicity: chance.pickone(ethnicityPool),
            university: chance.pickone(universityPool),
            major: chance.pickone(majorPool),
            school_year: chance.pickone(yearPool),
            graduation: chance.pickone(graduationPool),
            seasons_taught: (Math.random() * (10 - 1) + 1),
            shirtsize: chance.pickone(shirtSizePool),
            car: chance.bool() ? 1 : 0,
            language_pref: chance.pickone(languagesPool),
            is_ASL: chance.bool() ? 1 : 0,
            firstpref: preferences[0],
            secondpref: preferences[1],
            thirdpref: preferences[2],
            fourthpref: preferences[3],
            // previouslyTaught: chance.pickone(graduationPool),
            // isActive: chance.bool(),
            availability: [
                {
                    weekday: 1,
                    start_time: chance.pickone(startTimePool),
                    end_time: chance.pickone(endTimePool)
                },
                {
                    weekday: 2,
                    start_time: chance.pickone(startTimePool),
                    end_time: chance.pickone(endTimePool)
                },
                {
                    weekday: 3,
                    start_time: chance.pickone(startTimePool),
                    end_time: chance.pickone(endTimePool)
                },
                {
                    weekday: 4,
                    start_time: chance.pickone(startTimePool),
                    end_time: chance.pickone(endTimePool)
                },
                {
                    weekday: 5,
                    start_time: chance.pickone(startTimePool),
                    end_time: chance.pickone(endTimePool)
                }
            ]
        };
    DUMMY_DATA.availability = JSON.stringify(DUMMY_DATA.availability);
    return (DUMMY_DATA);
}
if(args[0] === 'delete'){

}
let i;
for (i = 0; i < args[0]; i++) {
    axios.post('http://localhost:5000/api/instructor',
        getRandomInstructor()).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
}









