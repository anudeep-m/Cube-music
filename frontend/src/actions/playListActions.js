import axios from 'axios'
import {
  PL_ALBUM_ADD_FAILED,
  PL_ALBUM_ADD_REQUEST,
  PL_ALBUM_ADD_SUCCESS,
  PL_ALBUM_DETAILS_FAILED,
  PL_ALBUM_DETAILS_REQUEST,
  PL_ALBUM_DETAILS_SUCCESS,
  PL_ALBUM_LIST_FAILED,
  PL_ALBUM_LIST_REQUEST,
  PL_ALBUM_LIST_SUCCESS,
  PL_ALBUM_REMOVE_FAILED,
  PL_ALBUM_REMOVE_REQUEST,
  PL_ALBUM_REMOVE_SUCCESS,
  PL_SONG_ADD_FAILED,
  PL_SONG_ADD_REQUEST,
  PL_SONG_ADD_SUCCESS,
  PL_SONG_REMOVE_FAILED,
  PL_SONG_REMOVE_REQUEST,
  PL_SONG_REMOVE_SUCCESS,
} from '../constants/constants'

const addPLtoPLA = (playListTitle) => async (dispatch, getState) => {
  const playList = { playListTitle }
  try {
    dispatch({ type: PL_ALBUM_ADD_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/playlists`, playList, config)

    dispatch({ type: PL_ALBUM_ADD_SUCCESS })
  } catch (error) {
    dispatch({
      type: PL_ALBUM_ADD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const removePLfromPLA = (playListTitle) => async (dispatch, getState) => {
  try {
    dispatch({ type: PL_ALBUM_REMOVE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/playlists/${playListTitle}`, config)

    dispatch({ type: PL_ALBUM_REMOVE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PL_ALBUM_REMOVE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const addSongToPL =
  (movieTitle, songName, playListTitle) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/albums/${movieTitle}/${songName}`)

    const plSong = {
      movieTitle: data.movieTitle,
      moviePoster: data.moviePoster,
      songName: data.songName,
      songFile: data.songFile,
      singers: data.singers,
      duration: data.duration,
    }
    try {
      dispatch({ type: PL_SONG_ADD_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.put(`/api/playlists/${playListTitle}`, plSong, config)

      dispatch({ type: PL_SONG_ADD_SUCCESS })
    } catch (error) {
      dispatch({
        type: PL_SONG_ADD_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

const removeSongFromPL =
  (songName, playListTitle) => async (dispatch, getState) => {
    try {
      dispatch({ type: PL_SONG_REMOVE_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.delete(`/api/playlists/${playListTitle}/${songName}`, config)

      dispatch({ type: PL_SONG_REMOVE_SUCCESS })
    } catch (error) {
      dispatch({
        type: PL_SONG_REMOVE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

const listPlayLists = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PL_ALBUM_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/playlists`, config)

    dispatch({ type: PL_ALBUM_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PL_ALBUM_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const detailsPlayList = (playListTitle) => async (dispatch, getState) => {
  try {
    dispatch({ type: PL_ALBUM_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/playlists/${playListTitle}`, config)

    dispatch({ type: PL_ALBUM_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PL_ALBUM_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export {
  addPLtoPLA,
  removePLfromPLA,
  addSongToPL,
  removeSongFromPL,
  listPlayLists,
  detailsPlayList,
}
