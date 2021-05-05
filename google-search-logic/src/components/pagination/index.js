import React from 'react'
import './assets/index.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: props.list,
      currentPage: 1,
      todosPerPage: 7
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.props.list) {
      this.setState({ todos: this.props.list })
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  handleOnNextClick = (event) => {
    this.setState((prevState) => ({ currentPage: ++prevState.currentPage }))
    event.preventDefault()
  }

  handleOnPreviousClick = (event) => {
    this.setState((prevState) => ({ currentPage: --prevState.currentPage }))
    event.preventDefault()
  }

  handleOnFirstClick = () => {
    this.setState({
      currentPage: 1
    })
  }

  handleTakeFirstAndLastThree = (pageNumbers) => {
    let renderFirstNumbers
    let renderLastNumbers
    let firstThree
    if (this.state.currentPage < 4) {
      firstThree = [1, 2, 3]
    } else {
      firstThree = pageNumbers.slice(this.state.currentPage - 2, this.state.currentPage + 1)
    }
    renderFirstNumbers = firstThree.map((number) => {
      return (
        <li
          className={classNames('pagination__routes__list__item', {
            'pagination__routes__list__item--active': number === this.state.currentPage
          })}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      )
    })
    let lastThree
    if (this.state.currentPage === pageNumbers.length) {
      lastThree = []
    } else if (this.state.currentPage === pageNumbers.length - 1) {
      lastThree = []
    } else if (this.state.currentPage === pageNumbers.length - 2) {
      lastThree = [pageNumbers.length]
    } else if (this.state.currentPage === pageNumbers.length - 3) {
      lastThree = [pageNumbers.length - 1, pageNumbers.length]
    } else {
      lastThree = pageNumbers.slice(pageNumbers.length - 3, pageNumbers.length)
    }
    renderLastNumbers = lastThree.map((number) => {
      return (
        <li
          className={classNames('pagination__routes__list__item', {
            'pagination__routes__list__item--active': number === this.state.currentPage
          })}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      )
    })

    const firstThreeDots = [
      <li className={classNames('pagination__routes__list__item--dots')} key="1...">
        ...
      </li>
    ]
    const lastThreeDots = [
      <li className={classNames('pagination__routes__list__item--dots')} key="2...">
        ...
      </li>
    ]
    const first = [
      <li
        className={classNames('pagination__routes__list__item')}
        key="1"
        onClick={this.handleOnFirstClick}
      >
        1
      </li>
    ]
    if (this.state.currentPage > pageNumbers.length - 4) {
      return first.concat(firstThreeDots).concat(renderFirstNumbers).concat(renderLastNumbers)
    } else if (this.state.currentPage > 3) {
      return first
        .concat(firstThreeDots)
        .concat(renderFirstNumbers)
        .concat(lastThreeDots)
        .concat(renderLastNumbers)
    } else {
      return renderFirstNumbers.concat(lastThreeDots).concat(renderLastNumbers)
    }
  }

  render() {
    const { todos, currentPage, todosPerPage } = this.state

    const indexOfLastTodo = currentPage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    const currentTodos = todos && todos.length > 0 && todos.slice(indexOfFirstTodo, indexOfLastTodo)

    const renderTodos =
      currentTodos &&
      currentTodos.map((todo, index) => {
        return todo
      })

    const pageNumbers = []
    if (todos) {
      for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i)
      }
    }

    const renderPageNumbers =
      pageNumbers.length > 6
        ? this.handleTakeFirstAndLastThree(pageNumbers)
        : pageNumbers.map((number) => {
            return (
              <li
                className={classNames('pagination__routes__list__item', {
                  'pagination__routes__list__item--active': number === this.state.currentPage
                })}
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </li>
            )
          })

    return (
      <div className="pagination">
        <ul>{renderTodos}</ul>
        <div className="pagination__routes">
          {this.state.currentPage !== 1 && renderPageNumbers.length > 0 && (
            <button className="pagination__routes__button" onClick={this.handleOnPreviousClick}>
              Previous
            </button>
          )}
          <ul className="pagination__routes__list" id="page-numbers">
            {renderPageNumbers}
          </ul>
          {this.state.currentPage !== pageNumbers.length && renderPageNumbers.length > 0 && (
            <button className="pagination__routes__button" onClick={this.handleOnNextClick}>
              Next
            </button>
          )}
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  list: PropTypes.array
}

export default Pagination
