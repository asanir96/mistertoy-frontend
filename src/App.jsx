import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'

import { AppFooter } from './cmps/AppFooter.jsx'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className='main-layout'>
            <Routes>
              {/* <Route element={<HomePage />} path="/" /> */}
              {/* <Route element={<AboutUs />} path="/about" /> */}
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              {/* <Route element={<CarIndex />} path="/car" />
              <Route element={<CarEdit />} path="/car/edit" />
              <Route element={<CarEdit />} path="/car/edit/:carId" />
              <Route element={<CarDetails />} path="/car/:carId" />
              <Route element={<UserDetails />} path="/user/:userId" /> */}
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}

export default App
