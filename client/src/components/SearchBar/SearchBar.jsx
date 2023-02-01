import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesName } from "../../redux/actions";
import layout from '../SearchBar/SearchBar.module.css';

export default function SearchBar(){

const [name, setName] = useState('')
const dispatch = useDispatch()


function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
    console.log(name)
    
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getCountriesName(name))
    
}

return(
    <div className={layout.container}>
        <div className={layout.searchBar}>
        <input className={layout.inputSearch} type='text' placeholder='Search...' onChange={(e) => handleInputChange(e)} value={name}/>
        <button className={layout.button} type="text" onClick={(e) => handleSubmit(e)}></button>
        </div>
    </div>
)
}