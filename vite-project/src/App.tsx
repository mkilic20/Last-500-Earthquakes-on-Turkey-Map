import React, { useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle, useMapEvents } from 'react-leaflet'
import data from './data/earthquake.json'
import L, { LeafletMouseEvent, map, tileLayer } from 'leaflet'
import { RangeInput } from './components/RangeInput'


// url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

function App() {
  var redMarker = L.icon({iconUrl:'../pictures/redMarker.png', iconSize:[46,46], iconAnchor:[23,28],popupAnchor:  [-3, -76]})
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

  const [position, setPosition] = useState(new L.LatLng(0,0))

  let circleCenter = new L.LatLng(41.07035, 29.0059)

  const [radiusMeter, setradiusMeter] = useState(200000)
  const [comaActivated, setcomaActivated] = useState(false)
  const [zoomLevel, setzoomLevel] = useState(6)
  const [centerMap,setcenterMap] = useState(new L.LatLng(38.4637, 34.2433))


  function LocationMarker() {
    const [position, setPosition] = useState(new L.LatLng(0,0))
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    
    return position === null ? null : (
      <Marker position={position} icon={redMarker} >
        <Popup><span style={{display:"flex", justifyContent:"center", textAlign:"center"}}>You are here <br/> ! </span> </Popup>
      </Marker>
    )
  }
  return ( 
    <div style={{background:"#dc2626", height:"100vh"}}>
      <h1 style={{color:"white"}}> Earthquakes on Turkey </h1>
      <div id="map" className='info' style={{color:"black", border:"12px orange", borderStyle:"inset",width: "70vw",
  height: "65vh"}}>
      <MapContainer className='leaflet-map' center={centerMap} zoom={zoomLevel} scrollWheelZoom={true}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
      <Marker position={circleCenter}></Marker>
      <LocationMarker />        
      <Circle center={circleCenter} radius={radiusMeter}></Circle>
      {data.map((eq, index) => {
        let newPoint = new L.LatLng(parseFloat(eq.enlem),parseFloat(eq.boylam))
        var tempDistance = newPoint.distanceTo(circleCenter)
          if ((tempDistance)<=radiusMeter){
            return (
            <Marker key={index} position={[parseFloat(eq.enlem), parseFloat(eq.boylam)]} eventHandlers={{
              click: () => {
                setmarkerData(eq)
                setcomaActivated(true)
              }
            }}>
              <Popup>
                Yer: {eq.yer}
              </Popup>
            </Marker>
        )
          }})
      }
      </MapContainer></div>
      
      <RangeInput currRange={radiusMeter} setradiusMeter={setradiusMeter} setzoomLevel={setzoomLevel} setcenterMap={setcenterMap}/>
      
      <div id = 'info' className='info' style={{color:"black", border:"12px orange", borderStyle:"inset", width:"60vw", background:"#db9a00",}}> 
        <h2> <span style={{color:"red"}}>Selected Earthquake:</span> </h2>
        <h3>  Coordinate: {markerData.enlem}  {comaActivated ? ",": ""} {markerData.boylam} <br/>
        Magnitude: {markerData.buyukluk} <br/> Place: {markerData.yer} {markerData.sehir} <br/> Date: {markerData.tarih}   Time: {markerData.saat}</h3> 
      </div>
    </div>
  )
}

export default App
