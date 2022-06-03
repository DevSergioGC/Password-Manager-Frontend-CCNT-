import React, {useState} from 'react';

function Accordion(props) {    

    const [isActive, setIsActive] = useState(false);

    return (
    
        <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>
                    <h4>{props.folder.name}</h4>
                </div>
                <div>{isActive ? '⇑' : '⇓'}</div>
            </div>            
            {isActive && <div className="card">                
                {props.item}                
            </div>}            
        </div>

    )
}

export default Accordion