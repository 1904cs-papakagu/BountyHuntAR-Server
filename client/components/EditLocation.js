import React, {Component} from 'react'
import {Button, Modal, Form, Dropdown, Label} from 'semantic-ui-react'
import axios from 'axios'
export default class EditLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: this.props.location.GPS[0],
      longitude: this.props.location.GPS[1],
      value: this.props.location.value,
      isActive: this.props.location.isActive,
      radius: this.props.location.radius,
      name: this.props.location.name,
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBool = this.handleBool.bind(this)
    this.close = this.close.bind(this)
  }
  handleBool(event, value) {
    this.setState({isActive: value.value})

    console.log(event.target.value)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  async handleSubmit(event) {
    event.preventDefault()
    const GPS = [this.state.latitude, this.state.longitude]
    const name = this.state.name
    const value = this.state.value
    const radius = this.state.radius
    await axios.put('/api/locations/edit', {
      GPS,
      value,
      locationId: this.props.location.id,
      isActive: this.state.isActive,
      name,
      radius
    })

    this.props.updateLocations()
    this.close()
  }
  close() {
    this.setState({open: false})
  }

  render() {
    return (
      <Modal
        size="fullscreen"
        trigger={
          <Button size="mini" onClick={() => this.setState({open: true})}>
            Edit
          </Button>
        }
        open={this.state.open}
      >
        <Modal.Header>Edit Location</Modal.Header>
        <Modal.Content
          // className="form"
          form
          style={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}
        >
          <Form onSubmit={this.handleSubmit} name="location">
            <Form.Group>
              <Form.Input
                label="Name"
                placeholder="Name"
                name="name"
                type="string"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Latitude"
                name="latitude"
                type="number"
                value={this.state.latitude}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Longitude"
                name="longitude"
                type="number"
                value={this.state.longitude}
                onChange={this.handleChange}
              />

              <Form.Input
                label="Value"
                name="value"
                type="number"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Radius"
                name="radius"
                type="number"
                value={this.state.radius}
                onChange={this.handleChange}
              />
              <Form.Field width={4}>
                <label>Status</label>
                <Dropdown
                  value={this.state.isActive}
                  name="isActive"
                  selection={true}
                  options={[
                    {text: 'true', value: true},
                    {text: 'false', value: false}
                  ]}
                  onChange={this.handleBool}
                />
              </Form.Field>
              {/* <Form.Button content="Submit" color="green" /> */}
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close} negative>
            Exit
          </Button>
          <Button onClick={this.handleSubmit} positive>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
