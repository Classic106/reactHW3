import React, { useState, useContext, useRef } from 'react';
import ItemValidation from '../helpers/Validation.js';
import Context from '../hw3/Context.js';

export default function SecondStep() {

    const form = useRef(null);
    
    const { state, dispath } = useContext(Context);
    const user = state.user;

    const [city, setCity] = useState(user.city ? user.city : '');
    const [street, setStreet] = useState(user.street ? user.street : '');
    const [house, setHouse] = useState(user.house ? user.house : '');
    const [validCity, setValidCity] = useState(
        !ItemValidation.string(city) ? true : false
    );
    const [validStreet, setValidStreet] = useState(
        !ItemValidation.string(street) ? true : false
    );

    const [validHouse, setValidHouse] = useState(
        !ItemValidation.house(house) ? true : false
    );

    const Next = (e)=>{
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form.current).entries());

        if(data.city.length === 0 ||
            data.street.length === 0 ||
            data.house.length === 0 ||
            validCity ||
            validHouse ||
            validStreet) {
                alert('Fill right form!!!');
                return;
        }else{
            dispath({type: 'next'});
            dispath({type: 'updateUser', payload: data});   
        }
    }

    const Back = ()=>{
        const data = Object.fromEntries(new FormData(form.current).entries());
        dispath({type: 'back'});
        dispath({type: 'updateUser', payload: data});
    }

    const Check = (e)=>{

        const {name, value} = e.target;

        if(name === 'city'){
            setValidCity(!ItemValidation.string(value) ? true : false);
            setCity(value);
        }else if(name === 'street'){
            setValidStreet(!ItemValidation.string(value) ? true : false);
            setStreet(value);
        }else{
            setValidHouse(!ItemValidation.house(value) ? true : false);
            setHouse(value);
        }
        const data = Object.fromEntries(new FormData(form.current).entries());
        dispath({type: 'updateUser', payload: data});
    }

    return (
        <form onSubmit={Next} className={`form ${state.dark ? 'dark' : ''}`} ref={form}>
            <h2>Step: 2</h2>
            <span>City</span>
            <input type='text'
                placeholder='Enter city...'
                name='city'
                value={city}
                className={validCity ? 'invalid' : ''}
                onChange={Check}/>
            <span>Street</span>
            <input type='text'
                placeholder='Enter street...'
                name='street'
                value={street}
                className={validStreet ? 'invalid' : ''}
                onChange={Check}/>
            <span>House</span>
            <input type='text'
                placeholder='Enter house...'
                name='house'
                value={house}
                className={validHouse ? 'invalid' : ''}
                onChange={Check}/>
            <div className='buttons'>
                <button onClick={Back}>Previous</button>
                <button type='submit'>Next</button>
            </div>
        </form>
    );
  }
