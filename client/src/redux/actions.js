import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_NAME_COUNTRIES = "GET_NAME_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES"; 
export const GET_DETAILS = "GET_DETAILS";
export const RESET = "RESET"; 
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const POST_ACTIVITIES = "POST_ACTIVITIES";


export function getCountries(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/countries",{

        });
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

export function getCountriesName(name){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: GET_NAME_COUNTRIES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/activities');
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data
            })
        
    }
}

export function getDetails(id) {
    return async function(dispatch){
      try {
        const json = await axios.get("http://localhost:3001/countries/" + id);
        return dispatch({
          type: GET_DETAILS,
          payload: json.data
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

export function restartDetail() {
    return (dispatch) => {
        dispatch({ 
            type: RESET
         })
    }
}

export function filterCountriesByContinent(payload){
    // console.log(payload)
    return {
        type: FILTER_BY_CONTINENT,
        payload 
    }
}

export function filterCoutriesByActivity(payload){
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return{
      type: ORDER_BY_POPULATION,
      payload
    }
}

export function postActivities(payload) {
    return async function (dispatch) {
        await axios.post('http://localhost:3001/activiies', payload);
        return dispatch({
            type: POST_ACTIVITIES
            })
        }
    }