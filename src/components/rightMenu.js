import React, {useEffect, useState} from 'react'

const RightMenu = ({total, regions})=>{

    // const [list, setList] = useState()
    useEffect(()=>{
        console.log(regions)
    }, [regions])

    const lightState=(el)=>{
        return el.lightened?'row red':'row'
    }

    const List = ()=>{
        let list = regions.map(el=>(
            <div className={el.lightened?'row red':'row'} key={el.id} ><div className="title">{el.properties.description}:</div><div className="count">{el.count}</div></div>
        ))
        return list
    }

    return(
        <div className="rightMenu">
            <div className="row"><div className="title">Всего:</div><div className="count">{total&&(total.length)}</div></div>
            <List />
        </div>
    )
}

export default RightMenu;