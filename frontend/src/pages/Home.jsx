import { useEffect } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLokalStorage'
import routes from '../utils/routes'

const Home = () => {
  const [token] = useLocalStorage('userId')

  useEffect(() => {
    axios.get(routes.getData(), { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => console.log(response))
      .catch((err) => {
        throw err
      })
  }, [token])

  return (
    <div>Home page</div>
  )
}

export default Home
