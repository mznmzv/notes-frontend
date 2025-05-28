import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './pages/home/index.tsx'
import { Login } from './pages/login/index.tsx'
import { Register } from './pages/register/index.tsx'
import { Layout } from './components/layout/index.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { ToastContainer } from 'react-toastify'
import { CheckAuth } from './components/check-auth/index.tsx'
import { Archive } from './pages/archive/index.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            index
            element={
              <CheckAuth>
                <Home />
              </CheckAuth>
            }
          />
          <Route
            path='/archive'
            element={
              <CheckAuth>
                <Archive />
              </CheckAuth>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Layout>
      <ToastContainer position='bottom-right' />
    </BrowserRouter>
  </Provider>
)
