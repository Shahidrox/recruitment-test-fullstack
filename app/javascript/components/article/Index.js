import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory, Link } from "react-router-dom"
import toast from 'react-hot-toast';

class ArticlesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: [],
      title: '',
      publish_date: ''
    };
  }

  handleClick(e) {
    e.preventDefault()
    const { id } = e.target.dataset
    const { title, publish_date } = this.state
    console.log(title)
    this.getUsersArticles(id, title, publish_date)
  }
  
  getUsersArticles(page_no=1, title='', publish_date='') {
    const list = []
    const page = []
    const pagenolist = []
    axios({
      url: `/api/v1/articles?page=${page_no}&title=${title}&publish_date=${publish_date}`,
      method: 'GET'
    }).then(res => {
      const data       = res.data
      if(data.success){
        const pagination = data.pagination
        data.articles.forEach( (article, i) => {
          list.push( 
            <div key={article.id} className="border border-light p-2 mb-3">
              <div className="d-flex align-items-start">
                <img className="me-2 avatar-lg rounded-circle" src={article.profile_pc} alt="image"/>
                <div className="w-100">
                  <h5 className="m-0">{article.user_nm}</h5>
                  <p className="text-muted"><small>{article.publish_date}</small></p>
                </div>
              </div>
              <h2>{article.title}</h2>
              <h4>{article.content}</h4>
              <div className="mt-2">
                <Link className="btn btn-sm btn-link text-muted" to={`/articles/${article.id}`}>
                  <i className="mdi mdi-reply"></i> Details
                </Link>
                <a className="btn btn-sm btn-link text-danger">
                  <i className="mdi mdi-heart"></i> View ({article.view_count})
                </a>
              </div>
              <div className="mt-2"></div>
            </div>
          )
        })
        if(pagination.next){
          page.push(
            <a data-id={pagination.next} key={pagination.next} className="btn btn-primary rounded-pill waves-effect waves-light" href="#" onClick={this.handleClick.bind(this)}>
              {pagination.current} of {pagination.total_pages}
            </a>
          )
        }else{
          page.push(
            <a data-id={pagination.next} key={pagination.total_pages} className="btn btn-light rounded-pill waves-effect" href="#">
              {pagination.current} of {pagination.total_pages}
            </a>
          )
        }
        this.setState({list})
        this.setState({page})
      }
    }).catch(error => {
      console.log(error)
      toast.success('You don\'t have the articles')
    })
  }

  componentDidMount(){
    this.getUsersArticles()
  }

  render(){
    const { isAuthenticated } = this.props
    return (
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-9">
                <div className="page-title-box">
                  <h4 className="page-title">Articles</h4>
                  {isAuthenticated &&
                    <Link to="/user/newarticle" className="btn btn-primary waves-effect waves-light">
                      <i className="mdi mdi-plus"></i> Add Article
                    </Link>
                  }
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-9">
                <div className="card">
                  <div className="card-body">
                    {this.state.list}
                    <div className="text-center">
                      {this.state.page}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <h4 className="header-title mb-3">Search <i className="mdi mdi-adjust ms-1"></i></h4>
                    <div className="list-group">
                      <label className="form-label">Articles</label>
                      <input type="text" id="simpleinput" className="form-control" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })}/>
                      <label className="form-label">Publish date</label>
                      <input className="form-control" id="example-date" type="date" name="date" value={this.state.publish_date} onChange={(e) => this.setState({ publish_date: e.target.value })} />
                      <label className="form-label"></label>
                      <button type="button" className="btn btn-success rounded-pill waves-effect waves-light" onClick={this.handleClick.bind(this)}>Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isAuthenticated &&
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
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return { isAuthenticated }
}
export default connect(mapStateToProps)(ArticlesList)