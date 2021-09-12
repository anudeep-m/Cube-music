import mongoose from 'mongoose'

const favSongsSchema = mongoose.Schema({
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

const favouritesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    favAlbumTitle: {
      type: String,
      required: true,
    },
    favAlbumPoster: {
      type: String,
      required: true,
    },
    favSongs: [favSongsSchema],
  },
  {
    timestamps: true,
  }
)

const FavAlbum = mongoose.model('FavAlbum', favouritesSchema)

export default FavAlbum
