import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { postActivities, getActivities } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import layout from "../CreateActivity/CreateActivity.module.css"

function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Debe llenar este campo";
    } else if (!input.dificulty) {
      errors.dificulty = "Debe seleccionar la complejidad";
    } else if (!input.duration) {
      errors.duration = "Debe llenar este campo";
    } else if (!input.season) {
      errors.season = "Debe seleccionar una estacion";
    } else if (input.countryId === []) {
      errors.countryId = "Debe seleccionar un pais";
    }
    return errors;
  }

export default function CreateActivity(){

const dispatch = useDispatch()
const history = useHistory()
const countries = useSelector((state) => state.allCountries)
const [errors, setErrors] = useState({});



const [input, setInput] = useState({
    name: "",
    duration: "",
    dificulty: "",
    season: "",
    countryId: []
})



useEffect(() => {
    dispatch(getActivities())
}, [dispatch])

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
}

function handleDelete(i) {
  setInput({
    ...input,
    countryId: input.countryId.filter(el => el !== i),
  });
}

// function handleCheck(e) {
//     if (e.target.checked) {
//       setInput({
//         ...input,
//         status: e.target.value
//       })
//     }
//   }

function handleSelect(e){
    setInput({
        ...input,
        countryId: [...input.countryId, e.target.value]
    })
    
}

function handleSubmit(e){
    e.preventDefault()
    if (input.name === "" ||
    input.dificulty === "" ||
    input.duration === "" ||
    input.season === "" ||
    input.countryId.length === 0) return alert('Debe llenar los campos');
    dispatch(postActivities(input));
    alert("Has creado una actividad!")
    setInput({
        name: "",
        duration: "",
        dificulty: "",
        season: "",
        countryId: []
    })
    history.push("/home");
}

return(
    <div className={layout.background}>
      <div>
        <NavBar />
      </div>
        <form className={layout.form} onSubmit={handleSubmit}>
        <h1 className={layout.titulo}>Crea tu Actividad</h1>
            <div className={layout.texts}>
               <label>Nombre:</label> 
               <input 
                type= "text"
                value= {input.name}
                name= "name"
                onChange={handleChange}
                />
        {errors.name && <p className="e">{errors.name}</p>}

            </div>   
            <div className={layout.texts}>
                <label>Dificultad:       </label>
                <input type="range" name="dificulty" min="1" max="5" value={input.dificulty} 
                onChange={(e) => handleChange(e)}/> 
                
              {errors.dificulty && <p className="e">{errors.dificulty}</p>}
            </div>

            <div className={layout.texts}>
                <label>Duración:</label>
                <input 
                type="text"
                value= {input.duration}
                name= "duration"
                onChange={handleChange}
                />
            {errors.duration && <p className="e">{errors.duration}</p>}
            </div>

            <div className={layout.texts}>
            <label> Temporada </label>
            <select
               name="season"
                value={input.season}
                onChange={(e) => handleChange(e)}>
                <option className='op' value=""></option>
                <option className='op' value="invierno">Invierno</option>
                <option className='op' value="verano">Verano</option>
                <option className='op' value="otoño">Otoño</option>
                <option className='op' value="primavera">Primavera</option>
              </select>
              {errors.season && <p className="e">{errors.season}</p>}
            </div>
            {errors.countries && <p className="e">{errors.countries}</p>}

            <div>
            <select onChange={(e) => handleSelect(e)}>
              <option className> Paises </option>
                {countries.map((c) => (
                    <option value = {c.name}>{c.name}</option>
                ))}
            </select>
            </div>

            <div className>
              {input.countryId.map((country) => (
                <div className={layout.countrieAndButton}>
                  <input className='btnDelete' type='button' value='X' onClick={() => handleDelete(country)}/>
                  <p className>{country}</p>
                </div>
              ))}
            </div>

            <div>
            <button className={layout.submit}>Crear Actividad</button>
            </div>
            

        </form>
    </div>
)





}
