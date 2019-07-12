import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getLocationsThunk} from '../store/location'
import AddLocationForm from './AddLocationFrom'
import EditLocation from './EditLocation'
import {Container, Header, Button, Table, Grid} from 'semantic-ui-react'
class Location extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getLocations()
  }

  render() {
    return this.props.isAdmin ? (
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          margin: '1em'
        }}
      >
        <Table size="small" color="grey" inverted collapsing={true}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>Name</Table.HeaderCell>
              <Table.HeaderCell width={2}>Value</Table.HeaderCell>

              <Table.HeaderCell width={2}>Latitude</Table.HeaderCell>
              <Table.HeaderCell width={2}>Longitude</Table.HeaderCell>
              <Table.HeaderCell width={2}>Radius</Table.HeaderCell>
              <Table.HeaderCell width={2}>Status</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.locations.map(location => (
              <Table.Row key={location.id}>
                <Table.Cell collapsing={true}>{location.name}</Table.Cell>
                <Table.Cell collapsing={true}>{location.value}</Table.Cell>
                <Table.Cell collapsing={true}>{location.GPS[0]}</Table.Cell>
                <Table.Cell collapsing={true}>{location.GPS[1]}</Table.Cell>
                <Table.Cell collapsing={true}>{location.radius}</Table.Cell>
                <Table.Cell collapsing warning={!location.isActive}>
                  {String(location.isActive)}
                </Table.Cell>
                <Table.Cell>
                  <EditLocation
                    location={location}
                    updateLocations={this.props.getLocations}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <AddLocationForm updateLocations={this.props.getLocations} />
      </Container>
    ) : (
      <h1> NOT ALLOWED</h1>
    )
  }
}
const mapStateToProps = state => {
  return {
    locations: state.location,
    isAdmin: state.user.isAdmin
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getLocations: () => dispatch(getLocationsThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Location)
