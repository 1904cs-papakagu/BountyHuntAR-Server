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
      // <span id="leaderboard">
      <Container
        style={{
          display: 'flex',
          margin: '1em',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Table color="grey" inverted>
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
                <Table.Cell collapsing={true}>{index + 1}</Table.Cell>
                <Table.Cell collapsing={true}>{user.userName}</Table.Cell>
                <Table.Cell collapsing={true}>{user.score}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default connect(null, null)(Leaderboard)
