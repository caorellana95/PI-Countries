import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountriesByContinent, filterCoutriesByActivity, orderByName, orderByPopulation, getActivities } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import layout from "../Home/Home.module.css"

export default function Home(){

//declarar constantes
const dispatch = useDispatch()//despacha las acciones
const activities = useSelector((state) => state.activities);
const allCountries = useSelector((state) => state.countries)
const [orden, setOrden] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [countriesPerPage, setCountryPerPage] = useState(10)
const indexOfLastCountry = currentPage * countriesPerPage
const indexOfTheFirstCountry = indexOfLastCountry - countriesPerPage
const currentCountry = allCountries.slice(indexOfTheFirstCountry, indexOfLastCountry)
const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}



useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
    
}, [dispatch])

//handles

function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleSortPopulation (e){
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
    console.log(e)
}

function handleFilterContinent(e){
    dispatch(filterCountriesByContinent(e.target.value));
    console.log(e)  
}

function handleFilterActivity(e){
    dispatch(filterCoutriesByActivity(e.target.value));
}

//renderizar

return(
    <div className={layout.cardContainer}>
        <NavBar/>
            
        <div className>
            <select className={layout.filtersAndSorting} onChange={e => handleSort(e)}>
            <option value="">Orden alfabético</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
            </select>
        
            <select className={layout.filtersAndSorting} onChange={e => handleSortPopulation(e)}>
            <option value="">Orden según población</option>
            <option value="High">Mayor Población</option>
            <option value="Low">Menor Población</option>
            </select>
        
            <select className={layout.filtersAndSorting} onChange={e => handleFilterActivity(e)}>
            <option value="todos"> Actividades </option>
            {activities.map((activity) => (
            <option value={activity.name}>{activity.name}</option>
            ))}
            </select>

            <select className={layout.filtersAndSorting} onChange={e => handleFilterContinent(e)}>
            <option value="all">Continentes</option>
            <option value="Antarctica">Antártida</option>
            <option value="Africa">África</option>  
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="North America">Norteamérica</option>
            <option value="South America">Sudamérica</option>
            <option value="Oceania">Oceanía</option>
            </select>
        
      

        <div className={layout.cards}>
        
            {currentCountry?.map((el)=> {
                return (
                    <div key={el.id}>
                        <Link to={"/home/" + el.id}>
                            <Card 
                              name={el.name} 
                              flag={el.flag} 
                              capital={el.capital}
                              continent={el.continent}
                              population={el.population} 
                            />
                    </Link>
                </div>
                )
            })}
        <Paginado 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado={paginado}
        />
        </div>
    </div>
    
    
    

    </div>
)


}
