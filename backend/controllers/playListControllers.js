import PlayList from '../models/playListsModel.js'
import asyncHandler from 'express-async-handler'

const addPLAlbum = asyncHandler(async (req, res) => {
  const plAlbum = new PlayList({
    user: req.user._id,
    playLists: [],
  })
  const createdAlbum = await plAlbum.save()
  res.status(201).json(createdAlbum)
})

//PL_ALBUM_ADD
const addPlayList = asyncHandler(async (req, res) => {
  const { playListTitle } = req.body

  const plAlbum = await PlayList.findOne({ user: req.user._id })

  const plist = {
    playListTitle,
    plSongs: [],
  }

  let plExists = false

  plAlbum.playLists.map((pl) => {
    if (playListTitle === pl.playListTitle) {
      plExists = true
    }
  })
  if (plExists) {
    res.status(404)
    throw new Error('Play List name already exists. Please choose another name')
  }

  plAlbum.playLists.push(plist)

  await plAlbum.save()

  res.status(201).json({ message: `${playListTitle} added to playlist` })
})

//PL_ALBUM_REMOVE
const removePlayList = asyncHandler(async (req, res) => {
  const playListTitle = req.params.playListTitle

  const plAlbum = await PlayList.findOne({ user: req.user._id })

  let plExists = false

  plAlbum.playLists.map((pl) => {
    if (pl.playListTitle === playListTitle) {
      plAlbum.playLists.remove(pl)
      plExists = true
    }
  })

  if (!plExists) {
    res.status(404)
    throw new Error(`Play List doesn't exists`)
  }
  await plAlbum.save()
  res.status(201).json({
    message: ` ${playListTitle} has been removed removed from playlists`,
  })
})

//PL_SONG_ADD
const addSongtoPL = asyncHandler(async (req, res) => {
  const { movieTitle, moviePoster, songName, songFile, singers, duration } =
    req.body

  const playListTitle = req.params.playListTitle

  const plAlbum = await PlayList.findOne({ user: req.user._id })

  const song = {
    movieTitle,
    moviePoster,
    songName,
    songFile,
    singers,
    duration,
  }

  let plExists = false
  let songExists = false

  plAlbum.playLists.map((pl) => {
    if (pl.playListTitle === playListTitle) {
      pl.plSongs.map((plSong) => {
        if (songName === plSong.songName) {
          songExists = true
        }
      })
      plExists = true
      if (!songExists) {
        pl.plSongs.push(song)
      }
    }
  })

  if (!plExists) {
    res.status(404)
    throw new Error(`Play List doesn't exists`)
  }

  if (songExists) {
    res.status(404)
    throw new Error('Song Already Exists')
  }

  await plAlbum.save()
  res
    .status(201)
    .json({ message: `${songName} song added to ${playListTitle} play list` })
})

//PL_SONG_REMOVE
const removeSongfromPL = asyncHandler(async (req, res) => {
  const playListTitle = req.params.playListTitle

  const songName = req.params.songName

  const plAlbum = await PlayList.findOne({ user: req.user._id })

  let plExists = false
  let songExists = false

  plAlbum.playLists.map((pl) => {
    if (pl.playListTitle === playListTitle) {
      pl.plSongs.map((plSong) => {
        if (songName === plSong.songName) {
          pl.plSongs.remove(plSong)
        }
      })
      plExists = true
    }
  })

  if (!plExists) {
    res.status(404)
    throw new Error(`Play List doesn't exists`)
  }

  if (songExists) {
    res.status(404)
    throw new Error(`Song not found in ${playListTitle}`)
  }

  await plAlbum.save()
  res.status(201).json({
    message: `${songName} song removed from ${playListTitle} play list`,
  })
})

//PL_ALBUM_LIST
const getPlayLists = asyncHandler(async (req, res) => {
  const userPLAlbum = await PlayList.findOne({ user: req.user._id })
  if (userPLAlbum) {
    res.json(userPLAlbum.playLists)
  } else {
    res.status(404)
    throw new Error('Playlist album not found')
  }
})

//PL_ALBUM_LIST_DETAILS
const getPlayListDetails = asyncHandler(async (req, res) => {
  const userPLAlbum = await PlayList.findOne({ user: req.user._id })
  const playListTitle = req.params.playListTitle

  let found = false

  if (userPLAlbum) {
    userPLAlbum.playLists.map((pl) => {
      if (pl.playListTitle === playListTitle) {
        res.json(pl)
        found = true
      }
    })
  } else {
    res.status(404)
    throw new Error('Playlist album not found')
  }

  if (!found) {
    res.status(404)
    throw new Error('Playlist not found')
  }
})

export {
  addPLAlbum,
  addPlayList,
  removePlayList,
  addSongtoPL,
  removeSongfromPL,
  getPlayLists,
  getPlayListDetails,
}
