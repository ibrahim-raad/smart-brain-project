import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) =>{
    return(
        <div>
            <p className="f3 ">
                {'This Magic Brain will detect faces in your pictures. Get it a try'}
            </p> 
            <div className="center">
                <div className="pa4 br3 shadow-5 center form"> 
                    <input className="f4 pa2 w-70 center" type="text"
                     onChange={onInputChange} />
                    <button className="w-30 grow f4 link pv2 ph3 dib white bg-light-blue"
                     onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
        </div>
    )
}


export default ImageLinkForm;