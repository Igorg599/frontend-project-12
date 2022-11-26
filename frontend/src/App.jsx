import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom"
import { Provider } from "react-redux"
import useAuth from "hooks/useAuth"
import { Home, Login, NotFound, Registration } from "pages"
import store from "store"
import { AuthProvider } from "context/authContext"
import { SocketContext, socket } from "context/socketContext"
import SideBar from "components/SideBar"

const UseOutlet = () => {
  const auth = useAuth()
  return auth.loggedIn ? <Outlet /> : <Navigate to="/login" />
}

const App = () => (
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <AuthProvider>
        <SideBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UseOutlet />}>
              <Route path="" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SocketContext.Provider>
  </Provider>
)

export default App
