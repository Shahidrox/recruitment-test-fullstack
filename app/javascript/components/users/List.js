import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory, Link } from "react-router-dom"

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  getUsersData() {
    const { auth } = this.props
    const list = []
    axios({
      url: `/api/v1/users`,
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid
      }
    }).then(res => {
      const data = res.data
      if(data.success){
        data.users.forEach( (user, i) => {
          list.push(
            <div key={user.id} className="col-xl-3 col-md-6">
              <div className="card text-center">
                <div className="card-body">
                  <img src={user.image} className="rounded-circle avatar-lg img-thumbnail bg-transparent" alt="profile-image"/>
                  <div className="mt-3">
                    <h4 className="mb-1">{user.name}</h4>
                    <p className="text-muted mb-2"> <span> {user.location} </span></p>
                    <p className="text-muted">{user.about_me}</p>
                  </div>
                  <div className="row mt-3 g-3">
                    <div className="col-6">
                      <Link className="btn btn-light w-100" to="/users/details">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6"></div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
      this.setState({list})
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.getUsersData()
  }

  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Members</h4>
                </div>
              </div>
            </div>
            <div className="row">
              {this.state.list}
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <script>document.write(new Date().getFullYear())</script>2021 © Code
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return { auth }
}
export default connect(mapStateToProps)(List)