import React from 'react';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone'

import "../magaz/addphoto.css";

Modal.setAppElement('#root');

class Loadphoto extends React.Component {
  
  constructor(props){
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  
  onDrop = (acceptedFiles) => {

    let form = new FormData();
    form.append('name', this.props.model.name);
    form.append('season', this.props.model.season);
    
    acceptedFiles.forEach(function(file) {form.append('file', file); });
    
    fetch('/update/addpicture', {
      method: 'POST',
      body: form,
    }).then(async (response) => {
      let res = await response.text();
      console.log(res);
      (res === "false")
      ? (()=>{
        alert("Фото добавлено!!!");
        this.props.set();
      })()
      : (()=>{
        //let inf = JSON.parse(localStorage.getItem(this.props.model.season));
        /*for(let k in inf){
          if(inf[k].name === this.props.model.name) inf[k].picture = res;
        }*/
        //localStorage.setItem(this.props.model.season, JSON.stringify(inf));
        alert("Фото не добавлено!!!");
      })();
    });
  }

  render(){

  return (<>
        <div id="upload-container">
        <img id="upload-image" src="/img/upload.png" alt="Фотография"/>
        <Dropzone
          onDrop={this.onDrop}
          accept="image/*" 
          multiple
        >
        {({getRootProps, getInputProps}) => (
          <form id="formaddphoto" {...getRootProps()}>
        	  <input {...getInputProps()} id="file-input" type="file" accept=".jpg, .jpeg, .png" multiple/>
        	  <label htmlFor="file-input">Выберите файл</label>
        	  <span> или перетащите его сюда</span>
          </form>
          )}
        </Dropzone>
        </div>
    </>
  );
  }
}

export default Loadphoto;