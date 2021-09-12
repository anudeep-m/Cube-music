import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  albumsListReducer,
  albumsDetailsReducer,
  songDetailsReducer,
  albumsDetailsFAReducer,
  addAlbumReducer,
  editAlbumReducer,
  deleteAlbumReducer,
  songDetailsFAReducer,
  addSongReducer,
  editSongReducer,
  deleteSongReducer,
} from './reducers/albumReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  addToFavAlbumReducer,
  favAlbumDetailsReducer,
  removeFromFavAlbumReducer,
} from './reducers/favAlbumReducers'
import {
  addPLToPLAlbumReducer,
  addSongToPLReducer,
  getPlayListDetailsReducer,
  getPlayListsReducer,
  removePLFromPLAlbumReducer,
  removeSongFromPLReducer,
} from './reducers/playListReducers'
import { queueReducer } from './reducers/queueListReducers'

const reducer = combineReducers({
  albumList: albumsListReducer,
  albumDetails: albumsDetailsReducer,
  songDetails: songDetailsReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userLogin: userLoginReducer,
  userUpdateProfile: userUpdateProfileReducer,
  addFav: addToFavAlbumReducer,
  removeFav: removeFromFavAlbumReducer,
  favAlbumDetails: favAlbumDetailsReducer,
  getPlayLists: getPlayListsReducer,
  getPlayListDetails: getPlayListDetailsReducer,
  addSongIntoPL: addSongToPLReducer,
  removeSongOutOfPL: removeSongFromPLReducer,
  addPLToPLAlbum: addPLToPLAlbumReducer,
  removePLFromPLAlbum: removePLFromPLAlbumReducer,
  queue: queueReducer,
  albumDetailsFA: albumsDetailsFAReducer,
  addAlbum: addAlbumReducer,
  editAlbum: editAlbumReducer,
  deleteAlbum: deleteAlbumReducer,
  songDetailsFA: songDetailsFAReducer,
  addSong: addSongReducer,
  editSong: editSongReducer,
  deleteSong: deleteSongReducer,
})

const userInfofromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const queueListfromLocalStorage = localStorage.getItem('queueList')
  ? JSON.parse(localStorage.getItem('queueList'))
  : []

const initalState = {
  userLogin: { userInfo: userInfofromLocalStorage },
  queue: { queueList: queueListfromLocalStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
