import React, { useContext, useState } from 'react';
import Dropzone from 'react-dropzone';
import Context from '../hw3/Context.js';
import '../addphoto.css';

export default function ThirdStep() {
    
    const { state, dispath } = useContext(Context);

    const [image, setImage] = useState(state.user.image ? state.user.image : '');
    
    const images = (()=>{
        let arr = [];
        for(let k = 1; k < 17;k++) arr.push(
            <img
                src={require(`../image/${k}.jpg`).default}
                alt='users1'
                key={`${k}.jpg`}
                onClick={()=>setImage(`${k}.jpg`)}
            />)
        return arr;
    })();

    const Next = (e)=>{
        e.preventDefault();
        if(!image) {
            alert('Chose or load photo');
            return;
        }
        dispath({type: 'next'});
        dispath({type: 'updateUser', payload: {image}});
    }

    const Back = ()=> {
        dispath({type: 'back'});
        if(image) dispath({type: 'updateUser', payload: {image}});
    };

    const onDrop = (acceptedFiles) => {

        if(image.length === 0 && acceptedFiles.length === 0){
          alert('Photo not found');
          return;
        }else{
          dispath({type: 'updateUser',
              payload: {'image': (image.length === 0) ? acceptedFiles[0].name : image}}); 
        }
    }

    return (
        <div className={`form ${state.dark ? 'dark' : ''}`}>
            <h2>Step: 3</h2>
            <div className="upload-container">
                <img id="upload-image"
                    src={require('../image/upload.svg').default}
                    alt="Фотография"/>
                <Dropzone
                    onDrop={onDrop}
                    accept="image/*"
                >
                {({getRootProps, getInputProps}) => (
                    <form className="formaddphoto" {...getRootProps()}>
        	            <input {...getInputProps()}
                            id="file-input"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                        />
        	            <label htmlFor="file-input">Выберите файл</label>
        	            <span>или перетащите его сюда</span>
                    </form>
                )}
                </Dropzone>
            </div>
            <div className='photos'>{image ?
                <div className='user_image'>
                    <h5>Your photo</h5>
                    <img className='user_image'
                        src={require(`../image/${image}`).default}
                        alt='users1'
                        key={image}
                    />
                </div>: ''}
                <div className='photos_galery'>
                    <h5>Chose your photo</h5>
                    <div>{[...images]}</div>
                </div>
            </div>
            <div className='buttons'>
                <button onClick={Back}>Previous</button>
                <button onClick={Next}>Next</button>
            </div>
        </div>
    );
  }
