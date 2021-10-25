import React from 'react'
import { 
  BrowserRouter as Router, Switch,
  Route, Redirect } from "react-router-dom"
import { Toaster }  from 'react-hot-toast';

import PrivateRoute from '../routes/PrivateRoute'
import Header       from '../components/layout/Header'
import Sidebar      from '../components/layout/Sidebar'
import Login        from '../components/auth/Login'
import Registration from '../components/auth/Registration'

import ArticleList  from '../components/article/Index'
import Article      from '../components/article/Show'
import Prpfile      from '../components/users/Profile'
import List         from '../components/users/List'
import ArticaleList from '../components/users/ArticaleList'
import NewArticle   from '../components/users/NewArticle'
import ArticaleEdit from '../components/users/ArticaleEdit'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Sidebar />
        <Route exact path="/" component={ArticleList} />
        <Route path="/articles/:id" component={Article} />
        <Route path="/auth/sign_in" component={Login}/>
        <Route path="/auth/sign_up" component={Registration}/>
        <Switch>
          <PrivateRoute exact path="/users/details" component={Prpfile} />
          <PrivateRoute exact path="/users/list" component={List} />
          <PrivateRoute exact path="/user/newarticle" component={NewArticle} />
          <PrivateRoute exact path="/user/article" component={ArticaleList} />
          <PrivateRoute exact path="/user/article/edit/:id" component={ArticaleEdit} />
        </Switch>
        <Toaster position="top-center" reverseOrder={false}/>
      </Router>
    )
  }
}

export default App