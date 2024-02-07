import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () =>{
        return(
            <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-3" style={{ width: '150px', height: '150px' }}>
                <div style={{ height: '100%', width: '100%' }}>
                    <img className="pa3" alt="logo" style={{padding : '10px'}} src={brain}></img>
                </div>
            </Tilt>
        </div>
        )
}


export default Logo;