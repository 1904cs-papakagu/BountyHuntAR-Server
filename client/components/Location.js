import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getLocationsThunk} from '../store/location'
import AddLocationForm from './AddLocationFrom'
import EditLocation from './EditLocation'

class Location extends Component {
  constructor() {
    super()
    this.state = {
      showEditID: null
    }
    this.edit = this.edit.bind(this)
  }
  componentDidMount() {
    this.props.getLocations()
  }
  edit(id) {
    this.setState({showEditID: id})
  }
  render() {
    return this.props.isAdmin ? (
      <div>
        {this.props.locations.map(location => (
          <div key={location.id}>
            <h3>Value: {location.value}</h3>
            <h3>Status: {String(location.isActive)}</h3>
            <button type="button" onClick={() => this.edit(location.id)}>
              EDIT{' '}
            </button>

            {this.state.showEditID === location.id ? (
              <EditLocation
                edit={this.edit}
                location={location}
                updateLocations={this.props.getLocations}
              />
            ) : (
              ''
            )}
          </div>
        ))}
        <AddLocationForm updateLocations={this.props.getLocations} />
      </div>
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
