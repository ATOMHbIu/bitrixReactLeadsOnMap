import React, {useState, useEffect, useRef} from 'react';
import './App.css'
import { YMaps } from 'react-yandex-maps';
import MapContainer from './components/map'
import ToolBar from './components/toolBar'
import regions from './data/moscow'
import RightMenu from './components/rightMenu'


function App() {
  const [points, setPoints] = useState(null);
  const [{dateStart,dateEnd}, setDates] = useState({});
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [triggerList, setTriggerList] = useState(null)

  useEffect(()=>{
    setLoading(true)
      fetchData();
  },[])

  useEffect(()=>{
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

  const setListItemData = (id, count)=>{
    regions.features[id].count=count
    setTriggerList({id, count})
  }

  const lightItem=(id)=>{
    regions.features.forEach(el=>{
      el.lightened=false
    })
    regions.features[id].lightened=true
  }

  return (
    <div className="App">
      <YMaps query={{load: 'package.full', apikey: "cd1c4834-1d3b-484c-88ea-fb96de1de28a"}}>
        <div className={loading?'loading true':'loading false'}> <img src="https://b24.adsdesign.ru/bp/MoscowDOM/static/media/loader.afbd6385.gif" /></div>
        <ToolBar dateStart={dateStart} dateEnd={dateEnd} newData={(data)=>setNewData(data)}/>
        <RightMenu regions={regions.features}/>
        <MapContainer 
          points={points} 
          regions={regions}
          selectorData={(id, count)=>setListItemData(id, count)}
          lightItem={(id)=>lightItem(id)}
        />
      </YMaps>
    </div>
  );
}

export default App;
