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
      <Grid verticalAlign="middle" padded>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Table size="small" color="grey" inverted collapsing={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={2}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Value</Table.HeaderCell>

                  <Table.HeaderCell width={2}>Latitude</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Longitude</Table.HeaderCell>
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
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={1}>
          <Grid.Column>
            <AddLocationForm updateLocations={this.props.getLocations} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
