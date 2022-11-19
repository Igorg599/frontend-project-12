import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom"
import { Provider } from "react-redux"
import useAuth from "./hooks/useAuth"
import { Home, Login, NotFound } from "./pages"
import store from "./store"
import { AuthProvider } from "./context/authContext"
import SideBar from "./components/SideBar"

const UseOutlet = () => {
  const auth = useAuth()
  return auth.loggedIn ? <Outlet /> : <Navigate to="/login" />
}

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <SideBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UseOutlet />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
)

export default App
