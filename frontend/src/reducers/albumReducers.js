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
  SONG_ADD_REQUEST,
  SONG_ADD_SUCCESS,
  SONG_ADD_FAILED,
  SONG_ADD_RESET,
  ALBUM_ADD_RESET,
  ALBUM_DELETE_REQUEST,
  ALBUM_DELETE_SUCCESS,
  ALBUM_DELETE_FAILED,
  SONG_EDIT_REQUEST,
  SONG_EDIT_SUCCESS,
  SONG_EDIT_FAILED,
  SONG_EDIT_RESET,
  ALBUM_EDIT_REQUEST,
  ALBUM_EDIT_SUCCESS,
  ALBUM_EDIT_FAILED,
  ALBUM_EDIT_RESET,
  ALBUM_DETAILS_FA_REQUEST,
  ALBUM_DETAILS_FA_SUCCESS,
  ALBUM_DETAILS_FA_FAILED,
  SONG_DELETE_REQUEST,
  SONG_DELETE_SUCCESS,
  SONG_DELETE_FAILED,
  SONG_DETAILS_FA_REQUEST,
  SONG_DETAILS_FA_SUCCESS,
  SONG_DETAILS_FA_FAILED,
  SONG_DELETE_RESET,
} from '../constants/constants'

export const albumsListReducer = (state = { albums: [] }, action) => {
  switch (action.type) {
    case ALBUM_LIST_REQUEST:
      return { loading: true, albums: [] }
    case ALBUM_LIST_SUCCESS:
      return { loading: false, albums: action.payload }
    case ALBUM_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const albumsDetailsReducer = (
  state = { album: { songs: [] } },
  action
) => {
  switch (action.type) {
    case ALBUM_DETAILS_REQUEST:
      return { loading: true }
    case ALBUM_DETAILS_SUCCESS:
      return { loading: false, album: action.payload }
    case ALBUM_DETAILS_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const songDetailsReducer = (state = { song: {} }, action) => {
  switch (action.type) {
    case SONG_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SONG_DETAILS_SUCCESS:
      return { loading: false, song: action.payload }
    case SONG_DETAILS_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Admin***

//Album
export const albumsDetailsFAReducer = (
  state = { album: { songs: [] } },
  action
) => {
  switch (action.type) {
    case ALBUM_DETAILS_FA_REQUEST:
      return { ...state, loading: true }
    case ALBUM_DETAILS_FA_SUCCESS:
      return { loading: false, album: action.payload }
    case ALBUM_DETAILS_FA_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addAlbumReducer = (state = { album: {} }, action) => {
  switch (action.type) {
    case ALBUM_ADD_REQUEST:
      return { loading: true, album: {} }
    case ALBUM_ADD_SUCCESS:
      return { loading: false, success: true, album: action.payload }
    case ALBUM_ADD_FAILED:
      return { loading: false, error: action.payload }
    case ALBUM_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const editAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case ALBUM_EDIT_REQUEST:
      return { loading: true }
    case ALBUM_EDIT_SUCCESS:
      return { loading: false, success: true }
    case ALBUM_EDIT_FAILED:
      return { loading: false, error: action.payload }
    case ALBUM_EDIT_RESET:
      return {}
    default:
      return state
  }
}

export const deleteAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case ALBUM_DELETE_REQUEST:
      return { loading: true }
    case ALBUM_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ALBUM_DELETE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Song
export const songDetailsFAReducer = (state = { song: {} }, action) => {
  switch (action.type) {
    case SONG_DETAILS_FA_REQUEST:
      return { ...state, loading: true }
    case SONG_DETAILS_FA_SUCCESS:
      return { loading: false, song: action.payload }
    case SONG_DETAILS_FA_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addSongReducer = (state = { song: {} }, action) => {
  switch (action.type) {
    case SONG_ADD_REQUEST:
      return { loading: true, song: {} }
    case SONG_ADD_SUCCESS:
      return { loading: false, success: true, song: action.payload }
    case SONG_ADD_FAILED:
      return { loading: false, error: action.payload }
    case SONG_ADD_RESET:
      return {}

    default:
      return state
  }
}

export const editSongReducer = (state = {}, action) => {
  switch (action.type) {
    case SONG_EDIT_REQUEST:
      return { loading: true }
    case SONG_EDIT_SUCCESS:
      return { loading: false, success: true }
    case SONG_EDIT_FAILED:
      return { loading: false, error: action.payload }
    case SONG_EDIT_RESET:
      return {}

    default:
      return state
  }
}

export const deleteSongReducer = (state = {}, action) => {
  switch (action.type) {
    case SONG_DELETE_REQUEST:
      return { loading: true }
    case SONG_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SONG_DELETE_FAILED:
      return { loading: false, error: action.payload }
    case SONG_DELETE_RESET:
      return {}
    default:
      return state
  }
}
