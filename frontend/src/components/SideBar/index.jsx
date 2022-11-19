import { Button } from "@material-ui/core"
import { Box } from "@mui/material"
import useAuth from "../../hooks/useAuth"
import styled from "./styled"

const SideBar = () => {
  const auth = useAuth()
  return (
    <nav
      style={{
        ...styled,
        justifyContent: auth.loggedIn ? "space-between" : "start",
      }}
    >
      <Box>Hexlet Chat</Box>
      {auth.loggedIn && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => auth.logOut()}
        >
          Выйти
        </Button>
      )}
    </nav>
  )
}

export default SideBar
