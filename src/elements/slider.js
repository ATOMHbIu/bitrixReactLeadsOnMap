import React, { useState } from 'react'

const Slider=({
        leftTitle,
        rightTitle,
        type
    })=>{

    const [toggled, setToggled] = useState(false)
    const toggle=()=>{
        let newState = toggled?false:true;
        setToggled(newState);
        type(toggled?'lead':'deal')
    }

    return(
        <div className='slider' onClick={()=>{toggle()}}>
            <div className="leftTitle">{leftTitle}</div>
            <div className={toggled?'slide toggled':'slide'}><div className="point"></div></div>
            <div className="rightTitle">{rightTitle}</div>
        </div>
    )
}

export default Slider;
