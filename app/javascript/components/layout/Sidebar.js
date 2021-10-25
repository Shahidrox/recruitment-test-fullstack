import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signout } from '../auth/Auth'


class Sidebar extends React.Component {
  signout(e) {
    e.preventDefault()
    this.props.dispatch(signout())
  }

  render() {
    const { isAuthenticated } = this.props
    return (
      <>
      { isAuthenticated && 
        <div className="left-side-menu">
          <div className="h-100" data-simplebar>
            <div id="sidebar-menu">
              <ul id="side-menu">
                <li className="menu-title">Navigation</li>
                <li>
                  <Link to="/">
                    <i className="fe-airplay"></i>
                    <span> Dashboard </span>
                  </Link>
                </li>
                <li className="menu-title mt-2">Apps</li>
                <li>
                  <Link to="/users/list">
                    <i className="fe-users"></i>
                    <span> Members </span>
                  </Link>
                </li>
                <li>
                  <Link to="/user/article">
                    <i className="fe-book-open"></i>
                    <span> My Article </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      }
      </>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated }
}

export default connect(mapStateToProps)(Sidebar)