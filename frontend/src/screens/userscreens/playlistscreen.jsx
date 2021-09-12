import React, { useEffect } from 'react'
import { Button, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/loader'
import Message from '../../components/message'
import SongPath from '../../components/songpath'
import PlayButton from '../../components/playbutton'
import LikeButton from '../../components/likebutton'

import { detailsPlayList } from '../../actions/playListActions'
import RemoveSongFromPlayListButton from '../../components/removesgfromplbutton'
import AddToQueueButton from '../../components/addtoqueuebutton'

const PlayListScreen = ({ history, match }) => {
  const playListTitle = match.params.playListTitle

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPlayListDetails = useSelector((state) => state.getPlayListDetails)
  const { loading, error, playList } = getPlayListDetails

  const favAlbumDetails = useSelector((state) => state.favAlbumDetails)
  const { loading: loadingFav, error: errorFav } = favAlbumDetails

  const removeSongOutOfPL = useSelector((state) => state.removeSongOutOfPL)
  const { success: successRemove } = removeSongOutOfPL

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    dispatch(detailsPlayList(playListTitle))
  }, [dispatch, history, userInfo, playListTitle, successRemove])

  return (
    <div className='my-5'>
      <SongPath Stage1='Home' Stage2='Playlists' />

      <h4 className='text-center'>{playListTitle}</h4>

      {loading || loadingFav ? (
        <Loader />
      ) : error || errorFav ? (
        <Message>{error}</Message>
      ) : (
        <Row className='mb-3 d-flex justify-content-around'>
          {playList.plSongs.length === 0 ? (
            <Link to='/'>
              <Button className='btn-secondary'>
                <i className='fas fa-plus'> </i> Add songs to palylist
              </Button>
            </Link>
          ) : (
            <Table
              hover
              borderless
              responsive
              className='table-xl py-3 mb-5'
              variant='transparent'
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Song</th>
                  <th>Movie</th>
                  <th>Singers</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {playList.plSongs.map((item) => (
                  <tr key={item._id}>
                    <td className='text-center'>
                      <PlayButton songName={item.songName} />
                    </td>
                    <td>
                      <Link
                        to={`/album/${item.movieTitle}/${item.songName}`}
                        className='linkname'
                      >
                        {item.songName}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/album/${item.movieTitle}`}
                        className='linkname'
                      >
                        {item.movieTitle}
                      </Link>
                    </td>
                    <td>{item.singers}</td>
                    <td>
                      <LikeButton
                        movieTitle={item.movieTitle}
                        songName={item.songName}
                      />
                    </td>
                    <td>
                      <AddToQueueButton
                        movieTitle={item.movieTitle}
                        songName={item.songName}
                      />
                    </td>
                    <td>
                      <RemoveSongFromPlayListButton
                        songName={item.songName}
                        playListTitle={playListTitle}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      )}
    </div>
  )
}

export default PlayListScreen
