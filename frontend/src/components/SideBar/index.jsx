import { Button } from "@material-ui/core"
import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { actions as actionsUser } from "store/userSlice"
import useAuth from "hooks/useAuth"
import styled from "./styled"
import { useCallback } from "react"

const SideBar = () => {
  const dispatch = useDispatch()
  const auth = useAuth()

  const goOutApp = useCallback(() => {
    auth.logOut()
    dispatch(actionsUser.signOff())
  }, [])

  return (
    <nav
      style={{
        ...styled,
        justifyContent: auth.loggedIn ? "space-between" : "start",
      }}
    >
      <Box>Hexlet Chat</Box>
      {auth.loggedIn && (
        <Button variant="contained" color="primary" onClick={goOutApp}>
          Выйти
        </Button>
      )}
    </nav>
  )
}

export default SideBar
