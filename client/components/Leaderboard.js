import React, {Component} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import {Container, Header, Table} from 'semantic-ui-react'

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
      <span id="leaderboard">
        <Table color="grey" inverted size="small" collapsing={true}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.users.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell width={25} collapsing={true}>
                  {user.userName}
                </Table.Cell>
                <Table.Cell width="ten">{user.score}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </span>
    )
  }
}

export default connect(null, null)(Leaderboard)
