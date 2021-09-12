import {
  QUEUE_ADD_SONG,
  QUEUE_IMMD_ADD_SONG,
  QUEUE_REMOVE_SONG,
} from '../constants/constants'

export const queueReducer = (state = { queueList: [] }, action) => {
  switch (action.type) {
    case QUEUE_ADD_SONG:
      const song = action.payload

      const songExists = state.queueList.find(
        (x) => x.songName === song.songName
      )

      if (songExists) {
        return {
          ...state,
          queueList: state.queueList.map((item) =>
            item.songName === songExists.songName ? song : item
          ),
        }
      } else {
        return {
          ...state,
          queueList: [...state.queueList, song],
        }
      }

    case QUEUE_REMOVE_SONG:
      return {
        ...state,
        queueList: state.queueList.filter(
          (item) => item.songName !== action.payload
        ),
      }

    case QUEUE_IMMD_ADD_SONG:
      const song2 = action.payload

      return {
        queueList: [song2],
      }

    default:
      return state
  }
}
