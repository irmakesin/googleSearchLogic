import React from 'react'
import './assets/styles/index.scss'
import PropTypes from 'prop-types'

const SearchBar = ({ searchValue, searchValueChange }) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search anything"
        value={searchValue}
        onChange={searchValueChange}
      />
      <button className="search-bar__button">Search</button>
    </div>
  )
}

SearchBar.propTypes = {
  searchValue: PropTypes.string,
  searchValueChange: PropTypes.array
}

export default SearchBar
