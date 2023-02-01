const axios = require('axios').default
const {Country, Activity} = require('../db.js')




const getApiInfo = async() => {
    const apiUrl = await axios.get("https://restcountries.com/v3/all")
    
    const apiInfo = await apiUrl.data.map(el=> {
        return{
            id: el.cca3,
            name: el.name.common,
            flag: el.flags[0],
            continent: el.continents[0],
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population
        }
    });
    const save = () => {
        apiInfo.map(el => {
            Country.findOrCreate({
                where: {
                    name: el.name,
                    id: el.id,
                },
                defaults: {
                    continent: el.continent,
                    flag: el.flag,
                    capital: el.capital,
                    subregion: el.subregion,
                    area: el.area,
                    population: el.population
                },
            }).catch((err) => { console.log(err) });
        })
    }
    save()
    return apiInfo;
}
const getDbInfo = async() =>{
    await getApiInfo()
    const info = await Country.findAll({
        include:{
            model: Activity,
            attributes: ['name', 'dificulty', 'duration', 'season'],
            through:{
                attributes: [],
            }
        }
                  
    })
    return info
}

// const getAllCountries = async () =>{
//     const apiInfo = await getApiInfo()
//     const dbInfo = await getDbInfo()
//     const infoTotal = apiInfo.concat(dbInfo)
//     // console.log(apiInfo)
//     return infoTotal
// }


const getActivity = async () => {
    const get = await Activity.findAll()
    return get;
}



module.exports = {
    getDbInfo,
    // getAllCountries,
    getActivity
    
}