import React, { useContext, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import '../addphoto.css';
import Context from '../hw3/Context.js';

export default function ThirdStep() {
    
    const { state, dispath } = useContext(Context);
    const img = state.image;

    const [image, setImage] = useState((img) ? img : '');
    const [disabled, setDisabled] = useState(true);

    const Next = (e)=>{
        e.preventDefault();
        dispath({type: 'next'});
        //dispath({type: 'updateUser', payload: user}); 
    }

    const Back = ()=>dispath({type: 'back'});

    const onDrop = (acceptedFiles) => {

        if(image.length === 0 && acceptedFiles.length === 0){
          alert('Photo ot found');
          return;
        }else{
          dispath({type: 'next'});
          dispath({type: 'updateUser',
              payload: {'image': (image.length === 0) ? acceptedFiles[0].name : image}}); 
        }
    }
    
    useEffect(()=>{
      (image.length === 0) ? setDisabled(false) : setDisabled(false);
    }, [image]);

    return (
        <div className={`form ${state.dark ? 'dark' : ''}`}>
            <h2>Step: 3</h2>
            <div className="upload-container">
                <img id="upload-image" src={require('../image/upload.svg').default} alt="Фотография"/>
                <Dropzone
                    onDrop={onDrop}
                    accept="image/*"
                >
                {({getRootProps, getInputProps}) => (
                    <form className="formaddphoto" {...getRootProps()}>
        	            <input {...getInputProps()} id="file-input" type="file" accept=".jpg, .jpeg, .png"/>
        	            <label htmlFor="file-input">Выберите файл</label>
        	            <span>или перетащите его сюда</span>
                    </form>
                )}
                </Dropzone>
            </div>
            <div className='photos'>
                <img src={require('../image/1.jpg').default} alt='users1' onClick={()=>setImage('1.jpg')}/>
                <img src={require('../image/2.jpg').default} alt='users2' onClick={()=>setImage('2.jpg')}/>
                <img src={require('../image/3.jpg').default} alt='users3' onClick={()=>setImage('3.jpg')}/>
                <img src={require('../image/4.jpg').default} alt='users4' onClick={()=>setImage('4.jpg')}/>
                <img src={require('../image/5.jpg').default} alt='users5' onClick={()=>setImage('5.jpg')}/>
                <img src={require('../image/6.jpg').default} alt='users6' onClick={()=>setImage('6.jpg')}/>
                <img src={require('../image/7.jpg').default} alt='users7' onClick={()=>setImage('7.jpg')}/>
                <img src={require('../image/8.jpg').default} alt='users8' onClick={()=>setImage('8.jpg')}/>
                <img src={require('../image/9.jpg').default} alt='users9' onClick={()=>setImage('9.jpg')}/>
                <img src={require('../image/10.jpg').default} alt='users10' onClick={()=>setImage('10.jpg')}/>
                <img src={require('../image/11.jpg').default} alt='users11' onClick={()=>setImage('11.jpg')}/>
                <img src={require('../image/12.jpg').default} alt='users12' onClick={()=>setImage('12.jpg')}/>
                <img src={require('../image/13.jpg').default} alt='users13' onClick={()=>setImage('13.jpg')}/>
                <img src={require('../image/14.jpg').default} alt='users14' onClick={()=>setImage('14.jpg')}/>
                <img src={require('../image/15.jpg').default} alt='users15' onClick={()=>setImage('15.jpg')}/>
                <img src={require('../image/16.jpg').default} alt='users16' onClick={()=>setImage('16.jpg')}/>
            </div>
            <div className='buttons'>
                <button onClick={Back}>Previous</button>
                <button onClick={Next} disabled={false}>Next</button>
            </div>
        </div>
    );
  }
