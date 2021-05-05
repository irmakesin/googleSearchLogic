import React, { Component } from 'react'
import TesodevLogo2 from '../../assets/images/tesodev-logo-2.png'
import SearchBar from '../searchbar'
import SearchList from '../searchList'
import './assets/styles/index.scss'
import OrderSelection from '../orderSelection'
import { ORDER_OPTIONS } from '../../constants'

class SearchMore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: props.match.params.searchValue
    }
  }

  handleSearchValueChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  handleOrderSelectionChange = (event) => {
    const { value } = event.target
    let [orderValue, orderType] = this.splitValueAndType(value)
    this.setState({ orderType, orderValue })
  }

  splitValueAndType = (value) => {
    return value.split(' ')
  }

  render() {
    return (
      <div className="search-more">
        <div className="search-more__header">
          <div className="search-more__header__logo">
            <img src={TesodevLogo2} alt="tesodevlogo" />
          </div>
          <SearchBar
            searchValue={this.state.searchValue}
            searchValueChange={this.handleSearchValueChange}
          />
        </div>

        <div className="search-more__search-list">
          {this.state.searchValue && (
            <div className="search-more__search-list__selection">
              <OrderSelection onChange={this.handleOrderSelectionChange} options={ORDER_OPTIONS} />
            </div>
          )}
          <SearchList
            searchValue={this.state.searchValue}
            orderType={this.state.orderType}
            orderValue={this.state.orderValue}
            hasPagination
          />
        </div>
      </div>
    )
  }
}

export default SearchMore
