import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authenticate } from './Auth'
import { useHistory, Link } from "react-router-dom"
import toast from 'react-hot-toast';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit() {
    const { email, password } = this.state
    if(email && password){
      this.props.dispatch(authenticate(email, password))
    }else{
      toast.error('The username or password is incorrect')
    }
  }

  render() {
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="account-pages mt-5 mb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-4">
                <div className="card shadow-none">
                  <div className="card-body p-3">
                    <div className="text-center w-75 m-auto">
                      <div className="auth-logo">
                        <Link className="logo logo-dark text-center" to="/auth/sign_in">
                          <span className="logo-lg">
                            <img src="/assets/logo-dark.png" alt="" height="22"/>
                          </span>
                        </Link>
                        <Link className="logo logo-light text-center" to="/auth/sign_in">
                          <span className="logo-lg">
                            <img src="/assets/logo-light.png" alt="" height="22"/>
                          </span>
                        </Link>
                      </div>
                      <p className="text-muted mb-4 mt-3">Enter your email address and password to access admin panel.</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <input className="form-control" placeholder="Enter your email" type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
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
                    <div className="text-center d-grid">
                      <input className="btn btn-primary" type="submit" value="Log In" onClick={this.handleSubmit.bind(this)} />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 text-center">
                    <p>
                      <Link className="text-muted ms-1" to="/auth/sign_in">
                          Forgot your password?
                      </Link>
                    </p>
                    <p className="text-muted">
                      Don't have an account?
                      <Link className="text-dark text-decoration-underline ms-1" to="/auth/sign_up">
                        <b>Sign Up</b>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps)(Login)