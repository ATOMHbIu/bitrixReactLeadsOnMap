import React, { useState } from 'react'
import {Map, Placemark} from 'react-yandex-maps'


const MapContainer = () =>{

    const [mainMap, setMap] = useState(null)
    const [ymaps, setYmaps] = useState(null)

    const createPM =(e)=>{
        let coord = e.get('coords')
        mainMap.geoObjects.add(new ymaps.Placemark(coord, {preset:'islands#redDotIcon'}))
    }

    return (
        <Map
            defaultState={{ center: [55.753215, 37.622504], zoom: 12,
                controls: [] }}
            width='100%'
            height='100vh'
            onClick={(e)=>createPM(e)}
            onLoad={ymaps => setYmaps(ymaps)}
            instanceRef={ref => setMap(ref)}
        ></Map>
    )
}

export default MapContainer;