import React, {Component} from 'react'
import {Form, Container, Grid} from 'semantic-ui-react'
import axios from 'axios'
export default class AddLocationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      value: null,
      name: null
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
    const name = this.state.name
    await axios.post('/api/locations/add', {GPS, value, name})
    this.setState({
      latitude: null,
      longitude: null,
      value: null,
      name: null
    })
    this.props.updateLocations()
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Name"
              name="name"
              type="string"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Latitude"
              name="latitude"
              type="number"
              value={this.state.latitude}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Longitude"
              name="longitude"
              type="number"
              value={this.state.longitude}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Value"
              name="value"
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
      </Container>
    )
  }
}
