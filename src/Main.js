import React, { useReducer } from 'react';

import FirstStep from './hw3/FirstStep.js';
import SecondStep from './hw3/SecondStep.js';
import ThirdStep from './hw3/ThirdStep.js';
import FourthStep from './hw3/FourthStep.js';
import EndRegistration from './hw3/EndRegistration.js';

import reducer from './hw3/reducer.js';
import Context from './hw3/Context.js';

const InitialState = (initialVlaues)=>{
    return {...initialVlaues};
}

export default function Main() {

    const [state, dispath] = useReducer(reducer, {page: 0, user: {}, dark: false}, InitialState);
    
    return(
        <Context.Provider value={{state, dispath}}>
            <div className={`main ${state.dark ? 'dark' : ''}`}>
                <button
                    onClick={()=>dispath({ type: 'dark', payload: (!state.dark)})}
                >{state.dark ? 'Light' : 'Dark'}</button>
                {(()=>{
                    switch(state.page){
                        case 0: return <FirstStep />
                        case 1: return <SecondStep />
                        case 2: return <ThirdStep />
                        case 3: return <FourthStep />
                        case 4: return <EndRegistration />
                    }
                })()}
            </div>
        </Context.Provider>
    );
}