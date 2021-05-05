export const compare = (a, b, value) => {
  if (a[value] < b[value]) {
    return -1
  }
  if (a[value] > b[value]) {
    return 1
  }
  return 0
}

export const dynamicSort = (property, orderValue) => {
  const isReverse = orderValue === 'descending'
  return function (a, b) {
    if (a[property].toLowerCase() < b[property].toLowerCase()) {
      return isReverse ? 1 : -1
    }
    if (a[property].toLowerCase() > b[property].toLowerCase()) {
      return isReverse ? -1 : 1
    }
    return 0
  }
}
