import React from 'react'
import { List } from 'antd'
import TimeAgo from 'react-timeago'
import { Input } from 'antd'
import { Button } from 'antd'
import { Tag } from 'antd'
import { Avatar } from 'antd'
const { Search } = Input

class SensorsList extends React.Component {
	constructor() {
		super();
		this.state = {
			sensors: [],
			searchField: '',
			visualizedNumber: 10
		}
	}

	getData = async () => {
  			const response = await fetch("https://d149wkud6tbfrz.cloudfront.net/api/measurements/current");
  			const data = await response.json();
  			await data.sort((a, b) => b.characteristics.pm2_5ConcMass.value - a.characteristics.pm2_5ConcMass.value)
  			// console.log(data.length)
  			this.setState({ sensors: data})
  			this.props.onSensorSelect(this.state.sensors[0])
	}

	componentDidMount() {
		this.getData()
	}

	onSearch = (input) => {
		// console.log(input)
		this.setState({ searchField: input})
		this.setState({ visualizedNumber: 10 })
	}

	onAction = (event) => {
		// this.props.onSensorSelect()
		console.log(event.target.id)
		for (let sensor of this.state.sensors) {
			if (sensor._id === event.target.id) {
				// console.log(sensor)
				this.props.onSensorSelect(sensor)
				break
			}
		}

	}

	// onSeeMore = () => { this.setState({ visualizedNumber: this.state.visualizedNumber + 20 })
	onSeeMore = (event) => {
		this.setState({ visualizedNumber: this.state.visualizedNumber + 10 })
		console.log(this.state.visualizedNumber)
	}

	calculatePm25AQI = (concentration) => {
		    const pm25_breakpoints = [[0.0, 12.0], [12.1, 35.4], [35.5, 55.4], [55.5, 150.4], [150.5, 250.4], [250.5, 350.4], [350.5, 500.4]]
		    const AQI_breakpoints = [[0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 400], [401, 500]]
		    const colors = ['#52c41a', '#fadb14', '#fa8c16', '#f5222d', '#722ed1', '#613400']

		    const concentrationRounded = Math.round(concentration * 10) / 10
        	let conc_lo = pm25_breakpoints[pm25_breakpoints.length-1][0]
        	let conc_hi = pm25_breakpoints[pm25_breakpoints.length-1][1]
        	let AQI_lo = AQI_breakpoints[AQI_breakpoints.length-1][0]
        	let AQI_hi = AQI_breakpoints[AQI_breakpoints.length-1][1]

        	let counter = 0
        	for (let pm25_break of pm25_breakpoints) {
        		if ((concentrationRounded >= pm25_break[0]) & (concentrationRounded <= pm25_break[1])) {
        			conc_lo = pm25_break[0]
        			conc_hi = pm25_break[1]
        			AQI_lo = AQI_breakpoints[counter][0]
        			AQI_hi = AQI_breakpoints[counter][1]
        			break
        		}
        		counter = counter + 1
        	}
        	let slope = (AQI_hi - AQI_lo)/(conc_hi - conc_lo)
        	let AQI = slope * (concentrationRounded - conc_lo) + AQI_lo
        	let color = colors[counter]
        	return [Math.round(AQI), color]
	}

	render() {
		const { searchField, sensors, visualizedNumber } = this.state
		const filteredSensors = sensors.filter(sensor => {
				return sensor.device.name.toLowerCase().includes(searchField.toLowerCase())
			}).slice(0, visualizedNumber)

	  	return (
		    <div>
			    <List
			      header={<div><Search placeholder="input search text" allowClear onSearch={this.onSearch} enterButton /></div>}
			      footer={<div className='tc'><Button onClick={this.onSeeMore}>See More</Button></div>}
			      bordered
			      dataSource={filteredSensors}
			      renderItem={(item, index) => (
			        <List.Item id = {item._id} actions={[<a key="show-on-map" id={item._id} onClick={this.onAction}>Show on map</a>]}>
				        <List.Item.Meta
				          title={item.device.name}
				          description = {<TimeAgo date={item.time}/>}
				          avatar = {<Avatar style={{ backgroundColor: '#595959'}}>#{index}</Avatar>}
				        />
				        <div>{Math.round(item.characteristics.pm2_5ConcMass.value)} µg/m3 <Tag color={this.calculatePm25AQI(item.characteristics.pm2_5ConcMass.value)[1]}>{this.calculatePm25AQI(item.characteristics.pm2_5ConcMass.value)[0]} AQI</Tag></div>
				    </List.Item>
			      )}
			    />
		    </div>
	  )
	}
}

export default SensorsList;