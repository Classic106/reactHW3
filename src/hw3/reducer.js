const reducer = (state, action)=>{

    switch(action.type){
        case 'next': 
            return  {...state,
                page : (state.page + 1) < 0 ?
                    state.page : state.page + 1};
            
        case 'back': 
            return {...state,
                page : (state.page - 1) < 0 ?
                state.page : state.page - 1};
            
        case 'updateUser': {
            const newstate = {...state};
                newstate.user = Object.assign({...state.user}, action.payload);
            return newstate;
        }
        case 'dark':
            return {...state, dark: action.payload};
            
        default :
            return state;
    }
}

export default reducer;
