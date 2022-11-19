import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box } from "@mui/material"
import axios from "axios"
import useLocalStorage from "../hooks/useLokalStorage"
import { actions as actionsChannels } from "../store/channelSlice"
import { actions as actionsUser } from "../store/userSlice"
import routes from "../utils/routes"
import Chat from "../components/Chat"

const Home = () => {
  const dispatch = useDispatch()
  const [token] = useLocalStorage("userId")
  const [userName] = useLocalStorage("userName")

  useEffect(() => {
    if (userName) {
      dispatch(actionsUser.initUser(userName))
    }

    axios
      .get(routes.getData(), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(actionsChannels.initChannels(response.data))
      })
      .catch((err) => {
        throw err
      })
  }, [])

  return (
    <Box className="container">
      <Chat />
    </Box>
  )
}

export default Home
