import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, useHistory, Link } from "react-router-dom"

class ArticaleEdit extends React.Component {
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

  getUsersArticle() {
    const { id } = this.props.match.params
    axios.get(`/api/v1/articles/${id}?screen=edit`,{})
    .then(res => {
      const data = res.data
      if(data.success){
        const title        = data.articles.title
        const is_publish   = data.articles.is_publish
        const publish_date = data.articles.publish_dt
        const content      = data.articles.content
        const image        = data.articles.image
        this.setState({title})
        this.setState({is_publish})
        this.setState({publish_date})
        this.setState({content})
        this.setState({image})
      }
    }).catch(error => {
      console.log(error)
    })
  }

    handleSubmit(e) {
      e.preventDefault()
      const { id } = this.props.match.params
      const { title, is_publish, publish_date, content, image } = this.state
      const { auth } = this.props
      const data = {
        title, is_publish, publish_date, content, image
      }
      axios({
        url: `/api/v1/articles/${id}`,
        method: 'PUT',
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
        console.log(error)
        // if (error.response && error.response.status === 401) {
          // this.props.dispatch(expireAuthentication())
        // }
      })
    }
  componentDidMount(){
    this.getUsersArticle()
  }

  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Edit Artical</h4>
                </div>
              </div>
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
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
                            <select className="form-select" value={this.state.is_publish} onChange={(e) => this.setState({ is_publish: e.target.value })}>
                              <option value='true'>yes</option>
                              <option value='false'>no</option>
                            </select>
                          </div>
                        </div>
                        <div className="button-list">
                          <button type="submit" className="btn btn-primary waves-effect waves-light">Update</button>
                          <Link to="/user/article" className="btn btn-secondary waves-effect">
                            Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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

export default connect(mapStateToProps)(ArticaleEdit)