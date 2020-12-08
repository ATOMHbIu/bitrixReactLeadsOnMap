import React, {useState, useEffect, useRef} from 'react';
import './App.css'
import { YMaps } from 'react-yandex-maps';
import MapContainer from './components/map'
import ToolBar from './components/toolBar'
import regions from './data/moscow'


function App() {
  const [points, setPoints] = useState();
  const [{dateStart,dateEnd}, setDates] = useState({});
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);


  // TO-DO: Use only one useEffect()
  useEffect(()=>{
    fetch("https://moscowdom.adsdesign.ru/current")
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result)
            setPoints(result.points)
            setLoading(false)
        },
        (error) => {
        }
    )
  },[])

  useEffect(()=>{
    console.log(settings)
    if (settings!=null){
      setLoading(true)
      fetchData();
    }
  }, [settings])

  async function fetchData(){
    const ress = await fetch("https://moscowdom.adsdesign.ru/getWithFilter",
      {
        method:'POST',
        body: JSON.stringify(settings),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    let result = await ress.json()
    setPoints(result.points)
    setLoading(false);
  }

  const setNewData=(data)=>{
    setSettings(data)
  }

  return (
    <div className="App">
      <YMaps query={{coordorder: 'latlong', load: 'package.full'}}>
        <div className={loading?'loading true':'loading false'}> <img src="https://b24.adsdesign.ru/bp/MoscowDOM/static/media/loader.afbd6385.gif" /></div>
        <ToolBar dateStart={dateStart} dateEnd={dateEnd} newData={(data)=>setNewData(data)}/>
        <MapContainer points={points} regions={regions}/>
      </YMaps>
    </div>
  );
}

export default App;
