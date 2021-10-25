import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, useHistory, Link } from "react-router-dom"
import toast from 'react-hot-toast';

class ArticaleList extends React.Component {
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
        url: '/api/v1/users/get_article',
        headers: {
          'access-token': auth.accessToken,
          'client':       auth.client,
          'uid':          auth.uid,
          'expiry':       auth.expiry,
          'token-type':   'Bearer'
        }
      }).then(res => {
        const data = res.data
        if(data.success){
          data.articles.forEach( (art, i) => {
            list.push(
              <tr key={i}>
                <th>{art.image}</th>
                <td>{art.title}</td>
                <td>{art.publish_date}</td>
                <td>{art.is_publish}</td>
                <td>{art.content}</td>
                <td>{art.view_count}</td>
                <td>
                  <Link className="dropdown-item notify-item" to={`/user/article/edit/${art.id}`}>
                    <i className="fe-edit"></i>
                    <span className="pro-user-name ms-1">edit</span>
                  </Link>
                  <Link className="dropdown-item notify-item" to={`/articles/${art.id}`}>
                    <i className="fe-eye"></i>
                    <span className="pro-user-name ms-1">show</span>
                  </Link>
                  <a data-id={art.id} href="#" onClick={this.handleClick.bind(this)}>
                    <i className="fe-trash-2"></i>delete
                  </a>
                </td>
              </tr>
            )
          })
          this.setState({list})
        }
      }).catch(error => {
        console.log(error)
      })
  }

  componentDidMount(){
    this.getUsersData()
  }
  deleteUsersData(id){
    const { auth } = this.props
    axios({
      url: `/api/v1/articles/${id}`,
      method: 'DELETE',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid
      }
    }).then(response => {
      toast.success('Successfully Delete!')
      window.location.reload();
    }).catch(error => {
      console.log(error)
    })
  }
  handleClick(e) {
    e.preventDefault()
    const { id } = e.target.dataset
    if (confirm(`Are you ok to delete?`)) {
      this.deleteUsersData(id)
    }
  }

  render() {
    return (
      <div key='1' className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Articles</h4>
                  <Link to="/user/newarticle" className="btn btn-primary waves-effect waves-light">
                    <i className="mdi mdi-plus"></i> Add Article
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead className='table-dark'>
                        <tr>
                          <th>image</th>
                          <th>title</th>
                          <th>publish_date</th>
                          <th>published</th>
                          <th>content</th>
                          <th>view_count</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.list}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
export default connect(mapStateToProps)(ArticaleList)