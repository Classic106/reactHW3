import { useContext } from 'react';
import Context from '../hw3/Context.js';

export default function EndRegistration() {

    const { state } = useContext(Context);

    return (
        <form className={`end_registaration ${state.dark ? 'dark' : ''}`}>
            <h2>Thank you for registering</h2>
            <img src={require(`../image/${state.user.image}`).default} alt='photo'/>
            <h5>Contact information</h5>
            <div className='contact_inf'>
            {(()=>{
                return Object.entries(state.user).map((item)=>{
                    if(item[0] === 'password' || item[0] === 'image') return;
                    return <p key={item[0]}>{item[0]}: {item[1]}</p>
                });
            })()}
            </div>
        </form>
    );
  }
