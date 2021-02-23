var express = require('express');
var router = express.Router();
var axios = require('axios');
// Documentation on Axios
// https://www.npmjs.com/package/axios#example

router.get('/place/textquery', function (req, res) {
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GMAP_API_KEY}&inputtype=textquery&input=${req.query.q}`)
        .then((response) => {res.send(response.data)});
})


// Just an API endpoint to send random dog pictures URLs
router.get('/dog', function (req, res) {
    axios.get('https://dog.ceo/api/breeds/image/random')
        .then((response) => {
            res.send(response.data.message)
        });
})

module.exports = router;

