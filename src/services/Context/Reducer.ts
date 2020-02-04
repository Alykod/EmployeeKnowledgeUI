import initialState from './InitialStore'


interface Action {
  type: String,
  payload: any
}

export function reducer(state = initialState, action: Action) {
    switch (action.type) {
      case 'USER_DETAILS':
        return { ...state, token: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case "SET_SKILLS": 
          return {...state, skills: action.payload.skills}
      default:
        return state;
    }
  }