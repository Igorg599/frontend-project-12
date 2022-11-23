import Popover from "@mui/material/Popover"
import { Button, Box } from "@mui/material"
import styled from "./styled"

const Popup = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box style={styled.containerPopup}>
        <Button style={styled.button} type="button">
          Удалить
        </Button>
        <Button style={styled.button} type="button">
          Переименовать
        </Button>
      </Box>
    </Popover>
  )
}

export default Popup
