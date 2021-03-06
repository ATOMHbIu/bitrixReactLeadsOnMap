import React, { useState, useEffect, useLayoutEffect, componentDidMount } from 'react'
import {Map, Placemark, ObjectManager, Polygon} from 'react-yandex-maps'

const MapContainer = ({points, regions, listData, lightItem}) =>{

    const [map, setMap] = useState(null)
    const [ymaps, setYmaps] = useState(null)
    const [mapRef, setMapRef]=useState(null)

    useEffect(()=>{
        if(mapRef!==null&&points!==null) {
            countRegions()
        }
    },[mapRef, points])

    const countRegions = () =>{
        if (points.length>=0){
            regions.features.forEach(pol=>{
                const obj = mapRef.objects.getById(pol.id);
                let iter = 0;
                let ymaPol = new ymaps.Polygon(obj.geometry.coordinates)
                ymaPol.options.setParent(map.options);
                ymaPol.geometry.setMap(map);
                let crds = points.filter(el=>{
                    if (el.coords!=null||el.coords!=undefined){
                        return el.coords
                    }
                })
                crds.forEach(el=>{
                    let current = (ymaPol.geometry.contains([parseFloat(el.coords[0]),parseFloat(el.coords[1])]))
                    if(current){iter++}
                })
                listData(pol.id, iter)
            })
        }
    }

    const showRegion=(e)=>{
        lightItem(e.get('objectId'))
    }

    return (
        <Map
            defaultState={{ center: [55.753215, 37.622504], zoom: 11,
                controls: [] }}
            width='100%'
            height='100vh'
            onLoad={(ymaps) => {setYmaps(ymaps)}}
            instanceRef={(map) => {setMap(map)}}
        >
            <ObjectManager
                features={regions}
                modules={["package.full"]}
                onClick={e=> showRegion(e)}
                instanceRef={ref => setMapRef(ref)}
            />
            {points&&(
                points.map(el=>(
                    <Placemark
                        key={'pm'+el.ID}
                        geometry={el.coords}
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