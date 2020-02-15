import initialState from './InitialStore'


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
          return {...state, employees: action.payload}
        case "FILTERING_LIST": 
        return {...state, listOfCountries: action.payload.countries, listOfCities: action.payload.cities, listOfRoles: action.payload.roles}
      default:
        return state;
    }
  }


  // listOfCountries: [],
  // listOfCities: [],
  // listOfRoles: []