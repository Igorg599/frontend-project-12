import { Route, Routes, BrowserRouter } from "react-router-dom"
import { Home, Login, NotFound } from "../pages"

const Routers = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default Routers
