import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import layout from '../NavBar/NavBar.module.css';
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";



function NavBar() {
    const dispatch = useDispatch()

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }
    return (
         <nav className={layout.nav}>
                <div className={layout.busqueda}>
                    <SearchBar />
                </div>

                <div>
                <Link className={layout.h1} to='/home'>Home</Link>
                </div>

                <div className={layout.search}>
                
                    <button className={layout.btn}onClick={e => handleClick(e)}>Refresh </button>
                    <span className={layout.opcion}><Link to={'/activities'} className={layout.to}> Crear Actividad</Link></span>
                </div>
            </nav>
    )
}


export default NavBar;