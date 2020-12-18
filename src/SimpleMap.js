import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function MyComponent({ selectedSensor }) {
  const map = useMap()
  if (selectedSensor) {
    // console.log(selectedSensor.device.location.coordinates)
    const position = [selectedSensor.device.location.coordinates[1],selectedSensor.device.location.coordinates[0]]
    const name = selectedSensor.device.name
    map.setView(position, 10)
    map.panTo(position)
    return (
      <Marker position={position}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    )
  } else { return null }
}

const SimpleMap = (props) => {
  
  return(
      <MapContainer style={{'height':'300px'}} center={[45,0]} zoom={2}>
        <TileLayer
          tileLayer = 'cartodbpositron'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Map tiles by Carto.'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <MyComponent selectedSensor={props.selectedSensor}/>
      </MapContainer>
  )
}
 
export default SimpleMap;