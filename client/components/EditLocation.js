import React, {Component} from 'react'
import {
  Container,
  Header,
  Button,
  Table,
  Grid,
  Modal,
  Form
} from 'semantic-ui-react'
import axios from 'axios'
export default class EditLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: this.props.location.GPS[0],
      longitude: this.props.location.GPS[1],
      value: this.props.location.value,
      isActive: this.props.location.isActive,
      name: this.props.location.name,
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.close = this.close.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  async handleSubmit(event) {
    event.preventDefault()
    const GPS = [this.state.latitude, this.state.longitude]
    const name = this.state.name
    const value = this.state.value
    await axios.put('/api/locations/edit', {
      GPS,
      value,
      locationId: this.props.location.id,
      isActive: this.state.isActive,
      name
    })

    this.props.updateLocations()
    this.close()
  }
  close() {
    this.setState({open: false})
  }

  render() {
    return (
      // <div>
      //   <form onSubmit={this.handleSubmit} name={location}>
      //     <div>
      //       <input
      //         name="latitude"
      //         type="number"
      //         value={this.state.latitude}
      //         onChange={this.handleChange}
      //       />
      //     </div>
      //     <div>
      //       <input
      //         name="longitude"
      //         type="number"
      //         value={this.state.longitude}
      //         onChange={this.handleChange}
      //       />
      //     </div>
      //     <div>
      //       <input
      //         name="value"
      //         type="number"
      //         value={this.state.value}
      //         onChange={this.handleChange}
      //       />
      //     </div>
      //     <div>
      //       <select value={this.state.isActive} onChange={this.handleBool}>
      //         <option value={true}>true</option>
      //         <option value={false}>false</option>
      //       </select>
      //     </div>
      //     <div>
      //       <button type="submit">Edit Location</button>
      //     </div>
      //   </form>
      // </div>
      <Modal
        trigger={
          <Button size="mini" onClick={() => this.setState({open: true})}>
            Edit
          </Button>
        }
        open={this.state.open}
      >
        <Modal.Header>Edit Location</Modal.Header>
        <Modal.Content form>
          <Form onSubmit={this.handleSubmit} name="location">
            <Form.Group>
              <Form.Input
                placeholder="Name"
                name="name"
                type="string"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Form.Input
                name="latitude"
                type="number"
                value={this.state.latitude}
                onChange={this.handleChange}
              />
              <Form.Input
                name="longitude"
                type="number"
                value={this.state.longitude}
                onChange={this.handleChange}
              />
              <Form.Input
                name="value"
                type="number"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <Form.Button content="Submit" color="green" />
            </Form.Group>
          </Form>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Exit
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    )
  }
}
