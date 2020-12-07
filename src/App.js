import React, {useState, useEffect, useRef} from 'react';
import './App.css'
import { YMaps } from 'react-yandex-maps';
import MapContainer from './components/map'
import ToolBar from './components/toolBar'

function App() {
  const [points, setPoints] = useState();
  const [{dateStart,dateEnd}, setDates] = useState({});
  const [settings, setSettings] = useState(null);


  // TO-DO: Use only one useEffect()
  useEffect(()=>{
    fetch("https://moscowdom.adsdesign.ru/current")
    .then(res => res.json())
    .then(
        (result) => {
            setPoints(result.points)
            setDates({dateStart:result.date, dateEnd:result.date})
        },
        (error) => {
        }
    )
  },[])

  useEffect(()=>{
    console.log(settings)
    if (settings!=null){
      fetchData();
    }
  }, [settings])

  async function fetchData(){
    console.log('fetching')
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
    console.log(result)
    setPoints(result.points)
  }

  const setNewData=(data)=>{
    setSettings(data)
  }

  return (
    <div className="App">
      <YMaps query={{load: "package.full"}}>
        <ToolBar dateStart={dateStart} dateEnd={dateEnd} newData={(data)=>setNewData(data)}/>
        <MapContainer points={points}/>
      </YMaps>
    </div>
  );
}

export default App;
