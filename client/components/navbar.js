import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container} from 'semantic-ui-react'
const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="navbar">
    <h1>Bounty Hunt-AR</h1>

    <Menu tabular>
      <Menu.Item as={Link} to="/Home">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/about">
        About
      </Menu.Item>
      <Menu.Item as={Link} to="/leaderboard">
        Leader Board
      </Menu.Item>

      {isAdmin ? (
        <Menu.Item as={Link} to="/locations">
          Locations
        </Menu.Item>
      ) : (
        <Container />
      )}

      {isLoggedIn ? (
        <Menu.Item position="right" onClick={handleClick}>
          Logout
        </Menu.Item>
      ) : (
        <Container>
          <Menu.Item position="right" as={Link} to="/login">
            Login
          </Menu.Item>
          <Menu.Item positon="right" as={Link} to="/signup">
            Sign Up
          </Menu.Item>
        </Container>
      )}
    </Menu>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
