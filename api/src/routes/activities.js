const { Router } = require('express');
const router = Router();
const { Activity, Country } = require('../db.js');
const { getActivity } = require('../controllers/controllers')

router.post('/', async (req, res) =>{
    const {name, dificulty, duration, season, createdInDb, countryId } = req.body
    try{
    const activity = await Activity.create({
        name,
        dificulty,
        duration,
        season,
        createdInDb,
        
})

    const countriesDb = await Country.findAll({
        where:{ id: countryId }
    })
    await activity.addCountry(countriesDb)
    res.status(200).json("Actividad creada con éxito")
    }catch{
    res.status(404).json("Faltan datos")
}
})

router.get('/', async (req, res) => {
    const activities = await getActivity()
    res.status(200).send(activities)
})




module.exports = router;
