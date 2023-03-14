import React from "react";
import layout from'../Paginado/Paginado.module.css'

export default function Paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i)
        
    }

    return (
        <nav className={layout.paginado}>
          <ul className={layout.list}>
            {pageNumbers.map(number => (
                <li key={number}>
                  <a className ={layout.numero} href onClick={() => paginado(number)  }>{number}</a>
                  </li>
              ))}
          </ul>
        </nav>
      )
}