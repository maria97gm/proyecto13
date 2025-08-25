import './App.css'
import React, { useContext } from 'react'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import CreateMenu from './Pages/CreateMenu/CreateMenu'
import { Route, Routes } from 'react-router-dom'
import MyMenu from './Pages/MyMenu/MyMenu'
import GeneratedMenu from './Components/GeneratedMenu/GeneratedMenu'
import MyFavs from './Pages/MyFavs/MyFavs'
import RecipeInfo from './Components/RecipeInfo/RecipeInfo'
import History from './Pages/History/History'
import Collage from './Pages/Collage/Collage'
import ControlPanel from './Pages/ControlPanel/ControlPanel'
import { AuthContext } from './Providers/AuthProvider'
import Loading from './Components/Loading/Loading'
import CreateRecipes from './Pages/CreateRecipes/CreateRecipes'
import Header from './Components/Header/Header'

function App() {
  const { user, isAuth } = useContext(AuthContext)
  if (isAuth === null) return <Loading />
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-menu' element={<CreateMenu />} />
          <Route path='/my-menu' element={<MyMenu />} />
          <Route path='/menu' element={<GeneratedMenu />} />
          <Route path='/recipes/:id' element={<RecipeInfo />} />
          <Route path='/my-favs' element={<MyFavs />} />
          <Route path='/history' element={<History />} />
          <Route path='/collage' element={<Collage />} />
          <Route path='/control-panel' element={<ControlPanel />} />
          <Route path='/create-recipes' element={<CreateRecipes />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
