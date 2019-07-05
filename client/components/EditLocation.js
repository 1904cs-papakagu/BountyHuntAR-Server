import React, {Component} from 'react'

import axios from 'axios'
export default class EditLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: this.props.location.GPS[0],
      longitude: this.props.location.GPS[1],
      value: this.props.location.value,
      isActive: this.props.location.isActive
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBool = this.handleBool.bind(this)
  }
  handleBool(event) {
    this.setState({isActive: event.target.value})
    console.log(event.target.value)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  async handleSubmit(event) {
    event.preventDefault()
    const GPS = [this.state.latitude, this.state.longitude]
    const value = this.state.value
    await axios.put('/api/locations/edit', {
      GPS,
      value,
      locationId: this.props.location.id,
      isActive: this.state.isActive
    })

    this.props.updateLocations()
    this.props.edit(null)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={location}>
          <div>
            <input
              name="latitude"
              type="number"
              value={this.state.latitude}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              name="longitude"
              type="number"
              value={this.state.longitude}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              name="value"
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <select value={this.state.isActive} onChange={this.handleBool}>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <div>
            <button type="submit">Edit Location</button>
          </div>
        </form>
      </div>
    )
  }
}
