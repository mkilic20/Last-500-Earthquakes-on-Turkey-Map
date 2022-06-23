import React from 'react'
import './App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import data from './data/earthquake.json'

// url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

function App() {
  
  return (
    <div id="map">
      <h1> Turkish Construction Team </h1>
      <MapContainer className='leaflet-map' center={[38.4637, 34.2433]} zoom={6} scrollWheelZoom={true} >
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
        <Marker position={[41.07035, 29.0059]}>
          <Popup>
            Eliar <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[41.1947, 29.0491]}>
          <Popup>
            Koç West Campus <br /> Home
          </Popup>
        </Marker>
        <Marker position={[37.00034, 35.27874]}>
          <Popup>
            Home
          </Popup>
        </Marker>
        {data.map(eq => (
          <Marker position={[parseFloat(eq.enlem) , parseFloat(eq.boylam)]}>
            <Popup>
              Yer: {eq.sehir} {eq.yer} <br/> Büyüklük: {eq.buyukluk} <br/> Tarih: {eq.tarih}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default App
