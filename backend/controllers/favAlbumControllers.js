import FavAlbum from '../models/favAlbumModel.js'
import asyncHandler from 'express-async-handler'

const addFavAlbum = asyncHandler(async (req, res) => {
  // const { favAlbumTitle, favAlbumPoster } = req.body

  const favAlbum = new FavAlbum({
    user: req.user._id,
    favAlbumTitle: 'Favourites',
    favAlbumPoster: '/pictures/like.png',
  })
  const createdAlbum = await favAlbum.save()
  res.status(201).json(createdAlbum)
})

const removeSongfromFav = asyncHandler(async (req, res) => {
  const favAlbum = await FavAlbum.findOne({ user: req.user._id })
  let songExists

  favAlbum.favSongs.map((favSong) => {
    if (req.params.songName === favSong.songName) {
      favAlbum.favSongs.remove(favSong)
      songExists = true
    }
  })

  if (!songExists) {
    res.status(404)
    throw new Error('Song not found in favourites')
  }
  await favAlbum.save()
  res
    .status(201)
    .json({ message: `${req.body.songName} song removed from favourites` })
})

const addSongtoFav = asyncHandler(async (req, res) => {
  const { movieTitle, moviePoster, songName, songFile, singers, duration } =
    req.body

  const favAlbum = await FavAlbum.findOne({ user: req.user._id })

  const song = {
    movieTitle,
    moviePoster,
    songName,
    songFile,
    singers,
    duration,
  }

  let songExists = false

  favAlbum.favSongs.map((favSong) => {
    if (songName === favSong.songName) {
      songExists = true
    }
  })
  if (songExists) {
    res.status(404)
    throw new Error('Song Already Exists')
  }
  favAlbum.favSongs.push(song)
  await favAlbum.save()
  res.status(201).json({ message: `${songName} song added to favourites` })
})

const getFavAlbum = asyncHandler(async (req, res) => {
  const favAlbum = await FavAlbum.findOne({ user: req.user._id })
  if (favAlbum) {
    res.json(favAlbum)
  } else {
    res.status(404)
    throw new Error('Favourites Album Not Found')
  }
})

export { addFavAlbum, addSongtoFav, getFavAlbum, removeSongfromFav }
