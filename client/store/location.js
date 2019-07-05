import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_LOCATIONS = 'GET_LOCATIONS'

const locations = []

/**
 * ACTION CREATORS
 */
const getLocations = locations => ({type: GET_LOCATIONS, locations})

/**
 * THUNK CREATORS
 */
export const getLocationsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/locations')
    dispatch(getLocations(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = locations, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.locations
    default:
      return state
  }
}
