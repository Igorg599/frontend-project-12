/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import useLocalStorage from '../hooks/useLokalStorage'
import { appChannelsSelector, actions as actionsChannels } from '../store/channelSlice'
import routes from '../utils/routes'

const Home = () => {
  const dispatch = useDispatch()
  const { channels } = useSelector(appChannelsSelector)
  const [token] = useLocalStorage('userId')
  console.log(channels)

  useEffect(() => {
    axios.get(routes.getData(), { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        dispatch(actionsChannels.addChannel(response.data))
      })
      .catch((err) => {
        throw err
      })
  }, [])

  return (
    <div>Home page</div>
  )
}

export default Home
