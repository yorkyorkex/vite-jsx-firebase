import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './components/auth.jsx'
import { db } from './config/firebase.jsx'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([])
  const [newMovie, setNewMovie] = useState({
    title: '',
    releaseDate: '',
    receivedAnOscar: false,
  })
  const [editingMovie, setEditingMovie] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  useEffect(() => {
    getMovies()
  }, [])
  const getMovies = async () => {
    // 1. reference (參考資料)
    const moviesRef = collection(db, 'movies')
    // 2. get collection data (取得資料)
    try {
      const snapshot = await getDocs(moviesRef)
      const movies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      // 3. set to state (設定到 state)
      setMovieList(movies)
      console.log(movies)
    } catch (error) {
      console.error('Error getting movies:', error)
    }
  }

  /*   const handleAddMovie = async () => {
    console.log('Add movie:', newMovie)
    // 1. reference (參考資料)
    const moviesRef = collection(db, 'movies')
    // 2. add document (新增文件)
    await addDoc(moviesRef, newMovie)
    // 3. get collection data (取得資料)
    const snapshot = await getDocs(moviesRef)
    const movies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    // 4. set to state (設定到 state)
    setMovieList(movies)
    // 5. clear input (清空輸入框)
    setNewMovie({
      title: '',
      releaseDate: '',
      receivedAnOscar: false,
    })
  } */
  const handleAddMovie = async () => {
    console.log('Add movie:', newMovie)
    try {
      // 1. reference (參考資料)
      const moviesRef = collection(db, 'movies')
      // 2. add document (新增文件)
      await addDoc(moviesRef, newMovie)

      getMovies()
      // 5. clear input (清空輸入框)
      setNewMovie({
        title: '',
        releaseDate: '',
        receivedAnOscar: false,
      })
    } catch (error) {
      console.error('Error adding movie:', error)
    }
  }

  const handleDeleteMovie = async (id) => {
    console.log('Delete movie with id:', id)
    try {
      const movieRef = doc(db, 'movies', id)
      await deleteDoc(movieRef)
      getMovies()
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }
  const handleStartEdit = (movie) => {
    setEditingMovie(movie.id)
    setEditTitle(movie.title)
  }

  const handleCancelEdit = () => {
    setEditingMovie(null)
    setEditTitle('')
  }

  const handleUpdateMovie = async (id) => {
    console.log('Update movie with id:', id, 'to new title:', editTitle)
    try {
      const movieRef = doc(db, 'movies', id)
      await updateDoc(movieRef, { title: editTitle })
      setEditingMovie(null)
      setEditTitle('')
      getMovies()
    } catch (error) {
      console.error('Error updating movie:', error)
    }
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Release Date"
          value={newMovie.releaseDate}
          onChange={(e) =>
            setNewMovie({ ...newMovie, releaseDate: e.target.value })
          }
        />
        <label>
          <input
            type="checkbox"
            checked={newMovie.receivedAnOscar}
            onChange={(e) =>
              setNewMovie({ ...newMovie, receivedAnOscar: e.target.checked })
            }
          />
          Received an Oscar
        </label>
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      <div>
        <h2>電影列表</h2>
        <ul>
          {movieList.map((movie) => (
            <li key={movie.id}>
              id : {movie.id} <br />
              title : {movie.title} <br />
              receivedAnOscar : {movie.receivedAnOscar ? '有' : '沒有'} <br />
              releaseDate : {movie.releaseDate} <br />
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Delete
              </button>
              {editingMovie === movie.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <button onClick={() => handleUpdateMovie(movie.id)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => handleStartEdit(movie)}>Edit</button>
              )}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
