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
          <Route
            path='/'
            component={userInfo ? HomeScreen : LoginScreen}
            exact
          />
          <Route
            path='/album/:movieTitle'
            component={userInfo ? AlbumScreen : LoginScreen}
            exact
          />
          <Route
            path='/album/:movieTitle/:songName'
            component={userInfo ? SongScreen : LoginScreen}
            exact
          />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/account' component={AccountScreen} />
          <Route
            path='/queue'
            component={userInfo ? QueueScreen : LoginScreen}
          />

          <Route
            path='/favourites'
            component={userInfo ? FavouritesScreen : LoginScreen}
          />
          <Route
            path='/playlists'
            component={userInfo ? PlayListsScreen : LoginScreen}
            exact
          />
          <Route
            path='/playlists/:playListTitle'
            component={userInfo ? PlayListScreen : LoginScreen}
            exact
          />

          <Route
            path='/admin/albumslist'
            component={userInfo ? AlbumListScreen : LoginScreen}
          />

          <Route
            path='/admin/album/:movieId/edit'
            component={userInfo ? AlbumEditScreen : LoginScreen}
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
