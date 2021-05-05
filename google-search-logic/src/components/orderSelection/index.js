import React from 'react'
import OrderSvg from '../../assets/svgs/iconfinder_sort3_1542257 1.svg'
import './assets/index.scss'
import PropTypes from 'prop-types'

const OrderSelection = ({ onChange, options }) => {
  const renderOptions = () => {
    return options.map((option) => (
      <option className="order-selection__list__item" key={option.value} value={option.value}>
        {option.label}
      </option>
    ))
  }
  return (
    <div className="order-selection__wrapper">
      <img src={OrderSvg} alt="OrderSvg" />
      <select className="order-selection__list" onChange={onChange}>
        {renderOptions()}
      </select>
    </div>
  )
}

OrderSelection.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default OrderSelection
