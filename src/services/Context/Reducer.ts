import initialState from './InitialStore'
import _ from 'lodash';
import {handleFilterEmployees} from './services';
 
interface Action {
  type: String,
  payload: any
}

export function reducer(state = initialState, action: Action) {
    switch (action.type) {
      case 'USER_DETAILS':
        return { ...state, user: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case "SET_SKILLS": 
          return {...state, skills: action.payload.skills}
        case "LIST_OF_EMPLOYEES": 
          return {...state, employees: action.payload, filteredEmployees: action.payload}
        case "FILTERING_LIST": 
        return {...state, listOfCountries: action.payload.countries, listOfCities: action.payload.cities, listOfRoles: action.payload.roles}
        case "FILTER_EMPLOYEES": {
          let updatedList = handleFilterEmployees(state.employees, action.payload);
          return {...state, filteredEmployees: updatedList}
        }
      default:
        return state;
    }
  }


  // listOfCountries: [],
  // listOfCities: [],
  // listOfRoles: []


