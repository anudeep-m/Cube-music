import axios from 'axios'
import {
  QUEUE_ADD_SONG,
  QUEUE_IMMD_ADD_SONG,
  QUEUE_REMOVE_SONG,
} from '../constants/constants'

const addSongToQueue = (movieTitle, songName) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/albums/${movieTitle}/${songName}`)

  const song = {
    movieTitle: data.movieTitle,
    moviePoster: data.moviePoster,
    songName: data.songName,
    songFile: data.songFile,
    singers: data.singers,
    duration: data.duration,
  }

  dispatch({
    type: QUEUE_ADD_SONG,
    payload: song,
  })

  localStorage.setItem('queueList', JSON.stringify(getState().queue.queueList))
}

const removeSongFromQueue = (songName) => async (dispatch, getState) => {
  dispatch({
    type: QUEUE_REMOVE_SONG,
    payload: songName,
  })

  localStorage.setItem('queueList', JSON.stringify(getState().queue.queueList))
}

const addSongToQueueImmediately =
  (movieTitle, songName) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/albums/${movieTitle}/${songName}`)

    const song = {
      movieTitle: data.movieTitle,
      moviePoster: data.moviePoster,
      songName: data.songName,
      songFile: data.songFile,
      singers: data.singers,
      duration: data.duration,
    }

    dispatch({
      type: QUEUE_IMMD_ADD_SONG,
      payload: song,
    })

    localStorage.setItem(
      'queueList',
      JSON.stringify(getState().queue.queueList)
    )
  }

export { addSongToQueue, removeSongFromQueue, addSongToQueueImmediately }
