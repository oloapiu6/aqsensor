import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import SimpleMap from './SimpleMap.js'
import SensorsList from './SensorsList.js'
import { Card } from 'antd'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
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
      <div className = 'pt4 pb0' style={{backgroundColor: "#F1F9FF"}}>
        <div className = 'mw7 center tc mb2'>
          <h1 className='f1 tc' style={{color: '#275476'}}>AIR QUALITY RANKING</h1>
          <p className='f4 tc' >Places with high particulate matter (PM2.5) pollution</p>
        </div>
        <div className = 'mw7 center'>
          <SimpleMap selectedSensor={this.state.selectedSensor}/>
        </div>
        <div className = "mw7 center pt2 pb4">
          <div className = "bg-white br3">
            <SensorsList onSensorSelect = {this.onSensorSelect} className = "mw7" />
          </div>
        </div>
      </div>
    )
  }
}

export default App


        // <Card className = 'mw7 center tc mb2' style={{borderColor: '#D9D9D9'}}>
        //   <h1 className='f3 tc' >AIR QUALITY RANKING</h1>
        //   <p className='f4 tc' >Places with high particulate matter (PM2.5) pollution</p>
        // </Card>