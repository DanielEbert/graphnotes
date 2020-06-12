import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import axios from 'axios'
//import M from 'materialize-css'

import Nav from './components/nav'
import Register from './components/accounts/Register'
import Login from './components/accounts/Login'
import { parseJwt } from './utils/auth'
import Notes from './Notes'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        'authorized': false
    };

    if (localStorage.getItem('accessToken') != null) {
      if (parseJwt(localStorage.getItem('accessToken')) > (new Date()).getTime() + 360) {
        this.setState({'authorized': true})
      }
      else if (localStorage.getItem('sessionToken') != null) {
        //M.toast({html: 'Logging in', displayLength: 1500, classes: "light-green"})
        this.getAccessToken()
      }
    }
  }

  // make this wrapper function for authorized requests
  doSomething = () =>  {
    axios.post('http://auth.iuqs.ml/doSomething', {
      'blablabla': 'aaaa'
    }, {
      headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
    })
    .then(res => console.log(res))
    .catch(res => {
      if (res.response.status === 401) {
        this.getAccessToken(this.doSomething)
      }
    })
  }

  getSessionToken = (id, pw) => {
    axios.post('https://4td2etwt48.execute-api.eu-central-1.amazonaws.com/v1/login', {
      'id': id,
      'pw': pw
    })
    .then(res => {
      console.log(res)
      localStorage.setItem('id', id)
      localStorage.setItem('sessionToken', res.data)
      this.getAccessToken()
    })
    .catch(res => {
      //M.toast({html: 'Wrong Username or Password', classes: "red"})
      console.log("Err " + res)
    })
  }

  getAccessToken = (invokeAfter = null) => {
    axios.post('https://4td2etwt48.execute-api.eu-central-1.amazonaws.com/v1/request-access-token', {
      'id':localStorage.getItem('id'),
      'sessiontoken': localStorage.getItem('sessionToken')
    })
    .then(res => {
      localStorage.setItem('accessToken', res.data)
      if (!this.state.authorized)
        this.setState({'authorized': true})
      if (invokeAfter != null) {
        invokeAfter()
      }
    })
    .catch(res => {
      console.log("shouldn't happen: " + res)
    })
  }

  register = (id, pw) => {
    axios.post('https://4td2etwt48.execute-api.eu-central-1.amazonaws.com/v1/register', {
      'id': id,
      'pw': pw
    })
    .then(res => {
      localStorage.setItem('id', id)
      localStorage.setItem('sessionToken', res.data)
      this.getAccessToken()
    })
    .catch(res => {
      //M.toast({html: 'Sth failed', classes: "red"})
      console.log("Err " + res)
    })
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('id')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('sessionToken')
    this.setState({'authorized': false})
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          {this.state.authorized ? 
            <Switch>
              <Route path="/" component={() => 
                <Notes getAccessToken={this.getAccessToken} logout={this.logout}/>
              }/>
              <Route component={({history}) => {history.push('/'); return "";}}/>
            </Switch> : 
            <React.Fragment>
              <Nav authorized={this.state.authorized} logout={this.logout}/>
              <Switch>
                <Route path="/register" component={() => <Register register={this.register}/>}/>
                <Route path="/login" component={() => <Login getSessionToken={this.getSessionToken}/>}/>
                <Route component={({history}) => {history.push('/register'); return "";}}/>
              </Switch>
            </React.Fragment>
          }
        </React.Fragment>
      </Router>
    );
  }
}

export default App;