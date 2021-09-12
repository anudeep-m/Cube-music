import axios from 'axios'
import {
  ALBUM_LIST_REQUEST,
  ALBUM_LIST_SUCCESS,
  ALBUM_LIST_FAILED,
  ALBUM_DETAILS_REQUEST,
  ALBUM_DETAILS_SUCCESS,
  ALBUM_DETAILS_FAILED,
  SONG_DETAILS_REQUEST,
  SONG_DETAILS_SUCCESS,
  SONG_DETAILS_FAILED,
  ALBUM_ADD_REQUEST,
  ALBUM_ADD_SUCCESS,
  ALBUM_ADD_FAILED,
  ALBUM_DELETE_REQUEST,
  ALBUM_DELETE_SUCCESS,
  ALBUM_DELETE_FAILED,
  ALBUM_EDIT_REQUEST,
  ALBUM_EDIT_SUCCESS,
  ALBUM_EDIT_FAILED,
  ALBUM_DETAILS_FA_REQUEST,
  ALBUM_DETAILS_FA_SUCCESS,
  ALBUM_DETAILS_FA_FAILED,
  SONG_DELETE_REQUEST,
  SONG_DELETE_SUCCESS,
  SONG_DELETE_FAILED,
  SONG_ADD_REQUEST,
  SONG_ADD_SUCCESS,
  SONG_ADD_FAILED,
  SONG_EDIT_REQUEST,
  SONG_EDIT_SUCCESS,
  SONG_EDIT_FAILED,
  SONG_DETAILS_FA_REQUEST,
  SONG_DETAILS_FA_SUCCESS,
  SONG_DETAILS_FA_FAILED,
} from '../constants/constants'

const listAlbums = () => async (dispatch) => {
  try {
    dispatch({ type: ALBUM_LIST_REQUEST })

    const { data } = await axios.get(`/api/albums`)

    dispatch({ type: ALBUM_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALBUM_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const detailsAlbum = (movieTitle) => async (dispatch) => {
  try {
    dispatch({ type: ALBUM_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/albums/${movieTitle}`)

    dispatch({ type: ALBUM_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALBUM_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const detailsSong = (movieTitle, songName) => async (dispatch) => {
  try {
    dispatch({ type: SONG_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/albums/${movieTitle}/${songName}`)

    dispatch({ type: SONG_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SONG_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//For Admin By IDs
const detailsAlbumFA = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ALBUM_DETAILS_FA_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/albums/admin/movie/${movieId}`,
      config
    )

    dispatch({ type: ALBUM_DETAILS_FA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALBUM_DETAILS_FA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const albumAdd = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALBUM_ADD_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/albums/admin`, {}, config)

    dispatch({ type: ALBUM_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALBUM_ADD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const albumEdit =
  (movieId, movieTitle, moviePoster) => async (dispatch, getState) => {
    const album = { movieTitle, moviePoster }
    try {
      dispatch({ type: ALBUM_EDIT_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.put(`/api/albums/admin/movie/${movieId}`, album, config)

      dispatch({ type: ALBUM_EDIT_SUCCESS })
    } catch (error) {
      dispatch({
        type: ALBUM_EDIT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

const albumDelete = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ALBUM_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/albums/admin/movie/${movieId}`, config)

    dispatch({ type: ALBUM_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ALBUM_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const detailsSongFA = (movieId, songId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SONG_DETAILS_FA_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/albums/admin/song/${movieId}/${songId}`,
      config
    )

    dispatch({ type: SONG_DETAILS_FA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SONG_DETAILS_FA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const songAdd = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SONG_ADD_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/albums/admin/movie/${movieId}`,
      {},
      config
    )

    dispatch({ type: SONG_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SONG_ADD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const songEdit =
  (movieId, songId, songName, songFile, singers, duration) =>
  async (dispatch, getState) => {
    const song = { songName, songFile, singers, duration }
    try {
      dispatch({ type: SONG_EDIT_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/albums/admin/song/${movieId}/${songId}`,
        song,
        config
      )

      dispatch({ type: SONG_EDIT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: SONG_EDIT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

const songDelete = (movieId, songId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SONG_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/albums/admin/song/${movieId}/${songId}`, config)

    dispatch({ type: SONG_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: SONG_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export {
  listAlbums,
  detailsAlbum,
  detailsSong,
  detailsAlbumFA,
  albumAdd,
  albumEdit,
  albumDelete,
  detailsSongFA,
  songAdd,
  songEdit,
  songDelete,
}
