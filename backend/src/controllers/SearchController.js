const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;
        //buscar devs raio d 10km
        //filtrar por techs

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //apenas devs com aquelas techs
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point', 
                        coordinates: [longitude, latitude],
                    },
                $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
}