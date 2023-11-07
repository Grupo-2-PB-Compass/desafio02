import React from 'react';

import './ToBarWireframe.module.css';

const TopBarWireframe: React.FC = () =>{
    return (
        <div className='top-bar'>
            <div className='circle-group'>
                <div className="circle"/>
                <div className="circle"/>
                <div className="circle"/>
            </div>
        </div>
    );
};

export default TopBarWireframe;