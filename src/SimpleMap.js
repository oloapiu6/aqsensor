import React from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap} from 'react-leaflet'
import calculatePm25AQI from './utils.js'
import { divIcon } from 'leaflet'

function MapControl({ selectedSensor }) {
  const map = useMap()

  if (selectedSensor) {
    // console.log(selectedSensor.device.location.coordinates)
    const position = [selectedSensor.device.location.coordinates[1],selectedSensor.device.location.coordinates[0]]
    const name = selectedSensor.device.name
    const color = calculatePm25AQI(selectedSensor.characteristics.pm2_5ConcMass.value)[1]
    const aqi = calculatePm25AQI(selectedSensor.characteristics.pm2_5ConcMass.value)[0]
    const pm2_5Conc = Math.round(selectedSensor.characteristics.pm2_5ConcMass.value)

    const markerHtmlStyles = `
      background-color: ${color};
      width: 2rem;
      height: 2rem;
      display: block;
      left: -1rem;
      top: -1rem;
      position: relative;
      border-radius: 2rem 2rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`

    const icon = divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`
    })

    map.setView(position, 10)
    map.panTo(position)

    return (
      <Marker position={position} icon = {icon}>
        <Tooltip direction='bottom' permanent>
          <div className='tc'>
          <h1 className='pv0 ph5'>{name}</h1>
          <div className='pv0' ><p className='f5 b'>AQI: {aqi}</p></div>
          <div>PM2.5 Concentration: {pm2_5Conc} µg/m3</div>
          </div>
        </Tooltip>
      </Marker>
    )
  } else { return null }
}

const SimpleMap = (props) => {
  
  return(
      <MapContainer style={{'height':'350px'}} center={[45,0]} zoom={2}>
        <TileLayer
          tileLayer = 'cartodbpositron'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Map tiles by Carto.'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <MapControl selectedSensor={props.selectedSensor}/>
      </MapContainer>
  )
}
 
export default SimpleMap;