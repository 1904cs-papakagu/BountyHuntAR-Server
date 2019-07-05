import React, {Component} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'

class Leaderboard extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }
  async componentDidMount() {
    const {data} = await Axios.get('/api/users')
    this.setState({users: data})
  }
  render() {
    return (
      <div>
        <h1>LEADERBOARD</h1>
        <table>
          <tbody>
            <tr>
              <th>Rank:</th>
              <th>Name:</th>
              <th>Score:</th>
            </tr>
            {this.state.users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, null)(Leaderboard)
