import React, { useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import data from './data/earthquake.json'
import { LeafletMouseEvent } from 'leaflet'

// url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

function App() {
  
  const [markerData, setmarkerData] = useState({
    "tarih": "",
    "saat": "",
    "enlem": "",
    "boylam": "",
    "derinlik": "",
    "buyukluk": "",
    "yer": "",
    "sehir": ""
})
const [comaActivated, setcomaActivated] = useState(false)

  return ( 
    <div style={{background:"#dc2626", height:"100vh"}}>
      <h1 style={{color:"white"}}> Earthquakes on Turkey </h1>
      <div id="map" className='info' style={{color:"black", border:"12px orange", borderStyle:"inset",width: "70vw",
  height: "65vh"}}>
      <MapContainer className='leaflet-map' center={[38.4637, 34.2433]} zoom={6} scrollWheelZoom={true}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
        <Marker position={[41.07035, 29.0059]}>
          <Popup>
            Eliar <br /> Easily customizable.
          </Popup>
        </Marker>
        {data.map((eq, index) => {
          return (
            <Marker key={index} position={[parseFloat(eq.enlem), parseFloat(eq.boylam)]} eventHandlers={{
              click: () => {
                setmarkerData(eq)
                setcomaActivated(true)
              }
            }}>
              <Popup>
                Yer: {eq.sehir} {eq.yer} <br /> Büyüklük: {eq.buyukluk} <br /> Tarih: {eq.tarih}
              </Popup>
            </Marker>
          )
        } )}
      </MapContainer></div>

      <div id = 'info' className='info' style={{color:"black", border:"12px orange", borderStyle:"inset", width:"60vw", background:"#db9a00",}}> 
        <h2> <span style={{color:"red"}}>Selected Earthquake:</span> </h2>
        <h3>  Coordinate: {markerData.enlem}  {comaActivated ? ",": ""} {markerData.boylam} <br/>
        Magnitude: {markerData.buyukluk} <br/> Place: {markerData.yer} {markerData.sehir} <br/> Date: {markerData.tarih}   Time: {markerData.saat}</h3> 
      </div>
    </div>
  )
}

export default App
