import React, {useState} from 'react';
import './App.css'
import { YMaps } from 'react-yandex-maps';
import MapContainer from './components/map'
import ToolBar from './components/toolBar'

function App() {
  return (
    <div className="App">
      <YMaps query={{load: "package.full"}}>
        <ToolBar />
        <MapContainer />
      </YMaps>
    </div>
  );
}

export default App;
