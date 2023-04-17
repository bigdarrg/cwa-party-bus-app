//Loading router module
const router = require('express').Router();

const axios = require('axios');

router.route('/geocode').get((req, res) => { 

    const houseAndStreet = req.query.houseAndStreet;
    const province = req.query.province;
    const country = req.query.country;
    const apiKey = process.env.GOOGLE_GEOCODE_API;

    const googleAPIurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${houseAndStreet},+${province},+${country}&key=${apiKey}`;

    async function getGoogleGeocodeData(apiURL){
        try {
            const geocodeAPIRes = await axios.get(apiURL)
            const geocodeAPIResData = geocodeAPIRes.data.results[0].geometry.location;
            
            const lat = geocodeAPIResData.lat;
            const lng = geocodeAPIResData.lng;

            return {lat: lat,
                    lng: lng};

        } catch (err) {
            console.log(err);
        }
    }

    getGoogleGeocodeData(googleAPIurl).then(coords => {
        res.json(coords);
    });
});

module.exports = router;