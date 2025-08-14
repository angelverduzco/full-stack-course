import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return action.payload
    },
    clearMessage: (state, action) => {
      return null
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}

export default notificationSlice.reducer