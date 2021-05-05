import React, { Component } from 'react'
import TesodevLogo from '../../assets/images/tesodev-logo.png'
import './assets/index.scss'
import SearchBar from '../searchbar'
import SearchList from '../searchList'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchValue: ''
    }
  }
  handleSearchValueChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    return (
      <div className="home">
        <div className="home__logo">
          <img src={TesodevLogo} alt="tesodevlogo" />
        </div>
        <div className="home__title">
          <h1>Search web app</h1>
        </div>
        <div className="home__search">
          <SearchBar
            searchValue={this.state.searchValue}
            searchValueChange={this.handleSearchValueChange}
          />
          {this.state.searchValue && (
            <div className="home__search-results">
              <SearchList
                searchValue={this.state.searchValue}
                isShowMoreButtonVisible
                hasListLimit
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
