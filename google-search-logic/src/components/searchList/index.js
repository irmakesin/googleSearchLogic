import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SEARCH_ITEMS } from '../../constants'
import './assets/styles/index.scss'
import { dynamicSort } from '../../utils'
import Pagination from '../pagination'
import PropTypes from 'prop-types'
import SearchBar from '../searchbar'

class SearchList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  renderItems = () => {
    const { searchValue, orderType, orderValue } = this.props
    if (searchValue) {
      const values = this.findExistingSearches(searchValue)
      const sortedValues = values.sort(dynamicSort(orderValue, orderType))
      let mappedLis = sortedValues.map((value, index) => {
        return (
          <li key={index} className="search-list__results__list__item">
            <span className="search-list__results__list__item__title">{value.title}</span>
            <span className="search-list__results__list__item__date">{value.createdAt}</span>
          </li>
        )
      })
      return this.props.hasListLimit ? mappedLis.slice(0, 3) : mappedLis
    }
  }

  findExistingSearches = (searchValue) => {
    return SEARCH_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  }
  render() {
    const items = this.renderItems()
    return (
      <React.Fragment>
        <div className="search-list__results">
          {items && items.length === 0 && (
            <div className="search-list__results--not-found">Data Not Found</div>
          )}
          {this.props.hasPagination ? (
            <Pagination list={items} />
          ) : (
            <ul className="search-list__results__list">{items}</ul>
          )}
          {items && items.length > 0 && this.props.isShowMoreButtonVisible && (
            <Link
              className="search-list__results__more-button"
              to={{ pathname: '/searchMore/' + this.props.searchValue }}
            >
              <span>Show more...</span>
            </Link>
          )}
        </div>
      </React.Fragment>
    )
  }
}

SearchList.defaultProps = {
  orderType: 'ascending',
  orderValue: 'title',
  hasPagination: false,
  hasListLimit: false,
  isShowMoreButtonVisible: false
}

SearchBar.propTypes = {
  orderType: PropTypes.string,
  orderValue: PropTypes.string,
  hasPagination: PropTypes.bool,
  hasListLimit: PropTypes.bool,
  isShowMoreButtonVisible: PropTypes.bool
}

export default SearchList
