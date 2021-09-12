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

export const addToFavAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case FAV_ALBUM_ADD_REQUEST:
      return { loading: true }
    case FAV_ALBUM_ADD_SUCCESS:
      return { loading: false, success: true }
    case FAV_ALBUM_ADD_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const removeFromFavAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case FAV_ALBUM_REMOVE_REQUEST:
      return { loading: true }
    case FAV_ALBUM_REMOVE_SUCCESS:
      return { loading: false, success: true }
    case FAV_ALBUM_REMOVE_FAILED:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const favAlbumDetailsReducer = (
  state = { favAlbum: { favSongs: [] } },
  action
) => {
  switch (action.type) {
    case FAV_ALBUM_DETAILS_REQUEST:
      return { loading: true, ...state }
    case FAV_ALBUM_DETAILS_SUCCESS:
      return { loading: false, favAlbum: action.payload }
    case FAV_ALBUM_DETAILS_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
