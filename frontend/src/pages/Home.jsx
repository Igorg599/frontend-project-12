import useLocalStorage from '../hooks/useLokalStorage'

const Home = () => {
  const [{ token }] = useLocalStorage('userId')

  console.log(token)
  return (
    <div>Home page</div>
  )
}

export default Home
