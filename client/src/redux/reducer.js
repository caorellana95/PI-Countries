import {
    GET_COUNTRIES, 
    GET_NAME_COUNTRIES, 
    GET_DETAILS, 
    FILTER_BY_CONTINENT, 
    FILTER_BY_ACTIVITY, 
    ORDER_BY_NAME,
    ORDER_BY_POPULATION, 
    GET_ACTIVITIES, 
    POST_ACTIVITIES, 
    RESET
    } from '../redux/actions' 

const initialState = {
    countries : [],
    allCountries: [],
    activities: [],
    detail: []
    
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case GET_NAME_COUNTRIES:
            return {
                 ...state,
                 countries: action.payload
                }
        
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            } 

        case FILTER_BY_CONTINENT:
            const filtredCountriesByContinent  = state.allCountries;
            const continentFiltered = action.payload === "all" ? filtredCountriesByContinent : filtredCountriesByContinent.filter(el => el.continent === action.payload)
            return{
                ...state,
                countries: continentFiltered
            }
        case FILTER_BY_ACTIVITY:
            const filtredCountriesByActivities = state.allCountries
            const continentFilteredBA = filtredCountriesByActivities.filter((c) => { return c.activities.find((c) => { return c.name === action.payload; }); });

            if (action.payload === 'todos') {
                return { ...state, countries: filtredCountriesByActivities }
            } else {
                return {
                    ...state,
                    countries: continentFilteredBA
                }
            }
        case ORDER_BY_NAME:
            let sorted = action.payload === "ascendente" ? state.countries.sort(function(a, b) {
                if( a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                return 0
            }) : state.countries.sort(function(a, b) {
                if( a.name > b.name){
                    return -1
                }
                if(b.name > a.name){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: sorted
            }
        case ORDER_BY_POPULATION:
            let popSorted = action.payload === "High" ? state.countries.sort(function(x, y){
                if(x.population > y.population){
                    return -1
                }
                if(y.population > x.population){
                    return 1
                }
                return 0
            }) : state.countries.sort(function(x, y) {
                if(x.population > y.population){
                    return 1
                }
                if(y.population > x.population){
                    return -1
                }
                return 0
            })
            return {
                ...state,
                countries: popSorted
            }

       
        
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }

        case POST_ACTIVITIES:
            return {
                ...state,
                
            }
    
        case RESET:
            return {
                ...state,
                detail: []
            }

            default:
                return state
            
    }

}

export default rootReducer