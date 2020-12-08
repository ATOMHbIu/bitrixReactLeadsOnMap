import React, { useState, useEffect, useLayoutEffect, componentDidMount } from 'react'
import {Map, Placemark, ObjectManager, Polygon} from 'react-yandex-maps'

const MapContainer = ({points, regions}) =>{

    const [mainMap, setMap] = useState(null)
    const [ymaps, setYmaps] = useState(null)
    const [poly, setPoly] = useState(regions)

    // console.log(poly)
    
    // ymaps.ObjectManager.add({poly})

    const setMapLoad=(map)=>{
        setYmaps(map)
        // console.log(ymaps)
        // console.log(map)
        // console.log(mainMap)
        const objectManager = new map.ObjectManager()
        objectManager.add(poly)
    }

    return (
        <Map
            defaultState={{ center: [55.753215, 37.622504], zoom: 11,
                controls: [] }}
            width='100%'
            height='100vh'
            onLoad={ymaps => setMapLoad(ymaps)}
            instanceRef={ref => setMap(ref)}
        >
            <ObjectManager
                features={poly}
                // defaultFeatures={poly}
                // defaultObjects={poly}
                options={{coordorder:'longlat'}}
                modules={["package.full"]}
                filter={object => object.id % 2 === 0}
                // objects={poly}
            />
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
        </Map>
    )
}

export default MapContainer;