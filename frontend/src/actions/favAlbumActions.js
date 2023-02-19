import axios from 'axios'
import {
  FAV_ALBUM_ADD_FAILED,
  FAV_ALBUM_ADD_REQUEST,
  FAV_ALBUM_ADD_SUCCESS,
  FAV_ALBUM_REMOVE_FAILED,
  FAV_ALBUM_REMOVE_REQUEST,
  FAV_ALBUM_REMOVE_SUCCESS,
  FAV_ALBUM_DETAILS_FAILED,
  FAV_ALBUM_DETAILS_REQUEST,
  FAV_ALBUM_DETAILS_SUCCESS,
} from '../constants/constants'

const addToFav = (movieTitle, songName) => async (dispatch, getState) => {
  const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/albums/${movieTitle}/${songName}`)

  const favSong = {
    movieTitle: data.movieTitle,
    moviePoster: data.moviePoster,
    songName: data.songName,
    songFile: data.songFile,
    singers: data.singers,
    duration: data.duration,
  }
  try {
    dispatch({ type: FAV_ALBUM_ADD_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`${REACT_APP_SERVER_URL}/api/favourites`, favSong, config)

    dispatch({ type: FAV_ALBUM_ADD_SUCCESS })
  } catch (error) {
    dispatch({
      type: FAV_ALBUM_ADD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const removefromFav = (songName) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAV_ALBUM_REMOVE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`${REACT_APP_SERVER_URL}/api/favourites/${songName}`, config)

    dispatch({ type: FAV_ALBUM_REMOVE_SUCCESS })
  } catch (error) {
    dispatch({
      type: FAV_ALBUM_REMOVE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const detailsFavAlbum = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAV_ALBUM_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${REACT_APP_SERVER_URL}/api/favourites`, config)

    dispatch({ type: FAV_ALBUM_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FAV_ALBUM_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export { addToFav, detailsFavAlbum, removefromFav }
