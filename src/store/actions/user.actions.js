import { userService } from "../../services/user.service"

export function sendCoins(amount) {
    console.log('amount:', amount)
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SEND_COINS', amount})
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function transferCoins(amount, contact) {
    return async (dispatch, getState) => {
      try {
        const updatedUser = userService.transferCoins(amount, contact)
        dispatch({ type: 'SET_USER', user: updatedUser })
      } catch (error) {
        console.log('error:', error)
      }
    }
  }