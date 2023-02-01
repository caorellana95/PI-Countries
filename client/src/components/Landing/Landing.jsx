import React from 'react';
import {Link} from 'react-router-dom'
import layout from '../Landing/Landing.module.css';

export default function Landing(){
    return (
        <div className={layout.full} >
            <div className={layout.full_inner}>
                <div className={layout.content}>
                    <h1 className={layout.titulo}>Countries of the world!</h1>
                
                    <Link to='/home'>
                    <button className={layout.btn}>
                    
                    </button>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}