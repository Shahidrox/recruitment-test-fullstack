import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, useHistory, Link } from "react-router-dom"

class NewArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title:     '',
      is_publish: true,
      publish_date: '',
      content:   '',
      image:     '',
      redirect: false
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { title, is_publish, publish_date, content, image } = this.state
    const { auth } = this.props
    const data = {
      title, is_publish, publish_date, content, image
    }
    axios({
      url: '/api/v1/articles',
      method: 'POST',
      headers: {
        'access-token': auth.accessToken,
        'client': auth.client,
        'uid': auth.uid,
        'expiry': auth.expiry,
        'token-type': 'Bearer'
      },
      data
    }).then(response => {
      this.setState({ redirect: true })
    }).catch(error => {
      // if (error.response && error.response.status === 401) {
      //   this.props.dispatch(expireAuthentication())
      // }
      console.log(error)
    })
  }
  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="/user/article" />
    }
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">New Artical</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" required value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} className="form-control"/>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea className="form-control" required value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} rows="5"></textarea>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Image Url</label>
                            <input type="text" value={this.state.image} onChange={(e) => this.setState({ image: e.target.value })} className="form-control"/>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Publish date</label>
                            <input type="date" required value={this.state.publish_date} onChange={(e) => this.setState({ publish_date: e.target.value })} className="form-control"/>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Publish</label>
                            <select value={this.state.is_publish} onChange={(e) => this.setState({ is_publish: e.target.value })} className="form-select">
                              <option value='true'>yes</option>
                              <option value='false'>no</option>
                            </select>
                          </div>
                        </div>
                        <div className="button-list">
                          <button type="submit" className="btn btn-primary waves-effect waves-light">Submit</button>
                          <Link to="/user/article" className="btn btn-secondary waves-effect">
                            Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
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
  return { auth }
}
export default connect(mapStateToProps)(NewArticle)