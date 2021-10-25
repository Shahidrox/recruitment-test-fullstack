import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory, Link } from "react-router-dom"

class ShowArticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  getUsersArticle() {
    const { id } = this.props.match.params
    const list = []
    axios.get(`/api/v1/articles/${id}`,{})
    .then(res => {
      const data = res.data
      if(data.success){
          console.log(data.articles)
          list.push(
            <div key={data.articles.id} className="row">
              <div className="col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <img src={data.articles.profile_pc} alt="team-member" className="avatar-lg d-block img-thumbnail rounded-circle"/>
                      <div className="w-100 ms-3">
                        <h4 className="mt-0">{data.articles.user_nm}</h4>
                        <p className="mb-0">-</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-body">
                    <div className="border border-light p-2 mb-3">
                      <div className="d-flex align-items-start">
                        <div className="w-100">
                          <h2 className="m-0">{data.articles.title}</h2>
                          <p className="text-muted"><small>{data.articles.publish_date}</small></p>
                        </div>
                      </div>
                      {data.articles.image &&
                        <img src={data.articles.image} alt="post-img" className="rounded" height="60"/>
                      }
                      <h4>{data.articles.content}</h4>
                      <div className="mt-2">
                        <Link className="btn btn-sm btn-link text-muted" to="/">
                          <i className="mdi mdi-reply"></i> Back
                        </Link>
                        <a className="btn btn-sm btn-link text-danger">
                          <i className="mdi mdi-heart"></i> View ({data.articles.view_count})
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        this.setState({list})
      }
    }).catch(error => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.getUsersArticle()
  }
  render(){
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Details</h4>
                </div>
              </div>
            </div>
            {this.state.list}
          </div>
        </div>
      </div>
    )
  }
}
export default ShowArticle