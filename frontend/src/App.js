import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import PlayerBar from './components/playerbar'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/userscreens/homescreen'
import AlbumScreen from './screens/userscreens/albumscreen'
import SongScreen from './screens/userscreens/songscreen'
import LoginScreen from './screens/userscreens/loginscreen'
import RegisterScreen from './screens/userscreens/registerscreen'
import { useSelector } from 'react-redux'
import FavouritesScreen from './screens/userscreens/favouritesscreen'
import PlayListsScreen from './screens/userscreens/myplaylistsscreen'
import PlayListScreen from './screens/userscreens/playlistscreen'
import QueueScreen from './screens/userscreens/queuescreen'
import AccountScreen from './screens/userscreens/accountscreen'
import AlbumListScreen from './screens/adminscreens/albumslistscreen'
import { Footer, BottomPadder } from './components/footer'
import AlbumEditScreen from './screens/adminscreens/albumeditscreen'
import SongEditScreen from './screens/adminscreens/songeditscreen'

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/album/:movieTitle' component={AlbumScreen} exact />
          <Route
            path='/album/:movieTitle/:songName'
            component={SongScreen}
            exact
          />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/account' component={AccountScreen} />
          <Route path='/queue' component={QueueScreen} />
          <Route path='/favourites' component={FavouritesScreen} />
          <Route path='/playlists' component={PlayListsScreen} exact />
          <Route
            path='/playlists/:playListTitle'
            component={PlayListScreen}
            exact
          />
          <Route path='/admin/albumslist' component={AlbumListScreen} />
          <Route
            path='/admin/album/:movieId/edit'
            component={AlbumEditScreen}
            exact
          />
          <Route
            path='/admin/album/:movieId/:songId/edit'
            component={SongEditScreen}
          />
        </Container>
      </main>
      <Footer />

      {userInfo && (
        <>
          <PlayerBar />
          <BottomPadder />
        </>
      )}
    </Router>
  )
}

export default App
