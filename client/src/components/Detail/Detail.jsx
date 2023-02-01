import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails, restartDetail } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import layout from "../Detail/Detail.module.css"


export default function Detail (props){
  console.log(props);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(restartDetail())
    dispatch(getDetails(props.match.params.id));
  }, [dispatch] )

  const myCountry = useSelector((state) => state.detail)
  return (

    <div key={myCountry.id} className={layout.detailE}>
      <div>
      <NavBar/>
      </div>

    <div>{
        myCountry.length > 0 ?
          <div>
            <h1>{myCountry[0].name}</h1>
            <img src={myCountry[0].flag} alt='Imagen no encontrada' width='300px' height='150px' />
            <div className={layout.obj2Detail}>
            <h2>Id: {myCountry[0].id}</h2>
            <h2>Capital: {myCountry[0].capital}</h2>
            <h2>Continente: {myCountry[0].continent}</h2>
            <h2>Subregion: {myCountry[0].subregion}</h2>
            <h2>Area: {myCountry[0].area} Km²</h2>
            <h2>Poblacion: {myCountry[0].population} habs.</h2>
            </div>
            <div className={layout.activitiesDetail}>  
                  {myCountry[0].activities?.map(el=>{
                    return(
                      <div>
                        <Link className={layout.linkDetail} to='/activities'>
                        <h2>Actividad</h2>
                        </Link>
                        <div className={layout.obj3Detail}>
                        <h3>{el.name}</h3>
                        <h3>Dificultad: {el.dificulty}</h3>
                        <h3>Duracion: {el.duration}</h3>
                        <h3>Temporada: {el.season}</h3>
                      </div>
                      </div>
                  )})}</div>


         </div> : <div className={layout.loading}>
                <p> Loading... </p>
                </div>
      }
     </div>
    </div>
  )
};
