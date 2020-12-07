import React, { useState, useEffect, useLayoutEffect, componentDidMount } from 'react'
import {Map, Placemark, ObjectManager} from 'react-yandex-maps'

const MapContainer = ({points}) =>{

    const [mainMap, setMap] = useState(null)
    const [ymaps, setYmaps] = useState(null)

    return (
        <Map
            defaultState={{ center: [55.753215, 37.622504], zoom: 11,
                controls: [] }}
            width='100%'
            height='100vh'
            onLoad={ymaps => setYmaps(ymaps)}
            instanceRef={ref => setMap(ref)}
        >
            {points&&(
                points.map(el=>(
                    <Placemark
                        key={el.ID}
                        geometry={el.UF_CRM_1605016734510}
                        properties={{
                            hintContent: el.ID,
                            balloonContent: el.TITLE
                        }}
                    />
                ))
            )}
            {/* <Active></Active> */}
        </Map>
    )
}

export default MapContainer;