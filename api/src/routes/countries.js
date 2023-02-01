const { Router } = require('express');
const router = Router();
const { getDbInfo } = require('../controllers/controllers')




router.get('/', async (req, res) =>{
    const {name} = req.query
    const allCountries = await getDbInfo()
    if(name){
        const countryName = await allCountries.filter(el=> el.name.toLowerCase().includes(name.toLocaleLowerCase()))
        countryName.length ?
        res.json(countryName) :
        res.status(404).send("No se encontró el país solicitado")
    }else{
        res.json(allCountries)
    }

})

router.get('/:id', async(req, res) =>{
    const {id} = req.params
    const allCountries = await getDbInfo()
    if(id){
        const countryId = await allCountries.filter(el=>el.id===id.toUpperCase())
        countryId.length ?
        res.json(countryId):
        res.status(404).send("No se encontró el id del país solicitado")
    }
})



module.exports = router;