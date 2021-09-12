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

export const addPLToPLAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case PL_ALBUM_ADD_REQUEST:
      return { loading: true }
    case PL_ALBUM_ADD_SUCCESS:
      return { loading: false, success: true }
    case PL_ALBUM_ADD_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const removePLFromPLAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case PL_ALBUM_REMOVE_REQUEST:
      return { loading: true }
    case PL_ALBUM_REMOVE_SUCCESS:
      return { loading: false, success: true }
    case PL_ALBUM_REMOVE_FAILED:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const addSongToPLReducer = (state = {}, action) => {
  switch (action.type) {
    case PL_SONG_ADD_REQUEST:
      return { loading: true }
    case PL_SONG_ADD_SUCCESS:
      return { loading: false, success: true }
    case PL_SONG_ADD_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const removeSongFromPLReducer = (state = {}, action) => {
  switch (action.type) {
    case PL_SONG_REMOVE_REQUEST:
      return { loading: true }
    case PL_SONG_REMOVE_SUCCESS:
      return { loading: false, success: true }
    case PL_SONG_REMOVE_FAILED:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const getPlayListsReducer = (state = { playLists: [] }, action) => {
  switch (action.type) {
    case PL_ALBUM_LIST_REQUEST:
      return { loading: true, ...state }
    case PL_ALBUM_LIST_SUCCESS:
      return { loading: false, playLists: action.payload }
    case PL_ALBUM_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getPlayListDetailsReducer = (
  state = { playList: { plSongs: [] } },
  action
) => {
  switch (action.type) {
    case PL_ALBUM_DETAILS_REQUEST:
      return { loading: true }
    case PL_ALBUM_DETAILS_SUCCESS:
      return { loading: false, playList: action.payload }
    case PL_ALBUM_DETAILS_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
