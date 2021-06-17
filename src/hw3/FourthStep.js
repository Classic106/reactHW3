import React, { useEffect, useState, useContext } from 'react';
import Validation from '../helpers/Validation.js';
import Context from '../hw3/Context.js';

export default function ForthStep() {

    const { state, dispath } = useContext(Context);

    const [validPass, setValidPass] = useState(false);
    const [validConfirmPass, setValidConfirmPass] = useState(false);
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [disabled, setDisabled] = useState(false);

    const Next = (e)=>{
        e.preventDefault();
        
        if(!pass && !confirmPass && validPass && validConfirmPass){
            alert('Password not valid!!!');
            return;
        }else{
            dispath({type: 'next'});
            dispath({type: 'updateUser', payload: {'password': pass}}); 
        }
    }

    const Back = ()=> dispath({type: 'back'});

    const Check = (e)=>{
        const val = e.target.value;
        const name = e.target.name;
        
        if(name === 'pass'){
            if(!Validation.password(val)){
                setValidPass(true);
                return;
            }
            setPass(val);
            setValidPass(false);
        }else if(name === 'confirmPass'){
            if(pass !== val){
                setValidConfirmPass(true);
                return;
            }
            setConfirmPass(val);
            setValidConfirmPass(false);
        }
    }

    useEffect(()=>{
        ((pass === confirmPass) &&
            ((pass !== '' && !validPass) && (confirmPass !== '' && !validConfirmPass))) ?
            setDisabled(false) : setDisabled(true); 
    }, [pass, confirmPass, validPass, validConfirmPass]);

    return (
        <form onSubmit={Next} className={`form ${state.dark ? 'dark' : ''}`}>
            <h2>Step: 4</h2>
            <span>Password</span>
            <input
                type='password'
                placeholder='Enter password...'
                name='pass'
                onChange={Check}
                className={validPass ? 'invalid' : ''}    
            />
            <span>Confirm password</span>
            <input
                type='password'
                placeholder='Confirm password...'
                name='confirmPass'
                onChange={Check}
                className={validConfirmPass ? 'invalid' : ''}
            />
            <div className='buttons'>
                <button onClick={Back}>Back</button>
                <button type='submit' disabled={disabled}>Submit</button>
            </div>
        </form>
    );
  }
