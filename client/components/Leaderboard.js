import React, {Component} from 'react'
import {connect} from 'react-redux'

const dummyData = [
  {
    userName: 'User1',
    score: 73
  },
  {
    userName: 'User2',
    score: 82
  },
  {
    userName: 'User3',
    score: 93
  },
  {
    userName: 'User4',
    score: 61
  },
  {
    userName: 'User5',
    score: 41
  }
]

class Leaderboard extends Component {
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
            {dummyData.sort().map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.userName}</td>
                <td>{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(null, null)(Leaderboard)
