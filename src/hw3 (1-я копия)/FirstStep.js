import React, { useEffect, useState, useContext } from 'react';
import ItemValidation from '../helpers/Validation.js';
import Context from '../hw3/Context.js';

export default function FirstStep(){

    const { state, dispath } = useContext(Context);
    const user = state.user;

    const [name, setName] = useState(user.name ? user.name : '');
    const [surname, setSurName] = useState(user.surname ? user.surname : '');
    const [mail, setMail] = useState(user.mail ? user.mail : '');
    const [validName, setValidName] = useState(false);
    const [validSurname, setValidSurName] = useState(false);
    const [validMail, setValidMail] = useState(false);
    const [disabled, setDisabled] = useState(true);
    
    const Next = (e)=>{
        e.preventDefault();
        if(!name && !surname && !mail && validName && validSurname && validMail) {
            alert('Form not valid!!!');
            return;
        }else{
            const data = Object.fromEntries(new FormData(e.target).entries());
            dispath({type: 'next'});
            dispath({type: 'updateUser', payload: data});
        }
    }
    const Check = (e)=>{
        
        const val = e.target.value;
        const item = e.target.name;

        if(item === 'name' || item === 'surname'){
            if(item === 'name'){
                if(!ItemValidation.string(val)){
                    setValidName(true);
                    return;
                }
                setName(val);
                setValidName(false);
            }else{
                if(!ItemValidation.string(val)){
                    setValidSurName(true);
                    return;
                }
                setSurName(val);
                setValidSurName(false);
            }
        }else if(item === 'mail'){
            if(!ItemValidation.mail(val)){
                setValidMail(true);
                return;
            }
            setMail(val);
            setValidMail(false);
        }
    }

    useEffect(()=>{
        ((name !== '' && !validName) &&
            (surname !== '' && !validSurname) &&
            (mail !== '' && !validMail)) ?
                setDisabled(false) : setDisabled(true);
    },[name, surname, mail, validName, validSurname, validMail])

    return (
        <form onSubmit={Next} className={`form ${state.dark ? 'dark' : ''}`}>
            <h2>Step: 1</h2>
            <span>Name</span>
            <input type='text'
                placeholder='Enter name...'
                name='name'
                value={name}
                className={validName ? 'invalid' : ''}
                onChange={Check}
            />
            <span>Surname</span>
            <input type='text'
                placeholder='Enter surname...'
                name='surname'
                value={surname}
                className={validSurname ? 'invalid' : ''}
                onChange={Check}
            />
            <span>Mail</span>
            <input type='email'
                placeholder='Enter mail...'
                name='mail'
                value={mail}
                className={validMail ? 'invalid' : ''}
                onChange={Check}
            />
            <button type='submit'>Next</button>
        </form>
    );
  }
