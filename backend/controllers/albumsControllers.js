import Album from '../models/albumsModel.js'
import asyncHandler from 'express-async-handler'
import fs from 'fs'
import path from 'path'
import express from 'express'

const addUnderScore = (movieTitle) => {
  const titleWords = movieTitle.split(' ')
  let updatedMT = ''

  for (let i = 0; i < titleWords.length; i++) {
    updatedMT += '_' + titleWords[i]
  }

  return updatedMT.slice(1)
}

const __dirname = path.resolve()

//By Titles for users
const getAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find({})
  res.json(albums)
})

const getAlbumByTitle = asyncHandler(async (req, res) => {
  const album = await Album.findOne({ movieTitle: req.params.movieTitle })
  if (album) {
    res.json(album)
  } else {
    res.status(404)
    throw new Error('Album Not Found')
  }
})

const getSongByTitle = asyncHandler(async (req, res) => {
  const album = await Album.findOne({
    movieTitle: req.params.movieTitle,
  })

  album.songs.map((item) => {
    if (item.songName === req.params.songName) {
      if (item) {
        res.json(item)
      } else {
        res.status(404)
        throw new Error('Song Not Found')
      }
    }
  })
})

//By Ids for admin functionalities
const getAlbumById = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.movieId)
  if (album) {
    res.json(album)
  } else {
    res.status(404)
    throw new Error('Album Not Found')
  }
})

const addAlbum = asyncHandler(async (req, res) => {
  const album = new Album({
    movieTitle: 'Sample Title',
    moviePoster: '/Albums/Sample/sample.webp',
  })
  const createdAlbum = await album.save()

  const folderName = path.join(
    __dirname,
    `/frontend/public/Albums/${addUnderScore(createdAlbum.movieTitle)}`
  )

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
  } catch (error) {
    console.error(error)
  }

  fs.writeFile(`${folderName}/file.txt`, 'Add to git repo', function (err) {
    if (err) throw err
  })

  res.status(201).json(createdAlbum)
})

const editAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.movieId)
  const { movieTitle, moviePoster } = req.body

  if (album) {
    const tempMT = album.movieTitle
    const tempMP = album.movieTitle
    album.movieTitle = movieTitle
    album.moviePoster = moviePoster

    album.songs.map((item) => {
      item.movieTitle = movieTitle
      item.moviePoster = moviePoster
    })

    const updatedAlbum = await album.save()

    const folderName = path.join(
      __dirname,
      `/frontend/public/Albums/${addUnderScore(tempMT)}`
    )

    // const posterName = path.join(
    //   __dirname,
    //   `/frontend/public/Albums/${addUnderScore(tempMP)}`
    // )

    const newFolderName = path.join(
      __dirname,
      `/frontend/public/Albums/${addUnderScore(updatedAlbum.movieTitle)}`
    )

    // fs.rm(posterName, { recursive: true, force: true }, (err) => {
    //   if (err) {
    //     throw err
    //   }

    //   console.log(`${folderName} is deleted!`)
    // })

    fs.rename(folderName, newFolderName, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })

    res.status(201).json(updatedAlbum)
  } else {
    res.status(404)
    throw new Error('Album Not Found')
  }
})

const deleteAlbum = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.movieId)
  if (album) {
    await album.remove()
    const folderName = path.join(
      __dirname,
      `/frontend/public/Albums/${addUnderScore(album.movieTitle)}`
    )
    fs.rm(folderName, { recursive: true, force: true }, (err) => {
      if (err) {
        throw err
      }

      console.log(`${folderName} is deleted!`)
    })
    res.json({ message: 'Album Removed' })
  } else {
    res.status(404)
    throw new Error('Album not Found')
  }
})

const getSongById = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.movieId)

  let songExists

  album.songs.map((item) => {
    if (req.params.songId === item.id && !songExists) {
      res.json(item)
      songExists = true
    }
  })

  if (!songExists) {
    res.status(404)
    throw new Error('Song not found in album')
  }
})

const addSong = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.movieId)
  const x = album.id.slice(-3)
  const song = {
    movieTitle: album.movieTitle,
    moviePoster: album.moviePoster,
    songName: `Sample Song`,
    songFile: `/Albums/${addUnderScore(album.movieTitle)}/sample.mp3`,
    singers: 'Sample Singers',
    duration: '00:00',
  }

  album.songs.push(song)

  const updatedAlbum = await album.save()

  const createdSong = updatedAlbum.songs.slice(-1)

  res.status(201).json(createdSong[0])
})

const editSong = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.movieId)
  const { songName, songFile, singers, duration } = req.body

  if (album) {
    let songExists

    album.songs.map((item) => {
      if (req.params.songId === item.id && !songExists) {
        item.songName = songName
        item.songFile = songFile
        item.singers = singers
        item.duration = duration
        songExists = true
      }
    })
    if (!songExists) {
      res.status(404)
      throw new Error('Song not found in album')
    }
    await album.save()
    res.status(201).json({
      message: `Song updated`,
    })
  } else {
    res.status(404)
    throw new Error('Album not found')
  }
})

const deleteSong = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.movieId)

  let songExists

  album.songs.map((item) => {
    if (req.params.songId === item.id && !songExists) {
      album.songs.remove(item)
      songExists = true
    }
  })
  if (!songExists) {
    res.status(404)
    throw new Error('Song not found in album')
  }
  await album.save()
  res.status(201).json({
    message: `Song deleted from album`,
  })
})

export {
  getAlbums,
  getAlbumByTitle,
  getSongByTitle,
  getAlbumById,
  getSongById,
  addAlbum,
  editAlbum,
  addSong,
  editSong,
  deleteAlbum,
  deleteSong,
}

// let tempMT
// let tempSN
// tempMT = item.movieTitle
// tempSN = item.songFile
// const songPath = path.join(
//   __dirname,
//   `/frontend/public/Albums/${addUnderScore(tempMT)}/${addUnderScore(
//     tempSN
//   )}`
// )

// try {
//   if (songPath) {
//     fs.unlinkSync(songPath)
//   } else {
//     console.log('Song Path not found')
//   }
// } catch (error) {
//   console.error(error)
// }
