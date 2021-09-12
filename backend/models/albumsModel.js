import mongoose from 'mongoose'

const songsSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
)

const albumsSchema = mongoose.Schema(
  {
    movieTitle: {
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    songs: [songsSchema],
  },
  {
    timestamps: true,
  }
)

const Album = mongoose.model('Album', albumsSchema)

export default Album
