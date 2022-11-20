import { Box, Typography, Modal, TextField, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import styled from "./styled"

const ContentModal = ({ handleClose, type }) => {
  switch (type) {
    case "update":
    case "create": {
      return (
        <>
          <Box style={styled.header}>
            <Typography style={styled.title}>
              {type === "create" ? "Создать канал" : "Переименовать канал"}
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Box>
          <TextField style={styled.input} size="small" />
          <Box style={styled.buttons}>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="contained" style={{ marginLeft: 10 }}>
              Отправить
            </Button>
          </Box>
        </>
      )
    }

    case "delete": {
      return (
        <>
          <Box style={styled.header}>
            <Typography style={styled.title}>Удалить канал</Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Box>
          <Typography style={styled.delete}>Уверены?</Typography>
          <Box style={styled.buttons}>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Отменить
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: 10 }}
            >
              Удалить
            </Button>
          </Box>
        </>
      )
    }

    default:
      return null
  }
}

const ModalChannel = ({ open, handleClose, type }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box style={styled.container}>
      <ContentModal type={type} handleClose={handleClose} />
    </Box>
  </Modal>
)

export default ModalChannel
