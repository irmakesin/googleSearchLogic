import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/home'
import SearchMore from './components/searchMore'
import './assets/styles/index.scss'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/searchMore/:searchValue" component={SearchMore} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
