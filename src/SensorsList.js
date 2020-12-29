import React from 'react'
import { List } from 'antd'
import TimeAgo from 'react-timeago'
import { Input } from 'antd'
import { Button } from 'antd'
import { Tag } from 'antd'
import { Avatar } from 'antd'
import calculatePm25AQI from './utils.js'
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
  			const data_with_rank = await data.map((sensor, i) => {
  				sensor.rank = i + 1
  				return sensor
  			})
  			// console.log(data_with_rank[0])
  			this.setState({ sensors: data_with_rank})
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
		// console.log(event.target.id)
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
			      renderItem={(item) => (
			        <List.Item id = {item._id} actions={[<a key="show-on-map" id={item._id} onClick={this.onAction}>Show on map</a>]}>
				        <List.Item.Meta
				          title={item.device.name}
				          description = {<TimeAgo date={item.time}/>}
				          avatar = {<Avatar style={{ backgroundColor: '#595959'}}>#{item.rank}</Avatar>}
				        />
				        <div>{Math.round(item.characteristics.pm2_5ConcMass.value)} µg/m3 <Tag color={calculatePm25AQI(item.characteristics.pm2_5ConcMass.value)[1]}>{calculatePm25AQI(item.characteristics.pm2_5ConcMass.value)[0]} AQI</Tag></div>
				    </List.Item>
			      )}
			    />
		    </div>
	  )
	}
}

export default SensorsList;