import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box } from "@mui/material"
import axios from "axios"
import useLocalStorage from "../hooks/useLokalStorage"
import { actions as actionsChannels } from "../store/channelSlice"
import routes from "../utils/routes"
import Chat from "../components/Chat"

const Home = () => {
  const dispatch = useDispatch()
  const [token] = useLocalStorage("userId")

  useEffect(() => {
    axios
      .get(routes.getData(), { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        dispatch(actionsChannels.addChannel(response.data))
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
