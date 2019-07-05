import React, {Component} from 'react'

import axios from 'axios'
export default class AddLocationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: 0,
      longitude: 0,
      value: 1000
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  async handleSubmit(event) {
    event.preventDefault()
    const GPS = [this.state.latitude, this.state.longitude]
    const value = this.state.value
    await axios.post('/api/locations/add', {GPS, value})
    this.setState({
      latitude: 100,
      longitude: 100,
      value: 2000
    })
    this.props.updateLocations()
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
            <button type="submit">Add Location</button>
          </div>
        </form>
      </div>
    )
  }
}
