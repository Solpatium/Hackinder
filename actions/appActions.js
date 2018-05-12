export const atLogin = (userData) => {
  return {
    type: 'ADD_USER_DATA',
    payload: userData
  }
}