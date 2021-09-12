import mongoose from 'mongoose'

const plSongsSchema = mongoose.Schema({
  movieTitle: {
    type: String,
    required: true,
  },
  moviePoster: {
    type: String,
    required: true,
  },
  songName: {
    type: String,
    required: true,
  },
  songFile: {
    type: String,
    required: true,
  },
  singers: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
})

const playListsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    playLists: [
      {
        playListTitle: {
          type: String,
          required: true,
        },
        plSongs: [plSongsSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
)

const PlayList = mongoose.model('PlayList', playListsSchema)

export default PlayList
