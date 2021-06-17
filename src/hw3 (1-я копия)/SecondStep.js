import React, { useEffect, useState, useContext } from 'react';
import ItemValidation from '../helpers/Validation.js';
import Context from '../hw3/Context.js';

export default function SecondStep() {

    const { state, dispath } = useContext(Context);
    const user = state.user;

    const [city, setCity] = useState(user.city ? user.city : '');
    const [street, setStreet] = useState(user.street ? user.street : '');
    const [house, setHouse] = useState(user.house ? user.house : '');
    const [validCity, setValidCity] = useState(false);
    const [validStreet, setValidStreet] = useState(false);
    const [validHouse, setValidHouse] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const Next = (e)=>{
        e.preventDefault();

        if(!city && !street && !house && validCity && validHouse && validStreet) {
            alert('Form not valid!!!');
            return;
        }else{
            const data = Object.fromEntries(new FormData(e.target).entries());
            dispath({type: 'next'});
            dispath({type: 'updateUser', payload: data});   
        }
        //console.log('next');
    }
    const Back = ()=>dispath({type: 'back'});

    const Check = (e)=>{

        const val = e.target.value;
        const item = e.target.name;
        
        if(item === 'city'){
            if(!ItemValidation.string(val)){
                setValidCity(true);
                return;
            }
            setCity(val);
            setValidCity(false);
        }else if(item === 'street'){
            if(!ItemValidation.string(val)){
                setValidStreet(true);
                return;
            }
            setStreet(val);
            setValidStreet(false);
        }else{
            if(!ItemValidation.house(val)){
                setValidHouse(true);
                return;
            }
            setHouse(val);
            setValidHouse(false);
        }
    }

    useEffect(()=>{
        ((city !== '' && !validCity) &&
            (street !== '' && !validStreet) &&
            (house !== '' && !validHouse)) ?
                setDisabled(false) : setDisabled(true);
    }, [city, street, house, validCity, validStreet, validHouse]);

    return (
        <form onSubmit={Next} className={`form ${state.dark ? 'dark' : ''}`}>
            <h2>Step: 2</h2>
            <span>City</span>
            <input type='text'
                placeholder='Enter city...'
                name='city'
                value={city}
                className={(validCity) ? 'invalid' : ''}
                onChange={Check}/>
            <span>Street</span>
            <input type='text'
                placeholder='Enter street...'
                name='street'
                value={street}
                className={(validStreet) ? 'invalid' : ''}
                onChange={Check}/>
            <span>House</span>
            <input type='text'
                placeholder='Enter house...'
                name='house'
                value={house}
                className={(validHouse) ? 'invalid' : ''}
                onChange={Check}/>
            <div className='buttons'>
                <button onClick={Back}>Previous</button>
                <button type='submit' disabled={false}>Next</button>
            </div>
        </form>
    );
  }
