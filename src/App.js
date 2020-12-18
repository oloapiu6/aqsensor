import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import SimpleMap from './SimpleMap.js'
import SensorsList from './SensorsList.js'

class App extends React.Component {
    constructor() {
      super();
      this.state = {
          selectedSensor: null,
      }
    }

  onSensorSelect = (sensor) => {
    this.setState({ selectedSensor: sensor})
    // console.log(this.state.selectedSensor)
  }

  render() {
    return (
      <div style={{backgroundColor: "#F1F9FF"}}>
        <h1 className='f2 tc ma0 pt4 pb2' >AIR QUALITY RANKING</h1>
        <h2 className='f3 tc ma0 pb4' >Places with high particulate matter (PM2.5) pollution</h2>
        <div className = 'mw7 center'>
          <SimpleMap selectedSensor={this.state.selectedSensor}/>
        </div>
        <div className = "mw7 center pv4">
          <div className = "bg-white br3">
            <SensorsList onSensorSelect = {this.onSensorSelect}  className = "mw7" />
          </div>
        </div>
      </div>
    )
  }
}

export default App
