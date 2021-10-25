import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { signout } from '../auth/Auth'
import Login from '../auth/Login'
import { useHistory, Link } from "react-router-dom"
class Header extends React.Component {

  signout(e) {
    e.preventDefault()
    this.props.dispatch(signout())
  }

  render() {
    const { isAuthenticated } = this.props
    return (
    <div className="navbar-custom">
      <div className="container-fluid">
        <ul className="list-unstyled topnav-menu float-end mb-0">
          { isAuthenticated && 
            <li className="dropdown notification-list topbar-dropdown">
              <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src="/assets/users/def.png" alt="user-image" className="rounded-circle"/>
                <span className="pro-user-name ms-1">
                  Static <i className="mdi mdi-chevron-down"></i>
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end profile-dropdown ">
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome !</h6>
                </div>
                
                <Link className="dropdown-item notify-item" to="/users/details">
                  <i className="fe-user"></i>
                  <span className="pro-user-name ms-1">My Account</span>
                </Link>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item notify-item" onClick={this.signout.bind(this)}>
                  <i className="fe-log-out"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          }
          { !isAuthenticated && 
            <li className="notification-list">
              <Link className="nav-link nav-user me-0 waves-effect waves-light" to="/auth/sign_in">
                <i className="fe-users rounded-circle"></i>
                <span className="pro-user-name ms-1">Login</span>
              </Link>
            </li>
          }
        </ul>
        
        <div className="logo-box">
          <Link className="logo logo-dark text-center" to="/">
            <span className="logo-sm">
              <img src="/assets/logo-sm.png" alt="" height="22"/>
            </span>
            <span className="logo-lg">
              <img src="/assets/logo-dark.png" alt="" height="20"/>
            </span>
          </Link>

          <Link className="logo logo-light text-center" to="/">
            <span className="logo-sm">
              <img src="/assets/logo-sm.png" alt="" height="22"/>
            </span>
            <span className="logo-lg">
              <img src="/assets/logo-light.png" alt="" height="20"/>
            </span>
          </Link>
        </div>
        
        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
          <li>
            <a className="navbar-toggle nav-link" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
          </li>
        </ul>
        <div className="clearfix"></div>
      </div>
    </div>
  )
}
}
function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated }
}

export default connect(mapStateToProps)(Header)