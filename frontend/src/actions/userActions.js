import axios from 'axios'
import {
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAILED,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/constants'

export const loginUser = (email, password) => async (dispatch) => {
  const credentials = { email, password }
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`${REACT_APP_SERVER_URL}/api/users/login`, credentials, config)

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  document.location.href = '/login'
}

export const registerUser =
  (name, email, password) => async (dispatch, getState) => {
    const credentials = { name, email, password }
    try {
      dispatch({ type: USER_REGISTER_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(`${REACT_APP_SERVER_URL}/api/users`, credentials, config)

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

      localStorage.setItem('userInfo', JSON.stringify(data))

      //Create fav album and playlist album for user
      const {
        userLogin: { userInfo },
      } = getState()

      const config2 = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`${REACT_APP_SERVER_URL}/api/favourites`, {}, config2)
      await axios.post(`${REACT_APP_SERVER_URL}/api/playlists`, {}, config2)
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutUser())
    }
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${REACT_APP_SERVER_URL}/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logoutUser())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAILED,
      payload: message,
    })
  }
}
