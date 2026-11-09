import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import './App.css'
import Divider from '@mui/material/Divider';

import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { Signup } from './pages/Signup.jsx'
import { ToyDashbord } from './pages/ToyDashbord.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { UserDetails } from './pages/UserDetails.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <Divider className='full' />
          <main className='main-layout'>
            <Routes>
              <Route element={<Signup />} path="/signup" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDashbord />} path="/dashbord" />
              <Route element={<UserDetails />} path="/user/:userId" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}

export default App
