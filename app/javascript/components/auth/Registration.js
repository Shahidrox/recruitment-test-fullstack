import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authenticate } from './Auth'
import { useHistory, Link } from "react-router-dom"
import toast from 'react-hot-toast';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null
    };
  }


  handleSubmit() {
    const { name, email, password, passwordConfirmation } = this.state
    const fb = new FormData()
    fb.append('name', name)
    fb.append('email', email)
    fb.append('password', password)
    fb.append('password_confirmation', passwordConfirmation)
    fetch('/api/v1/user', {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: fb
    })
    .then(res => {
      res.json()
      toast.success('Successfully registered!')
    })
    .then(json => {
      console.log(json)
      console.log(document.cookie)
    })
  }

  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
      <div className="account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card shadow-none">
                <div className="card-body p-3">
                  <div className="text-center w-75 m-auto">
                    <div className="auth-logo">
                      <Link className="logo logo-dark text-center" to="/auth/sign_up">
                        <span className="logo-lg">
                          <img src="/assets/logo-dark.png" alt="" height="22"/>
                        </span>
                      </Link>

                      <Link className="logo logo-light text-center" to="/auth/sign_up">
                        <span className="logo-lg">
                          <img src="/assets/logo-light.png" alt="" height="22"/>
                        </span>
                      </Link>
                    </div>
                    <p className="text-muted mb-4 mt-3">Don't have an account? Create your account, it takes less than a minute</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input className="form-control" type="text" placeholder="Enter your name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input className="form-control" type="email" placeholder="Enter your email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group input-group-merge">
                      <input type="password" className="form-control" placeholder="Enter your password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                      <div className="input-group-text" data-password="false">
                        <span className="password-eye"></span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password Confirmation</label>
                    <div className="input-group input-group-merge">
                      <input type="password" className="form-control" placeholder="password confirmation" value={this.state.passwordConfirmation} onChange={(e) => this.setState({ passwordConfirmation: e.target.value })} />
                      <div className="input-group-text" data-password="false">
                        <span className="password-eye"></span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="checkbox-signup" />
                      <label className="form-check-label" >I accept <a href="#" className="text-dark">Terms and Conditions</a></label>
                    </div>
                  </div>
                  <div className="text-center d-grid">
                    <input className="btn btn-success" type="submit" value="Signup" onClick={this.handleSubmit.bind(this)} />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="text-muted">Already have account?
                    <Link className="link-dark text-decoration-underline ms-1" to="/auth/sign_in">
                      <b>Sign In</b>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { loading, isAuthenticated } = auth
  return {
    loading,
    isAuthenticated
  }
}

export default connect(mapStateToProps)(Signup)