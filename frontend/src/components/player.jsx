/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/loader'
import KeyPadEvents from './keypadevents'
import { Row, Col, Image } from 'react-bootstrap'
import QueueUpButton from './queueupbutton'
import { Link } from 'react-router-dom'

const Player = ({ currentSongIDX, setCurrentSongIDX, nextSongIDX }) => {
  const queue = useSelector((state) => state.queue)
  const { queueList } = queue

  const audioElement = useRef(null)
  // const progressBar = useRef(null)
  // const animationRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  // const [currentTime, setCurrentTime] = useState(0)
  // const [replay, setReplay] = useState(false)

  useEffect(() => {
    const seconds = Math.floor(audioElement.current.duration)
    setDuration(seconds)
    // progressBar.current.max = seconds
    if (isPlaying) {
      audioElement.current.play()
      // animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioElement.current.pause()
      // cancelAnimationFrame(animationRef.current)
    }
  })

  // const changePlayerCurrentTime = () => {
  //   if (currentSongIDX) {
  //     progressBar.current.style.setProperty(
  //       '--seek-before-width',
  //       `${(progressBar.current.value / duration) * 100}%`
  //     )
  //     setCurrentTime(progressBar.current.value)
  //   }
  // }

  // const whilePlaying = () => {
  //   if (currentSongIDX || queueList.length > 2) {
  //     progressBar.current.value = audioElement.current.currentTime
  //     changePlayerCurrentTime()
  //     animationRef.current = requestAnimationFrame(whilePlaying)
  //   }
  // }

  // const changeRange = () => {
  //   audioElement.current.currentTime = progressBar.current.value
  //   changePlayerCurrentTime()
  // }

  // const backFifteen = () => {
  //   timeTravel(Number(progressBar.current.value) - 15)
  // }

  // const frontFifteen = () => {
  //   timeTravel(Number(progressBar.current.value) + 15)
  // }

  // const timeTravel = (newTime) => {
  //   progressBar.current.value = newTime
  // }

  const timecalculator = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${returnedMinutes} : ${returnedSeconds}`
  }

  const skipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIDX(() => {
        let temp = currentSongIDX
        temp++

        if (temp > queueList.length - 1) {
          temp = 0
        }
        return temp
      })
    } else {
      setCurrentSongIDX(() => {
        let temp = currentSongIDX
        temp--

        if (temp < 0) {
          temp = queueList.length - 1
        }
        return temp
      })
    }
  }

  // useEffect(() => {
  //   // eslint-disable-next-line eqeqeq
  //   if (currentTime == duration) {
  //     if (replay) {
  //       timeTravel(0)
  //     } else {
  //       skipSong()
  //     }
  //   }
  // }, [currentTime])

  return (
    <>
      <KeyPadEvents
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        // backFifteen={backFifteen}
        // frontFifteen={frontFifteen}
      />
      <audio
        src={queueList[currentSongIDX].songFile}
        ref={audioElement}
      ></audio>
      {/* ****************Currrent Song Details********************* */}

      <>
        <Col xs='2' lg='1'>
          {' '}
          <Image
            src={queueList[currentSongIDX].moviePoster}
            width='60'
            height='60'
          />{' '}
        </Col>
        <Col xs='3' lg='3' className='p-0 m-0'>
          <Col
            style={{
              fontSize: '1.2rem',
              fontWeight: '600',
            }}
          >
            <Link
              to={`/album/${queueList[currentSongIDX].movieTitle}/${queueList[currentSongIDX].songName}`}
              className='linkname'
            >
              {queueList[currentSongIDX].songName}
            </Link>
          </Col>
          <Col style={{ fontSize: '0.9rem' }}>
            <Link
              to={`/album/${queueList[currentSongIDX].movieTitle}`}
              className='linkname'
              style={{ color: '#fff' }}
            >
              {queueList[currentSongIDX].movieTitle}
            </Link>
          </Col>
        </Col>
        {/* ****************Currrent Song Details********************* */}

        <Col className='mx-2' xs='7' lg='7'>
          <Row className='d-flex justify-content-center'>
            {/* ****************Player Controls [Back, Pause/Play, Next]********************* */}

            <Col className='text-center py-1 px-0 ' xs='5' lg='4'>
              <div className='btn p-1 m-0 mx-2'>
                <i
                  className='fas fa-backward'
                  onClick={() => skipSong(false)}
                ></i>
              </div>

              <div
                className='btn p-1 m-0 mx-4'
                style={{ borderRadius: 50 }}
                onClick={() => {
                  setIsPlaying(!isPlaying)
                }}
              >
                {!queueList[currentSongIDX].songFile ? (
                  <Loader />
                ) : !isPlaying ? (
                  <i className='fas fa-play'></i>
                ) : (
                  <i className='fas fa-pause'></i>
                )}
              </div>

              <div className='btn p-0 m-0 mx-2' onClick={() => skipSong()}>
                <i className='fas fa-forward'></i>
              </div>
            </Col>
            {/* ****************Player Controls [Back, Pause/Play, Next]********************* */}
          </Row>
          {/* **********************************Progress Bar*************************** */}
          <Row className='text-center'>
            <Col>
              <Row>
                {/* <Col xs='1' lg='1'>{timecalculator(currentTime)}</Col>
                <Col className='mx-1'>
                  <input
                    type='range'
                    className='progressBar'
                    defaultValue='0'
                    ref={progressBar}
                    onChange={changeRange}
                  ></input>
                </Col> */}
                <Col>
                  {' '}
                  {duration && !isNaN(duration)
                    ? timecalculator(duration)
                    : '0:00'}
                </Col>
              </Row>
            </Col>
          </Row>
          {/* **********************************Progress Bar*************************** */}
        </Col>

        {/* **********************************Next Song & Queue*************************** */}
        <Col xs='2' lg='2'>
          <Row>
            <Col xs='9' lg='9'>
              <Col>Next up:</Col>
              <Col style={{ fontSize: '0.8rem', color: '#6b56e6' }}>
                {nextSongIDX ? queueList[nextSongIDX].songName : 'No songs'}
              </Col>
            </Col>
            <Col xs='2' lg='2'>
              <QueueUpButton />
            </Col>
          </Row>
        </Col>
      </>
      {/* **********************************Next Song & Queue*************************** */}
    </>
  )
}

export default Player
