import React, { useState, useContext } from 'react';
import ItemValidation from '../helpers/Validation.js';
import Context from '../hw3/Context.js';

export default function FirstStep(){

    const { state, dispath } = useContext(Context);
    const user = state.user;

    const [name, setName] = useState(user.name ? user.name : '');
    const [surname, setSurName] = useState(user.surname ? user.surname : '');
    const [mail, setMail] = useState(user.mail ? user.mail : '');
    const [validName, setValidName] = useState(!ItemValidation.string(name) ? true :false);
    const [validSurname, setValidSurName] = useState(!ItemValidation.string(surname) ? true : false);
    const [validMail, setValidMail] = useState(!ItemValidation.mail(mail) ? true : false);
    
    const Next = (e)=>{
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());

        if(data.name.length === 0 ||
            data.surname.length === 0 ||
            data.mail.length === 0 ||
            validName ||
            validSurname ||
            validMail){
                alert('Fill right form!!!');
                return;
        }else{
            dispath({type: 'next'});
            dispath({type: 'updateUser', payload: data});
        }
    }
    const Check = (e)=>{
        
        const val = e.target.value;
        const item = e.target.name;

        if(item === 'name' || item === 'surname'){
            if(item === 'name'){
                setValidName(!ItemValidation.string(val) ? true : false);
                setName(val);
            }else{
                setValidSurName(!ItemValidation.string(val) ? true : false);
                setSurName(val);
            }
        }else if(item === 'mail'){
            setValidMail(!ItemValidation.mail(val) ? true: false);
            setMail(val);
        }
    }

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
