import React, {useEffect, useState} from 'react'

const RightMenu = ({total, regions})=>{
    return(
        <div className="rightmenu">
            <div className="row"><div className="title">Всего:</div><div className="count">{total}</div></div>
            {regions.map(el=>(
                <div className={el.lightened?'row red':'row'} key={el.id} ><div className="title">{el.properties.description}:</div><div className="count">{el.count}</div></div>
            ))}
        </div>
    )
}

export default RightMenu;