import React, { useState } from 'react'
import Movies from './pages/Movies'
import FavoriteList from "./pages/FavoriteList"
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const [favoriteLists, setFavoriteLists] = useState([])
  return (
    <Routes>
      <Route path="/" element={<Movies favoriteLists={favoriteLists} setFavoriteLists={setFavoriteLists} />} />
      <Route path="/favorite-list" element={<FavoriteList favoriteLists={favoriteLists} />} />
    </Routes>

  )
}

export default App