export const atLogin = (userData) => {
  return {
    type: 'ADD_USER_DATA',
    payload: userData
  }
}

export const atSwipe = (card) => {
  return {
    type: 'ADD_AFTER_SWIPE',
    payload: card
  }
}